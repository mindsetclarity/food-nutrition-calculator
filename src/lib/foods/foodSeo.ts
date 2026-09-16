import type { FoodItem } from '../nutrition/types';

export function getFoodsDirectorySeo() {
  return {
    title: "Food Nutrition Facts | Calories & Macros for Common Foods",
    description: "Browse calories, macros, serving sizes, and nutrition facts for common US foods. Use the calculator for USDA-first food nutrition search."
  };
}

export function getFoodDetailSeo(food: FoodItem) {
  return {
    title: `${food.displayName} Nutrition Facts | Calories & Macros`,
    description: `View calories, macros, serving sizes, and nutrition facts for ${food.displayName}. Values are estimates and may vary by brand and preparation.`
  };
}
