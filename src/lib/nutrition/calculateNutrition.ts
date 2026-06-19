import type { 
  CalculationInput, 
  CalculatedFoodItem, 
  NutritionTotals, 
  NutrientProfile,
  FoodSource
} from './types';
import { resolveQuantityToGrams } from './unitConversions';
import { validateCalculationInput } from './validation';
import { 
  createEmptyNutrientProfile, 
  createNullNutrientProfile,
  multiplyNutrient, 
  addNutrientValues,
  roundNutrient,
  hasKnownNutrient
} from './nutrientUtils';
import { createSourceSummary } from './sourceSummary';

export function calculateFoodItem(input: CalculationInput): CalculatedFoodItem {
  const validation = validateCalculationInput(input);
  
  const warnings: string[] = [];
  const source = input.food?.source || 'local';
  
  if (source === 'local') {
    warnings.push("Local database values are estimated fallback data.");
  } else if (source === 'llm_estimate') {
    warnings.push("AI-estimated nutrition is not verified by USDA.");
  } else if (source !== 'usda') {
    warnings.push("Nutrition source is unknown.");
  }

  if (!validation.isValid) {
    return {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
      foodId: input.food?.id || 'unknown',
      slug: input.food?.slug || 'unknown',
      displayName: input.food?.displayName || input.food?.name || 'Unknown Food',
      quantity: input.quantity || 0,
      unit: input.unit || '',
      grams: 0,
      nutrients: createEmptyNutrientProfile(),
      source: source as FoodSource,
      sourceLabel: input.food?.sourceLabel || 'Unknown',
      isEstimated: input.food?.isEstimated ?? true,
      warnings,
      validation
    };
  }

  const { grams, matchedServing } = resolveQuantityToGrams(input.food, input.quantity, input.unit);
  
  const factor = (grams as number) / 100;
  const baseNutrients = input.food.nutrientsPer100g;
  
  const calculatedNutrients: NutrientProfile = {
    calories: roundNutrient(multiplyNutrient(baseNutrients.calories, factor), 'calories'),
    protein: roundNutrient(multiplyNutrient(baseNutrients.protein, factor), 'protein'),
    carbohydrates: roundNutrient(multiplyNutrient(baseNutrients.carbohydrates, factor), 'carbohydrates'),
    fat: roundNutrient(multiplyNutrient(baseNutrients.fat, factor), 'fat'),
    fiber: roundNutrient(multiplyNutrient(baseNutrients.fiber, factor), 'fiber'),
    sugar: roundNutrient(multiplyNutrient(baseNutrients.sugar, factor), 'sugar'),
    sodium: roundNutrient(multiplyNutrient(baseNutrients.sodium, factor), 'sodium'),
    saturatedFat: roundNutrient(multiplyNutrient(baseNutrients.saturatedFat, factor), 'saturatedFat'),
    cholesterol: roundNutrient(multiplyNutrient(baseNutrients.cholesterol, factor), 'cholesterol'),
    potassium: roundNutrient(multiplyNutrient(baseNutrients.potassium, factor), 'potassium'),
  };

  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
    foodId: input.food.id,
    slug: input.food.slug,
    displayName: input.food.displayName || input.food.name,
    quantity: input.quantity,
    unit: input.unit,
    grams: grams as number,
    nutrients: calculatedNutrients,
    source: source as FoodSource,
    sourceLabel: input.food.sourceLabel,
    isEstimated: input.food.isEstimated,
    servingUsed: matchedServing,
    warnings,
    validation: { isValid: true }
  };
}

export function calculateMealTotals(items: CalculatedFoodItem[]): NutritionTotals {
  const validItems = items.filter(item => item.validation.isValid);
  const invalidItems = items.filter(item => !item.validation.isValid);
  
  if (validItems.length === 0) {
    return {
      nutrients: createEmptyNutrientProfile(),
      calories: 0,
      itemCount: 0,
      totalGrams: 0,
      sourceSummary: createSourceSummary([]),
      warnings: [],
      partialData: [],
      invalidItems
    };
  }

  const totals = createNullNutrientProfile();
  let totalGrams = 0;
  
  const nutrientKeys: (keyof NutrientProfile)[] = [
    'calories', 'protein', 'carbohydrates', 'fat', 
    'fiber', 'sugar', 'sodium', 'saturatedFat', 
    'cholesterol', 'potassium'
  ];

  const knownCounts: Record<keyof NutrientProfile, number> = {
    calories: 0, protein: 0, carbohydrates: 0, fat: 0,
    fiber: 0, sugar: 0, sodium: 0, saturatedFat: 0,
    cholesterol: 0, potassium: 0
  };

  for (const item of validItems) {
    totalGrams += item.grams;
    
    for (const key of nutrientKeys) {
      if (hasKnownNutrient(item.nutrients[key])) {
        totals[key] = addNutrientValues(totals[key], item.nutrients[key]);
        knownCounts[key]++;
      }
    }
  }

  // Round final totals
  for (const key of nutrientKeys) {
    totals[key] = roundNutrient(totals[key], key);
  }

  const partialData: string[] = [];
  for (const key of nutrientKeys) {
    if (knownCounts[key] > 0 && knownCounts[key] < validItems.length) {
      partialData.push(key);
    }
  }

  const sourceSummary = createSourceSummary(validItems);
  const warnings = [...sourceSummary.warnings];
  
  if (partialData.length > 0) {
    warnings.push(`Partial data: Some items are missing values for ${partialData.join(', ')}.`);
  }

  return {
    nutrients: totals,
    calories: totals.calories || 0,
    itemCount: validItems.length,
    totalGrams: Math.round(totalGrams),
    sourceSummary,
    warnings,
    partialData,
    invalidItems
  };
}
