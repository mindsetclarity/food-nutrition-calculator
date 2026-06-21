import { EngineFoodItem, NutritionNutrients } from '../types';
import { FoodSourceSearchResult, USDAFoodSearchRaw } from './sourceTypes';
import { sanitizeNutrientValue } from '../engineGuards';
import { highConfidence, mediumConfidence } from '../confidence';
import { createWarning } from '../warnings';

export function normalizeUsdaFoodName(raw: USDAFoodSearchRaw): string {
  if (!raw.description) return "Unknown Food";
  let name = raw.description.toLowerCase();
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return name;
}

export function getUsdaBrandName(raw: USDAFoodSearchRaw): string | undefined {
  return raw.brandOwner;
}

export function getUsdaCategory(raw: USDAFoodSearchRaw): string | undefined {
  return raw.foodCategory;
}

export function createUsdaSourceLabel(raw: USDAFoodSearchRaw): string {
  if (raw.dataType === "Branded") return "USDA Branded";
  if (raw.dataType === "Foundation") return "USDA Foundation";
  if (raw.dataType === "SR Legacy") return "USDA SR Legacy";
  return "USDA FoodData Central";
}

export function getUsdaNutrientValue(raw: USDAFoodSearchRaw, nutrientNames: string[], nutrientIds: number[]): number | null {
  if (!Array.isArray(raw.foodNutrients)) return null;
  const match = raw.foodNutrients.find(n => {
    const name = (n.nutrientName || n.name || "").toLowerCase();
    const id = n.nutrientId || n.nutrientNumber;
    return nutrientNames.some(nn => name.includes(nn.toLowerCase())) || nutrientIds.includes(Number(id));
  });
  if (match && typeof match.value === 'number') {
    return sanitizeNutrientValue(match.value) ?? null;
  }
  return null;
}

export function extractUsdaNutrients(raw: USDAFoodSearchRaw): NutritionNutrients {
  return {
    calories: getUsdaNutrientValue(raw, ["Energy"], [1008, 2047]), // kcal
    protein: getUsdaNutrientValue(raw, ["Protein"], [1003]),
    carbs: getUsdaNutrientValue(raw, ["Carbohydrate, by difference"], [1005]),
    fat: getUsdaNutrientValue(raw, ["Total lipid (fat)"], [1004]),
    fiber: getUsdaNutrientValue(raw, ["Fiber, total dietary"], [1079]),
    sugar: getUsdaNutrientValue(raw, ["Sugars, total including NLEA", "Total Sugars"], [2000, 1062]),
    sodium: getUsdaNutrientValue(raw, ["Sodium, Na"], [1093]),
    saturatedFat: getUsdaNutrientValue(raw, ["Fatty acids, total saturated"], [1258]),
    cholesterol: getUsdaNutrientValue(raw, ["Cholesterol"], [1253]),
    potassium: getUsdaNutrientValue(raw, ["Potassium, K"], [1092]),
    calcium: getUsdaNutrientValue(raw, ["Calcium, Ca"], [1087]),
    iron: getUsdaNutrientValue(raw, ["Iron, Fe"], [1089]),
    vitaminA: getUsdaNutrientValue(raw, ["Vitamin A, IU", "Vitamin A, RAE"], [1104, 1106]),
    vitaminC: getUsdaNutrientValue(raw, ["Vitamin C, total ascorbic acid"], [1162])
  };
}

export function mapUsdaSearchFoodToSearchResult(raw: USDAFoodSearchRaw): FoodSourceSearchResult {
  const nutrients = extractUsdaNutrients(raw);
  const displayName = normalizeUsdaFoodName(raw);
  
  let conf = mediumConfidence(["USDA search result"]);
  if (raw.dataType === "Foundation" || raw.dataType === "SR Legacy") {
    conf = highConfidence(["USDA core result"]);
  }

  const warnings = [];
  if (nutrients.calories === null || nutrients.protein === null) {
    warnings.push(createWarning("PARTIAL_NUTRIENT_DATA", "Missing core nutrients in USDA response"));
  }

  return {
    provider: "usda",
    providerFoodId: String(raw.fdcId),
    displayName,
    brandName: getUsdaBrandName(raw),
    category: getUsdaCategory(raw),
    sourceLabel: createUsdaSourceLabel(raw),
    sourceQuality: "primary",
    isEstimated: false,
    nutrientsPer100g: nutrients,
    preview: {
      calories: nutrients.calories ?? undefined,
      protein: nutrients.protein ?? undefined,
      defaultServingLabel: "100 g"
    },
    confidence: conf,
    warnings,
    raw
  };
}

export function mapUsdaDetailsToEngineFood(raw: USDAFoodSearchRaw): EngineFoodItem {
  return {
    id: `usda_${raw.fdcId}`,
    displayName: normalizeUsdaFoodName(raw),
    canonicalName: raw.description,
    category: getUsdaCategory(raw),
    source: "usda",
    sourceLabel: createUsdaSourceLabel(raw),
    isEstimated: false,
    nutrientsPer100g: extractUsdaNutrients(raw),
    servingSizes: [], // Parsing foodPortions requires complex logic to be expanded later
    aliases: [],
    tags: raw.dataType ? [raw.dataType] : [],
    warnings: []
  };
}
