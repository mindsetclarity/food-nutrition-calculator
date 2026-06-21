export interface GoldenQuery {
  query: string;
  expectedTopResultContains: string;
  acceptableAlternatives?: string[];
  expectedCategory?: string;
  shouldNeedReview: boolean;
  notes?: string;
}

export const goldenQueries: GoldenQuery[] = [
  {
    query: "banana",
    expectedTopResultContains: "banana",
    expectedCategory: "fruits",
    shouldNeedReview: false,
    notes: "Basic exact match"
  },
  {
    query: "bannana",
    expectedTopResultContains: "banana",
    shouldNeedReview: false,
    notes: "Typo tolerance"
  },
  {
    query: "apple",
    expectedTopResultContains: "apple",
    shouldNeedReview: false,
  },
  {
    query: "oatmeal",
    expectedTopResultContains: "oats",
    acceptableAlternatives: ["oatmeal", "rolled oats"],
    shouldNeedReview: false,
  },
  {
    query: "oat meal",
    expectedTopResultContains: "oats",
    shouldNeedReview: false,
  },
  {
    query: "rolled oats",
    expectedTopResultContains: "oats",
    shouldNeedReview: false,
  },
  {
    query: "greek yogurt",
    expectedTopResultContains: "greek yogurt",
    shouldNeedReview: false,
  },
  {
    query: "greek yoghurt",
    expectedTopResultContains: "greek yogurt",
    shouldNeedReview: false,
  },
  {
    query: "garbanzo",
    expectedTopResultContains: "chickpeas",
    acceptableAlternatives: ["garbanzo beans"],
    shouldNeedReview: false,
  },
  {
    query: "chickpeas",
    expectedTopResultContains: "chickpeas",
    shouldNeedReview: false,
  },
  {
    query: "brown rice",
    expectedTopResultContains: "brown rice",
    shouldNeedReview: false,
  },
  {
    query: "cooked rice",
    expectedTopResultContains: "rice",
    shouldNeedReview: false,
  },
  {
    query: "peanut butter",
    expectedTopResultContains: "peanut butter",
    shouldNeedReview: false,
  },
  {
    query: "almond milk",
    expectedTopResultContains: "almond milk",
    shouldNeedReview: false,
  },
  {
    query: "broccoli",
    expectedTopResultContains: "broccoli",
    shouldNeedReview: false,
  },
  {
    query: "lentils",
    expectedTopResultContains: "lentils",
    shouldNeedReview: false,
  },
  {
    query: "orange juice",
    expectedTopResultContains: "orange juice",
    shouldNeedReview: false,
  },
  {
    query: "coffee",
    expectedTopResultContains: "coffee",
    shouldNeedReview: false,
  },
  {
    query: "spinach",
    expectedTopResultContains: "spinach",
    shouldNeedReview: false,
  },
  {
    query: "avocado",
    expectedTopResultContains: "avocado",
    shouldNeedReview: false,
  }
];
