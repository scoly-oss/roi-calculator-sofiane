import { Box, Typography, Paper, IconButton, Container, LinearProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ShieldIcon from '@mui/icons-material/Shield';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { C } from './lib/constants';
import type { Scenario } from './lib/scenarios';

function formatEur(n: number): string {
  return n.toLocaleString('fr-FR') + ' \u20AC';
}

interface Props {
  scenario: Scenario;
  onBack: () => void;
  onContact?: () => void;
}

export default function ScenarioDetail({ scenario, onBack, onContact }: Props) {
  const { title, subtitle, situation, risqueSansAvocat, missionDairia, valeurCreee } = scenario;

  const maxRisk = risqueSansAvocat.montantMax;
  const honoraires = missionDairia.honoraires;
  const riskBarPercent = 100;
  const costBarPercent = Math.round((honoraires / maxRisk) * 100);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: C.cream }}>
      {/* Header */}
      <Box sx={{
        background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
        color: '#fff',
        pt: { xs: 3, md: 5 }, pb: { xs: 5, md: 8 },
        position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{
          position: 'absolute', top: -80, right: -80, width: 300, height: 300,
          borderRadius: '50%', border: '1px solid rgba(232,132,44,0.1)',
        }} />
        <Box sx={{
          position: 'absolute', inset: 0, opacity: 0.02,
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <IconButton onClick={onBack} sx={{
            color: 'rgba(255,255,255,0.6)', mb: 3,
            '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
          }}>
            <ArrowBackIcon />
          </IconButton>

          <Typography sx={{
            fontSize: 11, fontWeight: 700, color: C.orange,
            letterSpacing: 2.5, textTransform: 'uppercase', mb: 1,
          }}>
            {subtitle}
          </Typography>
          <Typography sx={{
            fontSize: { xs: 26, md: 36 }, fontWeight: 900, lineHeight: 1.2,
            letterSpacing: '-0.02em', mb: 3, maxWidth: 600,
          }}>
            {title}
          </Typography>
          <Box sx={{
            width: 50, height: 4, borderRadius: 2,
            background: `linear-gradient(90deg, ${C.orange}, ${C.orangeLight})`,
          }} />
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Situation */}
        <Paper elevation={0} sx={{
          p: { xs: 3, md: 4 }, mb: 4,
          borderLeft: `4px solid ${C.orange}`,
          bgcolor: C.lightOrange,
          borderRadius: '0 16px 16px 0',
        }}>
          <Typography sx={{
            fontSize: 11, fontWeight: 700, color: C.orange,
            letterSpacing: 2, textTransform: 'uppercase', mb: 1.5,
          }}>
            La situation
          </Typography>
          <Typography sx={{
            fontSize: 16, lineHeight: 1.9, color: C.text,
          }}>
            {situation}
          </Typography>
        </Paper>

        {/* Visual comparison */}
        <Paper elevation={0} sx={{
          p: { xs: 3, md: 5 }, mb: 4, borderRadius: 4,
          border: `1px solid ${C.border}`,
        }}>
          <Typography sx={{
            fontSize: 11, fontWeight: 700, color: C.navy,
            letterSpacing: 2, textTransform: 'uppercase', mb: 4,
          }}>
            Comparaison visuelle
          </Typography>

          {/* Risk bar */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, color: C.red }}>
                Risque sans accompagnement
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 800, color: C.red }}>
                {formatEur(risqueSansAvocat.montantMin)} - {formatEur(maxRisk)}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={riskBarPercent}
              sx={{
                height: 16, borderRadius: 2,
                bgcolor: 'rgba(220,38,38,0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: C.red,
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Cost bar */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, color: C.green }}>
                Mission DAIRIA
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 800, color: C.green }}>
                {formatEur(honoraires)}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={costBarPercent}
              sx={{
                height: 16, borderRadius: 2,
                bgcolor: 'rgba(22,163,74,0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: C.green,
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Ratio highlight */}
          <Box sx={{
            textAlign: 'center', p: 4, mt: 2,
            background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
            borderRadius: 4,
          }}>
            <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: 2, mb: 1 }}>
              RATIO VALEUR / COUT
            </Typography>
            <Typography sx={{
              fontSize: { xs: 48, md: 64 }, fontWeight: 900, color: C.orange,
              letterSpacing: '-0.03em', lineHeight: 1,
            }}>
              x{valeurCreee.ratio}
            </Typography>
            <Typography sx={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', mt: 1 }}>
              Pour 1 EUR investi, {valeurCreee.ratio} EUR de risque securises
            </Typography>
          </Box>
        </Paper>

        {/* Two columns: Risk details + Mission details */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3, mb: 4,
        }}>
          {/* Risk details */}
          <Paper elevation={0} sx={{
            p: { xs: 3, md: 4 }, borderRadius: 4,
            border: `1px solid rgba(220,38,38,0.15)`,
            bgcolor: C.redLight,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <WarningAmberIcon sx={{ color: C.red, fontSize: 28 }} />
              <Typography sx={{ fontSize: 16, fontWeight: 800, color: C.red }}>
                {risqueSansAvocat.label}
              </Typography>
            </Box>
            {risqueSansAvocat.details.map((d, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                <Box sx={{
                  width: 6, height: 6, borderRadius: '50%', bgcolor: C.red,
                  flexShrink: 0, mt: '8px', opacity: 0.6,
                }} />
                <Typography sx={{ fontSize: 14, color: '#7f1d1d', lineHeight: 1.7 }}>
                  {d}
                </Typography>
              </Box>
            ))}
          </Paper>

          {/* Mission details */}
          <Paper elevation={0} sx={{
            p: { xs: 3, md: 4 }, borderRadius: 4,
            border: `1px solid rgba(22,163,74,0.15)`,
            bgcolor: C.greenLight,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <ShieldIcon sx={{ color: C.green, fontSize: 28 }} />
              <Box>
                <Typography sx={{ fontSize: 16, fontWeight: 800, color: C.green }}>
                  {missionDairia.label}
                </Typography>
                <Typography sx={{ fontSize: 12, color: '#166534' }}>
                  {scenario.category === 'abonnement'
                    ? `${formatEur(honoraires)} HT / an`
                    : `${missionDairia.dureeJours} jours — ${formatEur(honoraires)} HT`
                  }
                </Typography>
              </Box>
            </Box>
            {missionDairia.details.map((d, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                <Box sx={{
                  width: 6, height: 6, borderRadius: '50%', bgcolor: C.green,
                  flexShrink: 0, mt: '8px', opacity: 0.6,
                }} />
                <Typography sx={{ fontSize: 14, color: '#14532d', lineHeight: 1.7 }}>
                  {d}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>

        {/* Value created */}
        <Paper elevation={0} sx={{
          p: { xs: 3, md: 4 }, borderRadius: 4,
          border: `1px solid ${C.border}`, mb: 4,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <TrendingUpIcon sx={{ color: C.orange, fontSize: 28 }} />
            <Typography sx={{ fontSize: 16, fontWeight: 800, color: C.navy }}>
              Valeur creee par l'accompagnement
            </Typography>
          </Box>
          {valeurCreee.pointsCles.map((p, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
              <CheckCircleIcon sx={{
                color: C.green, fontSize: 20, flexShrink: 0, mt: '2px',
              }} />
              <Typography sx={{ fontSize: 15, color: C.text, lineHeight: 1.7 }}>
                {p}
              </Typography>
            </Box>
          ))}
        </Paper>

        {/* CTA */}
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography sx={{
            fontSize: 20, fontWeight: 800, color: C.navy, mb: 1.5,
          }}>
            Cette situation vous parle ?
          </Typography>
          <Typography sx={{
            fontSize: 15, color: C.textLight, mb: 3, lineHeight: 1.7,
          }}>
            Chaque dossier est unique. Contactez-nous pour une evaluation sur mesure.
          </Typography>
          <Box
            component="button"
            onClick={onContact}
            sx={{
              display: 'inline-flex', px: 4, py: 1.5,
              borderRadius: '14px', border: 'none', cursor: 'pointer',
              background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
              color: '#fff', fontWeight: 700, fontSize: 15,
              boxShadow: '0 6px 24px rgba(232,132,44,0.3)',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 32px rgba(232,132,44,0.5)',
              },
            }}
          >
            Évaluer mon risque →
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
