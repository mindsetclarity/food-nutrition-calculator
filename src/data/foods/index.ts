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
import { snacksFoods } from './snacks';
import { fastfoodstyleFoods } from './fastfoodstyle';
import { preparedmealsFoods } from './preparedmeals';
import { beveragesFoods } from './beverages';
import { condimentsoilsFoods } from './condimentsoils';

export const localFoods: FoodItem[] = [
  ...fruitsFoods,
  ...vegetablesFoods,
  ...proteinfoodsFoods,
  ...beansplantproteinFoods,
  ...breakfastFoods,
  ...grainscerealsFoods,
  ...dairyalternativesFoods,
  ...nutsseedsFoods,
  ...snacksFoods,
  ...fastfoodstyleFoods,
  ...preparedmealsFoods,
  ...beveragesFoods,
  ...condimentsoilsFoods,
];
