import { fruitFoods } from './fruits';
import { vegetableFoods } from './vegetables';
import { 
  grainFoods, 
  dairyFoods, 
  proteinFoods, 
  legumeFoods, 
  nutSeedFoods, 
  beverageFoods, 
  snackFoods, 
  condimentOilFoods, 
  preparedMealFoods, 
  bakingFoods, 
  sauceDressingFoods 
} from './other-categories';
import { usdaFoods } from './generated/index';

export const localFoods = [
  ...fruitFoods,
  ...vegetableFoods,
  ...grainFoods,
  ...dairyFoods,
  ...proteinFoods,
  ...legumeFoods,
  ...nutSeedFoods,
  ...beverageFoods,
  ...snackFoods,
  ...condimentOilFoods,
  ...preparedMealFoods,
  ...bakingFoods,
  ...sauceDressingFoods,
  ...usdaFoods,
];
