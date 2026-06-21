import type { CuratedServingSize } from '../../lib/nutrition-engine/data/foodSchema';

export function createServing(
  id: string,
  label: string,
  grams: number,
  quantity: number,
  unit: string,
  isDefault: boolean = false
): CuratedServingSize {
  return { id, label, grams, quantity, unit, isDefault };
}

export function createDefaultServing(
  grams: number = 100
): CuratedServingSize {
  return createServing('default-100g', '100 g', grams, 100, 'g', true);
}

export function createFoodId(category: string, name: string): string {
  return `${category}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

export function createFoodSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const commonTags = {
  raw: 'raw',
  cooked: 'cooked',
  vegan: 'vegan',
  vegetarian: 'vegetarian',
  glutenFree: 'gluten-free',
  dairyFree: 'dairy-free',
  keto: 'keto-friendly',
};

export const commonWarnings = {
  estimated: 'Nutrient values are estimated.',
  generic: 'Generic food profile.',
};
