#!/usr/bin/env python3
"""
Prepare a problem for reiteration — same teardown as scaffold.py's
reiteration path:

    - replace the existing solution body with a signature-only template
      (algorithmic) or wipe (SQL)
    - open a new in-progress `attempts` row
    - regenerate all five Markdown views
    - refresh .claude/practice.sql

Two modes:
    no args    — pick a random algorithmic problem with `stale = 1` from
                 retry_flags (cooldown elapsed). Picker errors if the pool
                 is empty.
    <number>   — explicit pick. Must be an algorithmic problem present in
                 the DB. Cooldown is **not** enforced — if you name it,
                 you get it.

Unlike /leetcode-done, this does not commit — the user will commit once the
new solution is in place (via /leetcode-done).

Exit codes:
  0 success (problem prepared)
  1 retry list is empty / no candidate outside cooldown / argument invalid
    / problem not found / problem is not algorithmic
"""
from __future__ import annotations

import random
import sys
from pathlib import Path


# The shared DB + render modules live in the leetcode-done skill.
_DONE_SCRIPTS = (
    Path(__file__).resolve().parent.parent.parent / 'leetcode-done' / 'scripts'
)
sys.path.insert(0, str(_DONE_SCRIPTS))
import db       # noqa: E402
import render   # noqa: E402


def parse_explicit_number(argv: list[str]) -> int | None:
    """Return an explicit problem number from argv[1:], or None for the random
    case. Errors if a non-empty argument can't be parsed as an integer."""
    args = [a for a in argv[1:] if a.strip()]
    if not args:
        return None
    if len(args) > 1:
        print(f'ERROR: expected at most one problem number, got {args}', file=sys.stderr)
        sys.exit(1)
    try:
        return int(args[0])
    except ValueError:
        print(f'ERROR: argument must be a problem number, got {args[0]!r}',
              file=sys.stderr)
        sys.exit(1)


def main() -> int:
    explicit = parse_explicit_number(sys.argv)

    conn = db.open_db()
    db.sync_config(conn)

    if explicit is not None:
        row = conn.execute(
            'SELECT number, title, difficulty, kind '
            'FROM problems WHERE number = ?',
            (explicit,),
        ).fetchone()
        if row is None:
            print(f'ERROR: problem {explicit} not found in DB.', file=sys.stderr)
            conn.close()
            return 1
        if row[3] != 'algorithmic':
            print(f'ERROR: problem {explicit} is {row[3]}, not algorithmic — '
                  f'/leetcode-retry only handles algorithmic problems.',
                  file=sys.stderr)
            conn.close()
            return 1
        number, title, difficulty = row[0], row[1], row[2]
    else:
        # Random pick: only `stale = 1` rows so cooldown is respected.
        rows = list(conn.execute(
            'SELECT number, title, difficulty '
            'FROM retry_flags '
            'WHERE stale = 1 '
            '  AND (timing_bad = 1 OR complexity_bad = 1 OR stale = 1) '
            'ORDER BY number'
        ))
        if not rows:
            print('No retry candidates outside the cooldown window.', file=sys.stderr)
            conn.close()
            return 1
        number, title, difficulty = random.choice(rows)

    # Whatever flags apply now (may be none for an explicit pick of a fresh,
    # already-good problem) — render them as a "+"-joined suffix for context.
    flag_row = conn.execute(
        'SELECT timing_bad, complexity_bad, stale '
        'FROM retry_flags WHERE number = ?',
        (number,),
    ).fetchone() or (0, 0, 0)
    reasons = [
        name for flag, name in
        zip(flag_row, ('timing', 'complexity', 'stale')) if flag
    ]
    suffix = ' — ' + '+'.join(reasons) if reasons else ''

    cleared = db.prepare_retry(conn, number)
    render.render_all(conn, db.REPO)
    db.dump_sql(conn)
    conn.close()

    print(f'retry: cleared {cleared.relative_to(db.REPO)}')
    print(f'       {number}. {title} ({difficulty}){suffix}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
