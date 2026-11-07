/**
 * Checks the copy-paste recipe label. It lands on other people's sites, so it must be
 * self-contained and must never let a recipe name inject markup.
 *
 *   node --experimental-strip-types scripts/test-embed.mjs
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

const { buildEmbedHtml } = await import('../src/lib/nutrition-label/embedLabel.ts');

const nutrients = { calories: 312.4, protein: 21.26, carbohydrates: 30, fat: 11.7, fiber: 4, sugar: 6.2, sodium: 460, saturatedFat: null };
const html = buildEmbedHtml({ recipeName: 'Chicken Soup', servings: 4, nutrients });

assert.match(html, /Chicken Soup/);
assert.match(html, /4 servings per recipe/);
assert.match(html, /312/, 'calories rounded');
assert.doesNotMatch(html, /312\.4/);
assert.match(html, /Total Fat/);
assert.match(html, /15%/, '11.7 g fat is 15% of the 78 g Daily Value');
assert.match(html, /20%/, '460 mg sodium is 20% of the 2,300 mg Daily Value');

// A nutrient with no data is left out, not shown as zero.
assert.doesNotMatch(html, /Saturated Fat/);
assert.doesNotMatch(html, /Cholesterol/);

// Self-contained: no scripts, classes, external styles or images.
assert.doesNotMatch(html, /<script|<style|<link|<img|<iframe|class=|onclick|onerror/i);

// The credit: visible, and only the domain is linked.
assert.match(html, /Estimate by <a href="https:\/\/foodnutritioncalculator\.com"[^>]*>foodnutritioncalculator\.com<\/a>/);
assert.equal((html.match(/<a /g) ?? []).length, 1, 'exactly one link');
assert.match(html, /Not for commercial packaging/);

// Host themes that restyle every element must not leave pale text on the white box.
for (const tag of html.match(/<(?:div|span|h3)[ >][^>]*>?/g) ?? []) assert.match(tag, /color:#000/, `no colour on ${tag}`);
assert.ok(/<div/.test(html), 'label has markup to check');
assert.match(html, /overflow-wrap:anywhere/, 'a long name cannot overflow the box');
assert.match(html, /margin:0 0 16px/, 'following text does not touch the box');

// Injection through the recipe name.
const evil = buildEmbedHtml({ recipeName: '<img src=x onerror=alert(1)>"\'&', servings: 2, nutrients });
assert.doesNotMatch(evil, /<img/);
assert.match(evil, /&lt;img/);
assert.doesNotMatch(evil.replace(/&[a-z#0-9]+;/gi, ''), /"'/);

// Values that are not numbers must not reach the page either.
const bad = buildEmbedHtml({ recipeName: 'x', servings: 2, nutrients: { ...nutrients, calories: '<b>9</b>', fat: NaN } });
assert.doesNotMatch(bad, /<b>|NaN/);

// No name and one serving still read properly.
const plain = buildEmbedHtml({ recipeName: '   ', servings: 1, nutrients });
assert.match(plain, /1 serving per recipe/);
assert.doesNotMatch(plain, /<h3/);

console.log('embed checks passed');
