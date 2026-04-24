#!/usr/bin/env python3
"""
Create or reset scaffolding for a LeetCode problem.

Reads a JSON manifest from stdin and either:
  - scaffolds a new problem folder (README.md + empty solution file), inserts
    a `problems` row and opens a new in-progress `attempts` row in
    practice.db, then regenerates the five Markdown views; or
  - if the target solution file already has content → runs in
    "reiteration" mode: truncates the solution file and opens a NEW
    `attempts` row, preserving prior attempt history.

Manifest fields (JSON on stdin):
  {
    "number":     int,
    "title":      "Longest Substring Without Repeating Characters",
    "difficulty": "Easy" | "Medium" | "Hard" | "",   (empty permitted for SQL)
    "type":       "algorithmic" | "SQL",
    "statement":  "<markdown body, starting with first description paragraph>"
  }

Exit codes:
  0 success
  1 malformed manifest
"""
from __future__ import annotations

import json
import sys
from pathlib import Path


# Import the shared DB layer + renderers from the leetcode-done skill.
_DONE_SCRIPTS = (
    Path(__file__).resolve().parent.parent.parent / 'leetcode-done' / 'scripts'
)
sys.path.insert(0, str(_DONE_SCRIPTS))
import db       # noqa: E402
import render   # noqa: E402


REPO = db.REPO


# ── helpers ────────────────────────────────────────────────────────────────

def folder_name(number: int, title: str) -> str:
    return f'{number}.{title.replace(" ", "_")}'


def target_dir(number: int, title: str, difficulty: str, ptype: str) -> Path:
    sub = 'SQL' if ptype == 'SQL' else difficulty
    return REPO / 'src' / sub / folder_name(number, title)


def solution_file(ptype: str) -> str:
    if ptype == 'SQL':
        return 'solution.sql'
    return f"solution.{db.load_language()['extension']}"


def has_content(path: Path) -> bool:
    return path.exists() and path.stat().st_size > 0


# ── main ───────────────────────────────────────────────────────────────────

def main() -> int:
    try:
        manifest = json.loads(sys.stdin.read())
    except json.JSONDecodeError as e:
        print(f'ERROR: malformed manifest JSON: {e}', file=sys.stderr)
        return 1

    required = ('number', 'title', 'type', 'statement')
    missing  = [k for k in required if k not in manifest]
    if missing:
        print(f'ERROR: manifest missing keys: {missing}', file=sys.stderr)
        return 1

    number     = int(manifest['number'])
    title      = manifest['title']
    difficulty = manifest.get('difficulty') or ''
    ptype      = manifest['type']
    statement  = manifest['statement']

    if ptype not in ('algorithmic', 'SQL'):
        print(f'ERROR: invalid type {ptype!r}', file=sys.stderr)
        return 1
    if ptype == 'algorithmic' and difficulty not in ('Easy', 'Medium', 'Hard'):
        print(f'ERROR: invalid difficulty {difficulty!r}', file=sys.stderr)
        return 1

    kind   = 'sql' if ptype == 'SQL' else 'algorithmic'
    fold   = folder_name(number, title)
    tdir   = target_dir(number, title, difficulty, ptype)
    sfile  = tdir / solution_file(ptype)

    conn = db.open_db()
    db.sync_config(conn)

    # Reiteration: solution already has content → truncate + open a new attempt.
    if has_content(sfile):
        db.upsert_problem(
            conn, number, title,
            difficulty=None if kind == 'sql' else difficulty,
            kind=kind, folder=fold,
        )
        cleared = db.prepare_retry(conn, number)
        render.render_all(conn, REPO)
        db.dump_sql(conn)
        conn.close()
        print(f'reiteration: cleared {cleared.relative_to(REPO)}')
        return 0

    # Full scaffold.
    tdir.mkdir(parents=True, exist_ok=True)

    readme = tdir / 'README.md'
    readme.write_text(
        f'# {number}. {title}\n'
        + (statement if statement.endswith('\n') else statement + '\n')
    )
    sfile.touch()

    db.upsert_problem(
        conn, number, title,
        difficulty=None if kind == 'sql' else difficulty,
        kind=kind, folder=fold,
    )
    if kind == 'algorithmic':
        db.start_attempt(conn, number)

    render.render_all(conn, REPO)
    db.dump_sql(conn)
    conn.close()

    print(f'scaffold: created {tdir.relative_to(REPO)}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
