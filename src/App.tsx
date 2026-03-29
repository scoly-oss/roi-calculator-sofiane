import { useState } from 'react';
import {
  ThemeProvider, createTheme, CssBaseline, Box, Typography,
  Chip, Container,
} from '@mui/material';
import { C } from './lib/constants';
import { SCENARIOS, CATEGORIES } from './lib/scenarios';
import ScenarioCard from './ScenarioCard';
import ScenarioDetail from './ScenarioDetail';
import LeadModal from './LeadModal';
import type { Scenario } from './lib/scenarios';

const theme = createTheme({
  palette: {
    primary: { main: C.orange },
    secondary: { main: C.navy },
    background: { default: C.cream },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
  },
  shape: { borderRadius: 14 },
});

export default function App() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Scenario | null>(null);
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  const filtered = filter === 'all'
    ? SCENARIOS
    : SCENARIOS.filter(s => s.category === filter);

  if (selected) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScenarioDetail
          scenario={selected}
          onBack={() => setSelected(null)}
          onContact={() => setLeadModalOpen(true)}
        />
        <LeadModal
          open={leadModalOpen}
          onClose={() => setLeadModalOpen(false)}
          scenarioId={selected.id}
          scenarioTitre={selected.title}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LeadModal
        open={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
      />
      <Box sx={{ minHeight: '100vh', bgcolor: C.cream }}>
        {/* Hero */}
        <Box sx={{
          background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 60%, #344d63 100%)`,
          color: '#fff',
          pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 },
          position: 'relative', overflow: 'hidden',
        }}>
          <Box sx={{
            position: 'absolute', top: -120, right: -120, width: 400, height: 400,
            borderRadius: '50%', border: '1px solid rgba(232,132,44,0.12)',
          }} />
          <Box sx={{
            position: 'absolute', bottom: -60, left: -60, width: 200, height: 200,
            borderRadius: '50%', bgcolor: 'rgba(232,132,44,0.04)',
          }} />
          <Box sx={{
            position: 'absolute', inset: 0, opacity: 0.025,
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Typography sx={{
              color: C.orange, fontWeight: 800, letterSpacing: 6, fontSize: 12, mb: 4,
            }}>
              SOFIANE COLY — CALCULATEUR ROI
            </Typography>

            <Typography sx={{
              fontSize: { xs: 28, md: 42 }, fontWeight: 900, lineHeight: 1.15,
              letterSpacing: '-0.025em', mb: 2, maxWidth: 700,
            }}>
              Combien vous coute de ne pas etre accompagne ?
            </Typography>

            <Typography sx={{
              fontSize: { xs: 16, md: 19 }, color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.7, maxWidth: 600, mb: 1,
            }}>
              16 cas concrets. Comparez le risque financier sans accompagnement
              et la valeur creee par DAIRIA Avocats, DAIRIA IA a 90 EUR/mois et GererMesATMP.
            </Typography>

            <Box sx={{
              width: 60, height: 4, borderRadius: 2, mt: 4,
              background: `linear-gradient(90deg, ${C.orange}, ${C.orangeLight})`,
            }} />
          </Container>
        </Box>

        {/* Stat bar */}
        <Box sx={{
          bgcolor: '#fff', borderBottom: `1px solid ${C.border}`,
          py: 3,
        }}>
          <Container maxWidth="lg">
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: { xs: 3, md: 8 },
            }}>
              {[
                { value: '16', label: 'Scenarios types' },
                { value: 'x14', label: 'Ratio moyen valeur/cout' },
                { value: '3', label: 'Produits compares' },
              ].map((stat, i) => (
                <Box key={i} sx={{ textAlign: 'center' }}>
                  <Typography sx={{
                    fontSize: { xs: 28, md: 36 }, fontWeight: 900, color: C.orange,
                    letterSpacing: '-0.02em',
                  }}>
                    {stat.value}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: C.textLight, fontWeight: 600 }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Filter chips */}
        <Container maxWidth="lg" sx={{ pt: 5, pb: 2 }}>
          <Box sx={{
            display: 'flex', flexWrap: 'wrap', gap: 1.5,
            justifyContent: 'center',
          }}>
            {CATEGORIES.map(cat => (
              <Chip
                key={cat.id}
                label={cat.label}
                onClick={() => setFilter(cat.id)}
                sx={{
                  px: 1, py: 2.5, fontSize: 14, fontWeight: 600,
                  borderRadius: 3,
                  bgcolor: filter === cat.id ? C.navy : '#fff',
                  color: filter === cat.id ? '#fff' : C.text,
                  border: `1px solid ${filter === cat.id ? C.navy : C.border}`,
                  '&:hover': {
                    bgcolor: filter === cat.id ? C.navyLight : C.lightOrange,
                  },
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </Box>
        </Container>

        {/* Cards grid */}
        <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
            gap: 3,
          }}>
            {filtered.map(scenario => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                onClick={() => setSelected(scenario)}
              />
            ))}
          </Box>
        </Container>

        {/* CTA */}
        <Box sx={{
          bgcolor: C.navy, py: { xs: 6, md: 8 }, textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <Box sx={{
            position: 'absolute', inset: 0, opacity: 0.02,
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />
          <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
            <Typography sx={{
              fontSize: { xs: 24, md: 32 }, fontWeight: 800, color: '#fff',
              mb: 2, letterSpacing: '-0.01em',
            }}>
              Et votre situation ?
            </Typography>
            <Typography sx={{
              color: 'rgba(255,255,255,0.5)', fontSize: 16, mb: 4, lineHeight: 1.8,
            }}>
              Chaque dossier est unique. Parlons de votre situation
              pour evaluer le vrai cout du risque et la valeur d'un accompagnement.
            </Typography>
            <Box
              component="button"
              onClick={() => setLeadModalOpen(true)}
              sx={{
                display: 'inline-flex', px: 5, py: 2,
                borderRadius: '14px', border: 'none', cursor: 'pointer',
                background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
                color: '#fff', fontWeight: 700, fontSize: 16,
                boxShadow: '0 6px 24px rgba(232,132,44,0.4)',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 32px rgba(232,132,44,0.5)',
                },
              }}
            >
              Parlons-en →
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 3 }}>
              <Box component="a" href="https://dairia.ai" target="_blank" rel="noopener"
                sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, textDecoration: 'none', '&:hover': { color: C.orange } }}>
                dairia.ai
              </Box>
              <Box component="a" href="https://gerer-mes-atmp.vercel.app" target="_blank" rel="noopener"
                sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, textDecoration: 'none', '&:hover': { color: C.orange } }}>
                gerermesatmp.com
              </Box>
              <Box component="a" href="https://dairia-avocats.com" target="_blank" rel="noopener"
                sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, textDecoration: 'none', '&:hover': { color: C.orange } }}>
                dairia-avocats.com
              </Box>
              <Box component="a" href="https://sofiane-coly.vercel.app" target="_blank" rel="noopener"
                sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, textDecoration: 'none', '&:hover': { color: C.orange } }}>
                sofiane-coly.vercel.app
              </Box>
            </Box>

            <Box sx={{ mt: 6 }}>
              <Typography sx={{ color: C.orange, fontWeight: 800, letterSpacing: 6, fontSize: 13, mb: 3 }}>
                SOFIANE COLY
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.8, mb: 4 }}>
                s.coly@dairia-avocats.com
              </Typography>
              <Box sx={{
                width: 40, height: 3, borderRadius: 2, mx: 'auto', mb: 3,
                background: `linear-gradient(90deg, ${C.orange}, ${C.orangeLight})`,
              }} />
              <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>
                Honoraires calibres sur les tarifs reels du cabinet — Risques bases sur les baremes legaux
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
