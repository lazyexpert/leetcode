---
name: leetcode-abort
description: >
  Abort the latest in-progress LeetCode attempt — drops the attempt row
  and restores the solution file to its last committed state. If the
  attempt was the only one on the problem (i.e. you just scaffolded it),
  also drops the problem from the DB and removes its folder. Invoke with
  /leetcode-abort, /lc-abort, or /leet-abort.
allowed-tools: Bash
---

# leetcode-abort

Use when you've started a `/leetcode-new` or `/leetcode-retry` that you no longer want recorded — wrong problem scaffolded, you need to step away from a retry without the failed timing entering the stats, etc.

The skill never commits. Your working tree state is up to you afterward.

⚠ **Destructive on uncommitted edits.** When the problem has prior committed attempts, abort runs `git checkout HEAD -- <solution-file>`, which overwrites whatever's currently in the file. If you have changes worth keeping, `git stash` first.

---

## Step 1 — Run the script

```bash
.claude/skills/leetcode-abort/scripts/abort.py
```

Interpret the exit code:

- **0** — attempt aborted. stdout prints one line: `abort: {N}. {Title} ({Difficulty}) — {action}` where `{action}` is either `restored <path>` (had prior attempts) or `problem and folder removed` (sole attempt).
- **1** — nothing to abort. No in-progress attempt in the DB. stderr explains.
- any non-zero other — DB / filesystem / git error. Surface stderr and stop.

---

## Step 2 — Report

One short line:

- On success, echo the script's output verbatim.
- On empty, echo the script's message verbatim.

Do not summarise, suggest, or comment.
