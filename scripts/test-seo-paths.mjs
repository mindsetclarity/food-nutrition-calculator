/**
 * Checks for canonical URL paths.
 *
 *   node --experimental-strip-types scripts/test-seo-paths.mjs
 *
 * The bug these guard: with build.format 'file', prerendered pages see
 * Astro.url.pathname as "/foods/x.html", which leaked into canonical tags.
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

const { cleanPathname, buildCanonicalUrl } = await import('../src/lib/seo/metadata.ts');

const cases = [
  ['/foods/apple.html', '/foods/apple'],
  ['/foods/apple/', '/foods/apple'],
  ['/foods/apple', '/foods/apple'],
  ['/index.html', '/'],
  ['/learn/index.html', '/learn'],
  ['/', '/'],
];
for (const [input, want] of cases) assert.equal(cleanPathname(input), want, input);
assert.equal(buildCanonicalUrl('/compare/apple-vs-banana.html'), 'https://foodnutritioncalculator.com/compare/apple-vs-banana');

console.log(`seo path checks passed (${cases.length + 1})`);
