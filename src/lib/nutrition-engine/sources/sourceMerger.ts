import type { FoodSourceSearchResult } from './sourceTypes';

export function mergeFoodSourceResults(
  usdaResults: FoodSourceSearchResult[],
  localResults: FoodSourceSearchResult[],
  options: { limit?: number; preferUsda?: boolean }
): FoodSourceSearchResult[] {
  const merged: FoodSourceSearchResult[] = [];
  const seenNames = new Set<string>();

  const limit = options.limit || 15;
  const preferUsda = options.preferUsda ?? true;

  // Function to add result if not a duplicate
  const tryAdd = (result: FoodSourceSearchResult) => {
    if (merged.length >= limit) return false;
    
    // Normalize name for dup check
    let dupName = result.displayName.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    
    // Exact or near exact dupes:
    if (seenNames.has(dupName)) {
      return true; // skip, but keep going
    }
    
    seenNames.add(dupName);
    merged.push(result);
    return true;
  };

  if (preferUsda) {
    // USDA first
    for (const u of usdaResults) {
      tryAdd(u);
    }
    // Then local fallback
    for (const l of localResults) {
      tryAdd(l);
    }
  } else {
    // Local first
    for (const l of localResults) {
      tryAdd(l);
    }
    for (const u of usdaResults) {
      tryAdd(u);
    }
  }

  return merged;
}
