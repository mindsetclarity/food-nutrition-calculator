/**
 * Guards the editorial notes that decide which compare and food pages are indexed.
 *
 *   node --experimental-strip-types scripts/test-editorial-notes.mjs
 *
 * A typo'd key would silently remove a page; a missing note would drop a curated
 * page out of Google. Both must fail here instead.
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

const { COMPARE_NOTES } = await import('../src/data/compareNotes.ts');
const { FOOD_NOTES } = await import('../src/data/foodNotes.ts');
const { CURATED, getAllComparePairs } = await import('../src/lib/compare/comparePairs.ts');
const { getAllFoodPages } = await import('../src/lib/foods/foodPageData.ts');

const words = s => s.trim().split(/\s+/).length;
const pairSlugs = new Set(getAllComparePairs().map(p => p.slug));
const foodSlugs = new Set(getAllFoodPages().map(f => f.slug));
const curatedPairs = CURATED.map(([x, y]) => [x, y].sort((p, q) => p.localeCompare(q)).join('-vs-'));

for (const k of Object.keys(COMPARE_NOTES)) assert.ok(pairSlugs.has(k), `compare note for unknown pair ${k}`);
for (const k of Object.keys(FOOD_NOTES)) assert.ok(foodSlugs.has(k), `food note for unknown food ${k}`);
for (const s of curatedPairs) assert.ok(COMPARE_NOTES[s], `curated pair missing note: ${s}`);
for (const s of new Set(CURATED.flat())) assert.ok(FOOD_NOTES[s], `curated food missing note: ${s}`);

for (const [k, n] of Object.entries(COMPARE_NOTES)) {
  const w = words([n.summary, ...n.body, n.chooseA, n.chooseB].join(' '));
  assert.ok(w >= 150 && w <= 250, `${k}: ${w} words (want 150-250)`);
}
for (const [k, n] of Object.entries(FOOD_NOTES)) {
  const w = words(n.body.join(' '));
  assert.ok(w >= 100 && w <= 160, `${k}: ${w} words (want 100-160)`);
}

// Pages without a note are not built, so built pages must never link to them.
const { getComparePairsForFood, isIndexedComparePair, isIndexedFood } = await import('../src/lib/compare/comparePairs.ts');
const { getRelatedFoods } = await import('../src/lib/foods/foodPageData.ts');
for (const slug of Object.keys(FOOD_NOTES)) {
  const food = getAllFoodPages().find(f => f.slug === slug);
  for (const r of getRelatedFoods(food, 4)) assert.ok(isIndexedFood(r.slug), `${slug} links to unbuilt food ${r.slug}`);
  for (const p of getComparePairsForFood(slug)) assert.ok(isIndexedComparePair(p.slug), `${slug} links to unbuilt pair ${p.slug}`);
}

console.log(`editorial notes OK: ${Object.keys(COMPARE_NOTES).length} pairs, ${Object.keys(FOOD_NOTES).length} foods`);
