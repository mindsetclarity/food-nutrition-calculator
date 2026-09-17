import type { APIRoute } from 'astro';
import { searchLocalFoods } from '../../../lib/foods/foodSearch';
import { searchUsdaFoods } from '../../../lib/usda/client';
import { normalizeUsdaSearchResults } from '../../../lib/usda/normalize';
import { rankUsdaSearchFoods } from '../../../lib/usda/ranking';

const USDA_CANDIDATE_POOL = 50;

// A USDA outage or bad key must not be pinned at the edge for an hour after
// it is fixed, so fallback responses are cached only briefly.
const FALLBACK_CACHE = 'public, max-age=60, s-maxage=60';
import type { NormalizedSearchResult } from '../../../lib/usda/types';
import { inputLimits, isValidSearchQuery } from '../../../lib/safety/inputLimits';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get('q')?.trim() || '';
    const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '10', 10), 1), inputLimits.foodSearchResultLimit);

    if (!isValidSearchQuery(q)) {
      return new Response(JSON.stringify({
        ok: false,
        query: q,
        source: "none",
        results: [],
        fallbackUsed: false,
        message: q.length === 0 ? "Enter a food name to search." : `Search must be between ${inputLimits.foodSearchMinLength} and ${inputLimits.foodSearchMaxLength} characters.`
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Try USDA if available
    let usdaRes;
    try {
      // USDA's first few results are mostly Branded products, so pull a wider
      // candidate pool for rankUsdaSearchFoods to pick the generic food from.
      usdaRes = await searchUsdaFoods(q, USDA_CANDIDATE_POOL);
    } catch (e) {
      usdaRes = { ok: false, data: null, error: 'usda timeout or fetch failed' };
    }
  
  if (usdaRes.ok && usdaRes.data && usdaRes.data.foods.length > 0) {
    return new Response(JSON.stringify({
      ok: true,
      query: q,
      source: "usda",
      results: normalizeUsdaSearchResults(rankUsdaSearchFoods(usdaRes.data.foods, q).slice(0, limit)),
      fallbackUsed: false,
      message: null
    }), { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300, s-maxage=3600' } });
  }

  // Fallback to local
  const localResultsRaw = searchLocalFoods(q).slice(0, limit);
  
  const localResults: NormalizedSearchResult[] = localResultsRaw.map(f => ({
    id: f.item.id,
    fdcId: 0,
    slug: f.item.slug,
    name: f.item.name,
    displayName: f.item.displayName,
    description: f.item.name,
    brandName: null,
    dataType: null,
    source: 'usda', // Will be overridden to 'local' below, but needed for type matching before cast
    ...({ source: 'local' }),
    sourceLabel: f.item.sourceLabel as any,
    isEstimated: f.item.isEstimated,
    nutrientsPreview: {
      calories: f.item.nutrientsPer100g.calories,
      protein: f.item.nutrientsPer100g.protein,
      carbohydrates: f.item.nutrientsPer100g.carbohydrates,
      fat: f.item.nutrientsPer100g.fat,
      fiber: f.item.nutrientsPer100g.fiber,
      sugar: f.item.nutrientsPer100g.sugar,
      sodium: f.item.nutrientsPer100g.sodium
    }
  } as unknown as NormalizedSearchResult));

  // Correct the source to 'local' properly bypassing the strict type if needed
  localResults.forEach(r => { r.source = 'local' as any; });

  if (localResults.length > 0) {
    return new Response(JSON.stringify({
      ok: true,
      query: q,
      source: "local",
      results: localResults,
      fallbackUsed: true,
      message: "USDA data is unavailable, showing local fallback results.",
      usdaError: usdaRes.error ?? null
    }), { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': FALLBACK_CACHE } });
  }

    return new Response(JSON.stringify({
      ok: true,
      query: q,
      source: "local",
      results: [],
      fallbackUsed: true,
      message: "No results found.",
      usdaError: usdaRes.error ?? null
    }), { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': FALLBACK_CACHE } });

  } catch (error) {
    console.error("Safe Search API Error:", error instanceof Error ? error.message : "Unknown error");
    return new Response(JSON.stringify({
      ok: false,
      query: "",
      source: "none",
      results: [],
      fallbackUsed: false,
      message: "An internal server error occurred while searching."
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
