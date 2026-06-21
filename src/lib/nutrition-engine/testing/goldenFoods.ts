export interface GoldenFoodCase {
  foodQuery: string;
  quantity: number;
  unit: string;
  expectedGramRange: [number, number]; // [min, max]
  requiredNutrients: {
    calories?: [number, number];
    protein?: [number, number];
    carbs?: [number, number];
    fat?: [number, number];
  };
  expectedWarningsAllowed: string[];
}

export const goldenFoods: GoldenFoodCase[] = [
  {
    foodQuery: "banana",
    quantity: 1,
    unit: "medium",
    expectedGramRange: [100, 130],
    requiredNutrients: {
      calories: [90, 120],
      carbs: [20, 30]
    },
    expectedWarningsAllowed: []
  },
  {
    foodQuery: "rolled oats",
    quantity: 0.5,
    unit: "cup",
    expectedGramRange: [35, 45],
    requiredNutrients: {
      calories: [140, 160],
      protein: [4, 6]
    },
    expectedWarningsAllowed: []
  },
  {
    foodQuery: "peanut butter",
    quantity: 2,
    unit: "tbsp",
    expectedGramRange: [30, 35],
    requiredNutrients: {
      calories: [180, 200],
      fat: [15, 18],
      protein: [6, 8]
    },
    expectedWarningsAllowed: []
  },
  {
    foodQuery: "cooked brown rice",
    quantity: 1,
    unit: "cup",
    expectedGramRange: [190, 210],
    requiredNutrients: {
      calories: [200, 250],
      carbs: [40, 50]
    },
    expectedWarningsAllowed: []
  },
  {
    foodQuery: "almond milk",
    quantity: 1,
    unit: "cup",
    expectedGramRange: [230, 250],
    requiredNutrients: {
      calories: [30, 60] // Unsweetened vs sweetened
    },
    expectedWarningsAllowed: []
  },
  {
    foodQuery: "greek yogurt",
    quantity: 1,
    unit: "serving", // often ~170g
    expectedGramRange: [150, 180],
    requiredNutrients: {
      calories: [90, 120],
      protein: [14, 18]
    },
    expectedWarningsAllowed: []
  },
  {
    foodQuery: "almonds",
    quantity: 1,
    unit: "oz",
    expectedGramRange: [27, 29],
    requiredNutrients: {
      calories: [160, 170],
      fat: [13, 15]
    },
    expectedWarningsAllowed: []
  },
  {
    foodQuery: "chickpeas",
    quantity: 0.5,
    unit: "cup",
    expectedGramRange: [80, 90], // canned/cooked
    requiredNutrients: {
      calories: [130, 140],
      protein: [6, 8]
    },
    expectedWarningsAllowed: []
  },
  {
    foodQuery: "olive oil",
    quantity: 1,
    unit: "tbsp",
    expectedGramRange: [13, 15],
    requiredNutrients: {
      calories: [110, 130],
      fat: [13, 15]
    },
    expectedWarningsAllowed: []
  },
  {
    foodQuery: "apple",
    quantity: 1,
    unit: "medium",
    expectedGramRange: [170, 190],
    requiredNutrients: {
      calories: [85, 105],
      carbs: [22, 27]
    },
    expectedWarningsAllowed: []
  }
];
