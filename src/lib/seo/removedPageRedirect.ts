import { localFoods } from '../../data/foods';
import { compareHref } from '../compare/compareLink';

// The generated compare pages were removed for AdSense, but Google, old links and bookmarks
// still send visitors to them. Send each one to the compare tool prefilled with both foods
// instead of a dead end. Unknown URLs get null (the caller sends 410).
const foodSlugs = new Set(localFoods.map(f => f.slug).filter(Boolean));

export function removedPageRedirect(pathname: string): string | null {
  const pair = pathname.match(/^\/compare\/([a-z0-9-]+)\/?$/)?.[1];
  if (!pair) return null;
  // Slugs can contain "-vs-" themselves, so try every split.
  const parts = pair.split('-vs-');
  for (let i = 1; i < parts.length; i++) {
    const a = parts.slice(0, i).join('-vs-');
    const b = parts.slice(i).join('-vs-');
    if (foodSlugs.has(a) && foodSlugs.has(b)) return compareHref([a, b]);
  }
  return null;
}
