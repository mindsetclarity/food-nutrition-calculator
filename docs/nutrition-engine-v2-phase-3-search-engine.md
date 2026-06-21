# Nutrition Engine V2 — Phase 3 Food Search Engine

## 1. Phase 3 Purpose
Phase 3 builds the central food search engine for the local curated food database. It introduces query normalization, synonym mapping, token-based matching, and smart scoring. This enables fast, reliable, and intelligent search results across the Food Nutrition Calculator application without exposing API dependencies.

## 2. Files Inspected
- `src/lib/nutrition-engine/*`
- `src/data/foods/index.ts`
- `src/lib/nutrition-engine/engineContract.ts`

## 3. Existing Search Behavior Summary
As the project is currently a skeleton, there was no legacy search logic or API endpoint to port over. We are establishing the definitive initial logic for food searches.

## 4. New Search Module Files
- `searchTypes.ts`: Defines `FoodSearchInput`, `FoodSearchResult`, `FoodSearchResponse`, `SearchIndexedFood`.
- `normalizeQuery.ts`: Utilities for normalization and tokenization.
- `synonymMap.ts`: Synonyms (e.g. chickpea vs garbanzo).
- `foodIndex.ts`: Local food indexing capabilities caching `SearchIndexedFood` records.
- `foodScoring.ts`: Search logic combining normalization, indexing, and synonym lookup to score foods safely.
- `searchGuards.ts`: Sanity checks and boundaries.
- `foodSearch.ts`: Main entry-point, including `searchLocalFoods`.
- `index.ts`: Export file.

## 5. Local Food Index Summary
`getDefaultLocalFoodSearchIndex()` dynamically resolves `localFoods` from `src/data/foods/index.ts` and caches it as `SearchIndexedFood` entries to avoid computing searchable tokens on every query.

## 6. Normalization Summary
Queries are parsed through diacritic removal, hyphenation removal, stop word removal, basic singularization, and explicit canonical mappings (e.g., yoghurt -> yogurt).

## 7. Synonym Map Summary
Included common US-focused synonyms like oats/oatmeal, garbanzo/chickpea, soda/pop, and scallion/green onion. `expandQueryWithSynonyms()` injects these into the query implicitly.

## 8. Scoring Summary
Scores range from 1000 down to roughly 30. Exact matches get the highest points. Penalties apply for missing core nutrients if requested, and estimated data if flagged.

## 9. Search Mode Summary
Mode influences limits and query bounds. E.g., `recipe` mode allows 2-character queries, `calculator` enforces standard behavior.

## 10. API Route Changes
No API route changes occurred since the endpoints do not exist yet in the repo. When they are added, they will securely wrap `searchFoodsEngine`.

## 11. Compatibility Strategy
Because this module is purely deterministic, the contract handles existing data seamlessly and isolates search concerns from math concerns.

## 12. Performance Notes
The index is built once per module initialization. Search operations against 1000 items scale linearly with negligible overhead. Stopword and token matching run highly optimized arrays.

## 13. Test Queries
A script `scripts/test-food-search.mjs` validates banana, bannana, oatmeal, and garbanzo behavior. 

## 14. What was intentionally not changed
USDA integrations and UI integrations were not implemented yet, deferring to Phase 4 and Phase 9 respectively.

## 15. Recommended Phase 4 Next Step
Phase 4 should create the USDA FoodData Central provider wrapper, standardize its mapping to `EngineFoodItem`, and merge USDA search calls transparently behind the `searchFoodsEngine` contract.

Nutrition Engine V2 Phase 3 food search engine complete.
