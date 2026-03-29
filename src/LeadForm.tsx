import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Dialog, DialogContent, DialogTitle, Box, Typography,
  TextField, MenuItem, Button, IconButton, CircularProgress,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { C } from './lib/constants';
import { EFFECTIF_LABELS, computeScore } from './lib/scoring';
import { insertLead } from './lib/supabase';
import type { Scenario } from './lib/scenarios';

interface Props {
  open: boolean;
  onClose: () => void;
  scenario?: Scenario | null;
}

export default function LeadForm({ open, onClose, scenario }: Props) {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [effectif, setEffectif] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const { score, label } = computeScore(scenario ?? null, effectif);

  const scoreColor = label === 'Prioritaire'
    ? '#16a34a'
    : label === 'Qualifié'
    ? C.orange
    : C.textLight;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nom.trim() || !email.trim()) return;
    setLoading(true);
    setError('');

    const result = await insertLead({
      nom: nom.trim(),
      email: email.trim(),
      telephone: telephone.trim() || undefined,
      entreprise: entreprise.trim() || undefined,
      effectif: effectif || undefined,
      scenario_id: scenario?.id,
      scenario_title: scenario?.title,
      scenario_category: scenario?.category,
      risque_max: scenario?.risqueSansAvocat.montantMax,
      honoraires: scenario?.missionDairia.honoraires,
      ratio: scenario?.valeurCreee.ratio,
      score,
      score_label: label,
      message: message.trim() || undefined,
      status: 'nouveau',
    });

    setLoading(false);
    if (result.ok) {
      setDone(true);
    } else {
      setError('Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
    }
  }

  function handleClose() {
    setNom(''); setEmail(''); setTelephone('');
    setEntreprise(''); setEffectif(''); setMessage('');
    setDone(false); setError('');
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4, bgcolor: '#fff' },
      }}
    >
      <DialogTitle sx={{ pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{
              fontSize: 11, fontWeight: 700, color: C.orange,
              letterSpacing: 2, textTransform: 'uppercase',
            }}>
              DAIRIA AVOCATS
            </Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 800, color: C.navy, mt: 0.5 }}>
              Évaluation personnalisée
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {done ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircleIcon sx={{ fontSize: 56, color: C.green, mb: 2 }} />
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: C.navy, mb: 1 }}>
              Demande envoyée !
            </Typography>
            <Typography sx={{ color: C.textLight, fontSize: 15, lineHeight: 1.8, mb: 3 }}>
              Nous avons bien reçu votre demande et reviendrons vers vous
              sous 24h pour discuter de votre situation.
            </Typography>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
                color: '#fff', fontWeight: 700, borderRadius: 3,
                textTransform: 'none', px: 4,
              }}
            >
              Fermer
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            {scenario && (
              <Box sx={{
                p: 2, mb: 3, borderRadius: 3,
                bgcolor: C.lightOrange,
                borderLeft: `3px solid ${C.orange}`,
              }}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: C.orange, letterSpacing: 1 }}>
                  SCÉNARIO SELECTIONNÉ
                </Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: C.navy, mt: 0.5 }}>
                  {scenario.title}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
              <TextField
                label="Prénom & Nom *"
                value={nom}
                onChange={e => setNom(e.target.value)}
                required
                fullWidth
                size="small"
                sx={fieldSx}
              />
              <TextField
                label="Email professionnel *"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                fullWidth
                size="small"
                sx={fieldSx}
              />
              <TextField
                label="Téléphone"
                value={telephone}
                onChange={e => setTelephone(e.target.value)}
                fullWidth
                size="small"
                sx={fieldSx}
              />
              <TextField
                label="Entreprise"
                value={entreprise}
                onChange={e => setEntreprise(e.target.value)}
                fullWidth
                size="small"
                sx={fieldSx}
              />
            </Box>

            <TextField
              select
              label="Taille de l'entreprise"
              value={effectif}
              onChange={e => setEffectif(e.target.value)}
              fullWidth
              size="small"
              sx={{ ...fieldSx, mb: 2 }}
            >
              <MenuItem value="">Sélectionner</MenuItem>
              {EFFECTIF_LABELS.map(l => (
                <MenuItem key={l} value={l}>{l}</MenuItem>
              ))}
            </TextField>

            <TextField
              label="Décrivez votre situation"
              value={message}
              onChange={e => setMessage(e.target.value)}
              multiline
              rows={3}
              fullWidth
              size="small"
              placeholder="Contexte, problématique, urgence..."
              sx={{ ...fieldSx, mb: 2 }}
            />

            {effectif && (
              <Box sx={{
                p: 2, mb: 2, borderRadius: 3,
                bgcolor: scoreColor + '12',
                border: `1px solid ${scoreColor}30`,
                display: 'flex', alignItems: 'center', gap: 2,
              }}>
                <Box sx={{
                  width: 44, height: 44, borderRadius: '50%',
                  bgcolor: scoreColor, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                }}>
                  <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 15 }}>
                    {score}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, color: scoreColor, fontSize: 14 }}>
                    Score : {label}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: C.textLight }}>
                    Qualification basée sur votre profil
                  </Typography>
                </Box>
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>
            )}

            <Button
              type="submit"
              fullWidth
              disabled={loading || !nom || !email}
              sx={{
                background: loading || !nom || !email
                  ? undefined
                  : `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
                color: '#fff', fontWeight: 700, fontSize: 15,
                py: 1.5, borderRadius: 3, textTransform: 'none',
              }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Envoyer ma demande →'}
            </Button>

            <Typography sx={{ fontSize: 11, color: C.textLight, textAlign: 'center', mt: 1.5 }}>
              Vos données sont traitées conformément au RGPD.
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    '&:hover fieldset': { borderColor: C.orange },
    '&.Mui-focused fieldset': { borderColor: C.orange },
  },
  '& label.Mui-focused': { color: C.orange },
};
