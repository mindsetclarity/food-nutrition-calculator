import { localFoods } from '../../data/foods';
import { categorySlug } from '../foods/categories';
import { compareHref } from '../compare/compareLink';

// The thin food/compare pages were removed for AdSense, but Google, old links and
// bookmarks still send visitors to them. Send each one to a live page that shows the
// same numbers instead of a dead end: a food to its category chart, a pair to the
// compare tool prefilled with both foods. Unknown URLs get null (the caller sends 410).
const categoryBySlug = new Map(localFoods.filter(f => f.slug && f.category).map(f => [f.slug, categorySlug(f.category)]));

export function removedPageRedirect(pathname: string): string | null {
  const food = pathname.match(/^\/foods\/([a-z0-9-]+)\/?$/)?.[1];
  if (food) {
    const category = categoryBySlug.get(food);
    return category ? `/foods/category/${category}` : null;
  }
  const pair = pathname.match(/^\/compare\/([a-z0-9-]+)\/?$/)?.[1];
  if (pair) {
    // Slugs can contain "-vs-" themselves, so try every split.
    const parts = pair.split('-vs-');
    for (let i = 1; i < parts.length; i++) {
      const a = parts.slice(0, i).join('-vs-');
      const b = parts.slice(i).join('-vs-');
      if (categoryBySlug.has(a) && categoryBySlug.has(b)) return compareHref([a, b]);
    }
  }
  return null;
}
