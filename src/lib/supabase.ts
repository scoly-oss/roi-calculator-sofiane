import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export interface Lead {
  nom: string;
  email: string;
  telephone?: string;
  societe?: string;
  message?: string;
  scenario_id?: string;
  scenario_titre?: string;
  source: string;
}

export async function saveLead(lead: Lead): Promise<{ error: string | null }> {
  if (!supabase) {
    console.warn('Supabase not configured — lead not saved');
    return { error: null };
  }

  const { error } = await supabase
    .from('roi_leads')
    .insert([{
      ...lead,
      created_at: new Date().toISOString(),
    }]);

  if (error) {
    console.error('Supabase error:', error.message);
    return { error: error.message };
  }
  return { error: null };
}
