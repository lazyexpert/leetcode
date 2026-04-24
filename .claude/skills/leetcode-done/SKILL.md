---
name: leetcode-done
description: >
  Complete the in-progress LeetCode problem — finalise its timing entry,
  classify its pattern(s), update the retry queue, regenerate timings.md,
  and commit everything with a conventional message. Push is left to the
  user. Invoke with /leetcode-done, /lc-done, or /leet-done.
allowed-tools: Bash
---

# leetcode-done

Runs the "done" lifecycle for whichever problem currently has a modified or untracked non-empty solution file under `src/`. Delegates all logic to `scripts/done.py`.

---

## Step 1 — Run the script

```bash
.claude/skills/leetcode-done/scripts/done.py
```

Interpret the exit code:

- **0** — all updates completed, commit landed. Final stdout line is `  ✓ committed: {number}. {difficulty|SQL}. {title}`.
- **1** — no problem detected (no non-empty solution file has changes), or multiple candidates, or git error. stderr explains. Relay the message and stop.

---

## Step 2 — Report

Print one short line and nothing else:

- On success, echo the committed subject line (e.g. `Committed 3. Medium. Longest Substring Without Repeating Characters.`).
- On failure, echo the script's error message verbatim.

Do not summarise the solution. Do not suggest approaches. Do not mention complexity.
