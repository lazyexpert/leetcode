---
name: leetcode-new
description: >
  Set up scaffolding for a new LeetCode problem from a copy-pasted problem statement.
  Invoke with /leetcode-new, /lc-new, or /leet-new (all resolve to this skill).
  Creates the problem folder, writes README.md (statement only),
  updates the root README.md index and counters, and appends to history.md.
  Never writes solution code, never hints at complexity or approach.
allowed-tools: Read, Write, Edit, Bash
---

# leetcode-new

You are setting up scaffolding for a new LeetCode problem. The raw problem text is in `$ARGUMENTS`.

**Critical constraint: never write solution code, never hint at an algorithm, approach, or complexity.**

---

## Step 0 — Guard

If `$ARGUMENTS` is empty or does not look like a LeetCode problem (no leading problem number), stop and ask the user to paste the full problem statement after the command.

---

## Step 1 — Parse the problem

From `$ARGUMENTS` extract:

- **number** — integer at the start of the first non-empty line (e.g. `175`)
- **title** — text after `<number>. ` on that line (e.g. `Combine Two Tables`)
- **difficulty** — first occurrence of `Easy`, `Medium`, or `Hard` in the text; leave blank for SQL problems
- **type** — `SQL` if the text contains any of: `SQL Schema`, `Write a SQL query`, table column definitions formatted as a schema; otherwise `algorithmic`
- **statement** — the full problem body: description, examples, constraints — stripped of LeetCode UI chrome (acceptance rate, tags, editorial links, hint buttons, etc.)

Derive **folder-name**: take the title, replace every space with `_`, keep original capitalisation → `<number>.<folder-name>` (e.g. `175.Combine_Two_Tables`).

---

## Step 2 — Create folder and write README.md

**Algorithmic** → `src/<difficulty>/<number>.<folder-name>/`
**SQL** → `src/SQL/<number>.<folder-name>/`

Use Bash to `mkdir -p` the directory.

Write `README.md` inside it, following the format of existing problems (see e.g. `src/Medium/713.Subarray_Product_Less_Than_K/README.md`):

```
# <number>. <title>
<problem statement paragraph(s)>

## Constraints
- <constraint>
- ...

## Example
\`\`\`
Input: ...
Output: ...
Explanation: ... (if present)
\`\`\`
```

Add additional `## Example` blocks if the problem has more than one.

---

## Step 3 — Update root README.md

Read the root `README.md`.

**Counter table** (the `| Difficulty | Solved |` table at the top):
- Increment the row matching the problem's difficulty (`Easy` / `Medium` / `Hard`) or `SQL`.
- Increment `**Total**` by 1.

**Problem list**: find the `## <Difficulty>` or `## SQL` section and insert:

```
- [<number>. <title>](src/<difficulty-or-SQL>/<number>.<folder-name>)
```

in ascending numerical order within that section.

Write the updated file.

---

## Step 4 — Update history.md

Read `history.md`.

Determine today's month and year. Find the section `## <Month> <Year>` (e.g. `## April 2026`). If it does not exist, insert it immediately after `# History` as the newest section.

Within the month section:
- **Algorithmic**: the first line (no prefix) is the comma-separated algorithm list. Append `, [<number>](src/<difficulty>/<number>.<folder-name>)`. If the month section is brand new, start the line with `[<number>](...)`.
- **SQL**: the second line starts with `SQL: `. Append `, [<number>](src/SQL/<number>.<folder-name>)` to it. If no `SQL:` line exists yet for this month, add it on the line after the algorithm line.

Write the updated file.

---

## Step 5 — Report

Print a short confirmation:
- Folder created at `src/.../`
- README.md written
- Root README.md updated (section, counter, total)
- history.md updated (month, line)

Nothing else. Do not summarise the problem, do not suggest approaches, do not mention complexity.
