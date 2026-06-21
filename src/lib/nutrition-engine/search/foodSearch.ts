import type { FoodSearchInput, FoodSearchResponse, FoodSearchResult, SearchIndexedFood } from './searchTypes';
import { normalizeSearchOptions, isSearchTooShort } from './searchGuards';
import { normalizeFoodQuery, tokenizeFoodQuery } from './normalizeQuery';
import { expandQueryWithSynonyms } from './synonymMap';
import { getDefaultLocalFoodSearchIndex } from './foodIndex';
import { scoreFoodSearchResult } from './foodScoring';
import { createWarning } from '../warnings';
import type { EngineWarning } from '../warnings';
import { createMemoryCache, MemoryCache, compactSearchResult } from '../performance';

const localSearchCache = createMemoryCache<FoodSearchResponse>({
  namespace: "local_search",
  maxEntries: 200,
  ttlMs: 1000 * 60 * 15 // 15 minutes
});

export function searchLocalFoods(input: FoodSearchInput): FoodSearchResponse {
  const options = normalizeSearchOptions(input);
  const warnings: EngineWarning[] = [];

  if (!options.query) {
    warnings.push(createWarning("NO_RESULTS", "Empty query."));
    return { query: "", normalizedQuery: "", results: [], total: 0, returned: 0, warnings };
  }

  if (isSearchTooShort(options.query, options.mode)) {
    warnings.push(createWarning("NO_RESULTS", "Query too short."));
    return { query: options.query, normalizedQuery: "", results: [], total: 0, returned: 0, warnings };
  }

  const normalizedQuery = normalizeFoodQuery(options.query);
  const cacheKey = MemoryCache.makeCacheKey([normalizedQuery, options.mode, options.limit]);

  const cached = localSearchCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const expandedQuery = expandQueryWithSynonyms(normalizedQuery);
  const tokens = tokenizeFoodQuery(expandedQuery);
  
  const index = getDefaultLocalFoodSearchIndex();
  
  const results: FoodSearchResult[] = [];

  for (const indexedFood of index) {
    const result = scoreFoodSearchResult(indexedFood, expandedQuery, tokens, options);
    if (result) {
      results.push(result);
    }
  }

  results.sort((a, b) => b.score - a.score);

  const returnedResults = results.slice(0, options.limit);

  if (returnedResults.length === 0) {
    warnings.push(createWarning("NO_RESULTS", "No foods found."));
  } else if (returnedResults.every(r => r.confidence.level === "low")) {
    warnings.push(createWarning("LOW_CONFIDENCE_MATCH", "Only weak matches found."));
  }

  return {
    query: options.query,
    normalizedQuery,
    results: returnedResults,
    total: results.length,
    returned: returnedResults.length,
    warnings: warnings.length > 0 ? warnings : undefined
  };

  localSearchCache.set(cacheKey, response);
  return response;
}

export function searchLocalFoodsByCategory(category: string, limit: number = 20): FoodSearchResult[] {
  const index = getDefaultLocalFoodSearchIndex();
  const results = index.filter(i => i.category === category);
  return results.slice(0, limit).map(i => scoreFoodSearchResult(i, category, [category], { query: category }) as FoodSearchResult).filter(Boolean);
}

export function getFoodByIdFromIndex(id: string): SearchIndexedFood | undefined {
  return getDefaultLocalFoodSearchIndex().find(i => i.id === id);
}

export function getFoodBySlugFromIndex(slug: string): SearchIndexedFood | undefined {
  return getDefaultLocalFoodSearchIndex().find(i => i.slug === slug);
}

export function getTopFoodsForDirectory(options?: { category?: string, limit?: number }): SearchIndexedFood[] {
  const index = getDefaultLocalFoodSearchIndex();
  const limit = options?.limit || 50;
  
  let filtered = index;
  if (options?.category) {
    filtered = filtered.filter(i => i.category === options.category);
  }
  
  // Return sorted alphabetically for directory
  return filtered.sort((a, b) => a.displayName.localeCompare(b.displayName)).slice(0, limit);
}

export function getRelatedFoodCandidates(foodId: string, limit: number = 4): SearchIndexedFood[] {
  const food = getFoodByIdFromIndex(foodId);
  if (!food) return [];
  
  const index = getDefaultLocalFoodSearchIndex();
  const candidates = index.filter(i => i.id !== foodId && (i.category === food.category || i.tags.some(t => food.tags.includes(t))));
  
  // Simple heuristic sort based on shared tags
  return candidates.sort((a, b) => {
    const sharedA = a.tags.filter(t => food.tags.includes(t)).length;
    const sharedB = b.tags.filter(t => food.tags.includes(t)).length;
    return sharedB - sharedA;
  }).slice(0, limit);
}
