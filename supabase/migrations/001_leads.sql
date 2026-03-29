-- Table leads : pipeline Sales DAIRIA
CREATE TABLE IF NOT EXISTS leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  nom text NOT NULL,
  email text NOT NULL,
  telephone text,
  entreprise text,
  effectif text,
  scenario_id text,
  scenario_title text,
  scenario_category text,
  risque_max numeric,
  honoraires numeric,
  ratio numeric,
  score integer NOT NULL DEFAULT 0,
  score_label text NOT NULL DEFAULT 'Froid',
  message text,
  status text NOT NULL DEFAULT 'nouveau'
);

-- RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (formulaire prospect)
CREATE POLICY "leads_insert_anon" ON leads
  FOR INSERT WITH CHECK (true);

-- SELECT public (dashboard protege par mot de passe UI)
CREATE POLICY "leads_select_anon" ON leads
  FOR SELECT USING (true);

-- UPDATE public (changement de statut depuis le dashboard)
CREATE POLICY "leads_update_anon" ON leads
  FOR UPDATE USING (true);
