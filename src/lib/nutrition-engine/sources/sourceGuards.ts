import { FoodSourceSearchResult } from './sourceTypes';

export function sanitizeFoodSourceQuery(query: string | null | undefined): string {
  if (!query) return '';
  return query.trim().substring(0, 120);
}

export function clampSourceLimit(limit: number | undefined): number {
  if (typeof limit !== 'number' || isNaN(limit) || limit <= 0) return 15;
  return Math.min(Math.max(limit, 1), 50);
}

export function isValidFdcId(value: any): boolean {
  return typeof value === 'string' && /^\d+$/.test(value) || typeof value === 'number' && Number.isInteger(value) && value > 0;
}

export function isSafeProvider(provider: any): boolean {
  const allowed = ["usda", "local_curated", "local_estimated", "unknown"];
  return typeof provider === 'string' && allowed.includes(provider);
}

export function stripRawProviderDataForClient(result: FoodSourceSearchResult): FoodSourceSearchResult {
  const { raw, ...safeResult } = result;
  return safeResult;
}

export function ensureNoSecretInError(error: any): string {
  const msg = String(error?.message || error || "");
  // Simple check to avoid leaking things that look like keys
  if (/[A-Za-z0-9_]{32,}/.test(msg)) {
    return "An internal service error occurred.";
  }
  return msg;
}

export function ensureSourceLabel(result: FoodSourceSearchResult): string {
  return result.sourceLabel || "Unknown source";
}
