import type { NormalizedQuantityUnit } from './quantityTypes';

export function normalizeQuantityUnit(unit: string): NormalizedQuantityUnit {
  const normalized = unit.toLowerCase().trim().replace(/\.$/, ''); // remove trailing dot
  switch (normalized) {
    case 'g':
    case 'gram':
    case 'grams':
      return 'g';
    case 'kg':
    case 'kilo':
    case 'kilos':
    case 'kilogram':
    case 'kilograms':
      return 'kg';
    case 'oz':
    case 'ounce':
    case 'ounces':
      return 'oz';
    case 'lb':
    case 'lbs':
    case 'pound':
    case 'pounds':
      return 'lb';
    case 'cup':
    case 'cups':
    case 'c':
      return 'cup';
    case 'tbsp':
    case 'tablespoon':
    case 'tablespoons':
    case 'tbs':
      return 'tbsp';
    case 'tsp':
    case 'teaspoon':
    case 'teaspoons':
      return 'tsp';
    case 'piece':
    case 'pieces':
    case 'pc':
    case 'pcs':
      return 'piece';
    case 'slice':
    case 'slices':
      return 'slice';
    case 'serving':
    case 'servings':
      return 'serving';
    case 'medium':
    case 'med':
      return 'medium';
    case 'small':
    case 'sm':
      return 'small';
    case 'large':
    case 'lg':
      return 'large';
    case 'bowl':
    case 'bowls':
      return 'bowl';
    case 'can':
    case 'cans':
      return 'can';
    case 'package':
    case 'pkg':
    case 'packages':
      return 'package';
    case '':
      return 'unknown';
    default:
      return 'unknown';
  }
}

export function isWeightUnit(unit: NormalizedQuantityUnit): boolean {
  return ['g', 'kg', 'oz', 'lb'].includes(unit);
}

export function isVolumeUnit(unit: NormalizedQuantityUnit): boolean {
  return ['cup', 'tbsp', 'tsp'].includes(unit);
}

export function isServingUnit(unit: NormalizedQuantityUnit): boolean {
  return ['serving', 'medium', 'small', 'large'].includes(unit);
}

export function isCountUnit(unit: NormalizedQuantityUnit): boolean {
  return ['piece', 'slice', 'bowl', 'can', 'package'].includes(unit);
}

export function convertWeightToGrams(amount: number, unit: NormalizedQuantityUnit): number | null {
  if (amount <= 0 || !isFinite(amount)) return null;
  switch (unit) {
    case 'g':
      return amount;
    case 'kg':
      return amount * 1000;
    case 'oz':
      return amount * 28.3495;
    case 'lb':
      return amount * 453.592;
    default:
      return null;
  }
}

export function formatGrams(grams: number): number {
  return Math.round(grams * 100) / 100;
}

export function getUnitDisplayLabel(unit: NormalizedQuantityUnit, amount: number = 1): string {
  if (unit === 'unknown') return '';
  const isPlural = amount !== 1;
  
  const labels: Record<NormalizedQuantityUnit, { s: string; p: string }> = {
    g: { s: 'g', p: 'g' },
    kg: { s: 'kg', p: 'kg' },
    oz: { s: 'oz', p: 'oz' },
    lb: { s: 'lb', p: 'lbs' },
    cup: { s: 'cup', p: 'cups' },
    tbsp: { s: 'tbsp', p: 'tbsp' },
    tsp: { s: 'tsp', p: 'tsp' },
    piece: { s: 'piece', p: 'pieces' },
    slice: { s: 'slice', p: 'slices' },
    serving: { s: 'serving', p: 'servings' },
    medium: { s: 'medium', p: 'medium' },
    small: { s: 'small', p: 'small' },
    large: { s: 'large', p: 'large' },
    bowl: { s: 'bowl', p: 'bowls' },
    can: { s: 'can', p: 'cans' },
    package: { s: 'package', p: 'packages' },
    unknown: { s: '', p: '' }
  };
  
  return isPlural ? labels[unit].p : labels[unit].s;
}
