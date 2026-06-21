export function isSafeCacheKey(value: string): boolean {
  if (!value) return false;
  if (value.length > 500) return false; // Prevents huge keys (e.g. raw recipe paragraphs)
  
  const lower = value.toLowerCase();
  // Prevent caching of keys that might contain sensitive secrets accidentally
  if (lower.includes("api_key") || lower.includes("bearer") || lower.includes("token=") || lower.includes("password")) {
    return false;
  }
  return true;
}

export function sanitizeCacheKeyPart(value: string | number | undefined | null): string {
  if (value === undefined || value === null) return "";
  const str = String(value).trim();
  // Strip non-alphanumeric/spaces for simple safety, though maybe overkill. 
  // Let's just limit length to 200 per part.
  return str.slice(0, 200);
}

export function hashLongKey(value: string): string {
  // Simple fast string hash for memory caching if a key needs to be long
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return `h_${Math.abs(hash).toString(36)}_${value.length}`;
}

export function shouldCacheQuery(query: string): boolean {
  if (!query || query.trim().length === 0) return false;
  if (query.length > 100) return false; // Probably not a normal food query
  return true;
}

export function shouldSkipCacheForInput(input: any): boolean {
  if (!input) return true;
  // If input explicitly asks to bypass cache (could add feature later)
  return false;
}

export function isSafeResultLimit(limit: number): boolean {
  return limit > 0 && limit <= 100;
}

export function isLargePayload(value: any): boolean {
  return safeJsonSizeEstimate(value) > 100000; // > ~100kb is large
}

export function safeJsonSizeEstimate(value: any): number {
  if (!value) return 0;
  try {
    return JSON.stringify(value).length;
  } catch (e) {
    return 1000000; // Assume large if stringify fails (circular, huge)
  }
}
