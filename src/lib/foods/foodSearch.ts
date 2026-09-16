import type { FoodItem } from '../nutrition/types';
import { getSearchIndex } from './foodIndex';
import { calculateScore } from './foodScoring';
import { normalizeSynonyms, tokenizeFoodQuery } from './foodNormalization';

export interface SearchOptions {
  limit?: number;
  category?: string;
  source?: string;
}

export interface SearchResult {
  item: FoodItem;
  score: number;
  matchReason?: string;
}

export function searchLocalFoods(query: string, options: SearchOptions = {}): SearchResult[] {
  const index = getSearchIndex();
  const limit = options.limit || 15;

  if (!query || query.trim() === '') {
    // If no query, but category provided, just return top items in category
    if (options.category) {
      return index
        .filter(f => f.category === options.category)
        .slice(0, limit)
        .map(f => ({ item: f.item, score: 1 }));
    }
    return [];
  }

  const queryTokens = tokenizeFoodQuery(query);
  const normalizedQuery = normalizeSynonyms(query);
  
  if (queryTokens.length === 0 && !normalizedQuery) {
    return [];
  }

  const results: SearchResult[] = [];

  for (const food of index) {
    if (options.category && food.category !== options.category) {
      continue;
    }
    if (options.source && food.source !== options.source) {
      continue;
    }

    const score = calculateScore(food, query, queryTokens);
    
    if (score > 0) {
      let matchReason = undefined;
      if (food.normalizedName === normalizedQuery) matchReason = 'Exact match';
      else if (food.normalizedAliases.includes(normalizedQuery)) matchReason = 'Alias match';
      
      results.push({ item: food.item, score, matchReason });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}
