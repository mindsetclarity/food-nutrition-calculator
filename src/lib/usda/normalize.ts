import type { UsdaSearchFood, UsdaFoodDetails, UsdaFoodPortion, NormalizedSearchResult } from './types';
import type { FoodItem, NutrientProfile, ServingSize } from '../nutrition/types';
import { mapUsdaNutrientName } from './nutrients';
import { normalizeUnit } from '../nutrition/unitConversions';

export function createUsdaSlug(fdcId: number, description: string): string {
  const safeDesc = description.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `usda-${fdcId}-${safeDesc}`.substring(0, 100);
}

export function getDisplayNameFromUsda(description: string, brandName?: string): string {
  let name = description.split(',')[0] || description;
  name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  if (brandName) {
    return `${brandName} ${name}`;
  }
  return name;
}

export function normalizeUsdaSearchResult(food: UsdaSearchFood): NormalizedSearchResult {
  // Search uses the same hardened extractor as the detail route. The loop this
  // replaced called nut.unitName.toLowerCase() and mapUsdaNutrientName(nut.nutrientName)
  // unguarded, so one entry missing either field would have taken down search.
  const nutrientsPreview: Partial<NutrientProfile> = extractNutrientsPer100g(food.foodNutrients);

  return {
    id: `usda-${food.fdcId}`,
    fdcId: food.fdcId,
    slug: createUsdaSlug(food.fdcId, food.description),
    name: food.description,
    displayName: getDisplayNameFromUsda(food.description, food.brandName),
    description: food.description,
    brandName: food.brandName || null,
    dataType: food.dataType || null,
    source: 'usda',
    sourceLabel: 'USDA FoodData Central',
    isEstimated: false,
    nutrientsPreview
  };
}

export function normalizeUsdaSearchResults(foods: UsdaSearchFood[]): NormalizedSearchResult[] {
  return foods.map(normalizeUsdaSearchResult);
}

/**
 * USDA returns two different foodNutrients shapes. Foundation and SR Legacy entries
 * nest the descriptor under .nutrient; Branded entries frequently carry only
 * { type, id, amount } with no descriptor at all. Reading item.nutrient.name
 * unguarded threw on every Branded food and took out the whole details route,
 * so name and unit are resolved defensively from either shape here - the one
 * place every caller funnels through.
 */
type UsdaNutrientEntry = {
  nutrient?: { name?: string; unitName?: string };
  nutrientName?: string;
  unitName?: string;
  amount?: number; // /food/{id} and /foods
  value?: number;  // /foods/search
};

export function extractNutrientsPer100g(foodNutrients?: UsdaNutrientEntry[]): NutrientProfile {
  const profile: NutrientProfile = {
    calories: null, protein: null, carbohydrates: null, fat: null,
    fiber: null, sugar: null, sodium: null, saturatedFat: null,
    cholesterol: null, potassium: null
  };

  if (!Array.isArray(foodNutrients)) return profile;

  for (const item of foodNutrients) {
    if (!item) continue;

    const amount = item.amount ?? item.value;
    if (amount === undefined || amount === null) continue;

    const name = item.nutrient?.name ?? item.nutrientName;
    if (!name) continue; // Branded entries with no descriptor cannot be mapped.

    const key = mapUsdaNutrientName(name);
    if (!key) continue;

    // Energy is reported in both kcal and kJ; only kcal belongs in calories.
    const unit = item.nutrient?.unitName ?? item.unitName;
    if (key === 'calories' && unit?.toLowerCase() !== 'kcal') continue;

    profile[key] = amount;
  }

  return profile;
}

/** A food with no calories is unusable for a nutrition calculator. */
export function hasUsableNutrients(profile: NutrientProfile): boolean {
  return typeof profile.calories === 'number';
}

export function createServingSizesFromUsda(food: UsdaFoodDetails): ServingSize[] {
  const sizes: ServingSize[] = [];
  
  if (food.servingSize && food.servingSizeUnit === 'g') {
    let label = `${food.servingSize}g`;
    if (food.householdServingFullText) {
      label = `${food.householdServingFullText} (${label})`;
    }
    sizes.push({
      unit: 'serving',
      label: label,
      grams: food.servingSize
    });
  }

  return [...sizes, ...servingSizesFromPortions(food.foodPortions, food.description)];
}

// Words USDA uses for one whole item rather than a measure. The food's own name
// ("5 tomatoes", "1 egg") means the same and is matched separately.
const PIECE_WORDS = new Set(['medium', 'large', 'small', 'extra', 'whole', 'fruit', 'each']);
const stem = (word: string) => word.toLowerCase().replace(/e?s$/, '');
// FNDDS placeholders ("Quantity not specified", "Guideline amount per ...").
const SKIP_WORDS = new Set(['', 'quantity', 'guideline', 'undetermined']);

/**
 * USDA keeps household measures in foodPortions, in three shapes: Survey (FNDDS)
 * says "1 cup, cooked" in portionDescription with a numeric code in modifier;
 * SR Legacy says "cup, chopped" in modifier; Foundation names the unit in
 * measureUnit ("cup", "slice", "egg", "RACC"). Ignoring them left every USDA
 * food with grams only, so any recipe line in cups or spoons failed.
 * ponytail: first portion per unit wins (except a medium piece), so "cup, sliced"
 * vs "cup, chopped" is not user-selectable; add labelled options if that matters.
 */
function servingSizesFromPortions(portions?: UsdaFoodPortion[], description = ''): ServingSize[] {
  const itemWord = stem(description.split(/[\s,]+/)[0]);
  const byUnit = new Map<string, ServingSize>();
  for (const p of portions ?? []) {
    if (!p?.gramWeight) continue;
    const measure = p.measureUnit?.name;
    const raw = measure && measure !== 'undetermined'
      ? [measure, p.portionDescription || p.modifier].filter(Boolean).join(', ')
      : p.portionDescription || p.modifier || '';
    const amount = p.amount || parseFloat(raw) || 1;
    const text = raw.replace(/^[\d./\s]+/, '');
    const word = text.toLowerCase().split(/[\s,(]+/)[0];
    if (SKIP_WORDS.has(word)) continue;

    const isServing = word === 'racc' || word === 'nlea';
    const isPiece = PIECE_WORDS.has(word) || stem(word) === itemWord;
    const unit = isPiece ? 'piece' : isServing ? 'serving' : normalizeUnit(word);
    if (byUnit.has(unit) && !(unit === 'piece' && word === 'medium')) continue;
    byUnit.set(unit, {
      unit,
      label: isServing ? '1 serving' : `1 ${text}`,
      grams: Math.round((p.gramWeight / amount) * 10) / 10
    });
  }
  return [...byUnit.values()];
}

export function normalizeUsdaFoodDetails(food: UsdaFoodDetails): FoodItem {
  const slug = createUsdaSlug(food.fdcId, food.description);
  const displayName = getDisplayNameFromUsda(food.description, food.brandName);
  const servingSizes = createServingSizesFromUsda(food);

  return {
    id: `usda-${food.fdcId}`,
    slug,
    name: food.description,
    displayName,
    aliases: [],
    category: food.foodCategory?.description || 'Unknown',
    source: 'usda',
    sourceLabel: 'USDA FoodData Central',
    isEstimated: false,
    defaultUnit: servingSizes.length > 0 ? 'serving' : 'g',
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
