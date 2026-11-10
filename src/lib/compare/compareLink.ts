// Shareable /compare-foods links: ?a=<token>&b=<token> (up to d). A token is a
// local food slug or "usda-<fdcId>"; /api/foods/details resolves both.

const KEYS = ['a', 'b', 'c', 'd'] as const;
const USDA = /^usda-\d{1,10}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type CompareParam = { id: string; source: 'local' | 'usda' };

export function compareToken(food: { source: string; slug: string; id: string }): string | null {
  if (food.source === 'local') return food.slug;
  if (food.source === 'usda' && USDA.test(food.id)) return food.id;
  return null;
}

export function compareHref(tokens: string[]): string {
  const qs = tokens.slice(0, KEYS.length).map((t, i) => `${KEYS[i]}=${encodeURIComponent(t)}`).join('&');
  return qs ? `/compare-foods?${qs}` : '/compare-foods';
}

/** `search` with the a–d food params replaced by `tokens`; other params (utm_*, …) kept. */
export function withCompareParams(search: string, tokens: string[]): string {
  const params = new URLSearchParams(search);
  for (const key of KEYS) params.delete(key);
  tokens.slice(0, KEYS.length).forEach((t, i) => params.set(KEYS[i], t));
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export function parseCompareParams(search: string): CompareParam[] {
  const params = new URLSearchParams(search);
  const out: CompareParam[] = [];
  for (const key of KEYS) {
    const v = params.get(key);
    if (!v || v.length > 80 || out.some(p => p.id === v)) continue;
    if (USDA.test(v)) out.push({ id: v, source: 'usda' });
    else if (SLUG.test(v)) out.push({ id: v, source: 'local' });
  }
  return out;
}
