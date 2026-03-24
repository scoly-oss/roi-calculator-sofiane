import { useState } from 'react';
import {
  Dialog, DialogContent, Box, Typography, TextField,
  IconButton, CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { C } from './lib/constants';
import { saveLead } from './lib/supabase';

interface Props {
  open: boolean;
  onClose: () => void;
  scenarioId?: string;
  scenarioTitre?: string;
}

export default function LeadModal({ open, onClose, scenarioId, scenarioTitre }: Props) {
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', societe: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.email.trim()) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Adresse e-mail invalide.');
      return;
    }

    setLoading(true);
    setError(null);

    const { error: saveError } = await saveLead({
      nom: form.nom.trim(),
      email: form.email.trim().toLowerCase(),
      telephone: form.telephone.trim() || undefined,
      societe: form.societe.trim() || undefined,
      message: form.message.trim() || undefined,
      scenario_id: scenarioId,
      scenario_titre: scenarioTitre,
      source: 'roi-calculator',
    });

    setLoading(false);

    if (saveError) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } else {
      setSuccess(true);
    }
  };

  const handleClose = () => {
    setForm({ nom: '', email: '', telephone: '', societe: '', message: '' });
    setSuccess(false);
    setError(null);
    onClose();
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      bgcolor: '#fff',
      '& fieldset': { borderColor: 'rgba(30,45,61,0.15)' },
      '&:hover fieldset': { borderColor: C.navy },
      '&.Mui-focused fieldset': { borderColor: C.orange },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: C.orange },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '14px',
          bgcolor: '#f8f8f6',
          overflow: 'hidden',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box sx={{
          background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
          p: { xs: 3, md: 4 },
          position: 'relative',
        }}>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              position: 'absolute', top: 12, right: 12,
              color: 'rgba(255,255,255,0.5)',
              '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <Typography sx={{
            fontSize: 11, fontWeight: 700, color: C.orange,
            letterSpacing: 2.5, textTransform: 'uppercase', mb: 1,
          }}>
            DAIRIA Avocats
          </Typography>
          <Typography sx={{
            fontSize: { xs: 20, md: 24 }, fontWeight: 800, color: '#fff',
            lineHeight: 1.25, letterSpacing: '-0.01em',
          }}>
            Évaluer mon risque
          </Typography>
          {scenarioTitre && (
            <Typography sx={{
              fontSize: 13, color: 'rgba(255,255,255,0.45)', mt: 1,
            }}>
              À propos de : {scenarioTitre}
            </Typography>
          )}
        </Box>

        <Box sx={{ p: { xs: 3, md: 4 } }}>
          {success ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CheckCircleIcon sx={{ fontSize: 56, color: C.green, mb: 2 }} />
              <Typography sx={{ fontSize: 20, fontWeight: 800, color: C.navy, mb: 1.5 }}>
                Message envoyé !
              </Typography>
              <Typography sx={{ fontSize: 15, color: C.textLight, lineHeight: 1.7 }}>
                Sofiane Coly vous contactera dans les plus brefs délais
                pour une évaluation personnalisée de votre situation.
              </Typography>
              <Box
                component="button"
                onClick={handleClose}
                sx={{
                  mt: 4, display: 'inline-flex', px: 4, py: 1.5,
                  borderRadius: '10px', border: 'none', cursor: 'pointer',
                  background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
                  color: '#fff', fontWeight: 700, fontSize: 15,
                  boxShadow: '0 4px 16px rgba(232,132,44,0.3)',
                  transition: 'all 0.2s',
                  '&:hover': { transform: 'translateY(-1px)' },
                }}
              >
                Fermer
              </Box>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              <Typography sx={{
                fontSize: 14, color: C.textLight, mb: 3, lineHeight: 1.7,
              }}>
                Chaque dossier est unique. Renseignez vos coordonnées
                et Sofiane vous recontacte pour une évaluation sur mesure.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Nom *"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                  size="small"
                  sx={inputSx}
                />
                <TextField
                  fullWidth
                  label="Société"
                  name="societe"
                  value={form.societe}
                  onChange={handleChange}
                  size="small"
                  sx={inputSx}
                />
              </Box>

              <TextField
                fullWidth
                label="Email professionnel *"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                size="small"
                sx={{ ...inputSx, mb: 2 }}
              />

              <TextField
                fullWidth
                label="Téléphone"
                name="telephone"
                type="tel"
                value={form.telephone}
                onChange={handleChange}
                size="small"
                sx={{ ...inputSx, mb: 2 }}
              />

              <TextField
                fullWidth
                label="Votre situation (optionnel)"
                name="message"
                value={form.message}
                onChange={handleChange}
                multiline
                rows={3}
                size="small"
                sx={{ ...inputSx, mb: 3 }}
              />

              {error && (
                <Typography sx={{
                  fontSize: 13, color: C.red, mb: 2,
                  p: 1.5, bgcolor: C.redLight, borderRadius: '8px',
                }}>
                  {error}
                </Typography>
              )}

              <Box
                component="button"
                type="submit"
                disabled={loading || !form.nom.trim() || !form.email.trim()}
                sx={{
                  width: '100%', py: 1.75, borderRadius: '10px',
                  border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                  background: loading
                    ? 'rgba(232,132,44,0.5)'
                    : `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
                  color: '#fff', fontWeight: 700, fontSize: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5,
                  boxShadow: '0 4px 16px rgba(232,132,44,0.3)',
                  transition: 'all 0.2s',
                  '&:hover:not(:disabled)': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 20px rgba(232,132,44,0.45)',
                  },
                }}
              >
                {loading && <CircularProgress size={18} sx={{ color: '#fff' }} />}
                {loading ? 'Envoi en cours...' : 'Demander une évaluation →'}
              </Box>

              <Typography sx={{
                fontSize: 11, color: C.textLight, textAlign: 'center', mt: 2,
              }}>
                Vos données sont traitées de manière confidentielle — RGPD
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
