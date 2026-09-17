import type { UsdaSearchResponse, UsdaFoodDetails, UsdaApiResponse } from './types';

const USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

export function getUsdaApiKey(): string | undefined {
  // Trimmed: a key pasted with a trailing space or newline is rejected by USDA
  // as API_KEY_INVALID, which silently drops every search to local data.
  return import.meta.env.USDA_API_KEY?.trim() || undefined;
}

export function hasUsdaApiKey(): boolean {
  return !!getUsdaApiKey();
}

function buildUsdaUrl(path: string, params: Record<string, string | number> = {}): string {
  const url = new URL(`${USDA_BASE_URL}${path}`);
  url.searchParams.append('api_key', getUsdaApiKey() || '');
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value.toString());
  }
  return url.toString();
}

async function safeUsdaFetch<T>(url: string): Promise<UsdaApiResponse<T>> {
  // The timeout covers reading the body too; clearing it once headers arrived
  // left a slow body free to hang the request indefinitely.
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      // USDA's error code (e.g. API_KEY_INVALID, OVER_RATE_LIMIT) says why. Never
      // include the URL here: it carries the api_key.
      const body = await response.json().catch(() => null);
      const code = body?.error?.code ? ` ${body.error.code}` : '';
      return { ok: false, error: `USDA API returned ${response.status}${code}` };
    }
    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    if ((error as Error)?.name === 'AbortError') return { ok: false, error: 'USDA API timed out' };
    return { ok: false, error: 'Network or parsing error' };
  } finally {
    clearTimeout(id);
  }
}

export async function searchUsdaFoods(query: string, limit: number = 25): Promise<UsdaApiResponse<UsdaSearchResponse>> {
  if (!hasUsdaApiKey()) return { ok: false, error: 'Missing API key' };
  const url = buildUsdaUrl('/foods/search', { query, pageSize: limit });
  return safeUsdaFetch<UsdaSearchResponse>(url);
}

export async function getUsdaFoodDetails(fdcId: number): Promise<UsdaApiResponse<UsdaFoodDetails>> {
  if (!hasUsdaApiKey()) return { ok: false, error: 'Missing API key' };
  const url = buildUsdaUrl(`/food/${fdcId}`);
  return safeUsdaFetch<UsdaFoodDetails>(url);
}
