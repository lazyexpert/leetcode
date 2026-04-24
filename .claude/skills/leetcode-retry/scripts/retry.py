#!/usr/bin/env python3
"""
Pick a random algorithmic problem from the retry list whose cooldown has
elapsed, and prepare it for reiteration — same teardown as scaffold.py's
reiteration path:

    - truncate the existing solution file
    - open a new in-progress `attempts` row
    - regenerate all five Markdown views
    - refresh .claude/practice.sql

Unlike /leetcode-done, this does not commit — the user will commit once the
new solution is in place (via /leetcode-done).

Exit codes:
  0 success (problem prepared)
  1 retry list is empty / no candidate outside cooldown
"""
from __future__ import annotations

import random
import subprocess
import sys
from pathlib import Path


# The shared DB + render modules live in the leetcode-done skill.
_DONE_SCRIPTS = (
    Path(__file__).resolve().parent.parent.parent / 'leetcode-done' / 'scripts'
)
sys.path.insert(0, str(_DONE_SCRIPTS))
import db       # noqa: E402
import render   # noqa: E402


def main() -> int:
    conn = db.open_db()
    db.sync_config(conn)

    # Retry-eligible = any flag raised. Picker filters to `stale = 1` so a
    # problem solved within the cooldown window is skipped, even if it was
    # flagged for timing or complexity on that recent attempt.
    rows = list(conn.execute(
        'SELECT number, title, difficulty, folder, '
        '       timing_bad, complexity_bad, stale '
        'FROM retry_flags '
        'WHERE (timing_bad = 1 OR complexity_bad = 1 OR stale = 1) '
        '  AND stale = 1 '
        'ORDER BY number'
    ))
    if not rows:
        print('No retry candidates outside the cooldown window.', file=sys.stderr)
        conn.close()
        return 1

    pick = random.choice(rows)
    number, title, difficulty, folder, timing_bad, complexity_bad, stale = pick
    reasons = [
        name for flag, name in
        ((timing_bad, 'timing'), (complexity_bad, 'complexity'), (stale, 'stale'))
        if flag
    ]

    cleared = db.prepare_retry(conn, number)
    render.render_all(conn, db.REPO)
    db.dump_sql(conn)
    conn.close()

    print(f'retry: cleared {cleared.relative_to(db.REPO)}')
    print(f'       {number}. {title} ({difficulty}) — {"+".join(reasons)}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
