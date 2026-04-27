# LeetCode Practice

A practice journal scaffolded by the
[leetcode-workflow](https://github.com/lazyexpert/leetcode-workflow) plugin.
SQLite (`.claude/practice.db`) is the source of truth; the five Markdown
views at the repo root are regenerated on every command.

## Workflow

1. `/leetcode-workflow:new <leetcode-url>` — scaffold a problem from a LeetCode URL.
2. Write your solution in `solution.ts` (or `solution.sql` for database problems).
3. `/leetcode-workflow:done` — record timing, classify patterns, regenerate views, commit.

Other commands:

- `/leetcode-workflow:pick` — "what should I solve next?". Picks an under-covered pattern; with a non-zero `pick_retry_ratio`, sometimes routes to a retry instead.
- `/leetcode-workflow:retry [N]` — revisit a problem (random from the retry queue, or explicit by number).
- `/leetcode-workflow:abort` — drop the latest in-progress attempt.
- `/leetcode-workflow:update` — apply pending DB migrations after a plugin update.

## Generated views

| File | Shows |
|---|---|
| `progress.md` | Solved counts by difficulty + per-section problem lists. |
| `timings.md` | Per-attempt solve times against the configured thresholds. |
| `retry.md` | Algorithmic problems eligible for revisit + reason flags. |
| `patterns-coverage.md` | Coverage across algorithmic patterns. |
| `history.md` | Timeline of solves by month. |

Don't hand-edit these — the next command will overwrite them.

## Configuration

Edit `config.json` to tune:

| Key | Effect |
|---|---|
| `language` | Filename suffix and classifier code-fence hint. |
| `retry_thresholds_minutes` | Solve-time thresholds per difficulty. |
| `review_cooldown_days` | Staleness window for the retry queue. |
| `pick_retry_ratio` | Share of `/pick` invocations that route to retry instead of new (0..1). |
| `patterns` | Closed enum the pattern classifier picks from. |

---

## Orchestration workflow

This repo is managed by the
[leetcode-workflow](https://github.com/lazyexpert/leetcode-workflow) Claude Code plugin.
