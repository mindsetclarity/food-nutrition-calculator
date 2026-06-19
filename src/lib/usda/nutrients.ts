import type { NutrientProfile } from '../nutrition/types';

export const USDA_NUTRIENT_MAP: Record<string, keyof NutrientProfile> = {
  'Energy': 'calories',
  'Protein': 'protein',
  'Carbohydrate, by difference': 'carbohydrates',
  'Total lipid (fat)': 'fat',
  'Fiber, total dietary': 'fiber',
  'Sugars, total including NLEA': 'sugar',
  'Total Sugars': 'sugar',
  'Sodium, Na': 'sodium',
  'Fatty acids, total saturated': 'saturatedFat',
  'Cholesterol': 'cholesterol',
  'Potassium, K': 'potassium'
};

export function mapUsdaNutrientName(name: string): keyof NutrientProfile | null {
  for (const [usdaName, appKey] of Object.entries(USDA_NUTRIENT_MAP)) {
    if (name.toLowerCase().includes(usdaName.toLowerCase())) {
      return appKey;
    }
  }
  return null;
}
