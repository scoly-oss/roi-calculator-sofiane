import { useState, useEffect, useCallback } from 'react';
import type { FormEvent } from 'react';
import {
  Box, Typography, Container, Paper, TextField, Button,
  Chip, CircularProgress, Select, MenuItem, FormControl,
  InputLabel, Divider,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { C } from './lib/constants';
import { checkAdminPassword, fetchLeads, updateLeadStatus } from './lib/supabase';
import type { Lead, LeadStatus } from './lib/supabase';

const STATUS_OPTIONS: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'nouveau', label: 'Nouveau', color: '#6b7280' },
  { value: 'contacte', label: 'Contacté', color: '#3b82f6' },
  { value: 'qualifie', label: 'Qualifié', color: C.orange },
  { value: 'en_cours', label: 'En cours', color: '#8b5cf6' },
  { value: 'gagne', label: 'Gagné', color: '#16a34a' },
  { value: 'perdu', label: 'Perdu', color: '#dc2626' },
];

function scoreColor(label: string) {
  if (label === 'Prioritaire') return '#16a34a';
  if (label === 'Qualifié') return C.orange;
  if (label === 'À nurturer') return '#3b82f6';
  return C.textLight;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function formatEur(n?: number) {
  if (!n) return '—';
  return n.toLocaleString('fr-FR') + ' €';
}

function LeadCard({ lead, onStatusChange }: { lead: Lead; onStatusChange: (id: string, s: LeadStatus) => void }) {
  const st = STATUS_OPTIONS.find(o => o.value === lead.status) ?? STATUS_OPTIONS[0];

  return (
    <Paper elevation={0} sx={{
      p: 3, borderRadius: 3,
      border: `1px solid ${C.border}`,
      bgcolor: '#fff',
      '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.07)' },
      transition: 'box-shadow 0.2s',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
        <Box>
          <Typography sx={{ fontWeight: 800, color: C.navy, fontSize: 16 }}>
            {lead.nom}
          </Typography>
          <Typography sx={{ fontSize: 13, color: C.textLight }}>{lead.email}</Typography>
          {lead.telephone && (
            <Typography sx={{ fontSize: 13, color: C.textLight }}>{lead.telephone}</Typography>
          )}
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Box sx={{
            display: 'inline-flex', alignItems: 'center', gap: 0.75,
            px: 1.5, py: 0.5, borderRadius: 2,
            bgcolor: scoreColor(lead.score_label) + '18',
          }}>
            <Box sx={{
              width: 22, height: 22, borderRadius: '50%',
              bgcolor: scoreColor(lead.score_label),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 10 }}>
                {lead.score}
              </Typography>
            </Box>
            <Typography sx={{
              fontSize: 12, fontWeight: 700,
              color: scoreColor(lead.score_label),
            }}>
              {lead.score_label}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 11, color: C.textLight, mt: 0.5 }}>
            {formatDate(lead.created_at)}
          </Typography>
        </Box>
      </Box>

      {(lead.entreprise || lead.effectif) && (
        <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
          {lead.entreprise && (
            <Chip label={lead.entreprise} size="small" sx={{ fontSize: 12, bgcolor: C.lightOrange, color: C.navy }} />
          )}
          {lead.effectif && (
            <Chip label={lead.effectif} size="small" sx={{ fontSize: 12 }} />
          )}
        </Box>
      )}

      {lead.scenario_title && (
        <Box sx={{
          p: 1.5, mb: 1.5, borderRadius: 2,
          bgcolor: C.lightOrange,
          borderLeft: `3px solid ${C.orange}`,
        }}>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: C.orange, letterSpacing: 1 }}>
            SCÉNARIO
          </Typography>
          <Typography sx={{ fontSize: 13, color: C.navy, fontWeight: 600 }}>
            {lead.scenario_title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
            <Typography sx={{ fontSize: 12, color: C.textLight }}>
              Risque : {formatEur(lead.risque_max)}
            </Typography>
            <Typography sx={{ fontSize: 12, color: C.textLight }}>
              Mission : {formatEur(lead.honoraires)}
            </Typography>
            {lead.ratio && (
              <Typography sx={{ fontSize: 12, color: C.orange, fontWeight: 700 }}>
                x{lead.ratio}
              </Typography>
            )}
          </Box>
        </Box>
      )}

      {lead.message && (
        <Typography sx={{
          fontSize: 13, color: C.textLight, mb: 1.5,
          fontStyle: 'italic', lineHeight: 1.6,
        }}>
          "{lead.message}"
        </Typography>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel sx={{ fontSize: 13 }}>Statut</InputLabel>
          <Select
            value={lead.status}
            label="Statut"
            onChange={e => onStatusChange(lead.id, e.target.value as LeadStatus)}
            sx={{
              fontSize: 13, borderRadius: 2,
              '& .MuiSelect-select': { color: st.color, fontWeight: 700 },
            }}
          >
            {STATUS_OPTIONS.map(o => (
              <MenuItem key={o.value} value={o.value} sx={{ color: o.color, fontWeight: 600, fontSize: 13 }}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box component="a" href={`mailto:${lead.email}`} sx={{
          fontSize: 13, color: C.orange, textDecoration: 'none', fontWeight: 600,
          '&:hover': { textDecoration: 'underline' },
        }}>
          Envoyer un email →
        </Box>
      </Box>
    </Paper>
  );
}

export default function SalesDashboard({ onBack }: { onBack: () => void }) {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchLeads();
    setLeads(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (checkAdminPassword(pwd)) {
      setAuthed(true);
    } else {
      setPwdError(true);
    }
  }

  async function handleStatusChange(id: string, status: LeadStatus) {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    await updateLeadStatus(id, status);
  }

  const filtered = filterStatus === 'all'
    ? leads
    : leads.filter(l => l.status === filterStatus);

  const stats = {
    total: leads.length,
    nouveau: leads.filter(l => l.status === 'nouveau').length,
    gagne: leads.filter(l => l.status === 'gagne').length,
    prioritaire: leads.filter(l => l.score_label === 'Prioritaire').length,
  };

  if (!authed) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={0} sx={{ p: 5, borderRadius: 4, border: `1px solid ${C.border}`, maxWidth: 400, width: '100%', mx: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <LockIcon sx={{ fontSize: 40, color: C.orange, mb: 1 }} />
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: C.navy }}>
              Sales Dashboard
            </Typography>
            <Typography sx={{ fontSize: 14, color: C.textLight, mt: 0.5 }}>
              DAIRIA — Pipeline commercial
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              label="Mot de passe"
              type="password"
              value={pwd}
              onChange={e => { setPwd(e.target.value); setPwdError(false); }}
              fullWidth
              error={pwdError}
              helperText={pwdError ? 'Mot de passe incorrect' : ''}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <Button
              type="submit"
              fullWidth
              sx={{
                background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
                color: '#fff', fontWeight: 700, borderRadius: 3,
                textTransform: 'none', py: 1.5, fontSize: 15,
              }}
            >
              Accéder au dashboard
            </Button>
          </Box>

          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            sx={{ mt: 2, color: C.textLight, textTransform: 'none', width: '100%' }}
          >
            Retour au calculateur
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: C.cream }}>
      {/* Header */}
      <Box sx={{
        background: `linear-gradient(135deg, ${C.navy} 0%, #2a3f52 100%)`,
        color: '#fff', py: 4,
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: C.orange, letterSpacing: 2, mb: 0.5 }}>
                DAIRIA — SALES DASHBOARD
              </Typography>
              <Typography sx={{ fontSize: 26, fontWeight: 900 }}>
                Pipeline commercial
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                startIcon={<RefreshIcon />}
                onClick={load}
                disabled={loading}
                sx={{ color: 'rgba(255,255,255,0.7)', textTransform: 'none', borderRadius: 2 }}
              >
                Actualiser
              </Button>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={onBack}
                sx={{ color: 'rgba(255,255,255,0.7)', textTransform: 'none', borderRadius: 2 }}
              >
                Calculateur
              </Button>
            </Box>
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'flex', gap: 4, mt: 3, flexWrap: 'wrap' }}>
            {[
              { label: 'Total leads', value: stats.total },
              { label: 'Nouveaux', value: stats.nouveau },
              { label: 'Prioritaires', value: stats.prioritaire },
              { label: 'Gagnés', value: stats.gagne },
            ].map(s => (
              <Box key={s.label}>
                <Typography sx={{ fontSize: 28, fontWeight: 900, color: C.orange, lineHeight: 1 }}>
                  {s.value}
                </Typography>
                <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
          {[{ value: 'all', label: 'Tous' }, ...STATUS_OPTIONS].map(o => (
            <Chip
              key={o.value}
              label={o.value === 'all' ? `Tous (${leads.length})` : `${o.label} (${leads.filter(l => l.status === o.value).length})`}
              onClick={() => setFilterStatus(o.value)}
              sx={{
                fontWeight: 600, fontSize: 13,
                bgcolor: filterStatus === o.value ? C.navy : '#fff',
                color: filterStatus === o.value ? '#fff' : C.text,
                border: `1px solid ${filterStatus === o.value ? C.navy : C.border}`,
                '&:hover': { bgcolor: filterStatus === o.value ? '#2a3f52' : C.lightOrange },
                cursor: 'pointer',
              }}
            />
          ))}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {loading && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <CircularProgress sx={{ color: C.orange }} />
          </Box>
        )}

        {!loading && filtered.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ color: C.textLight, fontSize: 16 }}>
              Aucun lead pour ce statut.
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filtered.map(lead => (
            <LeadCard key={lead.id} lead={lead} onStatusChange={handleStatusChange} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
