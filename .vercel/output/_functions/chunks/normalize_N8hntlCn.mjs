import { l as localFoods } from './foods_CLkM41zY.mjs';

function getFoodById(id) {
  return localFoods.find((food) => food.id === id);
}
function searchLocalFoods(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return localFoods.filter((food) => {
    if (food.name.toLowerCase().includes(q)) return true;
    if (food.displayName.toLowerCase().includes(q)) return true;
    if (food.slug.includes(q)) return true;
    if (food.aliases.some((alias) => alias.toLowerCase().includes(q))) return true;
    return false;
  });
}

async function searchUsdaFoods(query, limit = 25) {
  return { ok: false, error: "Missing API key" };
}
async function getUsdaFoodDetails(fdcId) {
  return { ok: false, error: "Missing API key" };
}

const USDA_NUTRIENT_MAP = {
  "Energy": "calories",
  "Protein": "protein",
  "Carbohydrate, by difference": "carbohydrates",
  "Total lipid (fat)": "fat",
  "Fiber, total dietary": "fiber",
  "Sugars, total including NLEA": "sugar",
  "Total Sugars": "sugar",
  "Sodium, Na": "sodium",
  "Fatty acids, total saturated": "saturatedFat",
  "Cholesterol": "cholesterol",
  "Potassium, K": "potassium"
};
function mapUsdaNutrientName(name) {
  for (const [usdaName, appKey] of Object.entries(USDA_NUTRIENT_MAP)) {
    if (name.toLowerCase().includes(usdaName.toLowerCase())) {
      return appKey;
    }
  }
  return null;
}

function createUsdaSlug(fdcId, description) {
  const safeDesc = description.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `usda-${fdcId}-${safeDesc}`.substring(0, 100);
}
function getDisplayNameFromUsda(description, brandName) {
  let name = description.split(",")[0] || description;
  name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  if (brandName) {
    return `${brandName} ${name}`;
  }
  return name;
}
function normalizeUsdaSearchResult(food) {
  const nutrientsPreview = {};
  if (food.foodNutrients) {
    for (const nut of food.foodNutrients) {
      const key = mapUsdaNutrientName(nut.nutrientName);
      if (key === "calories" && nut.unitName.toLowerCase() !== "kcal") {
        continue;
      }
      if (key) {
        nutrientsPreview[key] = nut.value;
      }
    }
  }
  return {
    id: `usda-${food.fdcId}`,
    fdcId: food.fdcId,
    slug: createUsdaSlug(food.fdcId, food.description),
    name: food.description,
    displayName: getDisplayNameFromUsda(food.description, food.brandName),
    description: food.description,
    brandName: food.brandName || null,
    dataType: food.dataType || null,
    source: "usda",
    sourceLabel: "USDA FoodData Central",
    isEstimated: false,
    nutrientsPreview
  };
}
function normalizeUsdaSearchResults(foods) {
  return foods.map(normalizeUsdaSearchResult);
}
function extractNutrientsPer100g(foodNutrients) {
  const profile = {
    calories: null,
    protein: null,
    carbohydrates: null,
    fat: null,
    fiber: null,
    sugar: null,
    sodium: null,
    saturatedFat: null,
    cholesterol: null,
    potassium: null
  };
  if (!foodNutrients) return profile;
  for (const item of foodNutrients) {
    if (item.amount === void 0 || item.amount === null) continue;
    const key = mapUsdaNutrientName(item.nutrient.name);
    if (!key) continue;
    if (key === "calories" && item.nutrient.unitName.toLowerCase() !== "kcal") {
      continue;
    }
    profile[key] = item.amount;
  }
  return profile;
}
function createServingSizesFromUsda(food) {
  const sizes = [];
  if (food.servingSize && food.servingSizeUnit === "g") {
    let label = `${food.servingSize}g`;
    if (food.householdServingFullText) {
      label = `${food.householdServingFullText} (${label})`;
    }
    sizes.push({
      unit: "serving",
      label,
      grams: food.servingSize
    });
  }
  return sizes;
}
function normalizeUsdaFoodDetails(food) {
  const slug = createUsdaSlug(food.fdcId, food.description);
  const displayName = getDisplayNameFromUsda(food.description, food.brandName);
  const servingSizes = createServingSizesFromUsda(food);
  return {
    id: `usda-${food.fdcId}`,
    slug,
    name: food.description,
    displayName,
    aliases: [],
    category: food.foodCategory?.description || "Unknown",
    source: "usda",
    sourceLabel: "USDA FoodData Central",
    isEstimated: false,
    defaultUnit: servingSizes.length > 0 ? "serving" : "g",
    defaultQuantity: 1,
    servingSizes,
    nutrientsPer100g: extractNutrientsPer100g(food.foodNutrients),
    usda: {
      fdcId: food.fdcId,
      dataType: food.dataType,
      brandName: food.brandName,
      publicationDate: food.publicationDate
    }
  };
}

export { getUsdaFoodDetails as a, normalizeUsdaSearchResults as b, searchLocalFoods as c, getFoodById as g, normalizeUsdaFoodDetails as n, searchUsdaFoods as s };
