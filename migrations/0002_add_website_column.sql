-- Add user_website column to bookings table
-- Run this with: npx wrangler d1 execute knapgemaakt-bookings --remote --file=./migrations/0002_add_website_column.sql

ALTER TABLE bookings ADD COLUMN user_website TEXT;
