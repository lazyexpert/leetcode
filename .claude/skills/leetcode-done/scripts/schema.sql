-- LeetCode practice database.
--
-- Source of truth for every data file at the repo root. The five Markdown
-- files (progress.md, timings.md, retry.md, patterns-coverage.md, history.md)
-- are pure views — regenerated from this database by scaffold.py / done.py /
-- retry.py on every mutation.
--
-- Design notes
-- ------------
-- * `attempts` stores one row per solve session. Reiteration adds a new row;
--   the old one is preserved so per-problem timing history is queryable.
-- * `completed_at` is not stored — derived from `started_at + duration_minutes`.
--   An in-progress attempt has `duration_minutes IS NULL`.
-- * `revisit` lives on `attempts` because it is a by-product of the same
--   Claude classification call that produces `patterns` rows, and it is
--   meaningful only in the context of a specific attempt.
-- * `retry_flags` is a VIEW, always derived from the latest attempt per
--   problem + thresholds + cooldown. There is no reconciliation step — tweak
--   `config.json` and the view reflects the new reality on the next read.
-- * `settings` is a singleton key-value bag for values the view reads at
--   query time (currently just `review_cooldown_days`).

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS problems (
  number      INTEGER PRIMARY KEY,
  title       TEXT NOT NULL,
  difficulty  TEXT,                -- Easy | Medium | Hard, NULL for SQL
  kind        TEXT NOT NULL,       -- 'algorithmic' | 'sql'
  folder      TEXT NOT NULL,       -- e.g. '3.Longest_Substring_Without_Repeating_Characters'
  created_at  INTEGER NOT NULL,    -- unix seconds
  CHECK (kind IN ('algorithmic', 'sql')),
  CHECK (kind = 'sql' OR difficulty IN ('Easy', 'Medium', 'Hard'))
);

CREATE TABLE IF NOT EXISTS attempts (
  id               INTEGER PRIMARY KEY,
  problem_number   INTEGER NOT NULL REFERENCES problems(number) ON DELETE CASCADE,
  started_at       INTEGER NOT NULL,      -- unix seconds
  duration_minutes INTEGER,                -- NULL while in progress
  revisit          INTEGER NOT NULL DEFAULT 0,   -- 0|1 — was a better solution flagged?
  UNIQUE (problem_number, started_at),
  CHECK (revisit IN (0, 1))
);
CREATE INDEX IF NOT EXISTS attempts_by_problem
  ON attempts(problem_number, started_at);

CREATE TABLE IF NOT EXISTS patterns (
  problem_number INTEGER NOT NULL REFERENCES problems(number) ON DELETE CASCADE,
  pattern        TEXT NOT NULL,
  created_at     INTEGER NOT NULL          -- unix seconds; supports history per classification
);
CREATE INDEX IF NOT EXISTS patterns_by_pattern
  ON patterns(pattern, problem_number);

CREATE TABLE IF NOT EXISTS thresholds (
  difficulty TEXT PRIMARY KEY,             -- 'Easy' | 'Medium' | 'Hard'
  minutes    INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- retry_flags: per algorithmic problem, three boolean flags computed from
-- the latest attempt. Renderer joins non-zero flags into a "+"-separated
-- reason string. A row appears in retry.md iff any flag is 1.
--
-- * timing_bad     — latest duration exceeds the difficulty threshold
-- * complexity_bad — latest attempt was marked `revisit` by the classifier
-- * stale          — cooldown has elapsed since latest attempt (spaced repetition)
--
-- `flagged_at` is the latest attempt's `started_at`, so retry.md can show
-- when the problem last became eligible.
CREATE VIEW IF NOT EXISTS retry_flags AS
WITH
cooldown_sec AS (
  SELECT COALESCE(
    (SELECT CAST(value AS INTEGER) FROM settings WHERE key = 'review_cooldown_days'),
    7
  ) * 86400 AS secs
),
latest AS (
  SELECT a.problem_number, a.started_at, a.duration_minutes, a.revisit
  FROM attempts a
  JOIN (
    SELECT problem_number, MAX(started_at) AS latest_started
    FROM attempts
    GROUP BY problem_number
  ) m
    ON m.problem_number = a.problem_number
   AND m.latest_started = a.started_at
)
SELECT
  p.number,
  p.title,
  p.difficulty,
  p.folder,
  latest.started_at AS flagged_at,
  CASE WHEN latest.duration_minutes IS NOT NULL
            AND latest.duration_minutes >= t.minutes
       THEN 1 ELSE 0 END AS timing_bad,
  CASE WHEN latest.revisit = 1
       THEN 1 ELSE 0 END AS complexity_bad,
  CASE WHEN latest.started_at IS NOT NULL
            AND (unixepoch() - latest.started_at) >= (SELECT secs FROM cooldown_sec)
       THEN 1 ELSE 0 END AS stale
FROM problems p
LEFT JOIN thresholds t ON t.difficulty = p.difficulty
LEFT JOIN latest       ON latest.problem_number = p.number
WHERE p.kind = 'algorithmic';
