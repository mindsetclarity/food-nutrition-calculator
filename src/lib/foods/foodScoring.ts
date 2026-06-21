import type { IndexedFood } from './foodIndex';
import { normalizeSynonyms, tokenizeFoodQuery } from './foodNormalization';

export function calculateScore(food: IndexedFood, query: string, queryTokens: string[]): number {
  let score = 0;
  const normalizedQuery = normalizeSynonyms(query);

  // 1. Exact display name match
  if (food.normalizedName === normalizedQuery) {
    score += 100;
  }
  
  // 2. Exact alias match
  if (food.normalizedAliases.includes(normalizedQuery)) {
    score += 90;
  }

  // 3. Starts with display name
  if (food.normalizedName.startsWith(normalizedQuery)) {
    score += 50;
  }

  // 4. Starts with alias
  if (food.normalizedAliases.some(alias => alias.startsWith(normalizedQuery))) {
    score += 40;
  }

  // 5. Token matching
  let matchedTokens = 0;
  for (const token of queryTokens) {
    if (food.tokenSet.has(token)) {
      matchedTokens++;
      score += 10;
    } else {
      // Partial token match
      if (Array.from(food.tokenSet).some(t => t.includes(token) || token.includes(t))) {
        score += 3;
        matchedTokens += 0.5;
      }
    }
  }

  // Boost if all tokens present
  if (matchedTokens >= queryTokens.length && queryTokens.length > 0) {
    score += 20;
  }

  // 6. Preparation state match (if the user typed 'cooked', favor the cooked one)
  if (food.preparationState) {
    const prepToken = food.preparationState.toLowerCase();
    if (queryTokens.includes(prepToken) || normalizedQuery.includes(prepToken)) {
      score += 15;
    }
  }

  // 7. Tie breakers (shorter name length means it's a more fundamental food if scores are equal)
  // We subtract a tiny fraction based on name length to prefer simpler matches
  score -= (food.displayName.length * 0.01);

  return score;
}
