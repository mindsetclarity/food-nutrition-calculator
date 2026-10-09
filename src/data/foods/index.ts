// Re-export all categories
import type { FoodItem } from '../../lib/nutrition/types';
import { fruitsFoods } from './fruits';
import { vegetablesFoods } from './vegetables';
import { proteinfoodsFoods } from './proteinfoods';
import { beansplantproteinFoods } from './beansplantprotein';
import { breakfastFoods } from './breakfast';
import { grainscerealsFoods } from './grainscereals';
import { dairyalternativesFoods } from './dairyalternatives';
import { nutsseedsFoods } from './nutsseeds';
import { bakeryFoods } from './bakery';
import { fastfoodFoods } from './fastfood';
import { preparedmealsFoods } from './preparedmeals';
import { snacksFoods } from './snacks';
import { dessertsFoods } from './desserts';
import { beveragesFoods } from './beverages';
import { condimentsFoods } from './condiments';
import { indianFoods } from './indian';

export const localFoods: FoodItem[] = [
  ...fruitsFoods,
  ...vegetablesFoods,
  ...proteinfoodsFoods,
  ...beansplantproteinFoods,
  ...breakfastFoods,
  ...grainscerealsFoods,
  ...dairyalternativesFoods,
  ...nutsseedsFoods,
  ...bakeryFoods,
  ...fastfoodFoods,
  ...preparedmealsFoods,
  ...snacksFoods,
  ...dessertsFoods,
  ...beveragesFoods,
  ...condimentsFoods,
  ...indianFoods,
];
