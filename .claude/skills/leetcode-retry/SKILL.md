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

Pulls a random entry from `retry.md` whose cooldown (see `config.json: review_cooldown_days`) has elapsed, then readies that problem for a fresh solve — same teardown as reiteration mode in `/leetcode-new`. The previous solution body is replaced with a signature-only template (function/class declarations preserved) so you can re-solve without re-looking-up the LC judge signature.

**Critical constraint: never write solution code, never hint at an algorithm, approach, or complexity.**

---

## Step 1 — Run the picker

```bash
.claude/skills/leetcode-retry/scripts/retry.py
```

Interpret the exit code:

- **0** — a problem was picked and prepared. stdout prints:
  - `retry: cleared src/<section>/<folder>/solution.<ext>`
  - `       {number}. {title} ({difficulty})`
- **1** — no eligible candidates (retry list is empty, or every flagged problem is still within cooldown). stdout explains.
- any non-zero other — DB or filesystem error; surface stderr and stop.

---

## Step 2 — Report

Print one short line and nothing else:

- On success, echo the prepared problem (e.g. `Ready to retry 19. Remove Nth Node From End of List (Medium).`).
- On empty list, echo the script's message verbatim.

Do not summarise the problem, do not suggest approaches, do not mention complexity.
