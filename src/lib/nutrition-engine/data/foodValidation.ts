import type { CuratedFoodItem } from './foodSchema';
import { isValidFoodCategory } from './categorySchema';
import { isValidServingSize } from './servingSchema';

export function validateFoodItem(food: CuratedFoodItem): string[] {
  const errors: string[] = [];

  // Identity
  if (!food.id) errors.push(`Missing id`);
  if (!food.slug) errors.push(`Missing slug for ${food.id}`);
  if (food.slug && !/^[a-z0-9-]+$/.test(food.slug)) errors.push(`Invalid slug format: ${food.slug}`);
  if (!food.displayName) errors.push(`Missing displayName for ${food.id}`);
  if (!food.canonicalName) errors.push(`Missing canonicalName for ${food.id}`);
  if (!food.searchName) errors.push(`Missing searchName for ${food.id}`);

  // Category
  if (!food.category) errors.push(`Missing category for ${food.id}`);
  else if (!isValidFoodCategory(food.category)) errors.push(`Invalid category: ${food.category}`);

  // Source
  if (!food.source) errors.push(`Missing source for ${food.id}`);
  if (!food.sourceLabel) errors.push(`Missing sourceLabel for ${food.id}`);
  if (typeof food.isEstimated !== 'boolean') errors.push(`Missing or invalid isEstimated for ${food.id}`);

  // Nutrients
  if (!food.nutrientsPer100g) {
    errors.push(`Missing nutrientsPer100g for ${food.id}`);
  } else {
    const { calories, protein, carbs, fat } = food.nutrientsPer100g;
    
    const checkNutrient = (name: string, val: number | null | undefined) => {
      if (typeof val === 'number') {
        if (!isFinite(val)) errors.push(`Nutrient ${name} is not finite in ${food.id}`);
        if (val < 0) errors.push(`Nutrient ${name} is negative in ${food.id}`);
      }
    };
    
    checkNutrient('calories', calories);
    checkNutrient('protein', protein);
    checkNutrient('carbs', carbs);
    checkNutrient('fat', fat);
    
    // Check optional nutrients for valid numbers
    Object.entries(food.nutrientsPer100g).forEach(([key, val]) => {
      checkNutrient(key, val as number | null | undefined);
    });
  }

  // Serving
  if (!food.servingSizes || !Array.isArray(food.servingSizes)) {
    errors.push(`Missing servingSizes array for ${food.id}`);
  } else {
    if (food.servingSizes.length === 0) {
      errors.push(`Empty servingSizes array for ${food.id}`);
    }
    food.servingSizes.forEach((serving, index) => {
      if (!isValidServingSize(serving)) {
        errors.push(`Invalid serving size at index ${index} for ${food.id}`);
      }
    });
  }

  // Arrays
  if (!Array.isArray(food.aliases)) errors.push(`aliases must be an array for ${food.id}`);
  if (!Array.isArray(food.tags)) errors.push(`tags must be an array for ${food.id}`);
  if (food.warnings && !Array.isArray(food.warnings)) errors.push(`warnings must be an array for ${food.id}`);

  return errors;
}

export function validateFoodCollection(foods: CuratedFoodItem[]): string[] {
  const errors: string[] = [];
  foods.forEach(food => {
    errors.push(...validateFoodItem(food));
  });
  return errors;
}

export function findDuplicateFoodIds(foods: CuratedFoodItem[]): string[] {
  const ids = new Set<string>();
  const duplicates = new Set<string>();
  for (const food of foods) {
    if (ids.has(food.id)) duplicates.add(food.id);
    ids.add(food.id);
  }
  return Array.from(duplicates);
}

export function findDuplicateFoodSlugs(foods: CuratedFoodItem[]): string[] {
  const slugs = new Set<string>();
  const duplicates = new Set<string>();
  for (const food of foods) {
    if (slugs.has(food.slug)) duplicates.add(food.slug);
    slugs.add(food.slug);
  }
  return Array.from(duplicates);
}

export function findInvalidNutrients(foods: CuratedFoodItem[]): CuratedFoodItem[] {
  return foods.filter(food => {
    if (!food.nutrientsPer100g) return true;
    const { calories, protein, carbs, fat } = food.nutrientsPer100g;
    return (
      (typeof calories === 'number' && (!isFinite(calories) || calories < 0)) ||
      (typeof protein === 'number' && (!isFinite(protein) || protein < 0)) ||
      (typeof carbs === 'number' && (!isFinite(carbs) || carbs < 0)) ||
      (typeof fat === 'number' && (!isFinite(fat) || fat < 0))
    );
  });
}

export function findInvalidServingSizes(foods: CuratedFoodItem[]): CuratedFoodItem[] {
  return foods.filter(food => {
    if (!food.servingSizes || food.servingSizes.length === 0) return true;
    return food.servingSizes.some(s => !isValidServingSize(s));
  });
}

export function findMissingCoreFields(foods: CuratedFoodItem[]): CuratedFoodItem[] {
  return foods.filter(food => {
    return !food.id || !food.slug || !food.displayName || !food.canonicalName || !food.category || !food.source;
  });
}

export function findMissingDefaultServings(foods: CuratedFoodItem[]): CuratedFoodItem[] {
  return foods.filter(food => {
    if (!food.servingSizes || food.servingSizes.length === 0) return true;
    return !food.servingSizes.some(s => s.isDefault);
  });
}

export function findInvalidCategories(foods: CuratedFoodItem[]): CuratedFoodItem[] {
  return foods.filter(food => !isValidFoodCategory(food.category));
}

export function createFoodDataValidationReport(foods: CuratedFoodItem[]) {
  const errors = validateFoodCollection(foods);
  const duplicatesIds = findDuplicateFoodIds(foods);
  const duplicatesSlugs = findDuplicateFoodSlugs(foods);
  const invalidNutrients = findInvalidNutrients(foods);
  const invalidServings = findInvalidServingSizes(foods);
  const missingCoreFields = findMissingCoreFields(foods);
  const invalidCategories = findInvalidCategories(foods);

  return {
    totalFoods: foods.length,
    totalErrors: errors.length,
    errors,
    duplicatesIds,
    duplicatesSlugs,
    invalidNutrientsCount: invalidNutrients.length,
    invalidServingsCount: invalidServings.length,
    missingCoreFieldsCount: missingCoreFields.length,
    invalidCategoriesCount: invalidCategories.length,
    passed: errors.length === 0 && duplicatesIds.length === 0 && duplicatesSlugs.length === 0
  };
}
