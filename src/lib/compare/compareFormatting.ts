import type { CompareNutrientKey, CompareBasis } from './types';

export function formatCompareAmount(value: number | null | undefined, key: CompareNutrientKey): string {
  if (value === null || value === undefined) return '<span aria-hidden="true">&mdash;</span><span class="sr-only">No data</span>';
  
  switch (key) {
    case 'calories':
    case 'sodium':
    case 'cholesterol':
    case 'potassium':
      return Math.round(value).toString();
    default:
      if (value >= 100) return Math.round(value).toString();
      return Number(value).toFixed(1).replace(/\.0$/, '');
  }
}

export function formatCompareBasisLabel(basis: CompareBasis): string {
  if (basis === '100g') return 'Per 100g';
  if (basis === 'serving') return 'Per Serving';
  return 'Unknown';
}

export function formatNutrientLabel(key: CompareNutrientKey): { label: string, unit: string } {
  const map: Record<CompareNutrientKey, { label: string, unit: string }> = {
    calories: { label: 'Calories', unit: 'kcal' },
    protein: { label: 'Protein', unit: 'g' },
    carbohydrates: { label: 'Carbs', unit: 'g' },
    fat: { label: 'Fat', unit: 'g' },
    fiber: { label: 'Fiber', unit: 'g' },
    sugar: { label: 'Sugar', unit: 'g' },
    sodium: { label: 'Sodium', unit: 'mg' },
    saturatedFat: { label: 'Sat. Fat', unit: 'g' },
    cholesterol: { label: 'Cholesterol', unit: 'mg' },
    potassium: { label: 'Potassium', unit: 'mg' }
  };
  return map[key] || { label: key, unit: '' };
}
