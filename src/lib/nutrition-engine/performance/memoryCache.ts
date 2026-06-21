import type { CacheEntry, CacheOptions, CacheSetOptions, CacheStats, CacheNamespace } from './cacheTypes';

export class MemoryCache<T> {
  private store: Map<string, CacheEntry<T>> = new Map();
  private maxEntries: number;
  private defaultTtlMs: number;
  private namespace: string;
  
  private stats = {
    hits: 0,
    misses: 0,
    evictions: 0
  };

  constructor(options?: CacheOptions) {
    this.maxEntries = options?.maxEntries || 200;
    this.defaultTtlMs = options?.ttlMs || 1000 * 60 * 10; // 10 minutes default
    this.namespace = options?.namespace || "generic";
  }

  public get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) {
      this.stats.misses++;
      return undefined;
    }

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      this.stats.misses++;
      return undefined;
    }

    entry.hitCount++;
    this.stats.hits++;
    return entry.value;
  }

  public set(key: string, value: T, options?: CacheSetOptions): void {
    this.pruneExpired();

    if (this.store.size >= this.maxEntries && !this.store.has(key)) {
      this.evictOldest();
    }

    const now = Date.now();
    const ttlMs = options?.ttlMs ?? this.defaultTtlMs;

    this.store.set(key, {
      key,
      value,
      createdAt: now,
      expiresAt: now + ttlMs,
      hitCount: 0
    });
  }

  public has(key: string): boolean {
    const entry = this.store.get(key);
    if (!entry) return false;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return false;
    }
    return true;
  }

  public delete(key: string): void {
    this.store.delete(key);
  }

  public clear(): void {
    this.store.clear();
    this.stats = { hits: 0, misses: 0, evictions: 0 };
  }

  public pruneExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
      }
    }
  }

  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;

    for (const [key, entry] of this.store.entries()) {
      if (entry.createdAt < oldestTime) {
        oldestTime = entry.createdAt;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.store.delete(oldestKey);
      this.stats.evictions++;
    }
  }

  public getStats(): CacheStats {
    this.pruneExpired();
    return {
      size: this.store.size,
      maxEntries: this.maxEntries,
      hits: this.stats.hits,
      misses: this.stats.misses,
      evictions: this.stats.evictions,
      namespace: this.namespace
    };
  }

  public static makeCacheKey(parts: (string | number | boolean | undefined | null)[]): string {
    return parts.filter(p => p !== undefined && p !== null).join('|');
  }
}

export function createMemoryCache<T>(options?: CacheOptions): MemoryCache<T> {
  return new MemoryCache<T>(options);
}
