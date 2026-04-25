---
name: leetcode-retry
description: >
  Pick a random algorithmic problem from the retry list (respecting the
  review cooldown) and prepare it for reiteration — truncates its solution
  file, opens a new attempt, and regenerates the views. Invoke with
  /leetcode-retry, /lc-retry, or /leet-retry.
allowed-tools: Bash
---

# leetcode-retry

Pulls a problem from `retry.md` and readies it for a fresh solve — same teardown as reiteration mode in `/leetcode-new`. The previous solution body is replaced with a signature-only template (function/class declarations preserved) so you can re-solve without re-looking-up the LC judge signature.

Two modes, controlled by `$ARGUMENTS`:

- **no argument** — random pick from problems where `stale = 1` (cooldown elapsed). Cooldown lives in `config.json: review_cooldown_days`.
- **`<number>`** — explicit pick of a specific algorithmic problem. Cooldown is **not** enforced; if you name it, you get it. Useful when a particular problem is on your mind.

**Critical constraint: never write solution code, never hint at an algorithm, approach, or complexity.**

---

## Step 1 — Run the picker

```bash
.claude/skills/leetcode-retry/scripts/retry.py $ARGUMENTS
```

Interpret the exit code:

- **0** — a problem was picked and prepared. stdout prints:
  - `retry: cleared src/<section>/<folder>/solution.<ext>`
  - `       {number}. {title} ({difficulty})[ — flags]`
- **1** — failure. stderr explains. Possible causes:
  - random mode: retry list is empty, or every flagged problem is within cooldown
  - explicit mode: argument isn't a number, problem not in DB, or problem is SQL (only algorithmic problems are retryable)
- any non-zero other — DB or filesystem error; surface stderr and stop.

---

## Step 2 — Report

Print one short line and nothing else:

- On success, echo the prepared problem (e.g. `Ready to retry 19. Remove Nth Node From End of List (Medium).`).
- On empty list, echo the script's message verbatim.

Do not summarise the problem, do not suggest approaches, do not mention complexity.
