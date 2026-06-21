export function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

export function normalizePunctuation(value: string): string {
  return value.replace(/[^\w\s-]/g, '');
}

export function normalizeDiacritics(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function normalizeHyphenation(value: string): string {
  return value.replace(/-/g, ' ');
}

export function normalizeCommonFoodSpelling(value: string): string {
  let normalized = value;
  normalized = normalized.replace(/\byoghurt\b/gi, 'yogurt');
  normalized = normalized.replace(/\bchick pea\b/gi, 'chickpea');
  normalized = normalized.replace(/\bchick peas\b/gi, 'chickpeas');
  normalized = normalized.replace(/\boat meal\b/gi, 'oatmeal');
  return normalized;
}

export function simpleSingularize(token: string): string {
  if (token.endsWith('ies')) return token.slice(0, -3) + 'y';
  if (token.endsWith('oes')) return token.slice(0, -2);
  if (token.endsWith('s') && !token.endsWith('ss') && !token.endsWith('us') && !token.endsWith('is')) {
    return token.slice(0, -1);
  }
  return token;
}

export function normalizeFoodText(value: string): string {
  if (!value) return '';
  let str = value.toLowerCase();
  str = normalizeDiacritics(str);
  str = normalizePunctuation(str);
  str = normalizeHyphenation(str);
  str = normalizeCommonFoodSpelling(str);
  str = normalizeWhitespace(str);
  return str;
}

export function normalizeFoodQuery(query: string): string {
  return normalizeFoodText(query);
}

export const SEARCH_STOP_WORDS = new Set([
  'fresh', 'plain', 'food', 'nutrition', 'calories', 'calorie', 'macro', 'macros', 'the', 'a', 'an'
]);

export function removeSearchStopWords(tokens: string[]): string[] {
  return tokens.filter(t => !SEARCH_STOP_WORDS.has(t));
}

export function tokenizeFoodQuery(query: string): string[] {
  const normalized = normalizeFoodQuery(query);
  if (!normalized) return [];
  const tokens = normalized.split(' ');
  const withoutStopWords = removeSearchStopWords(tokens);
  return withoutStopWords.map(simpleSingularize);
}
