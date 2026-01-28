-- Unified submissions table for all form types (contact, offerte, aanvraag)
-- Run locally:  npx wrangler d1 execute knapgemaakt-bookings --local --file=./migrations/0005_create_submissions_table.sql
-- Run production: npx wrangler d1 execute knapgemaakt-bookings --remote --file=./migrations/0005_create_submissions_table.sql

CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  specification TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  industry TEXT,
  has_website TEXT,
  website_url TEXT,
  booking_id TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_submissions_type ON submissions(type);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at);
