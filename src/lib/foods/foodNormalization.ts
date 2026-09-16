// Normalization utilities for food search
export function normalizeFoodQuery(query: string): string {
  if (!query) return '';
  return query
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ') // Remove punctuation
    .replace(/\s+/g, ' ')      // Collapse whitespace
    .trim();
}

export function normalizeFoodName(name: string): string {
  return normalizeFoodQuery(name);
}

export function tokenizeFoodQuery(query: string): string[] {
  const normalized = normalizeFoodQuery(query);
  if (!normalized) return [];
  const tokens = normalized.split(' ');
  return removeStopWords(tokens).map(singularizeSimple);
}

export function removeStopWords(tokens: string[]): string[] {
  const stopWords = new Set(['and', 'with', 'or', 'in', 'on', 'a', 'an', 'the', 'of']);
  return tokens.filter(t => !stopWords.has(t));
}

export function singularizeSimple(token: string): string {
  if (token.endsWith('ies')) return token.slice(0, -3) + 'y';
  // "potatoes", "tomatoes", "mangoes" -> "potato" etc.; plain -s left "potatoe".
  if (token.endsWith('es') && token.match(/(s|sh|ch|x|z|o)es$/)) return token.slice(0, -2);
  if (token.endsWith('s') && !token.endsWith('ss')) return token.slice(0, -1);
  return token;
}

export function normalizeSynonyms(query: string): string {
  const synonyms: Record<string, string> = {
    'garbanzo beans': 'chickpeas',
    'garbanzo': 'chickpea',
    'oatmeal': 'oats',
    'rolled oats': 'oats',
    'yoghurt': 'yogurt',
    'soda': 'soft drink',
    'pop': 'soft drink',
    'scallion': 'green onion',
    'cilantro': 'coriander',
    'aubergine': 'eggplant',
    'courgette': 'zucchini',
    'capsicum': 'bell pepper',
    'groundnut': 'peanut',
    'confectioners sugar': 'powdered sugar',
    'mac n cheese': 'macaroni and cheese'
  };

  let normalized = normalizeFoodQuery(query);
  for (const [synonym, replacement] of Object.entries(synonyms)) {
    // replace whole word/phrase match
    const regex = new RegExp(`\\b${synonym}\\b`, 'g');
    normalized = normalized.replace(regex, replacement);
  }
  return normalized;
}
