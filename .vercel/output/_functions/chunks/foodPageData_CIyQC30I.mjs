import { l as localFoods } from './index_BdrwoXsL.mjs';

function getAllFoodPages() {
  return localFoods.filter((food) => food.slug);
}

export { getAllFoodPages as g };
