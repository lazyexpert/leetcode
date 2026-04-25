#!/usr/bin/env python3
"""
Complete the in-progress LeetCode problem and commit it.

End-to-end "done" lifecycle in a single step:
  - Detects the problem being completed from working-tree changes
    (a non-empty modified/untracked solution file under src/).
  - Closes the latest in-progress attempt in practice.db — computes
    duration_minutes and sets the revisit flag from the Claude classifier.
  - Replaces the problem's pattern rows with the fresh classification.
  - Upserts config.json thresholds into the thresholds table.
  - Regenerates the five Markdown views from the DB.
  - Writes a deterministic .claude/practice.sql dump.
  - Stages everything with `git add .` and commits with message:
      "{number}. {difficulty|SQL}. {title}"

Push is intentionally left to the user.

Exit codes:
  0 success (committed)
  1 no problem detected, or multiple candidates, or git/classify error
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

import db
import render


REPO = db.REPO


def build_solution_rx(extension: str) -> re.Pattern[str]:
    """Match src/<Easy|Medium|Hard>/<folder>/solution.<configured-ext>
    and src/SQL/<folder>/solution.sql."""
    ext = re.escape(extension)
    return re.compile(
        rf'^src/(?:(?:Easy|Medium|Hard)/[^/]+/solution\.{ext}'
        rf'|SQL/[^/]+/solution\.sql)$'
    )


# ── detection ───────────────────────────────────────────────────────────────

def working_tree_changes() -> list[str]:
    """Return paths of all files modified, staged, or untracked vs HEAD."""
    # -uall expands untracked directories so a newly-scaffolded problem folder
    # surfaces as its individual files (README.md, solution.ts) rather than a
    # bare directory entry.
    result = subprocess.run(
        ['git', 'status', '--porcelain', '-uall'],
        capture_output=True, text=True, cwd=REPO,
    )
    paths = []
    for line in result.stdout.splitlines():
        if len(line) < 4:
            continue
        path = line[3:]
        if ' -> ' in path:
            path = path.split(' -> ', 1)[1]
        paths.append(path.strip('"'))
    return paths


def detect_problem(changed_paths: list[str], solution_rx: re.Pattern[str]) -> dict | None:
    candidates = []
    for p in changed_paths:
        if not solution_rx.match(p):
            continue
        abs_path = REPO / p
        if not abs_path.exists() or abs_path.stat().st_size == 0:
            continue
        candidates.append(p)

    if not candidates:
        return None
    if len(candidates) > 1:
        print('ERROR: multiple solution files have changes:', file=sys.stderr)
        for c in candidates:
            print(f'  {c}', file=sys.stderr)
        print('Commit them separately or revert the extras.', file=sys.stderr)
        sys.exit(1)

    path    = candidates[0]
    parts   = path.split('/')
    section = parts[1]
    folder  = parts[2]
    number  = int(folder.split('.')[0])
    title   = folder.split('.', 1)[1].replace('_', ' ')
    is_sql  = section == 'SQL'

    return {
        'path':       path,
        'section':    section,
        'folder':     folder,
        'number':     number,
        'title':      title,
        'is_sql':     is_sql,
        'difficulty': '' if is_sql else section,
    }


# ── classification via Claude CLI ───────────────────────────────────────────

def classify_solution(file_path: str, number: int, title: str, difficulty: str,
                      language_name: str, known_patterns: list[str]):
    """Return (patterns: list[str], revisit: bool) or (None, None) on failure.

    `known_patterns` is the closed enum the classifier must choose from;
    responses are filtered against this list, so hallucinated labels never
    reach the DB."""
    try:
        code = (REPO / file_path).read_text()
    except OSError:
        return None, None
    if not code.strip():
        return None, None

    prompt = (
        'Analyze this LeetCode solution. '
        'Reply with ONLY a JSON object — no explanation, no markdown, no extra text.\n\n'
        f'Problem: {number}. {title} ({difficulty})\n\n'
        f'```{language_name}\n{code}\n```\n\n'
        'Format: {"patterns": ["Pattern1"], "revisit": false}\n\n'
        'Choose patterns ONLY from this exact list:\n'
        f'{", ".join(known_patterns)}\n\n'
        'Set revisit=true only if a genuinely better time or space complexity '
        'solution exists using a standard pattern above.'
    )

    try:
        result = subprocess.run(
            ['claude', '-p', prompt],
            capture_output=True, text=True, timeout=60,
        )
    except subprocess.TimeoutExpired:
        print(f'  ⚠ claude timed out for {file_path} — skipping classification')
        return None, None
    except Exception as e:
        print(f'  ⚠ claude call failed for {file_path}: {e}')
        return None, None

    match = re.search(r'\{[^{}]*\}', result.stdout, re.DOTALL)
    if not match:
        print(f'  ⚠ no JSON in claude response for {file_path} — skipping classification')
        return None, None
    try:
        data = json.loads(match.group())
    except json.JSONDecodeError:
        print(f'  ⚠ malformed JSON for {file_path} — skipping classification')
        return None, None

    raw_patterns = data.get('patterns', []) or []
    known        = set(known_patterns)
    accepted     = [p for p in raw_patterns if p in known]
    rejected     = [p for p in raw_patterns if p not in known]
    if rejected:
        print(f'  ⚠ classifier returned unknown patterns {rejected} — filtered out')

    return accepted, bool(data.get('revisit', False))


# ── main ────────────────────────────────────────────────────────────────────

def main() -> int:
    language     = db.load_language()
    solution_rx  = build_solution_rx(language['extension'])
    changed      = working_tree_changes()
    problem      = detect_problem(changed, solution_rx)
    config_dirty = 'config.json' in changed

    if problem is None and not config_dirty:
        print('ERROR: no problem detected — no non-empty solution file has changes.',
              file=sys.stderr)
        print('Run /leetcode-new first, write your solution, then try again.',
              file=sys.stderr)
        return 1

    claude_available = (
        subprocess.run(['which', 'claude'], capture_output=True).returncode == 0
    )

    conn = db.open_db()

    # ── sync every config.json knob — the retry_flags view reads them live
    db.sync_config(conn)

    # ── Phase 1: process the detected problem ───────────────────────────────
    if problem is not None:
        number     = problem['number']
        title      = problem['title']
        difficulty = problem['difficulty']
        folder     = problem['folder']
        kind       = 'sql' if problem['is_sql'] else 'algorithmic'

        db.upsert_problem(
            conn, number, title,
            difficulty=None if kind == 'sql' else difficulty,
            kind=kind, folder=folder,
        )

        if kind == 'algorithmic':
            if not claude_available:
                print("  ⚠ 'claude' not in PATH — pattern classification skipped")
                patterns, revisit = None, False
            else:
                patterns, revisit = classify_solution(
                    problem['path'], number, title, difficulty,
                    language['name'], db.load_patterns())

            open_attempt = db.latest_open_attempt(conn, number)
            if open_attempt is None:
                # Someone edited a solution without running /leetcode-new first;
                # we still want to record the solve, so start+close an attempt.
                attempt_id = db.start_attempt(conn, number)
                print(f'  ⚠ no in-progress attempt for {number}. {title}; recording with min duration')
            else:
                attempt_id, _ = open_attempt

            duration = db.complete_attempt(conn, attempt_id, revisit=bool(revisit))
            print(f'  ⏱ {number}. {title}: {duration} min')

            if patterns:
                db.replace_patterns(conn, number, patterns)
                flag = ' + revisit ⚠' if revisit else ''
                print(f'  ✓ {number}. {title} → {patterns}{flag}')

    # ── Phase 2: regenerate views, dump SQL ─────────────────────────────────
    render.render_all(conn, REPO)
    db.dump_sql(conn)
    conn.close()

    # ── Phase 3: commit ─────────────────────────────────────────────────────
    subprocess.run(['git', 'add', '.'], cwd=REPO, check=True)

    if problem is not None:
        tag = 'SQL' if problem['is_sql'] else problem['difficulty']
        msg = f"{problem['number']}. {tag}. {problem['title']}"
    else:
        msg = 'tune retry thresholds'

    result = subprocess.run(
        ['git', 'commit', '-m', msg], cwd=REPO, capture_output=True, text=True,
    )
    if result.returncode != 0:
        sys.stderr.write(result.stderr)
        sys.stdout.write(result.stdout)
        return result.returncode

    print(f'  ✓ committed: {msg}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
