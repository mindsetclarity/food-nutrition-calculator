export function clampLimit(limit: number | undefined, defaultLimit: number, maxLimit: number): number {
  if (limit === undefined || limit <= 0) return defaultLimit;
  return Math.min(limit, maxLimit);
}

export function limitResults<T>(results: T[], limit: number): T[] {
  if (!Array.isArray(results)) return [];
  return results.slice(0, limit);
}

export function removeInternalFields(value: any): any {
  if (!value || typeof value !== 'object') return value;
  
  if (Array.isArray(value)) {
    return value.map(removeInternalFields);
  }

  const result: any = {};
  for (const [k, v] of Object.entries(value)) {
    if (!k.startsWith('_')) {
      result[k] = removeInternalFields(v);
    }
  }
  return result;
}

export function compactFoodSourceResult(result: any): any {
  if (!result) return result;
  // Strip raw provider data if not needed, keep core display fields
  const { providerData, tokenSet, searchableText, ...compact } = result;
  return removeInternalFields(compact);
}

export function compactSearchResult(result: any): any {
  if (!result) return result;
  const { food, ...compact } = result;
  // If we need some food details:
  if (food) {
    compact.food = {
      id: food.id,
      displayName: food.displayName,
      source: food.source,
      sourceLabel: food.sourceLabel,
      nutrientsPer100g: food.nutrientsPer100g, // often needed by UI
      isEstimated: food.isEstimated,
    };
  }
  return compactFoodSourceResult(compact);
}

export function compactRecipeIngredientResult(result: any): any {
  if (!result) return result;
  const { resolvedFood, ...compact } = result;
  if (resolvedFood) {
    compact.resolvedFood = compactFoodSourceResult(resolvedFood);
  }
  return compact;
}
