import type { FoodSearchInput, FoodSearchMode } from './searchTypes';

export function sanitizeSearchQuery(query: string | undefined | null): string {
  if (!query) return '';
  return query.trim().substring(0, 120);
}

export function isValidSearchQuery(query: string): boolean {
  return query.trim().length > 0;
}

export function isSearchTooShort(query: string, mode?: FoodSearchMode): boolean {
  const minLength = mode === 'recipe' ? 2 : 1;
  return query.trim().length < minLength;
}

export function isSearchTooLong(query: string): boolean {
  return query.length > 120;
}

export function clampSearchLimit(limit?: number, mode?: FoodSearchMode): number {
  if (typeof limit !== 'number' || isNaN(limit) || limit <= 0) {
    return mode === 'directory' ? 50 : 15;
  }
  return Math.min(Math.max(limit, 1), 100);
}

export function safeSearchMode(mode?: any): FoodSearchMode {
  const validModes: FoodSearchMode[] = ["calculator", "recipe", "directory", "compare", "meal"];
  return validModes.includes(mode) ? mode : "calculator";
}

export function normalizeSearchOptions(options: Partial<FoodSearchInput>): FoodSearchInput {
  return {
    query: sanitizeSearchQuery(options.query),
    limit: clampSearchLimit(options.limit, options.mode),
    category: options.category,
    tags: Array.isArray(options.tags) ? options.tags : undefined,
    preparationState: options.preparationState,
    includeEstimated: options.includeEstimated ?? true,
    includePartial: options.includePartial ?? true,
    requireCoreNutrients: options.requireCoreNutrients ?? false,
    sourcePreference: options.sourcePreference || "any",
    mode: safeSearchMode(options.mode)
  };
}
