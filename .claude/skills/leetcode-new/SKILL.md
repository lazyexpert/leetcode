---
name: leetcode-new
description: >
  Scaffold a new LeetCode problem from a LeetCode URL, or (when a non-empty
  solution already exists at the target path) reset the solution file and
  solve timer for reiteration. Invoke with /leetcode-new, /lc-new, or
  /leet-new. Never writes solution code, never hints at complexity or approach.
allowed-tools: Bash
---

# leetcode-new

Pass a LeetCode problem URL; the skill pipes `fetch.py` through `scaffold.py` to create the problem folder (or reset it for reiteration).

**Critical constraint: never write solution code, never hint at an algorithm, approach, or complexity.**

---

## Step 0 — Guard

If `$ARGUMENTS` is empty or does not contain `leetcode.com/problems/<slug>`, stop and tell the user to pass a valid LeetCode problem URL (e.g. `https://leetcode.com/problems/two-sum/`).

---

## Step 1 — Run the pipeline

```bash
.claude/skills/leetcode-new/scripts/fetch.py "$ARGUMENTS" \
  | .claude/skills/leetcode-new/scripts/scaffold.py
```

Interpret `fetch.py` exit codes:

- **0** — manifest flowed into `scaffold.py`. Inspect scaffold's stdout:
  - `scaffold: created …` → new scaffold
  - `reiteration: cleared …` → existing solution was truncated and the solve timer reset
- **1** — problem not found. Tell the user the URL slug wasn't recognised and stop.
- **2** — premium problem. Tell the user it can't be fetched from the public API and stop.
- **3** — network failure. Surface the stderr and stop.

---

## Step 2 — Report

Print one short line and nothing else:

- `Job's done.` when `scaffold.py` printed `scaffold: created …`
- `Ready to reiterate.` when `scaffold.py` printed `reiteration: cleared …`

Do not summarise the problem. Do not suggest approaches. Do not mention complexity.
