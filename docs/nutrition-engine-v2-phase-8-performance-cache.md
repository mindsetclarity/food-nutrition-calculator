# Nutrition Engine V2 — Phase 8: Performance + Cache

## 1. Phase 8 Purpose
Make the Nutrition Engine V2 fast, scalable, and stable through memory-only caching, request deduplication, and payload limiting, without changing nutrition truth.

## 2. Files Inspected
- `src/lib/nutrition-engine/search/*`
- `src/lib/nutrition-engine/sources/*`
- `src/lib/nutrition-engine/recipe/*`
- `src/pages/api/recipe/calculate.ts`

## 3. Performance Hotspots Found
1. **Local Search:** Normalized queries were re-scoring the entire index on every call.
2. **USDA Search/Details:** Called directly without caching, causing duplicate external hits.
3. **Source Resolver:** Duplicate concurrent requests weren't deduped.
4. **Recipe Resolution:** Repeated ingredients in the same recipe (e.g. "1 cup oats", "1/2 cup oats") caused duplicated resolver/API requests.

## 4. Cache Module Summary
Created `MemoryCache<T>` in `src/lib/nutrition-engine/performance/memoryCache.ts`. It provides an in-memory TTL-based map with auto-eviction of oldest entries if the size limit is exceeded.

## 5. Request Dedupe Summary
Created `RequestDeduper<T>` in `src/lib/nutrition-engine/performance/requestDeduper.ts`. It stores in-flight promises so concurrent identical requests await the same promise instead of duplicating work.

## 6. Result Limiter Summary
Created `resultLimiter.ts` with `compactSearchResult`, `compactFoodSourceResult`, and `compactRecipeIngredientResult` to strip out heavy internal fields (`providerData`, `tokenSet`) before sending to the UI.

## 7. Local Search Optimization
Added `localSearchCache` (15m TTL) caching `FoodSearchResponse`. Avoids re-scoring the 1000+ item index for the exact same query in the same minute.

## 8. USDA Search/Details Optimization
Added `usdaSearchCache` (10m TTL) and `usdaDetailsCache` (15m TTL). Added request deduper. Prevents rate-limiting on identical rapid API queries.

## 9. Source Resolver Optimization
Added `sourceResolverCache` (5m TTL). Short TTL prevents stale merging if USDA becomes available, but smooths out bursty searches.

## 10. Recipe Optimization
Added an inline `localDeduper` to `resolveIngredients`. When parsing a recipe, identically spelled/quantified ingredients (like two "1 tbsp sugar" lines) reuse the exact same resolution promise, cutting API/local queries significantly.

## 11. LLM Parser Performance Guard
The LLM parser itself is inherently bounded by Phase 7 guards (max input length, timeout). Since it deals with personal user text, we do not permanently cache its results across requests globally.

## 12. API Optimization Summary
The recipe calculation API now implicitly benefits from the recipe-level ingredient request deduper. `calculateRecipeEngine` is now much more efficient on heavy identical recipes.

## 13. Security/Privacy Rules
No raw user recipe text is permanently cached. No API keys are stored in cache keys. Memory is volatile.

## 14. Serverless Cache Limitations
Memory caching is best-effort. In serverless edge functions, the cache starts cold for new instances. However, request deduping within a single execution cycle is still highly effective.

## 15. What was intentionally not changed
- Math remains purely deterministic.
- USDA hierarchy remains unchanged.
- Frontend UI components have not been modified yet.

## 16. Phase 9 Recommendation
Now that the engine is fast and stable, proceed to Phase 9: safely swapping out the old `NutritionCalculator` and `RecipeCalculator` components to use the V2 Engine API.

Nutrition Engine V2 Phase 8 performance cache layer complete.
