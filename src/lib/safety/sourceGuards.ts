// src/lib/safety/sourceGuards.ts

export type ValidSource = 'usda' | 'local' | 'llm_estimate' | 'estimated' | 'unknown';

export function normalizeSource(source: string | null | undefined): ValidSource {
  if (!source) return 'unknown';
  const s = source.trim().toLowerCase();
  if (s === 'usda') return 'usda';
  if (s === 'local') return 'local';
  if (s === 'llm_estimate' || s === 'llm') return 'llm_estimate';
  if (s === 'estimated' || s === 'estimate') return 'estimated';
  return 'unknown';
}

export function getSourceLabel(source: ValidSource): string {
  switch (source) {
    case 'usda': return 'USDA';
    case 'local': return 'Local';
    case 'llm_estimate': return 'AI Estimate';
    case 'estimated': return 'Estimate';
    case 'unknown': return 'Unknown';
  }
}

export function isKnownSource(source: string | null | undefined): boolean {
  return normalizeSource(source) !== 'unknown';
}

export function hasEstimatedSource(item: any): boolean {
  if (!item) return false;
  const s = normalizeSource(item.source);
  return s === 'llm_estimate' || s === 'estimated' || s === 'unknown';
}
