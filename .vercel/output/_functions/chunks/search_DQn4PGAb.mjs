import { b as normalizeSynonyms, c as getSearchIndex, t as tokenizeFoodQuery, s as searchUsdaFoods, d as normalizeUsdaSearchResults } from './normalize_gguF6eLW.mjs';
import { i as inputLimits, a as isValidSearchQuery } from './inputLimits_CEbVSqQy.mjs';

function calculateScore(food, query, queryTokens) {
  let score = 0;
  const normalizedQuery = normalizeSynonyms(query);
  if (food.normalizedName === normalizedQuery) {
    score += 100;
  }
  if (food.normalizedAliases.includes(normalizedQuery)) {
    score += 90;
  }
  if (food.normalizedName.startsWith(normalizedQuery)) {
    score += 50;
  }
  if (food.normalizedAliases.some((alias) => alias.startsWith(normalizedQuery))) {
    score += 40;
  }
  let matchedTokens = 0;
  for (const token of queryTokens) {
    if (food.tokenSet.has(token)) {
      matchedTokens++;
      score += 10;
    } else {
      if (Array.from(food.tokenSet).some((t) => t.includes(token) || token.includes(t))) {
        score += 3;
        matchedTokens += 0.5;
      }
    }
  }
  if (matchedTokens >= queryTokens.length && queryTokens.length > 0) {
    score += 20;
  }
  if (food.preparationState) {
    const prepToken = food.preparationState.toLowerCase();
    if (queryTokens.includes(prepToken) || normalizedQuery.includes(prepToken)) {
      score += 15;
    }
  }
  score -= food.displayName.length * 0.01;
  return score;
}

function searchLocalFoods(query, options = {}) {
  const index = getSearchIndex();
  const limit = options.limit || 15;
  if (!query || query.trim() === "") {
    if (options.category) {
      return index.filter((f) => f.category === options.category).slice(0, limit).map((f) => ({ item: f.item, score: 1 }));
    }
    return [];
  }
  const queryTokens = tokenizeFoodQuery(query);
  const normalizedQuery = normalizeSynonyms(query);
  if (queryTokens.length === 0 && !normalizedQuery) {
    return [];
  }
  const results = [];
  for (const food of index) {
    if (options.category && food.category !== options.category) {
      continue;
    }
    if (options.source && food.source !== options.source) {
      continue;
    }
    const score = calculateScore(food, query, queryTokens);
    if (score > 0) {
      let matchReason = void 0;
      if (food.normalizedName === normalizedQuery) matchReason = "Exact match";
      else if (food.normalizedAliases.includes(normalizedQuery)) matchReason = "Alias match";
      results.push({ item: food.item, score, matchReason });
    }
  }
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}

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
      id: f.item.id,
      fdcId: 0,
      slug: f.item.slug,
      name: f.item.name,
      displayName: f.item.displayName,
      description: f.item.name,
      brandName: null,
      dataType: null,
      source: "usda",
      // Will be overridden to 'local' below, but needed for type matching before cast
      ...{ source: "local" },
      sourceLabel: f.item.sourceLabel,
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
