import type { APIRoute } from 'astro';
import { getFoodByIdOrSlug } from '../../../lib/foods/foodIndex';
import { getUsdaFoodDetails } from '../../../lib/usda/client';
import { normalizeUsdaFoodDetails } from '../../../lib/usda/normalize';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
  const fdcIdStr = url.searchParams.get('fdcId');
  const idStr = url.searchParams.get('id');
  const sourceStr = url.searchParams.get('source');

  if (!fdcIdStr && !idStr) {
    return new Response(JSON.stringify({
      ok: false,
      food: null,
      fallbackUsed: false,
      message: "Food details could not be loaded."
    }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // Handle local explicit requests
  if (sourceStr === 'local' || (idStr && idStr.startsWith('local_'))) {
    const localId = idStr || '';
    const food = getFoodByIdOrSlug(localId);
    if (food) {
      return new Response(JSON.stringify({
        ok: true,
        food,
        fallbackUsed: false,
        message: null
      }), { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300, s-maxage=3600' } });
    }
  }

    // Handle USDA requests
    if (fdcIdStr) {
      const fdcId = parseInt(fdcIdStr, 10);
      if (!isNaN(fdcId)) {
        let usdaRes;
        try {
          usdaRes = await getUsdaFoodDetails(fdcId);
        } catch (e) {
          usdaRes = { ok: false, data: null };
        }
        if (usdaRes.ok && usdaRes.data) {
        return new Response(JSON.stringify({
          ok: true,
          food: normalizeUsdaFoodDetails(usdaRes.data),
          fallbackUsed: false,
          message: null
        }), { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300, s-maxage=3600' } });
      }
    }
  }

  // Fallback to local if USDA fails but an ID was provided
  if (idStr) {
    const food = getFoodByIdOrSlug(idStr);
    if (food) {
      return new Response(JSON.stringify({
        ok: true,
        food,
        fallbackUsed: true,
        message: "USDA details unavailable, falling back to local."
      }), { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300, s-maxage=3600' } });
    }
  }

    return new Response(JSON.stringify({
      ok: false,
      food: null,
      fallbackUsed: false,
      message: "Food details could not be found."
    }), { status: 404, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error("Safe Details API Error:", error instanceof Error ? error.message : "Unknown error");
    return new Response(JSON.stringify({
      ok: false,
      food: null,
      fallbackUsed: false,
      message: "An internal server error occurred while fetching food details."
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
