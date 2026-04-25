# LeetCode practice workflow

A Claude Code-powered, git-native LeetCode practice toolkit. Scaffolds problems from a URL, classifies patterns automatically on `/leetcode-done`, tracks solve times (per attempt) against configurable thresholds, and keeps a retry queue of problems worth revisiting.

All structured data lives in a local SQLite database (`.claude/practice.db`). The five root-level Markdown files are **generated views** — regenerated from the DB every time you run `/leetcode-new` or `/leetcode-done`. Never edit them by hand.

---

## Requirements

- Python 3.10+ (the scripts use PEP 604 union syntax)
- `sqlite3` CLI (ships with macOS; used for `.dump` / rebuild)
- Node.js 18+ (for the TS compiler your editor will run)
- Git
- [Claude Code](https://claude.ai/code) CLI (`claude` in PATH), authenticated

`/leetcode-done` shells out to the `claude` CLI for pattern classification. Both skills run inside Claude Code.

---

## Usage

### Start a new problem

```
/leetcode-new https://leetcode.com/problems/two-sum/
```

The skill pipes [`fetch.py`](.claude/skills/leetcode-new/scripts/fetch.py) (GraphQL → manifest) through [`scaffold.py`](.claude/skills/leetcode-new/scripts/scaffold.py). Net effect:

1. Creates `src/<Difficulty|SQL>/<number>.<Title_With_Underscores>/` + `README.md` + empty `solution.{ext}`
2. Inserts a `problems` row in [`.claude/practice.db`](.claude/practice.db)
3. Opens a new in-progress `attempts` row (`duration_minutes IS NULL`) — algorithmic problems only; SQL isn't timed
4. Regenerates `progress.md`, `history.md`, and the other views from the DB
5. Writes a fresh `.claude/practice.sql` dump

Aliases: `/leetcode-new`, `/lc-new`, `/leet-new`.

> Premium problems can't be fetched from the public GraphQL endpoint; the skill reports this and exits.

### Reiterate on a problem

If you re-run `/leetcode-new` on a problem that already has a non-empty solution file, the skill runs in **reiteration mode**:

- Truncates `solution.{ext}`
- Opens a **new** `attempts` row (prior attempts are preserved — per-problem timing history is queryable)
- Leaves `problems` metadata alone

Running `/leetcode-done` on the new solution re-classifies patterns and closes the new attempt — the retry queue reconciles automatically.

### Finish a solution

```
/leetcode-done
```

Aliases: `/leetcode-done`, `/lc-done`, `/leet-done`. The skill invokes [`done.py`](.claude/skills/leetcode-done/scripts/done.py), which:

1. Detects the problem being completed — the single non-empty `solution.{ext}` under `src/` that differs from `HEAD` (staged, modified, or untracked). Errors out if zero or multiple candidates match.
2. Closes the latest open `attempts` row for that problem — computes `duration_minutes` from `started_at`, sets the `revisit` flag based on Claude's classification.
3. Classifies algorithmic pattern(s) via the `claude` CLI — picked from a fixed 18-pattern enum (Two Pointers, Sliding Window, BFS/DFS, Dynamic Programming, …). Replaces the problem's `patterns` rows with the fresh set.
4. Upserts `config.json` thresholds into the `thresholds` table (no-op if unchanged).
5. Regenerates all five Markdown views from the DB.
6. Writes a deterministic `.claude/practice.sql` dump.
7. `git add .` and `git commit -m "{number}. {difficulty|SQL}. {title}"` — e.g. `3. Medium. Longest Substring Without Repeating Characters`.

Push is intentionally left to you — batch multiple problems together or push immediately.

SQL solutions skip pattern classification and attempt timing, but still get scaffolded into the DB and committed with the same message format.

### Abort an in-progress attempt

```
/leetcode-abort
```

Aliases: `/leetcode-abort`, `/lc-abort`, `/leet-abort`. Drops the latest in-progress `attempts` row and:

- if it was the **sole** attempt on the problem (you just scaffolded a fresh one) → also drops the problem row + patterns + removes the folder.
- otherwise → restores the solution file from `HEAD` via `git checkout`. Prior committed history acts as the safety net.

Then re-renders the views and refreshes `practice.sql`. Does **not** commit — your working tree is whatever the abort left behind.

⚠ Destructive on uncommitted edits in the affected solution file (the `git checkout` overwrites). Stash first if you have changes you want to keep.

### Retry a problem

```
/leetcode-retry
```

Aliases: `/leetcode-retry`, `/lc-retry`, `/leet-retry`. Picks a random algorithmic problem from `retry.md` whose cooldown has elapsed, then runs the same prep as `/leetcode-new`'s reiteration path: replaces the solution body with a signature-only template (function/class declarations kept, bodies emptied via the `claude` CLI), opens a new `attempts` row, refreshes the views, writes a fresh `.sql` dump. Commit the re-solve via `/leetcode-done` as usual. If `claude` isn't on PATH, the file is fully wiped instead.

A problem is **retry-eligible** if any of the three `retry_flags` are raised:

- `timing` — latest attempt exceeded the difficulty threshold
- `complexity` — classifier flagged a meaningfully better solution exists
- `stale` — `review_cooldown_days` (default 7) have elapsed since the latest attempt

The picker only considers problems with `stale = 1`, i.e. outside the cooldown window — solving a problem buys it 7 days of respite from the picker even if it's flagged for timing or complexity.

### Configuration

Everything tweakable lives in `config.json`:

```json
{
  "language": { "extension": "ts", "name": "typescript" },
  "retry_thresholds_minutes": { "Easy": 15, "Medium": 30, "Hard": 60 },
  "review_cooldown_days": 7,
  "patterns": ["Two Pointers", "Sliding Window", "Binary Search", "..."]
}
```

**`language.extension`** — file extension for algorithmic solutions (`solution.<ext>`). SQL problems always use `.sql` regardless.
**`language.name`** — code-fence language hint used when `done.py` asks Claude to classify. Affects classification quality, nothing else.
**`retry_thresholds_minutes`** — solve time past which the `timing` flag is raised.
**`review_cooldown_days`** — days since last attempt after which the `stale` flag is raised; also the minimum age for `/leetcode-retry` to pick a problem.
**`patterns`** — the closed enum the classifier may pick from, and the render order of `## <Pattern>` sections in `patterns-coverage.md`. Add your own (e.g. `Union Find`, `Line Sweep`, `Segment Tree`) or trim to fewer, coarser buckets. Classifier responses outside this list are filtered out with a warning, so no junk rows reach the DB.

Switching languages: change both `language` fields, then run `/leetcode-new` on a fresh problem — it'll write `solution.<new-ext>`. Existing solution files aren't touched; only future scaffolds and `/leetcode-done` detection are affected.

### Adjusting retry thresholds

The retry queue (`retry.md`) is a **SQL view** (`retry_flags`) over `attempts`, the `thresholds` table, and the `settings` table (for the cooldown). There is no reconciliation step — tweak `config.json`, run `/leetcode-done`, and the view reflects the new reality immediately. If you want to change thresholds without finishing a problem, run `/leetcode-done` with only `config.json` modified; it commits the config change with message `tune retry thresholds`.

Reasons are rendered as `+`-joined flag names (e.g. `stale`, `complexity+stale`, `timing+complexity+stale`). Only algorithmic problems appear in `retry.md`; SQL is excluded.

### Source of truth: `.claude/practice.db`

The database is the single source of truth. Tables:

| Table | Holds |
|-------|-------|
| `problems`   | stable metadata (number, title, difficulty, kind, folder, created_at) |
| `attempts`   | one row per solve session — started_at, duration_minutes (NULL while in progress), revisit |
| `patterns`   | (problem_number, pattern, created_at) — classification snapshot per problem |
| `thresholds` | mirror of `retry_thresholds_minutes` in `config.json` |
| `settings`   | singleton key-value bag (currently: `review_cooldown_days`) |
| `retry_flags` VIEW | algorithmic problems with three boolean flag columns — `timing_bad`, `complexity_bad`, `stale` |

Per-attempt storage means timing history is queryable (`SELECT duration_minutes FROM attempts WHERE problem_number = 3 ORDER BY started_at`), and reiterating on a flagged problem creates a new attempt row rather than overwriting the old one.

The `.db` file itself is **gitignored** — what lands in git is [`.claude/practice.sql`](.claude/practice.sql), a deterministic `.dump` produced after every mutation. Rebuild the DB with:

```bash
sqlite3 .claude/practice.db < .claude/practice.sql
```

---

## Pedagogical constraint

When using Claude Code to discuss a problem you're actively solving, the skill and the root [`CLAUDE.md`](CLAUDE.md) enforce a strict rule: **never produce solution code unless explicitly asked**. Hints are fine (point out complexity, mention the pattern name, ask a guiding question); finished code is not.

---

## Components

| Path | Purpose |
|------|---------|
| [`.claude/skills/leetcode-new/SKILL.md`](.claude/skills/leetcode-new/SKILL.md) | Skill entry point for `/leetcode-new` — pipes `fetch.py` into `scaffold.py` |
| [`.claude/skills/leetcode-new/scripts/fetch.py`](.claude/skills/leetcode-new/scripts/fetch.py) | Fetches problem from LeetCode's public GraphQL endpoint → JSON manifest |
| [`.claude/skills/leetcode-new/scripts/scaffold.py`](.claude/skills/leetcode-new/scripts/scaffold.py) | Creates folder/files, inserts `problems` + `attempts` rows, renders views, dumps SQL |
| [`.claude/skills/leetcode-done/SKILL.md`](.claude/skills/leetcode-done/SKILL.md) | Skill entry point for `/leetcode-done` — delegates to `done.py` |
| [`.claude/skills/leetcode-done/scripts/done.py`](.claude/skills/leetcode-done/scripts/done.py) | Closes attempt, classifies patterns, renders views, dumps SQL, commits |
| [`.claude/skills/leetcode-done/scripts/schema.sql`](.claude/skills/leetcode-done/scripts/schema.sql) | DB schema — tables + `retry_flags` view |
| [`.claude/skills/leetcode-done/scripts/db.py`](.claude/skills/leetcode-done/scripts/db.py) | Shared DB helpers used by both skills |
| [`.claude/skills/leetcode-done/scripts/render.py`](.claude/skills/leetcode-done/scripts/render.py) | Renders all five Markdown views from the DB |
| [`.claude/skills/leetcode-done/scripts/migrate.py`](.claude/skills/leetcode-done/scripts/migrate.py) | One-shot migrator — used to bootstrap the DB from pre-existing MD state |
| [`.claude/skills/leetcode-retry/SKILL.md`](.claude/skills/leetcode-retry/SKILL.md) | Skill entry point for `/leetcode-retry`, `/lc-retry`, `/leet-retry` |
| [`.claude/skills/leetcode-retry/scripts/retry.py`](.claude/skills/leetcode-retry/scripts/retry.py) | Picks a random stale problem (or an explicit one) and preps it for reiteration (shares `db.prepare_retry` with scaffold.py) |
| [`.claude/skills/leetcode-abort/SKILL.md`](.claude/skills/leetcode-abort/SKILL.md) | Skill entry point for `/leetcode-abort`, `/lc-abort`, `/leet-abort` |
| [`.claude/skills/leetcode-abort/scripts/abort.py`](.claude/skills/leetcode-abort/scripts/abort.py) | Drops the latest in-progress attempt, restores or rolls back, re-renders |
| [`.claude/practice.sql`](.claude/practice.sql) | Git-tracked DB dump; rebuild `.claude/practice.db` from this |
| [`config.json`](config.json) | Retry thresholds per difficulty |
| [`progress.md`](progress.md) | View: problem index with per-difficulty counters |
| [`history.md`](history.md) | View: solves grouped by month |
| [`timings.md`](timings.md) | View: completed attempt durations |
| [`retry.md`](retry.md) | View: `retry_flags` output, formatted as a table |
| [`patterns-coverage.md`](patterns-coverage.md) | View: problems grouped by classifier pattern |
| [`CLAUDE.md`](CLAUDE.md) | Collaboration rules + repo layout for Claude Code sessions |

---

## Setup (when cloning)

```bash
git clone <repo> leetcode && cd leetcode

# Rebuild the local SQLite DB from the tracked dump:
sqlite3 .claude/practice.db < .claude/practice.sql

# Install Claude Code if you haven't:
# https://claude.ai/code
```

If you fork this repo to start your own practice log, wipe the data:

```bash
rm -rf src/*
rm .claude/practice.db .claude/practice.sql
# Next /leetcode-new recreates the DB from schema.sql.
```

---

## Design notes

- **Database as source of truth, Markdown as views.** No more regex surgery on hand-mutated files — renderers are pure `SELECT → string`, and every MD file is rebuilt wholesale on each `/leetcode-new` or `/leetcode-done`.
- **Per-attempt history.** Reiteration appends a new `attempts` row rather than overwriting, so "how did my solve time for #3 evolve?" is a one-line query.
- **`retry_flags` is a view, not a table.** Changing thresholds in `config.json` reshapes the retry queue on the next render — no reconciliation step.
- **DB is local; `.sql` dump is portable.** Binary `.db` files don't diff cleanly, so the git-tracked form is the plain-text `.dump`.
- **Self-contained per problem.** Each problem folder owns its `README.md` and `solution.<ext>` (algorithmic) or `solution.sql` (SQL). Solutions are pasted into LeetCode's online judge.
- **Algorithmic language is configurable, SQL is fixed.** Set `language.extension` / `language.name` in `config.json` to swap in Python, Go, Rust, etc. SQL problems always use `.sql`.
- **Automation is opinionated, not generic.** Everything assumes Claude Code, Git, and the working directory layout in [`CLAUDE.md`](CLAUDE.md).
