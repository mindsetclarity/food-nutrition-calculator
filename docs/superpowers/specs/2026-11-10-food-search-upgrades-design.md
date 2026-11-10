# Food search upgrades: portion calories and compare links

## Why
People search "calories in a medium banana" or "a cup of rice"; food pages listed portion weights only. Readers who land on a food page also have no quick way to compare it with another food.

## Goals / non-goals
- Show calories and protein for each listed portion on food pages (static, so Google sees it).
- A "Compare with another food" button on food pages that opens /compare-foods with the food filled in; `?a=…&b=…` (up to `d`) prefills; the URL follows the picked foods so a comparison can be shared.
- Non-goal: compare checkboxes inside search results (more UI for less value).
- Anti-goal: new indexable URLs. /compare-foods already has a self canonical, so `?a=` variants consolidate to it.

## Approaches
- **Compute from per-100 g values (chosen).** No new data; portions already carry grams.
- Store per-portion nutrients in data: duplicates values, drifts. Rejected.
- Compare link by food name (search first result): can pick the wrong food. Rejected for slug/USDA-id tokens resolved by /api/foods/details.

## Design
- `src/lib/foods/portions.ts`: `portionRows(food)` → `{ label, grams, calories, protein }[]`; skips portions with no positive grams, dedupes, always includes 100 g; calories rounded to whole kcal, protein to 0.1 g, null when unknown.
- `src/lib/compare/compareLink.ts`: `compareToken(food)` (local → slug, USDA → `usda-<fdcId>`, others none), `compareHref(tokens)`, `parseCompareParams(search)` (validates tokens, max 4, drops unknown shapes).
- `FoodServingSizes.astro` becomes a portion table. Food page gets the compare button. `CompareFoodsShell` loads params on start and `history.replaceState`s after each change.
- Test `scripts/test-food-upgrades.mjs` in prebuild.
