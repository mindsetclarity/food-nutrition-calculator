import type { SearchIndexedFood, FoodSearchInput, FoodSearchResult, FoodSearchMatchType } from './searchTypes';
import { getSynonymCandidates } from './synonymMap';
import { highConfidence, mediumConfidence, lowConfidence } from '../confidence';
import { hasPartialNutrientData } from '../engineGuards';

export function simpleSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.8;
  return 0;
}

export function isLikelyTypoMatch(query: string, target: string): boolean {
  if (query.length < 4 || target.length < 4) return false;
  if (target.startsWith(query.substring(0, 3))) return true;
  return false;
}

export function scoreFoodSearchResult(
  indexedFood: SearchIndexedFood,
  normalizedQuery: string,
  tokens: string[],
  options: FoodSearchInput
): FoodSearchResult | null {
  if (!normalizedQuery) return null;

  let score = 0;
  let matchType: FoodSearchMatchType = "fallback";
  let matchReason = "";

  const exactNameMatch = indexedFood.normalizedName === normalizedQuery;
  const exactSearchNameMatch = indexedFood.normalizedSearchName === normalizedQuery;
  const exactAliasMatch = indexedFood.normalizedAliases.includes(normalizedQuery);
  
  const synonyms = getSynonymCandidates(normalizedQuery);
  const exactSynonymMatch = synonyms.some(s => indexedFood.normalizedName === s || indexedFood.normalizedAliases.includes(s));

  const startsWithNameMatch = indexedFood.normalizedName.startsWith(normalizedQuery);
  const startsWithAliasMatch = indexedFood.normalizedAliases.some(a => a.startsWith(normalizedQuery));

  const allTokensPresent = tokens.every(t => indexedFood.tokenSet.has(t));
  
  let partialTokenMatches = 0;
  for (const t of tokens) {
    if (indexedFood.tokenSet.has(t) || Array.from(indexedFood.tokenSet).some(st => st.includes(t) || t.includes(st))) {
      partialTokenMatches++;
    }
  }

  let isPreparationMatch = false;
  if (indexedFood.preparationState && tokens.includes(indexedFood.preparationState)) {
    isPreparationMatch = true;
  }

  let isCategoryMatch = false;
  if (indexedFood.category && options.category && indexedFood.category === options.category) {
    isCategoryMatch = true;
  } else if (indexedFood.category && tokens.includes(indexedFood.category)) {
    isCategoryMatch = true;
  }

  let isTagMatch = false;
  if (options.tags && options.tags.some(tag => indexedFood.tags.includes(tag))) {
    isTagMatch = true;
  }

  let isFuzzyMatch = false;
  if (!exactNameMatch && !exactAliasMatch && !allTokensPresent && !startsWithNameMatch) {
    if (isLikelyTypoMatch(normalizedQuery, indexedFood.normalizedName)) {
      isFuzzyMatch = true;
    }
  }

  // Scoring Logic
  if (exactNameMatch) { score += 1000; matchType = "exact_name"; matchReason = "Exact name match"; }
  else if (exactSearchNameMatch) { score += 980; matchType = "exact_name"; matchReason = "Exact canonical name match"; }
  else if (exactAliasMatch) { score += 950; matchType = "exact_alias"; matchReason = "Exact alias match"; }
  else if (exactSynonymMatch) { score += 900; matchType = "synonym"; matchReason = "Synonym match"; }
  else if (startsWithNameMatch) { score += 750; matchType = "starts_with_name"; matchReason = "Name starts with query"; }
  else if (startsWithAliasMatch) { score += 700; matchType = "starts_with_alias"; matchReason = "Alias starts with query"; }
  else if (allTokensPresent) { score += 600; matchType = "all_tokens"; matchReason = "All keywords match"; }
  else if (isFuzzyMatch) { score += 150; matchType = "fuzzy"; matchReason = "Fuzzy spelling match"; }
  else if (partialTokenMatches > 0) { score += (partialTokenMatches * 30); matchType = "partial_tokens"; matchReason = "Partial keyword match"; }

  if (score === 0) return null; // No match

  if (isPreparationMatch) score += 150;
  if (isCategoryMatch) score += 100;
  if (isTagMatch) score += 80;

  if (options.requireCoreNutrients) {
    if (hasPartialNutrientData(indexedFood.food.nutrientsPer100g)) {
      score -= 200; // Penalty
    }
  }

  if (indexedFood.food.isEstimated && options.includeEstimated === false) {
    score -= 500;
  }

  if (score <= 0) return null;

  let confidenceLevel;
  if (score >= 900) {
    confidenceLevel = highConfidence([matchReason]);
  } else if (score >= 600) {
    confidenceLevel = mediumConfidence([matchReason]);
  } else {
    confidenceLevel = lowConfidence([matchReason]);
  }

  return {
    food: indexedFood.food,
    id: indexedFood.id,
    slug: indexedFood.slug,
    displayName: indexedFood.displayName,
    category: indexedFood.food.category,
    source: indexedFood.source,
    sourceLabel: indexedFood.sourceLabel,
    isEstimated: indexedFood.food.isEstimated,
    caloriesPreview: indexedFood.caloriesPreview,
    proteinPreview: indexedFood.proteinPreview,
    defaultServingLabel: indexedFood.defaultServingLabel,
    score,
    matchType,
    matchReason,
    confidence: confidenceLevel
  };
}
