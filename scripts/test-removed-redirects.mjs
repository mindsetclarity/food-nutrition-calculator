/**
 * Every food has a page again, and removed compare URLs 301 to the compare tool, not 410,
 * so their visitors aren't lost.
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
const { isIndexedFood } = await import('../src/lib/foods/foodPageData.ts');
const { removedPageRedirect } = await import('../src/lib/seo/removedPageRedirect.ts');

const foods = localFoods.filter(f => f.slug);
assert.ok(foods.length > 1000, 'expected 1,000+ foods');
for (const f of foods) assert.ok(isIndexedFood(f.slug), `food page not built: ${f.slug}`);
assert.equal(isIndexedFood('not-a-food'), false);

const [x, y] = foods;
assert.equal(removedPageRedirect(`/compare/${x.slug}-vs-${y.slug}`), `/compare-foods?a=${x.slug}&b=${y.slug}`);
assert.equal(removedPageRedirect('/compare/not-vs-food'), null);
assert.equal(removedPageRedirect(`/foods/${x.slug}`), null);
console.log('food pages and removed-page redirects ok');
