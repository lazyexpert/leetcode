# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Collaboration rules

**Never provide a solution or write code for a problem unless explicitly asked.** The goal is learning, not code generation. All discussion must stay in hint form — e.g. point out the time/space complexity of the current approach, suggest there is a more efficient data structure, note which algorithmic pattern fits, or ask a guiding question. Only write or complete `solution.ts` / `solution.sql` when the user directly requests it.

## Repository purpose

Personal LeetCode practice repo with a Claude Code-powered workflow on top: scaffolding by URL via `/leetcode-new`, closing out each problem via `/leetcode-done` (timing + pattern classification + retry queue + commit), and revisiting via `/leetcode-retry` (random pick from the stale-plus-flagged pool). There is no build system, no package manager, and no test suite — solutions are intended to be pasted into LeetCode's online judge. The algorithmic language is configurable in [`config.json`](config.json) (defaults to TypeScript); `tsconfig.json` exists only to give editors sensible defaults (ES2022, CommonJS, strict) when that's the active language.

See [`README.md`](README.md) for the full workflow and usage. See [`progress.md`](progress.md) for the problem index and counters.

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

The algorithmic language is **configurable per repo**. Change `language.extension` and `language.name` in `config.json` to target Python, Go, Kotlin, etc. Existing solution files aren't renamed on config change — the setting only affects future scaffolds and which file `/leetcode-done` looks for.

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

All structured state lives in `.claude/practice.db` (SQLite). The five root-level Markdown files — `progress.md`, `timings.md`, `retry.md`, `patterns-coverage.md`, `history.md` — are **generated views**, regenerated from the DB by `scaffold.py` and `done.py`. Do not edit them by hand; the next skill invocation will overwrite your changes.

Tables (see [`schema.sql`](.claude/skills/leetcode-done/scripts/schema.sql)):

- `problems(number PK, title, difficulty, kind, folder, created_at)`
- `attempts(id PK, problem_number FK, started_at, duration_minutes, revisit)` — one row per solve session; `duration_minutes IS NULL` while in progress
- `patterns(problem_number FK, pattern, created_at)` — classification snapshot; replaced wholesale on each `/leetcode-done`
- `thresholds(difficulty PK, minutes)` — mirror of `config.json`, consumed by the view below
- `retry_flags` VIEW — algorithmic problems with a non-NULL `reason` computed from latest attempt + thresholds

The `.db` is gitignored; the git-tracked form is [`.claude/practice.sql`](.claude/practice.sql), a `.dump` refreshed after every mutation. Rebuild the DB with `sqlite3 .claude/practice.db < .claude/practice.sql`.

## Adding a new problem

```
/leetcode-new https://leetcode.com/problems/<slug>/
```

The [`leetcode-new` skill](.claude/skills/leetcode-new/SKILL.md) pipes `scripts/fetch.py` (URL → manifest) through `scripts/scaffold.py`. Together they: create the folder + `README.md` + empty `solution.{ts,sql}`, insert a `problems` row, open a new in-progress `attempts` row, regenerate all five views, and write a fresh `.claude/practice.sql` dump.

If the target problem folder already has a non-empty solution file, the skill runs in **reiteration mode**: it truncates the solution file and opens a **new** `attempts` row (prior attempts are preserved — reiteration never loses history). Metadata and other tables are unchanged.

Premium problems cannot be fetched from the public GraphQL endpoint; the skill reports this and exits. There is no paste fallback.

## Retrying a problem

```
/leetcode-retry
```

`scripts/retry.py` queries `retry_flags`, filters to entries where `stale = 1` (cooldown elapsed), picks one at random, and runs the same teardown as scaffold.py's reiteration path: replaces the solution body with a signature-only template (via Claude — keeps every function/class/method declaration, empties the bodies) and opens a new `attempts` row. Then re-renders views and dumps SQL. The user re-solves into the template, then `/leetcode-done` commits.

The shared teardown lives in `db.prepare_retry(conn, number)` so `/leetcode-new` (reiteration) and `/leetcode-retry` use the same code path. SQL solutions get a full wipe instead — they're queries, no signature to preserve. If the `claude` CLI is unavailable, both flows fall back to a full wipe.

## Finishing a problem

Once `solution.ts` (or `solution.sql`) has your solution, run:

```
/leetcode-done
```

`scripts/done.py` finds the one non-empty solution file under `src/` that differs from `HEAD`, closes the latest open `attempts` row (computing `duration_minutes` and setting `revisit` from the Claude classifier), replaces the problem's `patterns` rows, upserts thresholds, regenerates views, dumps SQL, then `git add . && git commit -m "{number}. {difficulty|SQL}. {title}"`. Push is left to you.

There is **no git pre-commit hook** — `/leetcode-done` is the only path that triggers timing/classification/render. Plain `git commit` bypasses everything.

If only `config.json` is modified (no solution), `/leetcode-done` re-syncs thresholds and commits with message `tune retry thresholds`. The retry queue reconciles automatically because `retry_flags` is a view — no explicit reconciliation step exists.

## Automation entry points

| Trigger | What runs | What it updates |
|---------|-----------|-----------------|
| `/leetcode-new <url>` | `fetch.py` ▸ `scaffold.py` | Folder + `README.md` + empty solution file + new `problems` row + new in-progress `attempts` row + all five views + `.claude/practice.sql` dump |
| `/leetcode-new` on an existing problem with content | `scaffold.py` reiteration path | Truncates solution file + opens a new `attempts` row (history preserved) + renders views + dumps SQL |
| `/leetcode-done` with a modified solution file | `done.py` | Closes the attempt (sets `duration_minutes` + `revisit`), replaces `patterns` rows, renders views, dumps SQL, `git add .` + `git commit` |
| `/leetcode-done` with modified `config.json` | `done.py` | Upserts thresholds + cooldown; view recomputes on next render. Commits with message `tune retry thresholds` if no solution is also modified |
| `/leetcode-retry` | `retry.py` | Picks a random `stale = 1` algorithmic problem, truncates its solution file, opens a new `attempts` row, renders views, dumps SQL. Does **not** commit. |

## Project documentation

| File | Purpose |
|------|---------|
| [`README.md`](README.md) | Workflow overview, usage, components, setup |
| [`config.json`](config.json) | Retry thresholds per difficulty (source; mirrored into `thresholds` table) |
| [`progress.md`](progress.md) | View: problem index with per-difficulty counters |
| [`history.md`](history.md) | View: chronological log of problems, grouped by month |
| [`timings.md`](timings.md) | View: completed attempt durations (SQL excluded) |
| [`retry.md`](retry.md) | View: `retry_flags` output |
| [`patterns-coverage.md`](patterns-coverage.md) | View: problems grouped by classifier pattern |
| [`.claude/practice.sql`](.claude/practice.sql) | Git-tracked DB dump; rebuild `.claude/practice.db` from this |
| [`.claude/skills/leetcode-new/SKILL.md`](.claude/skills/leetcode-new/SKILL.md) | Skill definition powering `/leetcode-new`, `/lc-new`, `/leet-new` |
| [`.claude/skills/leetcode-new/scripts/fetch.py`](.claude/skills/leetcode-new/scripts/fetch.py) | Fetches problem from LeetCode GraphQL → JSON manifest with Markdown statement |
| [`.claude/skills/leetcode-new/scripts/scaffold.py`](.claude/skills/leetcode-new/scripts/scaffold.py) | Creates folder/files, inserts DB rows, renders views, dumps SQL |
| [`.claude/skills/leetcode-done/SKILL.md`](.claude/skills/leetcode-done/SKILL.md) | Skill definition powering `/leetcode-done`, `/lc-done`, `/leet-done` |
| [`.claude/skills/leetcode-done/scripts/done.py`](.claude/skills/leetcode-done/scripts/done.py) | Closes attempt, classifies patterns, renders views, dumps SQL, commits |
| [`.claude/skills/leetcode-done/scripts/schema.sql`](.claude/skills/leetcode-done/scripts/schema.sql) | DB schema — tables + `retry_flags` view |
| [`.claude/skills/leetcode-done/scripts/db.py`](.claude/skills/leetcode-done/scripts/db.py) | Shared DB helpers used by both skills |
| [`.claude/skills/leetcode-done/scripts/render.py`](.claude/skills/leetcode-done/scripts/render.py) | Renders all five Markdown views from the DB |
| [`.claude/skills/leetcode-done/scripts/migrate.py`](.claude/skills/leetcode-done/scripts/migrate.py) | One-shot migrator — bootstraps the DB from pre-existing MD state |
| [`.claude/skills/leetcode-retry/SKILL.md`](.claude/skills/leetcode-retry/SKILL.md) | Skill definition powering `/leetcode-retry`, `/lc-retry`, `/leet-retry` |
| [`.claude/skills/leetcode-retry/scripts/retry.py`](.claude/skills/leetcode-retry/scripts/retry.py) | Picks a random retry candidate and preps it (shares `db.prepare_retry` with scaffold.py) |
