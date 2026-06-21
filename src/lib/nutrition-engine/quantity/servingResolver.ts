import type { 
  ServingResolutionInput, 
  ResolvedServing, 
  NormalizedQuantityUnit 
} from './quantityTypes';
import { 
  normalizeQuantityUnit, 
  isWeightUnit, 
  convertWeightToGrams,
  formatGrams
} from './unitConverter';
import { QuantityWarnings } from './quantityWarnings';
import { canUseDensity, convertVolumeToGramsWithDensity } from './densityConverter';
import type { EngineWarning } from '../warnings';
import type { EngineConfidence } from '../confidence';
import type { FoodServingSize } from '../types';

function findServingById(servings: FoodServingSize[], id: string): FoodServingSize | undefined {
  return servings.find(s => s.id === id);
}

function findServingByUnitMatch(servings: FoodServingSize[], unit: NormalizedQuantityUnit, originalUnit: string): FoodServingSize | undefined {
  // First exact match on unit
  let match = servings.find(s => normalizeQuantityUnit(s.unit) === unit);
  if (match) return match;
  
  // Then try to match by label parsing
  match = servings.find(s => {
    const labelLower = s.label.toLowerCase();
    return labelLower.includes(originalUnit.toLowerCase());
  });
  return match;
}

function getDefaultServing(servings: FoodServingSize[]): FoodServingSize | undefined {
  if (!servings || servings.length === 0) return undefined;
  
  let match = servings.find(s => s.isDefault);
  if (match) return match;
  
  // Fallbacks
  const preferences: NormalizedQuantityUnit[] = ['serving', 'medium', 'piece', 'cup'];
  for (const pref of preferences) {
    match = servings.find(s => normalizeQuantityUnit(s.unit) === pref);
    if (match) return match;
  }
  
  // Fallback to 100g if it exists
  match = servings.find(s => s.grams === 100);
  if (match) return match;

  return servings[0];
}

export function resolveServingToGrams(input: ServingResolutionInput): ResolvedServing {
  const { food, amount, unit, servingId } = input;
  const warnings: EngineWarning[] = [];
  const normalizedUnit = normalizeQuantityUnit(unit);
  const servings = food.servingSizes || [];
  
  let confidenceLevel: EngineConfidence["level"] = "low";
  let reasons: string[] = [];
  let needsReview = true;
  let grams = 0;
  let resolvedLabel = "";
  let resolvedId = "";

  // Priority 1: Exact Serving ID
  if (servingId) {
    const serving = findServingById(servings, servingId);
    if (serving) {
      grams = serving.grams * amount;
      resolvedLabel = serving.label;
      resolvedId = serving.id;
      confidenceLevel = "high";
      reasons.push("Matched exact serving ID");
      needsReview = false;
      return buildResult();
    } else {
      warnings.push(QuantityWarnings.servingNotFound(servingId));
    }
  }

  // Priority 2: Weight unit directly to grams
  if (isWeightUnit(normalizedUnit)) {
    const converted = convertWeightToGrams(amount, normalizedUnit);
    if (converted !== null) {
      grams = converted;
      resolvedLabel = `${amount} ${unit}`;
      confidenceLevel = "high";
      reasons.push("Exact weight conversion");
      needsReview = false;
      return buildResult();
    }
  }

  // Priority 3: Unit matches a food-specific serving
  if (normalizedUnit !== 'unknown') {
    const serving = findServingByUnitMatch(servings, normalizedUnit, unit);
    if (serving) {
      grams = serving.grams * amount;
      resolvedLabel = serving.label;
      resolvedId = serving.id;
      confidenceLevel = "high";
      reasons.push("Matched food-specific serving unit");
      needsReview = false;
      return buildResult();
    }
  }

  // Priority 4: Density conversion if volume
  if (canUseDensity(food)) {
    const density = (food as any).density;
    const converted = convertVolumeToGramsWithDensity(amount, normalizedUnit, density);
    if (converted !== null) {
      grams = converted;
      resolvedLabel = `${amount} ${unit} (density converted)`;
      confidenceLevel = "medium";
      reasons.push("Volume to weight density conversion");
      warnings.push(QuantityWarnings.densityConversionUsed());
      needsReview = false; // It's a calculated physical property, somewhat reliable
      return buildResult();
    }
  }

  // Priority 5: Missing unit, or unmatched unit -> try default serving
  const defaultServing = getDefaultServing(servings);
  if (defaultServing) {
    // If unit was unknown or missing, use default serving directly
    // If unit was something else (e.g. cup for an apple), it's unsupported. 
    // We'll fallback to default serving with a heavy warning.
    grams = defaultServing.grams * amount;
    resolvedLabel = defaultServing.label;
    resolvedId = defaultServing.id;
    
    if (normalizedUnit !== 'unknown') {
      warnings.push(QuantityWarnings.unitUnsupported(unit));
      warnings.push(QuantityWarnings.defaultServingUsed());
      confidenceLevel = "low";
      reasons.push("Unsupported unit, fell back to default serving");
      needsReview = true;
    } else {
      warnings.push(QuantityWarnings.defaultServingUsed());
      confidenceLevel = "medium";
      reasons.push("Used default serving");
      needsReview = false; 
    }
    return buildResult();
  }

  // Priority 6: No unit, no default serving -> fallback to 100g
  grams = amount * 100;
  resolvedLabel = "100 g";
  warnings.push(QuantityWarnings.hundredGramFallback());
  confidenceLevel = "low";
  reasons.push("No serving data found, used 100g base");
  needsReview = true;

  return buildResult();

  function buildResult(): ResolvedServing {
    return {
      amount,
      unit,
      normalizedUnit,
      grams: formatGrams(grams),
      servingId: resolvedId || undefined,
      servingLabel: resolvedLabel || undefined,
      source: food.source,
      isEstimated: !!food.isEstimated || confidenceLevel !== "high",
      confidence: {
        level: confidenceLevel,
        reasons,
        needsReview
      },
      needsReview,
      warnings
    };
  }
}
