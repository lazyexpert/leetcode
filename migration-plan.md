# Migrating this repo to the leetcode-workflow plugin

This repo is the original project where the workflow was built. The
`leetcode-workflow` Claude Code plugin (at `~/develop/leetcode-workflow`)
was extracted from it. The migration is mostly cosmetic — the schema in
`.claude/practice.db` is byte-identical to the plugin's frozen
`schema-baseline.sql`, so no data conversion is needed.

## What differs

| Area | Original | Plugin expects | Action |
|---|---|---|---|
| `.claude/practice.db` schema | matches baseline | matches baseline | none |
| `settings` table | only `review_cooldown_days` | also needs `schema_version`, `plugin_version_seen` | seed two rows |
| `config.json` | missing `pick_retry_ratio` | optional (loader falls back to 0.0) | add for clarity |
| `.claude/skills/` | in-tree skill scripts | plugin lives in installed marketplace | delete |
| `.gitignore` | ignores `.claude/practice.db` + skills `__pycache__` | ignores `.claude/practice.db` + generic `__pycache__` | optional rewrite |
| `.claude/settings.local.json` | stale `rm timings.json` + old git-status path | n/a | trim or delete |
| `README.md` / `CLAUDE.md` | custom prose | plugin only writes README on init | keep |
| `tsconfig.json` under `src/` | editor config | not plugin-managed | keep |
| 5 generated views (`progress.md`, etc.) | rendered by old skills | re-rendered by plugin | overwritten on first command — diff should be ~empty |
| Solution files (`.ts`/`.go`/`.sql`) | 157 problems | n/a | keep, untouched |

## Steps

### 1. Install the plugin (one-time, machine-wide)

In any Claude Code session:

```
/plugin marketplace add /Users/oleksandrkhatskalev/develop/leetcode-workflow
/plugin install leetcode-workflow@leetcode-workflow
```

(Use the local path while dogfooding; switch to `lazyexpert/leetcode-workflow`
once the GitHub copy is trusted.)

### 2. Safety net

```bash
git checkout -b pre-workflow-migration   # bookmark, can delete later
git checkout master
```

Working tree is already clean — a branch tag is enough.

### 3. Seed the missing `settings` rows

```bash
sqlite3 .claude/practice.db <<'SQL'
INSERT OR IGNORE INTO settings (key, value) VALUES ('schema_version', '0');
INSERT OR IGNORE INTO settings (key, value) VALUES ('plugin_version_seen', '0.1.1');
SQL
```

`schema_version=0` matches the frozen baseline (no migrations exist yet —
`migrations/` is empty in the plugin). `plugin_version_seen=0.1.1` matches
the current `plugin.json`, so the first command won't print a false update
nudge.

### 4. Add `pick_retry_ratio` to `config.json`

Insert `"pick_retry_ratio": 0.0,` right after `review_cooldown_days`.
Strictly optional — `db.load_*` falls back to `DEFAULT_PICK_RETRY_RATIO=0.0`
— but having it explicit makes `/pick` behavior easy to tune later.

### 5. Delete the obsolete in-repo skills

```bash
rm -rf .claude/skills
```

These are the **old** skill scripts. The installed plugin replaces them
entirely.

### 6. Trim `.claude/settings.local.json`

Both entries reference the old workflow (a `timings.json` that no longer
exists, and an absolute git-status path). Either delete the file or empty
`permissions.allow` to `[]`.

### 7. Update `.gitignore` (optional)

Current one works. Plugin's canonical form:

```
# leetcode-workflow
.claude/practice.db

# Editor
.vscode

# Python
__pycache__/

# OS
.DS_Store
```

The skills-specific `__pycache__` rule is dead weight after step 5.

### 8. Regenerate views + SQL dump

Run any plugin command — `/leetcode-workflow:pick` is the most read-only —
and it'll sync `config.json` into `thresholds`/`settings`, regenerate the 5
Markdown views, and rewrite `practice.sql`.

To do it without invoking the model:

```bash
python3 ~/develop/leetcode-workflow/plugins/leetcode-workflow/lib/render_and_dump.py
```

The 5 generated views should diff to ~nothing (same schema → same renderer
output, modulo any cosmetic renderer tweaks since extraction).

### 9. Verify

```bash
sqlite3 .claude/practice.db \
  "SELECT key,value FROM settings; SELECT COUNT(*) FROM problems; SELECT COUNT(*) FROM attempts;"
```

Expect: `schema_version=0`, `plugin_version_seen=0.1.1`,
`review_cooldown_days=7`, `problems=159`, `attempts=166`. Then run
`/leetcode-workflow:pick` end-to-end.

### 10. Commit

One migration commit, e.g. `chore: migrate to leetcode-workflow plugin` —
drops `.claude/skills/`, seeds settings rows in `practice.sql`, optionally
tweaks `.gitignore` and `config.json`.

## Note

This repo has 19 `.go` solutions but `config.json` has `extension: ts`.
That mismatch predates the migration and the plugin won't try to fix it —
`/new` and `/retry` scaffold whatever `language.extension` is set to.
Polyglot practice is a roadmap concern, not a migration blocker.
