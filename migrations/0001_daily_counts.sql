-- v1.F — download + print counts. One row per day × page × collection ×
-- action × source; no personal data. Apply with:
--   wrangler d1 execute lamill-store-events --remote --file migrations/0001_daily_counts.sql
CREATE TABLE IF NOT EXISTS daily_counts (
  day        TEXT    NOT NULL,             -- YYYY-MM-DD (UTC)
  page       TEXT    NOT NULL,             -- e.g. /kids/dog-coloring-pages/sleepy-puppy/
  collection TEXT    NOT NULL,             -- e.g. dog-coloring-pages
  action     TEXT    NOT NULL,             -- print | pdf | print-all | share
  source     TEXT    NOT NULL DEFAULT '',  -- '' | share | pdf | direct
  count      INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, page, collection, action, source)
);
