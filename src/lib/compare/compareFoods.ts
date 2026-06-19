import type { 
  CompareFood, CompareResult, CompareNutrientRow, CompareNutrientKey, CompareCell,
  CompareInsight, CompareWarning, CompareSourceSummary, CompareBasis
} from './types';
import { formatCompareAmount, formatNutrientLabel } from './compareFormatting';
import { rankCellsByNutrient } from './compareRanking';
import { calculateFoodItem } from '../nutrition/calculateNutrition';

const NUTRIENT_KEYS: CompareNutrientKey[] = [
  'calories', 'protein', 'carbohydrates', 'fat', 'fiber', 'sugar', 'sodium',
  'saturatedFat', 'cholesterol', 'potassium'
];

export function buildCompareResult(foods: CompareFood[], basis: CompareBasis = '100g'): CompareResult {
  const rows = buildCompareRows(foods, basis);
  const sourceSummary = buildCompareSourceSummary(foods);
  const warnings = buildCompareWarnings(foods, rows, basis);
  const insights = buildCompareInsights(foods, rows);

  return {
    basis,
    foods,
    rows,
    insights,
    warnings,
    sourceSummary
  };
}

function buildCompareRows(foods: CompareFood[], basis: CompareBasis): CompareNutrientRow[] {
  return NUTRIENT_KEYS.map(key => {
    const { label, unit } = formatNutrientLabel(key);
    
    let cells: CompareCell[] = foods.map(food => {
      let val: number | null = null;
      
      if (basis === '100g') {
        val = food.nutrientsPer100g?.[key as keyof typeof food.nutrientsPer100g] ?? null;
      } else {
        // per serving
        const servingGramWeight = food.servingSizes?.[0]?.grams;
        if (servingGramWeight) {
          const calc = calculateFoodItem(food, { unit: 'g', amount: servingGramWeight });
          val = calc.totals?.[key as keyof typeof calc.totals] ?? null;
        } else {
          // Fallback to 100g if no serving available
          val = food.nutrientsPer100g?.[key as keyof typeof food.nutrientsPer100g] ?? null;
        }
      }

      return {
        foodId: food.compareId,
        value: val,
        formatted: formatCompareAmount(val, key)
      };
    });

    cells = rankCellsByNutrient(cells);

    return {
      key,
      label,
      unit,
      cells
    };
  });
}

function buildCompareSourceSummary(foods: CompareFood[]): CompareSourceSummary {
  let usda = 0;
  let local = 0;
  let unknown = 0;

  foods.forEach(f => {
    if (f.source === 'usda') usda++;
    else if (f.source === 'local') local++;
    else unknown++;
  });

  return { usda, local, unknown };
}

function buildCompareWarnings(foods: CompareFood[], rows: CompareNutrientRow[], basis: CompareBasis): CompareWarning[] {
  const warnings: CompareWarning[] = [];
  
  if (foods.some(f => f.isEstimated || f.source === 'local')) {
    warnings.push({ type: 'warning', text: "Local fallback values are estimates." });
  }

  const hasMissingData = rows.some(row => row.cells.some(c => c.value === null));
  if (hasMissingData) {
    warnings.push({ type: 'warning', text: "Some nutrients are unavailable." });
  }

  if (basis === 'serving') {
    warnings.push({ type: 'warning', text: "Serving-size comparisons vary by brand and preparation." });
  }

  return warnings;
}

function buildCompareInsights(foods: CompareFood[], rows: CompareNutrientRow[]): CompareInsight[] {
  const insights: CompareInsight[] = [];
  if (foods.length < 2) return insights;

  const proteinRow = rows.find(r => r.key === 'protein');
  const calorieRow = rows.find(r => r.key === 'calories');
  const fiberRow = rows.find(r => r.key === 'fiber');

  // Helper to generate simple insights
  const generateInsight = (row: CompareNutrientRow | undefined, nutrientName: string) => {
    if (!row) return;
    const highestCell = row.cells.find(c => c.label === 'Highest');
    if (highestCell) {
      const food = foods.find(f => f.compareId === highestCell.foodId);
      if (food) {
        insights.push({
          type: 'info',
          text: `${food.displayName} has the most ${nutrientName} among the compared foods.`
        });
      }
    }
  };

  generateInsight(proteinRow, 'protein');
  generateInsight(fiberRow, 'fiber');
  generateInsight(calorieRow, 'calories');
  
  const hasMissingData = rows.some(row => row.cells.some(c => c.value === null));
  if (hasMissingData) {
     insights.push({
        type: 'neutral',
        text: 'Some values are unavailable, so comparisons may be partial.'
     });
  }

  // Keep it concise, max 3-4 insights
  return insights.slice(0, 4);
}
