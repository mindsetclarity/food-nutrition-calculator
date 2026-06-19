import type { NutritionLabelInput, NutritionLabelRow, NutritionLabelNutrients } from './types';
import { calculatePercentDailyValue, getDailyValueForNutrient } from './percentDailyValue';

export function normalizeLabelNutrients(input: any): NutritionLabelNutrients {
  return {
    calories: input?.calories ?? null,
    protein: input?.protein ?? null,
    carbohydrates: input?.carbohydrates ?? input?.carbs ?? null,
    fat: input?.fat ?? null,
    fiber: input?.fiber ?? null,
    sugar: input?.sugar ?? null,
    sodium: input?.sodium ?? null,
    saturatedFat: input?.saturatedFat ?? null,
    transFat: input?.transFat ?? null,
    cholesterol: input?.cholesterol ?? null,
    addedSugars: input?.addedSugars ?? null,
    vitaminD: input?.vitaminD ?? null,
    calcium: input?.calcium ?? null,
    iron: input?.iron ?? null,
    potassium: input?.potassium ?? null,
  };
}

export function detectPartialData(nutrients: NutritionLabelNutrients): boolean {
  const essential = ['calories', 'protein', 'carbohydrates', 'fat'];
  return essential.some(key => nutrients[key as keyof NutritionLabelNutrients] === null);
}

export function getSourceWarnings(sourceSummary: any): string[] {
  const warnings: string[] = [];
  if (!sourceSummary) return warnings;
  
  if (sourceSummary.localFallbackCount > 0) {
    warnings.push("Some values use local fallback data and are estimates.");
  }
  if (sourceSummary.unknownCount > 0) {
    warnings.push("Some items have unknown sources.");
  }
  return warnings;
}

export function buildLabelRows(nutrients: NutritionLabelNutrients): NutritionLabelRow[] {
  const rows: NutritionLabelRow[] = [];

  const addRow = (label: string, amount: number | null, unit: string, dvKey: any, indent: number, bold: boolean, nutrientKey: string) => {
    const dv = dvKey ? getDailyValueForNutrient(dvKey) : null;
    const percent = dvKey ? calculatePercentDailyValue(amount, dv) : null;
    rows.push({
      label,
      amount,
      unit,
      percentDailyValue: percent,
      indentLevel: indent,
      bold,
      optional: false,
      unavailable: amount === null,
      nutrientKey
    });
  };

  addRow("Total Fat", nutrients.fat, "g", "totalFat", 0, true, "fat");
  addRow("Saturated Fat", nutrients.saturatedFat, "g", "saturatedFat", 1, false, "saturatedFat");
  addRow("Trans Fat", nutrients.transFat, "g", null, 1, false, "transFat");
  addRow("Cholesterol", nutrients.cholesterol, "mg", "cholesterol", 0, true, "cholesterol");
  addRow("Sodium", nutrients.sodium, "mg", "sodium", 0, true, "sodium");
  addRow("Total Carbohydrate", nutrients.carbohydrates, "g", "totalCarbohydrate", 0, true, "carbohydrates");
  addRow("Dietary Fiber", nutrients.fiber, "g", "fiber", 1, false, "fiber");
  addRow("Total Sugars", nutrients.sugar, "g", null, 1, false, "sugar");
  addRow("Includes Added Sugars", nutrients.addedSugars, "g", "addedSugars", 2, false, "addedSugars");
  addRow("Protein", nutrients.protein, "g", null, 0, true, "protein");

  return rows;
}
