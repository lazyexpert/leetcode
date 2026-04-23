# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Collaboration rules

**Never provide a solution or write code for a problem unless explicitly asked.** The goal is learning, not code generation. All discussion must stay in hint form — e.g. point out the time/space complexity of the current approach, suggest there is a more efficient data structure, note which algorithmic pattern fits, or ask a guiding question. Only write or complete `solution.ts` when the user directly requests it.

## Repository purpose

Personal collection of LeetCode solutions. There is no build system, no package manager (no `package.json`, no `go.mod`), and no test suite — solutions are intended to be pasted into LeetCode's online judge. `tsconfig.json` exists only to give editors sensible TypeScript defaults (ES2022, CommonJS, strict).

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
- `solution.ts` — TypeScript solution matching the LeetCode judge signature exactly

SQL problems live at `src/SQL/<number>.<Title_With_Underscores>/` and contain:
- `README.md` — problem statement
- `solution.sql` — SQL solution

**TypeScript** is the only language for algorithmic problems. Go/Ruby/JS files in the repo are one-off experiments — ignore them.

## Solution file conventions

**TypeScript solutions** match the LeetCode judge signature exactly — just the function, no `main`, no imports, no I/O. Example (`src/Medium/713.Subarray_Product_Less_Than_K/solution.ts`):

```ts
function numSubarrayProductLessThanK(nums: number[], k: number): number {
  // ...
}
```

Do **not** add `console.log`, test harnesses, or module exports — TS files are pasted verbatim into LeetCode.

**SQL solutions** (`solution.sql`) contain only the query, no DDL or scaffolding.

## Adding a new problem

**Algorithmic problem:**
1. Create `src/{Easy|Medium|Hard}/<number>.<Title_With_Underscores>/`.
2. Add `README.md` with the LeetCode prompt, constraints, and at least one example.
3. Add `solution.ts` with the judge-ready function signature.
4. Update **three** index files:
   - `README.md` — add `- [<number>. <Title>](src/{Easy|Medium|Hard}/<number>.<Title_With_Underscores>)` under the correct difficulty section in numerical order; increment that section's counter and Total in the summary table.
   - `history.md` — append `[<number>](src/{Easy|Medium|Hard}/<number>.<Title_With_Underscores>)` to the current month's algorithm line (create a new `## Month YYYY` section if the month changed).

**SQL problem:**
1. Create `src/SQL/<number>.<Title_With_Underscores>/`.
2. Add `README.md` with the problem statement.
3. Add `solution.sql` with the query only.
4. Update **three** index files:
   - `README.md` — add `- [<number>. <Title>](src/SQL/<number>.<Title_With_Underscores>)` under `## SQL` in numerical order; increment the SQL counter and Total in the summary table.
   - `history.md` — append `[<number>](src/SQL/<number>.<Title_With_Underscores>)` to the current month's `SQL:` line (create it if it doesn't exist yet for that month).
