const inputLimits = {
  foodSearchMinLength: 2,
  foodSearchMaxLength: 120,
  foodSearchResultLimit: 15,
  parseMealMaxChars: 1500,
  recipeMaxChars: 5e3,
  recipeMaxIngredientLines: 50,
  mealMaxItemsPerSection: 20,
  compareMaxFoods: 4,
  quantityMin: 0.01,
  quantityMax: 1e4,
  servingsMin: 1,
  servingsMax: 100
};
function isValidSearchQuery(q) {
  if (!q) return false;
  const trimmed = q.trim();
  return trimmed.length >= inputLimits.foodSearchMinLength && trimmed.length <= inputLimits.foodSearchMaxLength;
}

export { isValidSearchQuery as a, inputLimits as i };
