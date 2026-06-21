export interface GoldenRecipeCase {
  name: string;
  servings: number;
  text: string;
  expectedResolvedLines: number;
  shouldHaveWarnings: boolean;
  notes?: string;
}

export const goldenRecipes: GoldenRecipeCase[] = [
  {
    name: "Protein Oat Bowl",
    servings: 2,
    text: `1 cup rolled oats
1 banana
2 tbsp peanut butter
1 cup almond milk
1 tbsp chia seeds`,
    expectedResolvedLines: 5,
    shouldHaveWarnings: false,
  },
  {
    name: "Simple Chickpea Rice Bowl",
    servings: 2,
    text: `1 cup cooked brown rice
1/2 cup chickpeas
1 cup spinach
1 tbsp olive oil
1/2 avocado`,
    expectedResolvedLines: 5,
    shouldHaveWarnings: false,
  },
  {
    name: "Yogurt Berry Bowl",
    servings: 1,
    text: `1 cup greek yogurt
1/2 cup blueberries
1 tbsp honey
1 oz almonds`,
    expectedResolvedLines: 4,
    shouldHaveWarnings: false,
  },
  {
    name: "Messy Input Test",
    servings: 2,
    text: `- 1 cup greek yoghurt
- 1/2 cup blueberries
- two tbsp peanut butter
salt to taste`,
    expectedResolvedLines: 3, // "salt to taste" might resolve or have warning, but 3 core should resolve
    shouldHaveWarnings: true, // "salt to taste" or "two" might trigger warnings
  }
];
