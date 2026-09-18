import type { FoodItem, ServingSize } from './types';

export const OUNCES_TO_GRAMS = 28.3495;
export const POUNDS_TO_GRAMS = 453.592;

export function normalizeUnit(unit: string): string {
  const u = unit.toLowerCase().trim();
  switch (u) {
    case 'g':
    case 'gram':
    case 'grams':
      return 'g';
    case 'oz':
    case 'ounce':
    case 'ounces':
      return 'oz';
    case 'lb':
    case 'lbs':
    case 'pound':
    case 'pounds':
      return 'lb';
    case 'tbsp':
    case 'tablespoon':
    case 'tablespoons':
      return 'tbsp';
    case 'tsp':
    case 'teaspoon':
    case 'teaspoons':
      return 'tsp';
    case 'serving':
    case 'servings':
      return 'serving';
    case 'cup':
    case 'cups':
      return 'cup';
    case 'slice':
    case 'slices':
      return 'slice';
    case 'piece':
    case 'pieces':
      return 'piece';
    case 'can':
    case 'cans':
      return 'can';
    case 'bottle':
    case 'bottles':
      return 'bottle';
    case 'scoop':
    case 'scoops':
      return 'scoop';
    case 'packet':
    case 'packets':
      return 'packet';
    case 'clove':
    case 'cloves':
      return 'clove';
    default:
      return u;
  }
}

export function ouncesToGrams(ounces: number): number {
  return ounces * OUNCES_TO_GRAMS;
}

export function poundsToGrams(pounds: number): number {
  return pounds * POUNDS_TO_GRAMS;
}

export function findServingSize(food: FoodItem, unit: string): ServingSize | undefined {
  const normUnit = normalizeUnit(unit);

  if (normUnit === 'g') {
    return { unit: 'g', label: '1 g', grams: 1 };
  }
  if (normUnit === 'oz') {
    return { unit: 'oz', label: '1 oz', grams: OUNCES_TO_GRAMS };
  }
  if (normUnit === 'lb') {
    return { unit: 'lb', label: '1 lb', grams: POUNDS_TO_GRAMS };
  }

  const direct = food.servingSizes.find(s => normalizeUnit(s.unit) === normUnit);
  if (direct || !(normUnit in TSP_PER)) return direct;

  // A food measured in cups can still be measured in spoons, and vice versa.
  const volume = food.servingSizes.find(s => normalizeUnit(s.unit) in TSP_PER);
  if (!volume) return undefined;
  const gramsPerTsp = volume.grams / TSP_PER[normalizeUnit(volume.unit)];
  return { unit: normUnit, label: `1 ${normUnit}`, grams: gramsPerTsp * TSP_PER[normUnit] };
}

const TSP_PER: Record<string, number> = { cup: 48, tbsp: 3, tsp: 1 };

export function resolveQuantityToGrams(
  food: FoodItem, 
  quantity: number, 
  unit: string
): { grams: number | null; error?: string; matchedServing?: ServingSize } {
  if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
    return { grams: null, error: "Enter a quantity greater than zero." };
  }

  if (!unit || unit.trim() === '') {
    return { grams: null, error: "Choose a unit for this food." };
  }

  const serving = findServingSize(food, unit);

  if (!serving) {
    const units = new Set(['g', 'oz', 'lb', ...food.servingSizes.map(s => normalizeUnit(s.unit))]);
    return { grams: null, error: `This unit is not available for the selected food. Use: ${[...units].join(', ')}.` };
  }

  return { grams: serving.grams * quantity, matchedServing: serving };
}
