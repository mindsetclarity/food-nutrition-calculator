/**
 * This module is server-only.
 * Do not import it into client-side components.
 * USDA_API_KEY must never be exposed to the browser.
 */

import { EngineResult, createFatalEngineError, createRecoverableError } from '../index';

export function hasUsdaApiKey(): boolean {
  const key = (typeof process !== 'undefined' ? process.env.USDA_API_KEY : undefined) || (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.USDA_API_KEY : undefined);
  return !!key;
}

export function getUsdaApiKeyStatus(): { available: boolean } {
  return { available: hasUsdaApiKey() };
}

function getUsdaApiKey(): string {
  const key = (typeof process !== 'undefined' ? process.env.USDA_API_KEY : undefined) || (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.USDA_API_KEY : undefined);
  return key || '';
}

export function buildUsdaUrl(path: string, params: Record<string, string | number>): string {
  const baseUrl = "https://api.nal.usda.gov/fdc/v1";
  const url = new URL(`${baseUrl}${path}`);
  url.searchParams.append("api_key", getUsdaApiKey());
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  }
  return url.toString();
}

export function createUsdaTimeoutSignal(timeoutMs: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller.signal;
}

export async function fetchUsdaJson(path: string, params: Record<string, string | number>, options?: { timeoutMs?: number }): Promise<EngineResult<any>> {
  if (!hasUsdaApiKey()) {
    return {
      ok: false,
      error: createRecoverableError("USDA_KEY_MISSING", "USDA API Key is not configured.", "USDA search is unavailable right now."),
      warnings: [],
      fallbackAvailable: true
    };
  }

  const timeout = options?.timeoutMs || 6000;
  const signal = createUsdaTimeoutSignal(timeout);
  const url = buildUsdaUrl(path, params);

  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      if (response.status === 429) {
        return {
          ok: false,
          error: createRecoverableError("USDA_ERROR", "Rate limited by USDA API", "USDA search is unavailable right now due to high traffic."),
          warnings: [],
          fallbackAvailable: true
        };
      }
      return {
        ok: false,
        error: createRecoverableError("USDA_ERROR", `USDA API returned status ${response.status}`, "USDA search is currently unavailable."),
        warnings: [],
        fallbackAvailable: true
      };
    }
    
    const data = await response.json();
    return {
      ok: true,
      data,
      warnings: [],
      sourceSummary: {
        primarySource: "usda",
        sourcesUsed: ["usda"],
        hasUsda: true,
        hasLocal: false,
        hasEstimated: false,
        hasLlmParsed: false,
        hasPartialData: false,
        labels: ["USDA FoodData Central"],
        warnings: []
      },
      confidence: { level: "high", reasons: ["Direct USDA API response"], needsReview: false }
    };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return {
        ok: false,
        error: createRecoverableError("USDA_TIMEOUT", "USDA API request timed out.", "USDA search is taking too long. Showing local estimates where available."),
        warnings: [],
        fallbackAvailable: true
      };
    }
    return {
      ok: false,
      error: createRecoverableError("USDA_ERROR", "Network error reaching USDA API.", "USDA search is currently unavailable."),
      warnings: [],
      fallbackAvailable: true
    };
  }
}
