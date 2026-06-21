import { l as localFoods } from './index_BdrwoXsL.mjs';

function normalizeFoodQuery(query) {
  if (!query) return "";
  return query.toLowerCase().replace(/[^\w\s-]/g, " ").replace(/\s+/g, " ").trim();
}
function normalizeFoodName(name) {
  return normalizeFoodQuery(name);
}
function tokenizeFoodQuery(query) {
  const normalized = normalizeFoodQuery(query);
  if (!normalized) return [];
  const tokens = normalized.split(" ");
  return removeStopWords(tokens).map(singularizeSimple);
}
function removeStopWords(tokens) {
  const stopWords = /* @__PURE__ */ new Set(["and", "with", "or", "in", "on", "a", "an", "the", "of"]);
  return tokens.filter((t) => !stopWords.has(t));
}
function singularizeSimple(token) {
  if (token.endsWith("ies")) return token.slice(0, -3) + "y";
  if (token.endsWith("es") && token.match(/(s|sh|ch|x|z)es$/)) return token.slice(0, -2);
  if (token.endsWith("s") && !token.endsWith("ss")) return token.slice(0, -1);
  return token;
}
function normalizeSynonyms(query) {
  const synonyms = {
    "garbanzo beans": "chickpeas",
    "garbanzo": "chickpea",
    "oatmeal": "oats",
    "rolled oats": "oats",
    "yoghurt": "yogurt",
    "soda": "soft drink",
    "pop": "soft drink",
    "scallion": "green onion",
    "cilantro": "coriander",
    "aubergine": "eggplant",
    "courgette": "zucchini",
    "capsicum": "bell pepper",
    "groundnut": "peanut",
    "confectioners sugar": "powdered sugar",
    "mac n cheese": "macaroni and cheese"
  };
  let normalized = normalizeFoodQuery(query);
  for (const [synonym, replacement] of Object.entries(synonyms)) {
    const regex = new RegExp(`\\b${synonym}\\b`, "g");
    normalized = normalized.replace(regex, replacement);
  }
  return normalized;
}

let searchIndex = null;
let foodMap = null;
function buildFoodIndex() {
  if (searchIndex !== null) return;
  searchIndex = localFoods.map((food) => {
    const normalizedName = normalizeFoodName(food.displayName);
    const normalizedAliases = (food.aliases || []).map(normalizeFoodName);
    const tokens = [
      ...tokenizeFoodQuery(food.displayName),
      ...normalizedAliases.flatMap(tokenizeFoodQuery)
    ];
    return {
      item: food,
      id: food.id,
      slug: food.slug,
      displayName: food.displayName,
      normalizedName,
      normalizedAliases,
      category: food.category,
      tags: food.tags || [],
      tokenSet: new Set(tokens),
      searchableText: `${normalizedName} ${normalizedAliases.join(" ")} ${food.category} ${(food.tags || []).join(" ")}`,
      preparationState: food.preparationState,
      source: food.source
    };
  });
  foodMap = /* @__PURE__ */ new Map();
  localFoods.forEach((food) => {
    foodMap.set(food.id, food);
    foodMap.set(food.slug, food);
  });
}
function getSearchIndex() {
  if (searchIndex === null) buildFoodIndex();
  return searchIndex;
}
function getFoodByIdOrSlug(idOrSlug) {
  if (foodMap === null) buildFoodIndex();
  return foodMap.get(idOrSlug);
}

const USDA_BASE_URL = "https://api.nal.usda.gov/fdc/v1";
function getUsdaApiKey() {
  return "emdUPr3NC7yAdCkDynbPM0vLRd6bwc0tQguHdTQi";
}
function buildUsdaUrl(path, params = {}) {
  const url = new URL(`${USDA_BASE_URL}${path}`);
  url.searchParams.append("api_key", getUsdaApiKey());
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value.toString());
  }
  return url.toString();
}
async function safeUsdaFetch(url) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8e3);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) {
      return { ok: false, error: `USDA API returned ${response.status}` };
    }
    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: "Network or parsing error" };
  }
}
async function searchUsdaFoods(query, limit = 25) {
  const url = buildUsdaUrl("/foods/search", { query, pageSize: limit });
  return safeUsdaFetch(url);
}
async function getUsdaFoodDetails(fdcId) {
  const url = buildUsdaUrl(`/food/${fdcId}`);
  return safeUsdaFetch(url);
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

export { getUsdaFoodDetails as a, normalizeSynonyms as b, getSearchIndex as c, normalizeUsdaSearchResults as d, getFoodByIdOrSlug as g, normalizeUsdaFoodDetails as n, searchUsdaFoods as s, tokenizeFoodQuery as t };
