import { fetchUsdaJson } from './usdaClient';
import { FoodSourceSearchInput, FoodSourceSearchResult } from './sourceTypes';
import { mapUsdaSearchFoodToSearchResult } from './usdaMapper';
import { EngineResult, createRecoverableError, createWarning } from '../index';
import { createMemoryCache, createRequestDeduper, MemoryCache } from '../performance';

const usdaSearchCache = createMemoryCache<FoodSourceSearchResult[]>({
  namespace: "usda_search",
  maxEntries: 100,
  ttlMs: 10 * 60 * 1000 // 10 minutes
});

const usdaSearchDeduper = createRequestDeduper<EngineResult<FoodSourceSearchResult[]>>();

export async function searchUsdaFoods(input: FoodSourceSearchInput): Promise<EngineResult<FoodSourceSearchResult[]>> {
  if (!input.query) {
    return {
      ok: true,
      data: [],
      warnings: [createWarning("NO_RESULTS", "Empty query")],
      sourceSummary: { primarySource: "usda", sourcesUsed: ["usda"], hasUsda: true, hasLocal: false, hasEstimated: false, hasLlmParsed: false, hasPartialData: false, labels: [], warnings: [] },
      confidence: { level: "high", reasons: [], needsReview: false }
    };
  }

  const cacheKey = MemoryCache.makeCacheKey([input.query, input.limit || 15]);
  const cached = usdaSearchCache.get(cacheKey);
  if (cached) {
    return {
      ok: true,
      data: cached,
      warnings: [],
      sourceSummary: { primarySource: "usda", sourcesUsed: ["usda"], hasUsda: true, hasLocal: false, hasEstimated: false, hasLlmParsed: false, hasPartialData: false, labels: ["USDA FoodData Central"], warnings: [] },
      confidence: { level: "high", reasons: ["Cached USDA search"], needsReview: false }
    };
  }

  return usdaSearchDeduper.dedupeRequest(cacheKey, async () => {
    const pageSize = Math.min(input.limit || 15, 25);
    
    const response = await fetchUsdaJson('/foods/search', {
      query: input.query!,
      pageSize,
      requireAllWords: "true"
    });

    if (!response.ok) {
      return response as EngineResult<any>; // Propagate safe error
    }

    const data = response.data;
    if (!data || !Array.isArray(data.foods)) {
      return {
        ok: false,
        error: createRecoverableError("USDA_BAD_RESPONSE", "Invalid USDA response format", "USDA search returned invalid data. Showing local estimates where available."),
        warnings: [],
        fallbackAvailable: true
      };
    }

    const results = data.foods.map(mapUsdaSearchFoodToSearchResult);
    
    usdaSearchCache.set(cacheKey, results);

    return {
      ok: true,
      data: results,
      warnings: results.length === 0 ? [createWarning("USDA_EMPTY_RESULT", "No USDA results found")] : [],
      sourceSummary: response.sourceSummary,
      confidence: response.confidence
    };
  });
}
