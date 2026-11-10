/**
 * Checks the temporary cleanup sitemap.
 *
 *   node --experimental-strip-types scripts/test-cleanup-sitemap.mjs
 *
 * It lists the thin pages that are now noindex, so Google recrawls them sooner and drops
 * them. It must never list a page we want indexed, and nothing it lists may be in the
 * main sitemap.
 */
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';

registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith('.') && !/\.[cm]?[jt]s$/.test(spec)) {
      try { return next(spec + '.ts', ctx); } catch {}
    }
    return next(spec, ctx);
  }
});

const { getCleanupPaths, CLEANUP_LASTMOD, CLEANUP_REMOVE_AFTER } = await import('../src/lib/seo/cleanupSitemap.ts');
const { isIndexedComparePair, isIndexedFood, getAllComparePairs } = await import('../src/lib/compare/comparePairs.ts');
const { getAllFoodPages } = await import('../src/lib/foods/foodPageData.ts');

const paths = getCleanupPaths();
assert.ok(paths.length > 3000, `expected the ~3,400 hidden pages, got ${paths.length}`);
assert.equal(new Set(paths).size, paths.length, 'no duplicates');

for (const p of paths) {
  const [, section, slug] = p.split('/');
  assert.ok(section === 'compare' || section === 'foods', `only compare and food pages: ${p}`);
  if (section === 'compare') assert.equal(isIndexedComparePair(slug), false, `${p} is indexed`);
  if (section === 'foods') assert.equal(isIndexedFood(slug), false, `${p} is indexed`);
}

// Every hidden page is listed, so none is left for Google to find on its own.
const hiddenPairs = getAllComparePairs().filter(p => !isIndexedComparePair(p.slug)).length;
const hiddenFoods = getAllFoodPages().filter(f => !isIndexedFood(f.slug)).length;
assert.equal(paths.length, hiddenPairs + hiddenFoods);

assert.match(CLEANUP_LASTMOD, /^\d{4}-\d{2}-\d{2}$/);
assert.match(CLEANUP_REMOVE_AFTER, /^\d{4}-\d{2}-\d{2}$/);

console.log(`cleanup sitemap checks passed: ${paths.length} hidden pages`);
