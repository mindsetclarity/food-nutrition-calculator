import { l as localFoods } from './foods_CLkM41zY.mjs';

function getAllFoodPages() {
  return localFoods.filter((food) => food.slug);
}

export { getAllFoodPages as g };
