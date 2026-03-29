const SUPABASE_URL = 'https://noqzwkkdfpbmglewsozo.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'dairia2026';

export function checkAdminPassword(pwd: string): boolean {
  return pwd === ADMIN_PASSWORD;
}

export type LeadStatus = 'nouveau' | 'contacte' | 'qualifie' | 'en_cours' | 'gagne' | 'perdu';

export interface Lead {
  id: string;
  created_at: string;
  nom: string;
  email: string;
  telephone?: string;
  entreprise?: string;
  effectif?: string;
  scenario_id?: string;
  scenario_title?: string;
  scenario_category?: string;
  risque_max?: number;
  honoraires?: number;
  ratio?: number;
  score: number;
  score_label: string;
  message?: string;
  status: LeadStatus;
}

function headers() {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };
}

export async function insertLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    const err = await res.text();
    return { ok: false, error: err };
  }
  return { ok: true };
}

export async function fetchLeads(): Promise<Lead[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/leads?order=created_at.desc`,
    { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } },
  );
  if (!res.ok) return [];
  return res.json();
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
  await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${id}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify({ status }),
  });
}
