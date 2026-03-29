-- Migration: Create roi_leads table for DAIRIA ROI Calculator
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/noqzwkkdfpbmglewsozo/editor

CREATE TABLE IF NOT EXISTS roi_leads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom         text NOT NULL,
  email       text NOT NULL,
  telephone   text,
  societe     text,
  message     text,
  scenario_id text,
  scenario_titre text,
  source      text NOT NULL DEFAULT 'roi-calculator',
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Index for fast lookup by email
CREATE INDEX IF NOT EXISTS roi_leads_email_idx ON roi_leads (email);
CREATE INDEX IF NOT EXISTS roi_leads_created_at_idx ON roi_leads (created_at DESC);

-- RLS: only anon can INSERT (no read from frontend)
ALTER TABLE roi_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can insert leads" ON roi_leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- Only authenticated users (admin) can read leads
CREATE POLICY "Authenticated can read leads" ON roi_leads
  FOR SELECT TO authenticated
  USING (true);
