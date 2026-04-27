# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Collaboration rules

**Never provide a solution or write code for a problem unless explicitly asked.** The goal is learning, not code generation. All discussion must stay in hint form — e.g. point out the time/space complexity of the current approach, suggest there is a more efficient data structure, note which algorithmic pattern fits, or ask a guiding question. Only write or complete `solution.ts` / `solution.sql` when the user directly requests it.

## Repository purpose

Personal LeetCode practice repo managed by the [leetcode-workflow](https://github.com/lazyexpert/leetcode-workflow) Claude Code plugin: scaffolding by URL via `/leetcode-workflow:new`, closing out each problem via `/leetcode-workflow:done` (timing + pattern classification + retry queue + commit), revisiting via `/leetcode-workflow:retry`, and "what next?" picks via `/leetcode-workflow:pick`. There is no build system, no package manager, and no test suite — solutions are intended to be pasted into LeetCode's online judge. The algorithmic language is configurable in [`config.json`](config.json) (defaults to TypeScript); `tsconfig.json` exists only to give editors sensible defaults (ES2022, CommonJS, strict) when that's the active language.

See [`README.md`](README.md) for the full workflow and usage.

## Layout

Problems are organized under `src/`:

```
src/
  Easy/    — algorithmic problems, Easy difficulty
  Medium/  — algorithmic problems, Medium difficulty
  Hard/    — algorithmic problems, Hard difficulty
  SQL/     — SQL problems (no difficulty split)
```

Algorithmic problems live at `src/{Easy|Medium|Hard}/<number>.<Title_With_Underscores>/` and contain:
- `README.md` — problem statement, constraints, and examples (copied from LeetCode)
- `solution.<ext>` — solution matching the LeetCode judge signature exactly, where `<ext>` is the extension configured in [`config.json`](config.json) under `language.extension` (default: `ts`)

SQL problems live at `src/SQL/<number>.<Title_With_Underscores>/` and contain:
- `README.md` — problem statement
- `solution.sql` — SQL solution (always `.sql`, not affected by the language config)

The algorithmic language is **configurable per repo**. Change `language.extension` and `language.name` in `config.json` to target Python, Go, Kotlin, etc. Existing solution files aren't renamed on config change — the setting only affects future scaffolds and which file `/leetcode-workflow:done` looks for.

The classifier pattern enum is also configurable via `config.json: patterns`. Default is 18 common LC patterns; add niche ones (`Union Find`, `Line Sweep`, `Segment Tree`) or trim for coarser buckets. The classifier is constrained to this list; responses outside it are filtered with a warning.

## Solution file conventions

**Algorithmic solutions** match the LeetCode judge signature exactly — just the function, no `main`, no imports, no I/O, no `console.log`/`print`/test harness. Example with the default TypeScript config (`src/Medium/713.Subarray_Product_Less_Than_K/solution.ts`):

```ts
function numSubarrayProductLessThanK(nums: number[], k: number): number {
  // ...
}
```

Solution files are pasted verbatim into LeetCode.

**SQL solutions** (`solution.sql`) contain only the query, no DDL or scaffolding.

## Data model

All structured state lives in `.claude/practice.db` (SQLite). The five root-level Markdown files — `progress.md`, `timings.md`, `retry.md`, `patterns-coverage.md`, `history.md` — are **generated views**, regenerated from the DB by the plugin's commands. Do not edit them by hand; the next command invocation will overwrite your changes.

Tables:

- `problems(number PK, title, difficulty, kind, folder, created_at)`
- `attempts(id PK, problem_number FK, started_at, duration_minutes, revisit)` — one row per solve session; `duration_minutes IS NULL` while in progress
- `patterns(problem_number FK, pattern, created_at)` — classification snapshot; replaced wholesale on each `/leetcode-workflow:done`
- `thresholds(difficulty PK, minutes)` — mirror of `config.json`, consumed by the view below
- `settings(key PK, value)` — singleton key-value bag (`review_cooldown_days`, `schema_version`, `plugin_version_seen`)
- `retry_flags` VIEW — algorithmic problems with a non-NULL `reason` computed from latest attempt + thresholds + cooldown

The `.db` is gitignored; the git-tracked form is [`.claude/practice.sql`](.claude/practice.sql), a `.dump` refreshed after every mutation. Rebuild the DB with `sqlite3 .claude/practice.db < .claude/practice.sql`.

## Plugin commands

| Command | Effect |
|---------|--------|
| `/leetcode-workflow:new <url>` | Fetches problem from LeetCode GraphQL, creates folder + `README.md` + empty solution file, opens a new in-progress `attempts` row, regenerates views, dumps SQL. On an existing problem with non-empty solution, runs in **reiteration mode**: truncates the solution file and opens a new attempt (history preserved). |
| `/leetcode-workflow:done` | Detects the modified solution file, closes the latest open `attempts` row (computes `duration_minutes` and sets `revisit` from the classifier), replaces `patterns` rows, regenerates views, dumps SQL, then `git add . && git commit -m "{number}. {difficulty\|SQL}. {title}"`. If only `config.json` is modified, re-syncs thresholds and commits with message `tune retry thresholds`. |
| `/leetcode-workflow:retry [N]` | Picks a random `stale = 1` algorithmic problem (or explicit `N`), strips the body to a signature-only template (via `claude` CLI; full wipe fallback), opens a new `attempts` row, regenerates views, dumps SQL. Does **not** commit. |
| `/leetcode-workflow:pick` | "What should I solve next?". Either picks a fresh problem targeting an under-covered pattern, or routes to a retry based on `pick_retry_ratio`. |
| `/leetcode-workflow:abort` | Drops the latest in-progress `attempts` row. Sole-attempt → rolls the problem back entirely (folder removed). Otherwise → restores the solution file from `HEAD`. Re-renders views, dumps SQL. Does **not** commit. Destructive on uncommitted edits. |
| `/leetcode-workflow:update` | Applies pending DB migrations after a plugin update. |
| `/leetcode-workflow:init` | Bootstraps a fresh practice repo in an empty directory. |

There is **no git pre-commit hook** — `/leetcode-workflow:done` is the only path that triggers timing/classification/render. Plain `git commit` bypasses everything.

## Project documentation

| File | Purpose |
|------|---------|
| [`README.md`](README.md) | Workflow overview and usage |
| [`config.json`](config.json) | Language, retry thresholds, cooldown, pick retry ratio, classifier pattern enum |
| [`progress.md`](progress.md) | View: problem index with per-difficulty counters |
| [`history.md`](history.md) | View: chronological log of problems, grouped by month |
| [`timings.md`](timings.md) | View: completed attempt durations (SQL excluded) |
| [`retry.md`](retry.md) | View: `retry_flags` output |
| [`patterns-coverage.md`](patterns-coverage.md) | View: problems grouped by classifier pattern |
| [`.claude/practice.sql`](.claude/practice.sql) | Git-tracked DB dump; rebuild `.claude/practice.db` from this |
