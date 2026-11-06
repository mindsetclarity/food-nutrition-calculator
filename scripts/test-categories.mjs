/**
 * Guards the category charts: every category has a written intro, and sorting is safe.
 *
 *   node --experimental-strip-types scripts/test-categories.mjs
 *
 * A category page is indexed only when it has an intro, so a renamed category
 * must fail here instead of silently dropping out of Google.
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

const { CATEGORY_INTROS } = await import('../src/data/categoryIntros.ts');
const { categorySlug, getAllCategories, sortFoodsByCalories } = await import('../src/lib/foods/categories.ts');

assert.equal(categorySlug('Dairy & Alternatives'), 'dairy-alternatives');
assert.equal(categorySlug('Fast Food Style'), 'fast-food-style');

const food = (slug, calories) => ({ slug, nutrientsPer100g: { calories } });
assert.deepEqual(
  sortFoodsByCalories([food('none', null), food('high', 300), food('low', 10)]).map(f => f.slug),
  ['low', 'high', 'none'],
  'missing calories sort last',
);

const categories = getAllCategories();
const slugs = categories.map(c => c.slug);
assert.equal(new Set(slugs).size, slugs.length, 'category slugs are unique');
assert.ok(categories.reduce((n, c) => n + c.foods.length, 0) > 1000, 'every food is in a category');

for (const s of slugs) assert.ok(CATEGORY_INTROS[s], `category missing intro: ${s}`);
for (const [k, intro] of Object.entries(CATEGORY_INTROS)) {
  assert.ok(slugs.includes(k), `intro for unknown category: ${k}`);
  const count = categories.find(c => c.slug === k).foods.length;
  assert.ok(intro.metaDescription.includes(String(count)), `${k}: meta description should say ${count} foods`);
  const w = intro.body.join(' ').trim().split(/\s+/).length;
  assert.ok(w >= 120 && w <= 200, `${k}: ${w} words (want 120-200)`);
  assert.ok(intro.metaDescription.length <= 160, `${k}: meta description is ${intro.metaDescription.length} chars`);
}

console.log(`category checks passed: ${slugs.length} categories`);
