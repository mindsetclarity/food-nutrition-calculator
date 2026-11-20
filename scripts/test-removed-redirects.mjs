/**
 * Removed food/compare URLs must 301 to a live page, not 410, so their visitors aren't lost.
 *
 *   node --experimental-strip-types scripts/test-removed-redirects.mjs
 */
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';

registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith('.') && !/\.[cm]?[jt]s$/.test(spec)) {
      try { return next(spec + '.ts', ctx); } catch {}
      try { return next(spec + '/index.ts', ctx); } catch {}
    }
    return next(spec, ctx);
  }
});

const { localFoods } = await import('../src/data/foods/index.ts');
const { categorySlug } = await import('../src/lib/foods/categories.ts');
const { removedPageRedirect } = await import('../src/lib/seo/removedPageRedirect.ts');

const [x, y] = localFoods.filter(f => f.slug && f.category);
assert.equal(removedPageRedirect(`/foods/${x.slug}`), `/foods/category/${categorySlug(x.category)}`);
assert.equal(removedPageRedirect(`/compare/${x.slug}-vs-${y.slug}`), `/compare-foods?a=${x.slug}&b=${y.slug}`);
assert.equal(removedPageRedirect('/foods/not-a-food'), null);
assert.equal(removedPageRedirect('/compare/not-vs-food'), null);
assert.equal(removedPageRedirect('/foods/category/nope'), null);

// Every removed food has a live category chart to land on.
const { getAllCategories } = await import('../src/lib/foods/categories.ts');
const live = new Set(getAllCategories().map(c => c.slug));
for (const f of localFoods.filter(f => f.slug && f.category)) {
  assert.ok(live.has(removedPageRedirect(`/foods/${f.slug}`).split('/').pop()), f.slug);
}
console.log('removed-page redirects ok');
