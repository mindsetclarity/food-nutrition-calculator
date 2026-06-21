export type CacheNamespace = 
  | "local_search"
  | "usda_search"
  | "usda_details"
  | "source_resolver"
  | "recipe_resolution"
  | "llm_parse"
  | "generic";

export interface CacheEntry<T> {
  key: string;
  value: T;
  createdAt: number;
  expiresAt: number;
  hitCount: number;
}

export interface CacheOptions {
  ttlMs?: number;
  maxEntries?: number;
  namespace?: CacheNamespace;
}

export interface CacheSetOptions {
  ttlMs?: number;
  tags?: string[];
}

export interface CacheStats {
  size: number;
  maxEntries: number;
  hits: number;
  misses: number;
  evictions: number;
  namespace: string;
}
