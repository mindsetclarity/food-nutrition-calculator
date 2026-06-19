// src/lib/performance/clientCache.ts

export const clientCache = new Map<string, { data: any; expiry: number }>();

export function getFromCache(key: string) {
  const item = clientCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    clientCache.delete(key);
    return null;
  }
  return item.data;
}

export function setInCache(key: string, data: any, ttlMinutes = 15) {
  if (clientCache.size > 100) {
    const oldestKey = clientCache.keys().next().value;
    if (oldestKey) clientCache.delete(oldestKey);
  }
  clientCache.set(key, { data, expiry: Date.now() + ttlMinutes * 60 * 1000 });
}

export function generateCacheKey(endpoint: string, params: Record<string, string>) {
  const url = new URL(endpoint, window.location.origin);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}
