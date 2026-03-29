import type { Scenario } from './scenarios';

const EFFECTIF_OPTIONS = [
  { label: '1-9 salariés', value: 5 },
  { label: '10-19 salariés', value: 15 },
  { label: '20-49 salariés', value: 35 },
  { label: '50-99 salariés', value: 75 },
  { label: '100-249 salariés', value: 175 },
  { label: '250+ salariés', value: 300 },
] as const;

export type EffectifOption = typeof EFFECTIF_OPTIONS[number]['label'];
export const EFFECTIF_LABELS = EFFECTIF_OPTIONS.map(o => o.label);

function effectifToNumber(label: string): number {
  return EFFECTIF_OPTIONS.find(o => o.label === label)?.value ?? 0;
}

export function computeScore(
  scenario: Scenario | null,
  effectif: string,
): { score: number; label: string } {
  let score = 0;

  if (scenario) {
    // Risk amount → up to 35 pts
    const risk = scenario.risqueSansAvocat.montantMax;
    if (risk > 200_000) score += 35;
    else if (risk > 100_000) score += 28;
    else if (risk > 50_000) score += 20;
    else if (risk > 20_000) score += 12;
    else score += 5;

    // Ratio → up to 20 pts
    const ratio = scenario.valeurCreee.ratio;
    if (ratio > 15) score += 20;
    else if (ratio > 10) score += 15;
    else if (ratio > 5) score += 10;
    else score += 5;

    // Category urgency → up to 15 pts
    const highUrgency = ['licenciement', 'contentieux', 'urssaf'];
    const medUrgency = ['conformite', 'audit', 'rupture'];
    if (highUrgency.includes(scenario.category)) score += 15;
    else if (medUrgency.includes(scenario.category)) score += 10;
    else score += 5;
  }

  // Company size → up to 20 pts
  const nbEmp = effectifToNumber(effectif);
  if (nbEmp >= 250) score += 20;
  else if (nbEmp >= 100) score += 16;
  else if (nbEmp >= 50) score += 12;
  else if (nbEmp >= 20) score += 8;
  else if (nbEmp >= 10) score += 5;
  else if (nbEmp > 0) score += 3;

  score = Math.min(score, 100);

  let label: string;
  if (score >= 75) label = 'Prioritaire';
  else if (score >= 50) label = 'Qualifié';
  else if (score >= 30) label = 'À nurturer';
  else label = 'Froid';

  return { score, label };
}
