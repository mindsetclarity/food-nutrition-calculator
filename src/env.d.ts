/// <reference types="astro/client" />

// @cloudflare/workers-types is not installed, so declare the slice of D1 we use.
// Interfaces merge, so this stays valid if the real types are added later.
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(column?: string): Promise<T | null>;
  all<T = unknown>(): Promise<{ results: T[] }>;
  run(): Promise<{ meta: { changes: number; last_row_id: number } }>;
}
interface D1Database {
  prepare(sql: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<{ meta: { changes: number } }[]>;
}

// Bindings and secrets, read via `import { env } from 'cloudflare:workers'`.
declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    PHOTOS: unknown;
    AUTH_LIMITER?: { limit(opts: { key: string }): Promise<{ success: boolean }> };
    REFERRAL_LIMITER?: { limit(opts: { key: string }): Promise<{ success: boolean }> };
    TURNSTILE_SITE_KEY?: string;
    TURNSTILE_SECRET?: string;
    RESEND_API_KEY?: string;
  }
}

declare namespace App {
  interface Locals {
    user: import('./lib/community/db').User | null;
  }
}
