import { s as searchUsdaFoods, b as normalizeUsdaSearchResults, c as searchLocalFoods } from './normalize_N8hntlCn.mjs';
import { i as inputLimits, a as isValidSearchQuery } from './inputLimits_CEbVSqQy.mjs';

const GET = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")?.trim() || "";
    const limit = Math.min(Math.max(parseInt(url.searchParams.get("limit") || "10", 10), 1), inputLimits.foodSearchResultLimit);
    if (!isValidSearchQuery(q)) {
      return new Response(JSON.stringify({
        ok: false,
        query: q,
        source: "none",
        results: [],
        fallbackUsed: false,
        message: q.length === 0 ? "Enter a food name to search." : `Search must be between ${inputLimits.foodSearchMinLength} and ${inputLimits.foodSearchMaxLength} characters.`
      }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    let usdaRes;
    try {
      usdaRes = await searchUsdaFoods(q, limit);
    } catch (e) {
      usdaRes = { ok: false, data: null, error: "usda timeout or fetch failed" };
    }
    if (usdaRes.ok && usdaRes.data && usdaRes.data.foods.length > 0) {
      return new Response(JSON.stringify({
        ok: true,
        query: q,
        source: "usda",
        results: normalizeUsdaSearchResults(usdaRes.data.foods),
        fallbackUsed: false,
        message: null
      }), { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=300, s-maxage=3600" } });
    }
    const localResultsRaw = searchLocalFoods(q).slice(0, limit);
    const localResults = localResultsRaw.map((f) => ({
      id: f.id,
      fdcId: 0,
      slug: f.slug,
      name: f.name,
      displayName: f.displayName,
      description: f.name,
      brandName: null,
      dataType: null,
      source: "usda",
      // Will be overridden to 'local' below, but needed for type matching before cast
      ...{ source: "local" },
      sourceLabel: f.sourceLabel,
      isEstimated: f.isEstimated,
      nutrientsPreview: {
        calories: f.nutrientsPer100g.calories,
        protein: f.nutrientsPer100g.protein,
        carbohydrates: f.nutrientsPer100g.carbohydrates,
        fat: f.nutrientsPer100g.fat,
        fiber: f.nutrientsPer100g.fiber,
        sugar: f.nutrientsPer100g.sugar,
        sodium: f.nutrientsPer100g.sodium
      }
    }));
    localResults.forEach((r) => {
      r.source = "local";
    });
    if (localResults.length > 0) {
      return new Response(JSON.stringify({
        ok: true,
        query: q,
        source: "local",
        results: localResults,
        fallbackUsed: true,
        message: "USDA data is unavailable, showing local fallback results."
      }), { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=300, s-maxage=3600" } });
    }
    return new Response(JSON.stringify({
      ok: true,
      query: q,
      source: "local",
      results: [],
      fallbackUsed: true,
      message: "No results found."
    }), { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=300, s-maxage=3600" } });
  } catch (error) {
    console.error("Safe Search API Error:", error instanceof Error ? error.message : "Unknown error");
    return new Response(JSON.stringify({
      ok: false,
      query: "",
      source: "none",
      results: [],
      fallbackUsed: false,
      message: "An internal server error occurred while searching."
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
