import { fetchUsdaJson } from './usdaClient';
import { ResolvedFoodSource, USDAFoodSearchRaw } from './sourceTypes';
import { mapUsdaDetailsToEngineFood } from './usdaMapper';
import { EngineResult, createRecoverableError, createWarning, highConfidence, mediumConfidence } from '../index';
import { createMemoryCache, createRequestDeduper } from '../performance';

const usdaDetailsCache = createMemoryCache<ResolvedFoodSource>({
  namespace: "usda_details",
  maxEntries: 100,
  ttlMs: 15 * 60 * 1000 // 15 minutes
});

const usdaDetailsDeduper = createRequestDeduper<EngineResult<ResolvedFoodSource>>();

export async function getUsdaFoodDetails(fdcId: string | number): Promise<EngineResult<ResolvedFoodSource>> {
  const idStr = String(fdcId);
  const cached = usdaDetailsCache.get(idStr);
  if (cached) {
    return {
      ok: true,
      data: cached,
      warnings: [],
      sourceSummary: { primarySource: "usda", sourcesUsed: ["usda"], hasUsda: true, hasLocal: false, hasEstimated: false, hasLlmParsed: false, hasPartialData: false, labels: ["USDA FoodData Central"], warnings: [] },
      confidence: highConfidence(["Cached USDA Details"])
    };
  }

  return usdaDetailsDeduper.dedupeRequest(idStr, async () => {
    const response = await fetchUsdaJson(`/food/${idStr}`, {});
    if (!response.ok) {
      return response as EngineResult<any>;
    }

    const raw: USDAFoodSearchRaw = response.data;
    if (!raw || !raw.description) {
      return {
        ok: false,
        error: createRecoverableError("USDA_BAD_RESPONSE", "Invalid USDA detail response", "Food details could not be loaded."),
        warnings: [],
        fallbackAvailable: true
      };
    }

    const food = mapUsdaDetailsToEngineFood(raw);
    
    let conf = mediumConfidence(["USDA Details"]);
    if (raw.dataType === "Foundation" || raw.dataType === "SR Legacy") {
      conf = highConfidence(["USDA core result"]);
    }

    const warnings = [];
    if (food.nutrientsPer100g.calories === null || food.nutrientsPer100g.protein === null) {
      warnings.push(createWarning("PARTIAL_USDA_NUTRIENTS", "USDA item is missing core nutrients."));
    }

    const resolved: ResolvedFoodSource = {
      provider: "usda",
      food,
      sourceAttribution: {
        source: "usda",
        label: food.sourceLabel || "USDA FoodData Central",
        quality: "primary",
        isPrimary: true
      },
      confidence: conf,
      warnings,
      rawProviderId: idStr,
      resolvedAt: Date.now()
    };

    usdaDetailsCache.set(idStr, resolved);

    return {
      ok: true,
      data: resolved,
      warnings,
      sourceSummary: { primarySource: "usda", sourcesUsed: ["usda"], hasUsda: true, hasLocal: false, hasEstimated: false, hasLlmParsed: false, hasPartialData: warnings.length > 0, labels: [resolved.sourceAttribution.label], warnings },
      confidence: conf
    };
  });
}
