import type { FoodItem, NutrientProfile } from '../nutrition/types';

export function getFoodsDirectorySeo() {
  return {
    title: "Food Nutrition Facts | Calories & Macros for Common Foods",
    description: "Browse calories, macros, serving sizes, and nutrition facts for common US foods. Use the calculator for USDA-first food nutrition search."
  };
}

export function getDefaultServing(food: FoodItem) {
  return food.servingSizes?.find(s => s.isDefault) ?? food.servingSizes?.[0] ?? { label: '100 g', grams: 100 };
}

// Nutrient amount for `grams` of the food, rounded (calories/sodium to whole, others to 0.1).
export function nutrientFor(food: FoodItem, key: keyof NutrientProfile, grams: number): number | null {
  const per100 = food.nutrientsPer100g?.[key];
  if (per100 == null) return null;
  const v = (per100 * grams) / 100;
  return key === 'calories' || key === 'sodium' ? Math.round(v) : Math.round(v * 10) / 10;
}

// "1 medium, 182 g" — or just "100 g" when the label already is the weight.
export function servingText(s: { label: string; grams: number }) {
  return /^\d+(\.\d+)?\s*g$/i.test(s.label.trim()) ? s.label : `${s.label}, ${s.grams} g`;
}

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

export function getFoodDetailSeo(food: FoodItem) {
  const s = getDefaultServing(food);
  const kcal = nutrientFor(food, 'calories', s.grams);
  const name = food.displayName;
  if (kcal == null) {
    return {
      title: `${name} Nutrition Facts | Calories & Macros`,
      description: `View calories, macros, serving sizes, and nutrition facts for ${name}. Values are estimates and may vary by brand and preparation.`
    };
  }
  const p = nutrientFor(food, 'protein', s.grams);
  const c = nutrientFor(food, 'carbohydrates', s.grams);
  const f = nutrientFor(food, 'fat', s.grams);
  const macros = [p != null && `${p} g protein`, c != null && `${c} g carbs`, f != null && `${f} g fat`].filter(Boolean).join(', ');
  return {
    title: `Calories in ${name}: ${kcal} kcal per ${s.label} | Nutrition Facts`,
    description: `${name} (${servingText(s)}) has ${kcal} calories${macros ? `, ${macros}` : ''}. See per-100 g values, serving sizes, macros and a full nutrition label.`
  };
}

// FAQ answers built from the food's own numbers, so every page has unique, answerable text.
export function getFoodFaqs(food: FoodItem): { question: string; answer: string }[] {
  const s = getDefaultServing(food);
  const name = food.displayName.toLowerCase();
  const subject = `${cap(name)} (${servingText(s)})`;
  const n = (k: keyof NutrientProfile, g = s.grams) => nutrientFor(food, k, g);
  const faqs: { question: string; answer: string }[] = [];

  const kcal = n('calories');
  if (kcal != null) {
    faqs.push({
      question: `How many calories are in ${name} (${s.label})?`,
      answer: `${subject} contains about ${kcal} calories. Per 100 g it has ${n('calories', 100)} calories.`
    });
  }
  const protein = n('protein');
  if (protein != null) {
    const per100 = n('protein', 100)!;
    const level = per100 >= 10 ? 'a good source of protein' : per100 >= 5 ? 'a moderate source of protein' : 'low in protein';
    faqs.push({
      question: `How much protein is in ${name}?`,
      answer: `${subject} has about ${protein} g of protein (${per100} g per 100 g), which makes it ${level}.`
    });
  }
  const carbs = n('carbohydrates');
  if (carbs != null) {
    const fiber = n('fiber');
    const sugar = n('sugar');
    const extra = [fiber != null && `${fiber} g fiber`, sugar != null && `${sugar} g sugar`].filter(Boolean).join(' and ');
    faqs.push({
      question: `How many carbs are in ${name}?`,
      answer: `${subject} has about ${carbs} g of carbohydrates${extra ? `, including ${extra}` : ''}.`
    });
  }
  const fat = n('fat');
  if (fat != null) {
    const per100 = n('fat', 100)!;
    // Thresholds follow the common UK FSA traffic-light bands for fat per 100 g.
    const verdict = per100 > 17.5 ? 'That counts as high in fat.' : per100 <= 3 ? 'That counts as low in fat.' : 'That is a moderate amount of fat.';
    faqs.push({
      question: `Is ${name} high in fat?`,
      answer: `${subject} has about ${fat} g of fat (${per100} g per 100 g). ${verdict}`
    });
  }
  return faqs;
}
