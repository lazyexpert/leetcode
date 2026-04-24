#!/usr/bin/env python3
"""
One-shot migrator: populate .claude/practice.db from the existing
Markdown/JSON state (progress.md, history.md, retry.md,
patterns-coverage.md, timings.json, config.json).

Idempotent: deletes practice.db if it exists, then recreates. Safe to run
repeatedly during Phase 1 verification.

Usage:
    ./migrate.py                        # populate default .claude/practice.db
    ./migrate.py --db /tmp/scratch.db   # populate an alternate path

Exit codes:
    0 success
    1 source file missing or unparseable
"""
from __future__ import annotations

import argparse
import datetime
import json
import re
import sqlite3
import subprocess
import sys
from pathlib import Path


REPO = Path(subprocess.run(
    ['git', 'rev-parse', '--show-toplevel'], capture_output=True, text=True
).stdout.strip())

SCHEMA_SQL = Path(__file__).parent / 'schema.sql'

DEFAULT_DB      = REPO / '.claude' / 'practice.db'
DEFAULT_DUMP    = REPO / '.claude' / 'practice.sql'
HISTORY_MD      = REPO / 'history.md'
RETRY_MD        = REPO / 'retry.md'
PATTERNS_MD     = REPO / 'patterns-coverage.md'
TIMINGS_JSON    = REPO / '.claude' / 'timings.json'
CONFIG_JSON     = REPO / 'config.json'

MONTHS = {
    'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
    'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12,
}


# ── src/ tree ──────────────────────────────────────────────────────────────
#
# Authoritative problem list comes from the filesystem, not progress.md
# (which has hand-edit drift: missing atoi closing paren, #456 with its
# number dropped from the link text, inconsistent trailing slashes).
# Each problem's canonical title is the first line of its README.md,
# stripped of the "# N. " prefix.

FOLDER_PREFIX = re.compile(r'^(\d+)\.(.+)$')
README_TITLE  = re.compile(r'^#\s+\d+\.\s+(.+?)\s*$')


def scan_problems() -> list[dict]:
    """Return list of {number, title, difficulty, kind, folder}."""
    src = REPO / 'src'
    if not src.is_dir():
        sys.exit(f'ERROR: {src} missing')
    rows = []
    for section in ('Easy', 'Medium', 'Hard', 'SQL'):
        sec_dir = src / section
        if not sec_dir.is_dir():
            continue
        for folder in sorted(sec_dir.iterdir()):
            if not folder.is_dir():
                continue
            fm = FOLDER_PREFIX.match(folder.name)
            if not fm:
                print(f'  ⚠ skipping malformed folder: {folder}', file=sys.stderr)
                continue
            number = int(fm.group(1))
            readme = folder / 'README.md'
            title  = None
            if readme.exists():
                first = readme.read_text().splitlines()[0] if readme.read_text() else ''
                tm    = README_TITLE.match(first)
                if tm:
                    title = tm.group(1)
            if title is None:
                # Fall back to folder name with underscores → spaces.
                title = fm.group(2).replace('_', ' ')
                print(f'  ⚠ {folder.name}: no README title, using "{title}"', file=sys.stderr)
            rows.append({
                'number':     number,
                'title':      title,
                'difficulty': None if section == 'SQL' else section,
                'kind':       'sql' if section == 'SQL' else 'algorithmic',
                'folder':     folder.name,
            })
    return rows


# ── history.md ──────────────────────────────────────────────────────────────

MONTH_HEADER = re.compile(r'^## (\w+) (\d{4})$')
HISTORY_LINK = re.compile(r'\[(\d+)\]\(src/')


def parse_history() -> dict[int, int]:
    """Return {problem_number: unix_timestamp} — 1st day of the solve month, UTC."""
    if not HISTORY_MD.exists():
        return {}
    doc = HISTORY_MD.read_text()
    solved_at: dict[int, int] = {}
    current_ts: int | None = None
    for line in doc.splitlines():
        hm = MONTH_HEADER.match(line.strip())
        if hm:
            month = MONTHS.get(hm.group(1))
            year  = int(hm.group(2))
            if month:
                current_ts = int(datetime.datetime(
                    year, month, 1, tzinfo=datetime.timezone.utc
                ).timestamp())
            continue
        if current_ts is None:
            continue
        for num_str in HISTORY_LINK.findall(line):
            num = int(num_str)
            # Keep the earliest month seen for a given problem (just in case
            # it appears twice — it shouldn't, but be defensive).
            if num not in solved_at or current_ts < solved_at[num]:
                solved_at[num] = current_ts
    return solved_at


# ── retry.md ────────────────────────────────────────────────────────────────

RETRY_ROW = re.compile(
    r'^\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|\s*\[[^\]]+\]\([^)]+\)\s*\|\s*\w+\s*\|\s*(\w+)\s*\|$'
)


def parse_retry() -> dict[int, str]:
    """Return {problem_number: reason}."""
    if not RETRY_MD.exists():
        return {}
    rows: dict[int, str] = {}
    for line in RETRY_MD.read_text().splitlines():
        m = RETRY_ROW.match(line)
        if not m:
            continue
        rows[int(m.group(2))] = m.group(3)
    return rows


# ── patterns-coverage.md ────────────────────────────────────────────────────

PATTERN_HEADER = re.compile(r'^## (.+)$')
PATTERN_ROW    = re.compile(r'^- \[(\d+)\. ')


def parse_patterns() -> list[tuple[str, int]]:
    """Return list of (pattern_name, problem_number)."""
    if not PATTERNS_MD.exists():
        return []
    doc = PATTERNS_MD.read_text()
    pairs: list[tuple[str, int]] = []
    current: str | None = None
    for line in doc.splitlines():
        if line.startswith('# '):
            continue
        hm = PATTERN_HEADER.match(line)
        if hm:
            current = hm.group(1).strip()
            continue
        if current is None:
            continue
        rm = PATTERN_ROW.match(line)
        if rm:
            pairs.append((current, int(rm.group(1))))
    return pairs


# ── timings.json ────────────────────────────────────────────────────────────

def parse_timings() -> list[dict]:
    """Return list of entries from timings.json (possibly empty)."""
    if not TIMINGS_JSON.exists():
        return []
    try:
        return json.loads(TIMINGS_JSON.read_text())
    except json.JSONDecodeError as e:
        sys.exit(f'ERROR: {TIMINGS_JSON} malformed: {e}')


# ── config.json ─────────────────────────────────────────────────────────────

DEFAULT_THRESHOLDS    = {'Easy': 15, 'Medium': 30, 'Hard': 60}
DEFAULT_COOLDOWN_DAYS = 7


def parse_config() -> tuple[dict[str, int], int]:
    thresholds: dict[str, int] = dict(DEFAULT_THRESHOLDS)
    cooldown = DEFAULT_COOLDOWN_DAYS
    if CONFIG_JSON.exists():
        try:
            data = json.loads(CONFIG_JSON.read_text())
            thresholds.update(data.get('retry_thresholds_minutes', {}) or {})
            raw = data.get('review_cooldown_days', DEFAULT_COOLDOWN_DAYS)
            try:
                cooldown = max(0, int(raw))
            except (TypeError, ValueError):
                pass
        except json.JSONDecodeError as e:
            print(f'  ⚠ {CONFIG_JSON} malformed ({e}); using defaults', file=sys.stderr)
    return thresholds, cooldown


# ── main ────────────────────────────────────────────────────────────────────

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('--db', default=str(DEFAULT_DB),
                    help=f'destination SQLite file (default: {DEFAULT_DB.relative_to(REPO)})')
    args = ap.parse_args()

    db_path = Path(args.db)
    if db_path.exists():
        db_path.unlink()
    db_path.parent.mkdir(parents=True, exist_ok=True)

    problems         = scan_problems()
    solved_at        = parse_history()
    retry_flags      = parse_retry()
    pattern_pairs    = parse_patterns()
    timings_entries  = parse_timings()
    thresholds, cooldown_days = parse_config()

    # problem_number → timings entry, for optional merge of real attempt data
    timings_by_num = {e['number']: e for e in timings_entries if 'number' in e}

    conn = sqlite3.connect(db_path)
    conn.executescript(SCHEMA_SQL.read_text())

    # ── problems ─────────────────────────────────────────────────────────────
    fallback_ts = int(datetime.datetime(
        2018, 1, 1, tzinfo=datetime.timezone.utc
    ).timestamp())
    inserted_problems = 0
    for p in problems:
        created_at = solved_at.get(p['number'], fallback_ts)
        conn.execute(
            'INSERT INTO problems (number, title, difficulty, kind, folder, created_at) '
            'VALUES (?, ?, ?, ?, ?, ?)',
            (p['number'], p['title'], p['difficulty'], p['kind'], p['folder'], created_at),
        )
        inserted_problems += 1

    # ── attempts ─────────────────────────────────────────────────────────────
    # Strategy:
    #   - If timings.json has an entry for the problem, use its real
    #     started_at / duration_minutes.
    #   - Otherwise, synthesize one attempt at the (year, month, 1) from
    #     history.md with duration_minutes = NULL. Revisit flag is set from
    #     retry.md (complexity|both).
    inserted_attempts = 0
    for p in problems:
        num = p['number']
        reason = retry_flags.get(num)
        revisit = 1 if reason in ('complexity', 'both') else 0
        # A 'timing'-only historical flag has no duration to back it. It's
        # never present in the current retry.md, but if it were we'd lose it
        # on migration — there's no duration data to recreate.

        entry = timings_by_num.get(num)
        if entry and entry.get('started_at'):
            started_at       = int(entry['started_at'])
            duration_minutes = entry.get('duration_minutes')
        else:
            started_at       = solved_at.get(num, fallback_ts)
            duration_minutes = None

        conn.execute(
            'INSERT INTO attempts (problem_number, started_at, duration_minutes, revisit) '
            'VALUES (?, ?, ?, ?)',
            (num, started_at, duration_minutes, revisit),
        )
        inserted_attempts += 1

    # ── patterns ─────────────────────────────────────────────────────────────
    inserted_patterns = 0
    for pattern, num in pattern_pairs:
        created_at = solved_at.get(num, fallback_ts)
        conn.execute(
            'INSERT INTO patterns (problem_number, pattern, created_at) '
            'VALUES (?, ?, ?)',
            (num, pattern, created_at),
        )
        inserted_patterns += 1

    # ── thresholds + settings ────────────────────────────────────────────────
    for diff, minutes in thresholds.items():
        conn.execute(
            'INSERT OR REPLACE INTO thresholds (difficulty, minutes) VALUES (?, ?)',
            (diff, minutes),
        )
    conn.execute(
        'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
        ('review_cooldown_days', str(cooldown_days)),
    )

    conn.commit()

    # ── verification summary ────────────────────────────────────────────────
    c = conn.cursor()
    kind_counts = {
        row[0]: row[1] for row in c.execute(
            "SELECT COALESCE(difficulty, 'SQL'), COUNT(*) "
            "FROM problems GROUP BY difficulty"
        )
    }
    retry_view_rows = list(c.execute(
        "SELECT difficulty, "
        "       SUM(timing_bad), SUM(complexity_bad), SUM(stale) "
        "FROM retry_flags "
        "WHERE timing_bad = 1 OR complexity_bad = 1 OR stale = 1 "
        "GROUP BY difficulty ORDER BY difficulty"
    ))
    pattern_counts = list(c.execute(
        "SELECT pattern, COUNT(*) FROM patterns GROUP BY pattern ORDER BY pattern"
    ))

    print(f'  ✓ wrote {db_path.relative_to(REPO) if db_path.is_relative_to(REPO) else db_path}')
    print(f'    problems: {inserted_problems} '
          f'({", ".join(f"{k}={v}" for k, v in sorted(kind_counts.items()))})')
    print(f'    attempts: {inserted_attempts}')
    print(f'    patterns: {inserted_patterns} rows across {len(pattern_counts)} sections')
    if retry_view_rows:
        summary = ', '.join(
            f'{d}:timing={t},complexity={c},stale={s}'
            for d, t, c, s in retry_view_rows
        )
        print(f'    retry_flags (derived): {summary}')
    else:
        print('    retry_flags (derived): 0')
    print(f'    thresholds: {thresholds}')
    print(f'    cooldown:   {cooldown_days} days')

    conn.close()

    # Emit a deterministic .sql dump — the git-tracked form of the DB.
    dump_path = DEFAULT_DUMP if db_path == DEFAULT_DB else db_path.with_suffix('.sql')
    dump = subprocess.run(
        ['sqlite3', str(db_path), '.dump'],
        capture_output=True, text=True, check=True,
    ).stdout
    dump_path.write_text(dump)
    print(f'    dump:   {dump_path.relative_to(REPO) if dump_path.is_relative_to(REPO) else dump_path}')

    return 0


if __name__ == '__main__':
    sys.exit(main())
