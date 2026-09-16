# Final QA & Regression Checklist

Use this checklist prior to major product version updates or architectural shifts to ensure core application stability.

## Core Builds
- [ ] `npm run build` succeeds without warnings or static tracebacks.
- [ ] `npm run dev` boots flawlessly.

## API Limits & Fallbacks
- [ ] `/api/foods/search` handles lengths `< 2` safely.
- [ ] `/api/foods/search` handles missing/timed-out USDA credentials via local fallback.
- [ ] `/api/parse-meal` rejects excessive prompt length (e.g., > 1500 chars).
- [ ] No `.env` secrets or runtime tracebacks are leaked in API bodies.

## Nutrition Engine
- [ ] Outputting `NaN`, `undefined` or `Infinity` into final macros is blocked.
- [ ] Changing a recipe from `2` servings to `4` divides per-serving totals accurately.
- [ ] Nutrient totals are calculated purely by the local deterministic math engine, never by the LLM. 

## UI / Layout
- [ ] The application remains responsive at `360px` with no horizontal overflow.
- [ ] Component placeholders (e.g., empty search states) remain styled safely.
- [ ] Source badges properly identify data origins (USDA vs Local).
- [ ] Missing nutrient fields render as `—` rather than collapsing UI tables.

## SEO & Routing
- [ ] `sitemap.xml` points to production domain exclusively.
- [ ] `robots.txt` blocks `/api/` from web crawlers.
- [ ] `/foods/invalid-slug` and `/learn/invalid-slug` resolve gracefully to `404`.
- [ ] Schema structures render safely without injecting raw unescaped inputs.
