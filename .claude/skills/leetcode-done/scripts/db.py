"""
Shared SQLite helpers for the LeetCode practice skills.

The DB lives at .claude/practice.db (gitignored). A deterministic .sql
dump is written to .claude/practice.sql after every mutation — that's the
git-tracked form, so forkers can rebuild the DB with:

    sqlite3 .claude/practice.db < .claude/practice.sql

Both scaffold.py (leetcode-new) and done.py (leetcode-done) import this
module. It is not meant to be run directly.
"""
from __future__ import annotations

import json
import re
import sqlite3
import subprocess
import sys
import time
from pathlib import Path


REPO = Path(subprocess.run(
    ['git', 'rev-parse', '--show-toplevel'], capture_output=True, text=True
).stdout.strip())

DB_PATH    = REPO / '.claude' / 'practice.db'
SQL_DUMP   = REPO / '.claude' / 'practice.sql'
CONFIG     = REPO / 'config.json'
SCHEMA_SQL = Path(__file__).parent / 'schema.sql'

DEFAULT_THRESHOLDS    = {'Easy': 15, 'Medium': 30, 'Hard': 60}
DEFAULT_LANGUAGE      = {'extension': 'ts', 'name': 'typescript'}
DEFAULT_COOLDOWN_DAYS = 7
DEFAULT_PATTERNS      = [
    'Two Pointers', 'Sliding Window', 'Binary Search', 'Stack / Monotonic Stack',
    'BFS / DFS', 'Dynamic Programming', 'Greedy', 'Hash Map / Hash Set',
    'Linked List', 'Tree Traversal', 'Backtracking', 'Bit Manipulation',
    'Heap / Priority Queue', 'Trie', 'Prefix Sum', 'Math', 'Sorting',
    'Design / Simulation',
]


def _load_config() -> dict:
    if not CONFIG.exists():
        return {}
    try:
        return json.loads(CONFIG.read_text())
    except json.JSONDecodeError as e:
        print(f'  ⚠ {CONFIG.name} malformed ({e}); using defaults', file=sys.stderr)
        return {}


def load_thresholds() -> dict[str, int]:
    merged = dict(DEFAULT_THRESHOLDS)
    merged.update(_load_config().get('retry_thresholds_minutes', {}) or {})
    return {k: int(v) for k, v in merged.items()}


def load_language() -> dict[str, str]:
    """Return {'extension': str, 'name': str} for the active algorithmic language."""
    merged = dict(DEFAULT_LANGUAGE)
    merged.update(_load_config().get('language', {}) or {})
    # Normalise: strip a leading dot on the extension, lowercase both values.
    return {
        'extension': str(merged['extension']).lstrip('.').lower(),
        'name':      str(merged['name']).lower(),
    }


def load_cooldown_days() -> int:
    """Days-since-last-attempt threshold for the `stale` retry flag and for
    the `/leetcode-retry` picker."""
    raw = _load_config().get('review_cooldown_days', DEFAULT_COOLDOWN_DAYS)
    try:
        return max(0, int(raw))
    except (TypeError, ValueError):
        return DEFAULT_COOLDOWN_DAYS


def load_patterns() -> list[str]:
    """The closed enum of classifier labels + the render order for
    patterns-coverage.md. Config-driven so users can add niche patterns
    (Union Find, Line Sweep, Segment Tree…) or trim to fewer buckets.
    Empty/malformed → falls back to DEFAULT_PATTERNS."""
    raw = _load_config().get('patterns')
    if not isinstance(raw, list):
        return list(DEFAULT_PATTERNS)
    seen: set[str] = set()
    result: list[str] = []
    for item in raw:
        if not isinstance(item, str):
            continue
        label = item.strip()
        if label and label not in seen:
            seen.add(label)
            result.append(label)
    return result or list(DEFAULT_PATTERNS)


def open_db() -> sqlite3.Connection:
    """Open practice.db, creating and initialising from schema.sql if absent."""
    existed = DB_PATH.exists()
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.execute('PRAGMA foreign_keys = ON')
    if not existed:
        conn.executescript(SCHEMA_SQL.read_text())
        conn.commit()
    return conn


# ── problems ────────────────────────────────────────────────────────────────

def upsert_problem(
    conn: sqlite3.Connection,
    number: int,
    title: str,
    difficulty: str | None,
    kind: str,
    folder: str,
) -> None:
    """Insert the problem; on conflict update mutable metadata but keep created_at."""
    now = int(time.time())
    conn.execute(
        'INSERT INTO problems (number, title, difficulty, kind, folder, created_at) '
        'VALUES (?, ?, ?, ?, ?, ?) '
        'ON CONFLICT(number) DO UPDATE SET '
        '  title      = excluded.title, '
        '  difficulty = excluded.difficulty, '
        '  kind       = excluded.kind, '
        '  folder     = excluded.folder',
        (number, title, difficulty, kind, folder, now),
    )


# ── attempts ────────────────────────────────────────────────────────────────

def start_attempt(conn: sqlite3.Connection, number: int) -> int:
    """Open a new in-progress attempt for the problem. Returns attempt id.

    Real users put minutes between attempts, but tools and tests can fire
    scaffold→done→retry within the same wall-clock second — colliding with
    the `(problem_number, started_at)` UNIQUE constraint. On collision we
    bump `started_at` by a second and retry; the constraint stays meaningful
    (no two attempts at the literal same instant) without making the tools
    flaky.
    """
    now = int(time.time())
    while True:
        try:
            cur = conn.execute(
                'INSERT INTO attempts (problem_number, started_at, duration_minutes, revisit) '
                'VALUES (?, ?, NULL, 0)',
                (number, now),
            )
            return cur.lastrowid
        except sqlite3.IntegrityError:
            now += 1


def latest_open_attempt(conn: sqlite3.Connection, number: int) -> tuple[int, int] | None:
    """Return (attempt_id, started_at) of the latest in-progress attempt, or None."""
    return conn.execute(
        'SELECT id, started_at FROM attempts '
        'WHERE problem_number = ? AND duration_minutes IS NULL '
        'ORDER BY started_at DESC LIMIT 1',
        (number,),
    ).fetchone()


def complete_attempt(conn: sqlite3.Connection, attempt_id: int, revisit: bool) -> int:
    """Finalize an attempt: computes duration_minutes from (now - started_at)/60,
    sets revisit. Returns duration in minutes.

    Minimum is 1 minute — treating sub-minute solves as "1 min" matches the old
    pre-commit behaviour and keeps timings.md readable.
    """
    row = conn.execute(
        'SELECT started_at FROM attempts WHERE id = ?', (attempt_id,)
    ).fetchone()
    if not row:
        raise ValueError(f'attempt {attempt_id} not found')
    started_at = row[0]
    now        = int(time.time())
    duration   = max(1, round((now - started_at) / 60))
    conn.execute(
        'UPDATE attempts SET duration_minutes = ?, revisit = ? WHERE id = ?',
        (duration, 1 if revisit else 0, attempt_id),
    )
    return duration


# ── patterns ────────────────────────────────────────────────────────────────

def replace_patterns(conn: sqlite3.Connection, number: int, patterns: list[str]) -> None:
    """Replace the problem's pattern rows with the given set. `created_at` is
    refreshed so the row mirrors when this classification happened."""
    conn.execute('DELETE FROM patterns WHERE problem_number = ?', (number,))
    if not patterns:
        return
    now = int(time.time())
    conn.executemany(
        'INSERT INTO patterns (problem_number, pattern, created_at) VALUES (?, ?, ?)',
        [(number, p, now) for p in patterns],
    )


# ── thresholds ──────────────────────────────────────────────────────────────

def upsert_thresholds(conn: sqlite3.Connection, thresholds: dict[str, int]) -> None:
    """Mirror config.json's retry_thresholds_minutes into the thresholds table
    so retry_flags (a view) can reference them."""
    for diff, minutes in thresholds.items():
        conn.execute(
            'INSERT INTO thresholds (difficulty, minutes) VALUES (?, ?) '
            'ON CONFLICT(difficulty) DO UPDATE SET minutes = excluded.minutes',
            (diff, int(minutes)),
        )


def upsert_setting(conn: sqlite3.Connection, key: str, value) -> None:
    conn.execute(
        'INSERT INTO settings (key, value) VALUES (?, ?) '
        'ON CONFLICT(key) DO UPDATE SET value = excluded.value',
        (key, str(value)),
    )


def sync_config(conn: sqlite3.Connection) -> None:
    """Mirror all relevant config.json knobs into DB tables used by views.
    Called by every skill (scaffold, done, retry) so the view always sees
    the user's current settings."""
    upsert_thresholds(conn, load_thresholds())
    upsert_setting(conn, 'review_cooldown_days', load_cooldown_days())


# ── reiteration (shared by /leetcode-new and /leetcode-retry) ───────────────

def strip_solution_body(code: str, language_name: str) -> str:
    """Reduce algorithmic-solution code to declarations only — every
    function/class/method/type signature is kept, every body is emptied —
    by shelling out to the `claude` CLI. The user gets back a fresh
    template they can re-solve into without re-looking-up the LC judge
    signature.

    Returns:
      - the stripped code on success
      - an empty string on any failure (claude unavailable, timeout, JSON
        nonsense, empty input). Callers wipe the file when this returns
        empty, matching the pre-feature behaviour.
    """
    if not code.strip():
        return ''
    if subprocess.run(['which', 'claude'], capture_output=True).returncode != 0:
        return ''
    prompt = (
        f'Strip the implementation from this {language_name} LeetCode solution. '
        f'Keep every function, class, method, and type declaration intact, but '
        f'replace each body with an empty body. Preserve original indentation. '
        f'Reply with ONLY the stripped code — no markdown fence, no commentary, '
        f'no explanation.\n\n{code}'
    )
    try:
        result = subprocess.run(
            ['claude', '-p', prompt],
            capture_output=True, text=True, timeout=60,
        )
    except (subprocess.TimeoutExpired, OSError):
        return ''
    out = (result.stdout or '').strip()
    # Defensively strip a surrounding markdown fence if Claude added one.
    fence = re.match(r'^```[a-zA-Z]*\n(.*?)\n```\s*$', out, re.DOTALL)
    if fence:
        out = fence.group(1).strip()
    return out


def prepare_retry(conn: sqlite3.Connection, number: int) -> Path:
    """Reset the existing solution file for a fresh solve and (for
    algorithmic problems) open a new in-progress attempt. Returns the
    solution path.

    Used by both /leetcode-new (reiteration path, when the URL resolves to
    a problem folder whose solution already has content) and /leetcode-retry
    (random pick from the retry queue). Both flows need the same teardown:
    clear the slate, start the timer. The caller renders views + dumps SQL.

    The solution file is discovered by globbing `solution.*` in the problem
    folder — keeps us correct even if the language extension changed in
    config.json since the last solve.

    Reset behaviour:
      - algorithmic — try to keep declarations (function/class/method
        signatures) via `strip_solution_body`. Fallback to a full wipe if
        the classifier path is unavailable.
      - SQL — always wipe; SQL solutions are queries with no signature.
    """
    row = conn.execute(
        'SELECT difficulty, kind, folder FROM problems WHERE number = ?',
        (number,),
    ).fetchone()
    if not row:
        raise ValueError(f'problem {number} not found in DB')
    difficulty, kind, folder = row
    section = 'SQL' if kind == 'sql' else difficulty
    folder_path = REPO / 'src' / section / folder
    candidates  = sorted(folder_path.glob('solution.*'))
    if len(candidates) != 1:
        raise RuntimeError(
            f'expected exactly one solution file in {folder_path.relative_to(REPO)}, '
            f'found {[c.name for c in candidates]}'
        )
    sfile = candidates[0]

    if kind == 'algorithmic':
        existing = sfile.read_text()
        stripped = strip_solution_body(existing, load_language()['name'])
        sfile.write_text(stripped if stripped else '')
        start_attempt(conn, number)
    else:
        sfile.write_text('')

    return sfile


# ── dump ────────────────────────────────────────────────────────────────────

def dump_sql(conn: sqlite3.Connection) -> None:
    """Commit the connection and write a deterministic .sql dump of practice.db."""
    conn.commit()
    result = subprocess.run(
        ['sqlite3', str(DB_PATH), '.dump'],
        capture_output=True, text=True, check=True,
    )
    SQL_DUMP.write_text(result.stdout)
