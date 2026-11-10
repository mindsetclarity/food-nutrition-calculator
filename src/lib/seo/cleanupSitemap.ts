// A temporary sitemap of the thin compare and food pages that are now noindex. Google
// still had many of them indexed and had not recrawled the rest, so the noindex was not
// being seen. Listing them with a recent lastmod asks Google to recrawl them sooner and
// drop them. It is separate from sitemap.xml, which lists only pages we want indexed.
//
// Remove after CLEANUP_REMOVE_AFTER: delete this file, src/pages/sitemap-cleanup.xml.ts,
// its line in public/robots.txt and its test, and remove it in Search Console.
import { getAllComparePairs, isIndexedComparePair, isIndexedFood } from '../compare/comparePairs';
import { getAllFoodPages } from '../foods/foodPageData';

// When these pages switched to noindex (the deploys of 5 and 6 November 2026).
export const CLEANUP_LASTMOD = '2026-11-06';
export const CLEANUP_REMOVE_AFTER = '2026-12-10';

export function getCleanupPaths(): string[] {
  return [
    ...getAllComparePairs().filter(p => !isIndexedComparePair(p.slug)).map(p => `/compare/${p.slug}`),
    ...getAllFoodPages().filter(f => !isIndexedFood(f.slug)).map(f => `/foods/${f.slug}`),
  ];
}
