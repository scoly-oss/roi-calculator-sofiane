import { Box, Typography, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { C } from './lib/constants';
import type { Scenario } from './lib/scenarios';

function formatEur(n: number): string {
  return n.toLocaleString('fr-FR') + ' \u20AC';
}

interface Props {
  scenario: Scenario;
  onClick: () => void;
}

export default function ScenarioCard({ scenario, onClick }: Props) {
  const { title, subtitle, risqueSansAvocat, missionDairia, valeurCreee } = scenario;

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 0, cursor: 'pointer', overflow: 'hidden',
        bgcolor: C.white,
        border: `1.5px solid ${C.border}`,
        borderRadius: '14px',
        boxShadow: '0 2px 8px rgba(30,45,61,0.06)',
        transition: 'all 0.25s cubic-bezier(.22,1,.36,1)',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 16px 48px rgba(30,45,61,0.12)',
          borderColor: C.orange,
        },
      }}
    >
      {/* Top section */}
      <Box sx={{ p: { xs: 3, md: 3.5 }, pb: 2.5 }}>
        <Box sx={{ mb: 2 }}>
          <Typography sx={{
            fontSize: 12, fontWeight: 700, color: C.orange,
            letterSpacing: 2, textTransform: 'uppercase', mb: 1,
          }}>
            {subtitle}
          </Typography>
          <Typography sx={{
            fontSize: { xs: 17, md: 18 }, fontWeight: 800, color: C.navy,
            lineHeight: 1.35, letterSpacing: '-0.01em',
          }}>
            {title}
          </Typography>
        </Box>

        {/* Risk vs Cost comparison */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2.5 }}>
          {/* Risk */}
          <Box sx={{
            flex: 1, p: 2, borderRadius: '10px',
            bgcolor: C.redLight,
          }}>
            <Typography sx={{
              fontSize: 11, fontWeight: 700, color: C.red,
              letterSpacing: 1.5, textTransform: 'uppercase', mb: 0.75,
            }}>
              {scenario.category === 'abonnement' ? 'Cout sans abo' : 'Risque'}
            </Typography>
            <Typography sx={{
              fontSize: { xs: 17, md: 19 }, fontWeight: 900, color: C.red,
              letterSpacing: '-0.02em',
            }}>
              {formatEur(risqueSansAvocat.montantMax)}
            </Typography>
          </Box>

          {/* Cost */}
          <Box sx={{
            flex: 1, p: 2, borderRadius: '10px',
            bgcolor: C.greenLight,
          }}>
            <Typography sx={{
              fontSize: 11, fontWeight: 700, color: C.green,
              letterSpacing: 1.5, textTransform: 'uppercase', mb: 0.75,
            }}>
              {scenario.category === 'abonnement' ? 'Abonnement' : 'Mission'}
            </Typography>
            <Typography sx={{
              fontSize: { xs: 17, md: 19 }, fontWeight: 900, color: C.green,
              letterSpacing: '-0.02em',
            }}>
              {formatEur(missionDairia.honoraires)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Bottom bar */}
      <Box sx={{
        px: 3.5, py: 2.25,
        bgcolor: C.navy,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography sx={{
            fontSize: { xs: 26, md: 28 }, fontWeight: 900, color: C.orange,
            letterSpacing: '-0.02em',
          }}>
            x{valeurCreee.ratio}
          </Typography>
          <Typography sx={{
            fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 600,
          }}>
            valeur / cout
          </Typography>
        </Box>
        <ArrowForwardIcon sx={{
          color: 'rgba(255,255,255,0.35)', fontSize: 20,
          transition: 'all 0.2s',
          '.MuiPaper-root:hover &': {
            color: C.orange,
            transform: 'translateX(4px)',
          },
        }} />
      </Box>
    </Paper>
  );
}
