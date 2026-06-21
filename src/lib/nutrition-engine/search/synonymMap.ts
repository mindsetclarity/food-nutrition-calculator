import { normalizeFoodText } from './normalizeQuery';

export const SYNONYM_MAP: Record<string, string[]> = {
  "yogurt": ["yoghurt"],
  "chickpeas": ["garbanzo", "garbanzo beans", "chick pea", "chick peas"],
  "oats": ["oatmeal", "oat meal", "rolled oatmeal", "rolled oats"],
  "soft drink": ["soda", "pop"],
  "green onion": ["scallion", "spring onion"],
  "eggplant": ["aubergine"],
  "zucchini": ["courgette"],
  "bell pepper": ["capsicum"],
  "peanut": ["groundnut"],
  "powdered sugar": ["confectioners sugar", "icing sugar"],
  "black beans": ["black bean"],
  "kidney beans": ["kidney bean"],
  "milk alternative": ["plant milk", "non dairy milk"]
};

// Pre-normalize the map keys and values for robust matching
const NORMALIZED_SYNONYM_MAP = new Map<string, string[]>();
for (const [canonical, synonyms] of Object.entries(SYNONYM_MAP)) {
  const normCanonical = normalizeFoodText(canonical);
  const normSynonyms = synonyms.map(normalizeFoodText);
  NORMALIZED_SYNONYM_MAP.set(normCanonical, normSynonyms);
}

export function applyFoodSynonyms(query: string): string {
  let modifiedQuery = query;
  for (const [canonical, synonyms] of NORMALIZED_SYNONYM_MAP.entries()) {
    for (const synonym of synonyms) {
      const regex = new RegExp(`\\b${synonym}\\b`, 'g');
      if (regex.test(modifiedQuery)) {
        modifiedQuery = modifiedQuery.replace(regex, canonical);
      }
    }
  }
  return modifiedQuery;
}

export function getSynonymCandidates(query: string): string[] {
  const candidates = new Set<string>();
  const tokens = query.split(' ');
  
  for (const [canonical, synonyms] of NORMALIZED_SYNONYM_MAP.entries()) {
    for (const synonym of synonyms) {
      if (query.includes(synonym) || tokens.includes(synonym)) {
        candidates.add(canonical);
      }
      if (query.includes(canonical) || tokens.includes(canonical)) {
        candidates.add(synonym);
      }
    }
  }
  return Array.from(candidates);
}

export function expandQueryWithSynonyms(query: string): string {
  const candidates = getSynonymCandidates(query);
  if (candidates.length === 0) return query;
  return query + ' ' + candidates.join(' ');
}
