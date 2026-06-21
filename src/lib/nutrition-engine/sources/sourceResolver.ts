import { searchUsdaFoods } from './usdaSearch';
import { getUsdaFoodDetails } from './usdaDetails';
import { searchLocalFoodSource, getLocalFoodSourceById } from './localFoodSource';
import { mergeFoodSourceResults } from './sourceMerger';
import { FoodSourceSearchInput, FoodSourceSearchResult, SourceResolverResult, ResolvedFoodSource } from './sourceTypes';
import { EngineResult, createRecoverableError, createWarning } from '../index';
import { hasUsdaApiKey } from './usdaClient';
import { createMemoryCache, createRequestDeduper, MemoryCache } from '../performance';

const sourceResolverCache = createMemoryCache<SourceResolverResult>({
  namespace: "source_resolver",
  maxEntries: 100,
  ttlMs: 5 * 60 * 1000 // 5 minutes
});

const sourceResolverDeduper = createRequestDeduper<EngineResult<SourceResolverResult>>();

export async function searchFoodSources(input: FoodSourceSearchInput): Promise<EngineResult<FoodSourceSearchResult[]>> {
  const res = await resolveFoodSources(input);
  if (!res.ok) return res as any;
  return {
    ok: true,
    data: res.data.mergedResults,
    warnings: res.warnings,
    sourceSummary: res.data.sourceSummary,
    confidence: { level: "high", reasons: [], needsReview: false }
  };
}

export async function resolveFoodSources(input: FoodSourceSearchInput): Promise<EngineResult<SourceResolverResult>> {
  const cacheKey = MemoryCache.makeCacheKey([input.query, input.includeUsda, input.includeLocal, input.preferUsda, input.limit]);
  
  const cached = sourceResolverCache.get(cacheKey);
  if (cached) {
    return {
      ok: true,
      data: cached,
      warnings: cached.warnings,
      sourceSummary: cached.sourceSummary,
      confidence: { level: "high", reasons: ["Cached source resolver"], needsReview: false }
    };
  }

  return sourceResolverDeduper.dedupeRequest(cacheKey, async () => {
    let usdaResults: FoodSourceSearchResult[] = [];
    let localResults: FoodSourceSearchResult[] = [];
    const warnings = [];
    let fallbackUsed = false;
    let hasUsda = false;

    const includeUsda = input.includeUsda !== false;
    const includeLocal = input.includeLocal !== false;

    if (includeUsda) {
      if (hasUsdaApiKey()) {
        const usdaRes = await searchUsdaFoods(input);
        if (usdaRes.ok) {
          usdaResults = usdaRes.data;
          hasUsda = true;
        } else {
          warnings.push(createWarning("LOCAL_FALLBACK_USED", usdaRes.error.safeMessage));
          fallbackUsed = true;
        }
      } else {
        warnings.push(createWarning("USDA_KEY_MISSING", "USDA API Key not found, using local fallback."));
        fallbackUsed = true;
      }
    }

    if (includeLocal) {
      const localRes = await searchLocalFoodSource(input);
      if (localRes.ok) {
        localResults = localRes.data;
      }
    }

    const mergedResults = mergeFoodSourceResults(usdaResults, localResults, { limit: input.limit, preferUsda: input.preferUsda });

    if (mergedResults.length === 0) {
      return {
        ok: false,
        error: createRecoverableError("FOOD_SOURCE_NOT_FOUND", "No food found", "No matching food source was found."),
        warnings,
        fallbackAvailable: false
      };
    }

    const hasLocal = localResults.length > 0 || fallbackUsed;
    
    const resultData: SourceResolverResult = {
      query: input.query,
      usdaResults,
      localResults,
      mergedResults,
      sourceSummary: {
        primarySource: hasUsda && usdaResults.length > 0 ? "usda" : "local",
        sourcesUsed: hasUsda ? ["usda", "local"] : ["local"],
        hasUsda,
        hasLocal,
        hasEstimated: mergedResults.some(r => r.isEstimated),
        hasLlmParsed: false,
        hasPartialData: false,
        labels: hasUsda ? ["USDA FoodData Central", "Local fallback"] : ["Local fallback"],
        warnings
      },
      warnings,
      fallbackUsed
    };

    // Cache the result
    sourceResolverCache.set(cacheKey, resultData);

    return {
      ok: true,
      data: resultData,
      warnings,
      sourceSummary: resultData.sourceSummary,
      confidence: { level: "high", reasons: [], needsReview: false }
    };
  });
}

export async function resolveBestFoodSource(provider: string, providerFoodId: string): Promise<EngineResult<ResolvedFoodSource>> {
  if (provider === "usda") {
    if (hasUsdaApiKey()) {
      const res = await getUsdaFoodDetails(providerFoodId);
      if (res.ok) return res;
      // if USDA fails, we can't trivially fallback without searching local by name again.
      return {
        ok: false,
        error: res.error,
        warnings: [],
        fallbackAvailable: false
      };
    } else {
      return {
        ok: false,
        error: createRecoverableError("USDA_KEY_MISSING", "Key missing", "USDA search is unavailable right now."),
        warnings: [],
        fallbackAvailable: true
      };
    }
  } else {
    return await getLocalFoodSourceById(providerFoodId);
  }
}
