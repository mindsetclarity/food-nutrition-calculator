import type { LearnArticle } from '../lib/learn/types';

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    id: 'how-to-calculate-calories',
    slug: 'how-to-calculate-calories-in-food',
    title: 'How to Calculate Calories in Food',
    description: 'Learn how calorie estimates are generated from macronutrients and why different labels might show slightly different numbers for the same food.',
    category: 'Calories',
    tags: ['calories', 'macros', 'basics'],
    readingTimeMinutes: 4,
    updatedAt: '2024-05-15',
    featured: true,
    relatedTool: { label: 'Food Nutrition Calculator', href: '/calculator' },
    heroSummary: 'Understanding how calories are calculated empowers you to make sense of nutrition labels and tracking apps. It all starts with the macronutrients: protein, carbohydrates, and fat.',
    keyTakeaway: 'Calories are primarily estimated by multiplying protein and carbs by 4, and fat by 9. Fiber and sugar alcohols can slightly alter the final total.',
    seoTitle: 'How to Calculate Calories in Food | Food Nutrition Calculator',
    seoDescription: 'Learn how calorie estimates are generated from macronutrients and why different labels might show slightly different numbers for the same food.',
    sections: [
      {
        id: 'the-4-4-9-rule',
        heading: 'The 4-4-9 Rule',
        body: [
          'The most common method for calculating calories is the Atwater system, often referred to as the 4-4-9 rule. This system assigns a specific caloric value to each gram of macronutrient.',
          'When you see a calorie total on a label, it is usually a rounded estimate derived from these underlying macro values.'
        ],
        bullets: [
          'Protein: ~4 calories per gram',
          'Carbohydrates: ~4 calories per gram',
          'Fat: ~9 calories per gram'
        ]
      },
      {
        id: 'the-role-of-fiber',
        heading: 'The Role of Fiber',
        body: [
          'Fiber is a type of carbohydrate, but it behaves differently in the body. Because humans cannot fully digest dietary fiber, it provides fewer calories than standard carbohydrates.',
          'Depending on the type of fiber (soluble vs. insoluble) and the specific regulatory rules used by the manufacturer, fiber may be calculated at anywhere from 0 to 2 calories per gram.'
        ],
        callout: {
          tone: 'info',
          title: 'Net Carbs',
          body: 'Some diets subtract fiber from total carbohydrates to calculate "net carbs." However, the FDA generally requires all carbohydrates, including fiber, to be listed in the total carbohydrate count on standard labels.'
        }
      },
      {
        id: 'why-values-vary',
        heading: 'Why Values Can Vary',
        body: [
          'You might notice that multiplying the macros by 4, 4, and 9 doesn\'t always perfectly match the total calories printed on a package. This is due to rounding rules allowed by organizations like the FDA.',
          'For example, a product with 45 calories might actually contain 47 calculated calories, but regulatory guidelines permit rounding to the nearest 5-calorie increment for totals under 50.'
        ],
        toolCta: {
          label: 'Calculate exact macros for any food',
          href: '/calculator'
        }
      }
    ],
    faqs: [
      {
        question: 'Are all calories created equal?',
        answer: 'From a purely thermodynamic perspective, a calorie is a unit of energy. However, the source of the calorie (protein vs. sugar) heavily influences satiety, hormone response, and nutrient density.'
      },
      {
        question: 'Do I need to calculate calories manually?',
        answer: 'No. Food labels and nutrition databases (like the USDA) have already done the math. Understanding the formula just helps you read labels more critically.'
      }
    ],
    relatedSlugs: ['calories-vs-macros', 'usda-fooddata-central-explained']
  },
  {
    id: 'calories-vs-macros',
    slug: 'calories-vs-macros',
    title: 'Calories vs Macros Explained',
    description: 'Understand the difference between tracking total calories and tracking specific macronutrients (protein, carbs, and fat).',
    category: 'Macros',
    tags: ['macros', 'calories', 'protein'],
    readingTimeMinutes: 5,
    updatedAt: '2024-05-16',
    featured: true,
    relatedTool: { label: 'Food Nutrition Calculator', href: '/calculator' },
    heroSummary: 'While total calories dictate overall energy balance, macronutrients dictate how that energy is used by the body. Balancing both is the key to structured nutrition planning.',
    keyTakeaway: 'Calories determine energy balance, while macros determine body composition and satiety. You do not always need to track both, depending on your personal goals.',
    seoTitle: 'Calories vs Macros: What is the Difference? | Food Nutrition Calculator',
    seoDescription: 'Understand the difference between tracking total calories and tracking specific macronutrients (protein, carbs, and fat).',
    sections: [
      {
        id: 'what-are-macros',
        heading: 'What Are Macros?',
        body: [
          'Macronutrients, or "macros," are the primary building blocks of the food you eat. They are required in large amounts by the body to sustain life, energy, and tissue repair.',
          'The three main macros are Protein, Carbohydrates, and Fat.'
        ]
      },
      {
        id: 'protein',
        heading: 'Protein: The Builder',
        body: [
          'Protein is essential for building and repairing tissues, including muscle, skin, and hair. It is also highly satiating, meaning it helps you feel full longer.',
          'Sources include meat, poultry, fish, eggs, dairy, beans, and legumes.'
        ]
      },
      {
        id: 'carbs',
        heading: 'Carbohydrates: The Energy Source',
        body: [
          'Carbohydrates are the body\'s preferred source of immediate energy. They are broken down into glucose, which fuels your brain and muscles during activity.',
          'Sources include fruits, vegetables, grains, and starches.'
        ],
        callout: {
          tone: 'info',
          title: 'Simple vs. Complex',
          body: 'Complex carbs (like oats and sweet potatoes) digest slower and provide sustained energy, while simple carbs (like sugar) provide quick, short-lived energy.'
        }
      },
      {
        id: 'fat',
        heading: 'Fat: The Essential Protector',
        body: [
          'Dietary fat is crucial for hormone production, nutrient absorption (vitamins A, D, E, and K), and cellular health. Despite older diet myths, fat is an essential part of a balanced diet.',
          'Sources include nuts, seeds, avocados, olive oil, and fatty fish.'
        ]
      },
      {
        id: 'which-to-track',
        heading: 'Should You Track Calories or Macros?',
        body: [
          'Tracking calories ensures you stay within your overall energy goals. Tracking macros takes it a step further by ensuring you get enough protein for muscle maintenance and enough fat for hormone health.',
          'Many beginners start by tracking only total calories and protein, letting carbohydrates and fat fall naturally where they may.'
        ],
        toolCta: {
          label: 'Track your daily macros',
          href: '/meal-calorie-calculator'
        }
      }
    ],
    faqs: [
      {
        question: 'Is alcohol a macro?',
        answer: 'Alcohol is sometimes referred to as the "fourth macro." It provides about 7 calories per gram, but offers no nutritional value.'
      }
    ],
    relatedSlugs: ['how-to-calculate-calories-in-food', 'how-to-calculate-calories-in-a-meal']
  },
  {
    id: 'how-recipe-calculators-work',
    slug: 'how-recipe-nutrition-calculators-work',
    title: 'How Recipe Nutrition Calculators Work',
    description: 'Learn the math behind turning a list of ingredients into an accurate Nutrition Facts label for your home-cooked meals.',
    category: 'Recipes',
    tags: ['recipes', 'cooking', 'calculator'],
    readingTimeMinutes: 4,
    updatedAt: '2024-05-17',
    featured: true,
    relatedTool: { label: 'Recipe Nutrition Calculator', href: '/recipe-nutrition-calculator' },
    heroSummary: 'Calculating the nutrition of a homemade recipe involves standardizing ingredient weights, summing the totals, and dividing by the number of servings. Here is how the math works under the hood.',
    keyTakeaway: 'The accuracy of a recipe calculation depends entirely on the accuracy of the raw ingredient data and the precision of your measurements (grams vs. volume).',
    seoTitle: 'How Recipe Nutrition Calculators Work | Food Nutrition Calculator',
    seoDescription: 'Learn the math behind turning a list of ingredients into an accurate Nutrition Facts label for your home-cooked meals.',
    sections: [
      {
        id: 'standardizing-weights',
        heading: 'Step 1: Standardizing Weights',
        body: [
          'Before any math can happen, a calculator must convert volume measurements (like cups or tablespoons) into a standard weight, usually grams.',
          'This is crucial because a cup of spinach weighs vastly less than a cup of peanut butter. Reliable databases like the USDA provide specific weight-to-volume conversions for almost every food.'
        ]
      },
      {
        id: 'summing-totals',
        heading: 'Step 2: Summing the Totals',
        body: [
          'Once every ingredient is converted to grams, the calculator determines the exact calorie and macronutrient contribution of that specific weight.',
          'It then adds all the ingredients together to create a "Total Recipe" profile.'
        ]
      },
      {
        id: 'dividing-by-servings',
        heading: 'Step 3: Dividing by Servings',
        body: [
          'Finally, the total recipe values are divided by the number of servings you specify. This yields the per-serving Nutrition Facts.',
          'If you bake a casserole that totals 2,000 calories and cut it into 4 equal slices, each slice is estimated at 500 calories.'
        ],
        callout: {
          tone: 'warning',
          title: 'The Moisture Loss Factor',
          body: 'Cooking methods like baking or roasting cause water to evaporate, making the final dish weigh less than the raw ingredients. However, the total calories and macros remain the same. This is why weighing the finished dish and calculating by weight is often more accurate than estimating visual slices.'
        },
        toolCta: {
          label: 'Analyze a recipe now',
          href: '/recipe-nutrition-calculator'
        }
      }
    ],
    faqs: [
      {
        question: 'Does cooking change the calories?',
        answer: 'Generally, no. Heating food doesn\'t add or remove calories unless you drain off fat (like with ground beef) or add cooking oils.'
      }
    ],
    relatedSlugs: ['serving-size-vs-portion-size', 'usda-fooddata-central-explained']
  },
  {
    id: 'how-to-read-nutrition-label',
    slug: 'how-to-read-a-nutrition-facts-label',
    title: 'How to Read a Nutrition Facts Label',
    description: 'A beginner-friendly guide to understanding serving sizes, daily values, and the hidden math on standard US food labels.',
    category: 'Food Labels',
    tags: ['labels', 'basics', 'fda'],
    readingTimeMinutes: 5,
    updatedAt: '2024-05-18',
    relatedTool: { label: 'Analyze a Recipe', href: '/recipe-nutrition-calculator' },
    heroSummary: 'The Nutrition Facts label is your primary tool for understanding what is in your food. Knowing how to read it quickly can help you make informed decisions at the grocery store.',
    keyTakeaway: 'Always check the Serving Size first. Every number on the label is based on that specific amount, which may be smaller than the amount you actually eat.',
    seoTitle: 'How to Read a Nutrition Facts Label | Food Nutrition Calculator',
    seoDescription: 'A beginner-friendly guide to understanding serving sizes, daily values, and the hidden math on standard US food labels.',
    sections: [
      {
        id: 'start-with-serving-size',
        heading: 'Start with the Serving Size',
        body: [
          'The very first thing to look at is the serving size and the number of servings per container. This is the most common pitfall when reading labels.',
          'If a bag of chips says it has 150 calories, but the serving size is 15 chips and the bag contains 4 servings, eating the whole bag means you are consuming 600 calories.'
        ]
      },
      {
        id: 'check-the-calories',
        heading: 'Check the Calories',
        body: [
          'Calories provide a measure of how much energy you get from a serving of this food. The FDA recently updated label designs to make the calorie count much larger and bolder so it is easy to spot.'
        ]
      },
      {
        id: 'the-percent-daily-value',
        heading: 'Understanding % Daily Value (%DV)',
        body: [
          'The %DV tells you how much a nutrient in a serving of food contributes to a daily diet. It is generally based on a 2,000-calorie daily diet.',
          'A quick rule of thumb: 5% DV or less is considered low, and 20% DV or more is considered high. Use this to easily spot foods high in sodium or added sugars.'
        ],
        callout: {
          tone: 'trust',
          title: 'Not a Personal Target',
          body: 'The 2,000-calorie baseline is an average for the general population. Your actual needs may be higher or lower depending on your age, gender, and activity level.'
        }
      },
      {
        id: 'nutrients-to-limit',
        heading: 'Nutrients to Monitor',
        body: [
          'The FDA recommends monitoring your intake of Saturated Fat, Sodium, and Added Sugars. These are clearly separated on modern labels.',
          'Added sugars are distinct from naturally occurring sugars (like those in fruit or milk) and are required to be listed on updated US labels.'
        ],
        toolCta: {
          label: 'Search for any food to see its label',
          href: '/foods'
        }
      }
    ],
    faqs: [
      {
        question: 'Why doesn\'t protein have a %DV?',
        answer: 'Protein only requires a %DV if the product makes a claim like "High in Protein," or if it is meant for infants/children. This is because protein intake is generally not a public health concern for adults in the US.'
      }
    ],
    relatedSlugs: ['serving-size-vs-portion-size', 'how-to-calculate-calories-in-food']
  },
  {
    id: 'serving-size-vs-portion-size',
    slug: 'serving-size-vs-portion-size',
    title: 'Serving Size vs Portion Size',
    description: 'Learn the critical difference between the standardized serving sizes on labels and the actual portions you put on your plate.',
    category: 'Serving Sizes',
    tags: ['portions', 'measurements', 'labels'],
    readingTimeMinutes: 3,
    updatedAt: '2024-05-19',
    relatedTool: { label: 'Food Nutrition Calculator', href: '/calculator' },
    heroSummary: 'While the terms are often used interchangeably, "serving size" and "portion size" mean very different things in the world of nutrition. Confusing them can easily derail your tracking.',
    keyTakeaway: 'A serving size is a measured amount defined by the manufacturer or database. A portion size is the amount of food you choose to eat, which may be multiple servings.',
    seoTitle: 'Serving Size vs Portion Size: What is the Difference? | Food Nutrition Calculator',
    seoDescription: 'Learn the critical difference between the standardized serving sizes on labels and the actual portions you put on your plate.',
    sections: [
      {
        id: 'what-is-a-serving-size',
        heading: 'What is a Serving Size?',
        body: [
          'A serving size is a standardized amount of food. It is chosen by the manufacturer based on FDA reference amounts to provide consistency across similar products.',
          'Serving sizes are not recommendations of how much you should eat; they are simply a unit of measurement to make the Nutrition Facts label make sense.'
        ]
      },
      {
        id: 'what-is-a-portion-size',
        heading: 'What is a Portion Size?',
        body: [
          'A portion size is the amount of food that you choose to put on your plate or eat in one sitting. It is entirely determined by you.',
          'Your portion might consist of half a serving, one serving, or three servings.'
        ],
        callout: {
          tone: 'info',
          title: 'The Restaurant Effect',
          body: 'Restaurant portions have grown significantly over the last few decades. A single restaurant meal often contains 3 to 4 standard serving sizes of carbohydrates and fats.'
        }
      },
      {
        id: 'bridging-the-gap',
        heading: 'Bridging the Gap',
        body: [
          'To accurately track your intake, you must measure your portion and compare it to the serving size. Using a digital food scale to weigh your portions in grams is the most accurate way to do this, as volume measurements (like cups) can be imprecise.'
        ],
        toolCta: {
          label: 'Calculate exact portion sizes',
          href: '/calculator'
        }
      }
    ],
    faqs: [
      {
        question: 'Why do serving sizes sometimes seem unrealistically small?',
        answer: 'Serving sizes are based on reference amounts set decades ago. The FDA has recently updated many of them to reflect modern eating habits better (e.g., changing ice cream from 1/2 cup to 2/3 cup).'
      }
    ],
    relatedSlugs: ['how-to-read-a-nutrition-facts-label', 'how-to-calculate-calories-in-a-meal']
  },
  {
    id: 'usda-fooddata-central-explained',
    slug: 'usda-fooddata-central-explained',
    title: 'USDA FoodData Central Explained',
    description: 'A look inside the United States Department of Agriculture database that powers almost every major nutrition app and calculator.',
    category: 'USDA Data',
    tags: ['usda', 'databases', 'accuracy'],
    readingTimeMinutes: 4,
    updatedAt: '2024-05-20',
    relatedTool: { label: 'Search USDA Foods', href: '/foods' },
    heroSummary: 'When you look up the calories in an apple or a chicken breast, where does that data come from? For the vast majority of apps, it comes directly from the USDA FoodData Central.',
    keyTakeaway: 'The USDA database is the gold standard for raw, single-ingredient food data, but branded packaged foods can sometimes have outdated entries.',
    seoTitle: 'USDA FoodData Central Explained | Food Nutrition Calculator',
    seoDescription: 'A look inside the United States Department of Agriculture database that powers almost every major nutrition app and calculator.',
    sections: [
      {
        id: 'what-is-fooddata-central',
        heading: 'What is FoodData Central?',
        body: [
          'FoodData Central (FDC) is an integrated data system created by the USDA. It provides expansive data on the nutrient profile of thousands of foods.',
          'It combines several historical databases, including the Standard Reference (SR) Legacy database, which contains meticulously lab-tested data for raw ingredients like fruits, vegetables, and meats.'
        ]
      },
      {
        id: 'types-of-data',
        heading: 'Types of Data',
        body: [
          'FDC contains several distinct datasets:',
          '- Foundation Foods: Highly accurate, lab-tested data for basic ingredients.',
          '- SR Legacy: The historical database of thousands of foods, still widely used.',
          '- Branded Foods: Data submitted by manufacturers for packaged goods found in grocery stores.'
        ],
        callout: {
          tone: 'trust',
          title: 'Our USDA-First Approach',
          body: 'This calculator prioritizes Foundation Foods and SR Legacy data for single ingredients because they are lab-verified, falling back to Branded data or local estimates only when necessary.'
        }
      },
      {
        id: 'data-limitations',
        heading: 'Limitations to Keep in Mind',
        body: [
          'While the USDA data is excellent for raw foods, the Branded Foods dataset relies on manufacturer submissions. If a company changes their recipe, the USDA database might not reflect the new label immediately.',
          'Always verify packaged food data against the physical label in your hand if absolute precision is required.'
        ],
        toolCta: {
          label: 'Search the USDA database',
          href: '/calculator'
        }
      }
    ],
    relatedSlugs: ['how-recipe-nutrition-calculators-work', 'why-nutrition-values-can-vary']
  },
  {
    id: 'how-to-calculate-calories-meal',
    slug: 'how-to-calculate-calories-in-a-meal',
    title: 'How to Calculate Calories in a Meal',
    description: 'Learn the easiest and most accurate ways to calculate the total calories and macros for a full plate of food.',
    category: 'Meal Planning Basics',
    tags: ['meals', 'planning', 'tracking'],
    readingTimeMinutes: 4,
    updatedAt: '2024-05-21',
    relatedTool: { label: 'Meal Calorie Calculator', href: '/meal-calorie-calculator' },
    heroSummary: 'Tracking a single apple is easy. Tracking a plate containing chicken, rice, roasted vegetables, and a dressing requires a structured approach to ensure you don\'t miss hidden calories.',
    keyTakeaway: 'Weighing your food on a digital scale and logging ingredients individually before cooking or mixing is the most foolproof method for meal tracking.',
    seoTitle: 'How to Calculate Calories in a Meal | Food Nutrition Calculator',
    seoDescription: 'Learn the easiest and most accurate ways to calculate the total calories and macros for a full plate of food.',
    sections: [
      {
        id: 'deconstruct-the-plate',
        heading: 'Step 1: Deconstruct the Plate',
        body: [
          'To calculate a meal, you must treat every component as a separate entry. Do not try to search for "chicken and rice bowl" in a database, as the ratio of chicken to rice varies wildly between kitchens.',
          'Instead, break it down: Chicken breast, brown rice, olive oil, and broccoli.'
        ]
      },
      {
        id: 'weigh-ingredients',
        heading: 'Step 2: Weigh Ingredients (Preferably Raw)',
        body: [
          'Whenever possible, weigh your ingredients raw before cooking. Cooking changes the water weight of foods (meat shrinks, pasta expands), which skews volume measurements.',
          'Place your plate or bowl on a digital scale, tare (zero) it, add your first ingredient, log the grams, tare again, and repeat.'
        ],
        callout: {
          tone: 'warning',
          title: 'Hidden Calories',
          body: 'Do not forget to log cooking oils, butter, heavy sauces, and dressings. A single tablespoon of olive oil contains roughly 120 calories and is easily overlooked.'
        }
      },
      {
        id: 'summing-it-up',
        heading: 'Step 3: Summing it Up',
        body: [
          'Once you have the weights of the individual components, use a calculator to find the nutrition for each, then add them together. Specialized meal calculators can handle this aggregation for you automatically.'
        ],
        toolCta: {
          label: 'Build a meal and calculate totals',
          href: '/meal-calorie-calculator'
        }
      }
    ],
    faqs: [
      {
        question: 'What if I am eating at a restaurant?',
        answer: 'Restaurant meals are notoriously difficult to track accurately due to heavy use of oils and butter. Your best option is to look up the restaurant\'s official nutrition data, or find a visually similar entry in a database and overestimate slightly to be safe.'
      }
    ],
    relatedSlugs: ['how-recipe-nutrition-calculators-work', 'serving-size-vs-portion-size']
  },
  {
    id: 'how-to-compare-two-foods',
    slug: 'how-to-compare-two-foods',
    title: 'How to Compare Two Foods',
    description: 'Learn why comparing foods "per serving" can be misleading and how to normalize data to make accurate nutritional comparisons.',
    category: 'Food Comparison',
    tags: ['comparison', 'macros', 'basics'],
    readingTimeMinutes: 3,
    updatedAt: '2024-05-22',
    relatedTool: { label: 'Compare Foods Tool', href: '/compare-foods' },
    heroSummary: 'When deciding between two snacks or ingredients, looking at the labels side-by-side isn\'t always enough. If the serving sizes differ, the comparison is mathematically flawed.',
    keyTakeaway: 'Always normalize foods to a standard weight (like 100 grams) before comparing them to see which is truly higher in calories or macros.',
    seoTitle: 'How to Compare Two Foods Accurately | Food Nutrition Calculator',
    seoDescription: 'Learn why comparing foods "per serving" can be misleading and how to normalize data to make accurate nutritional comparisons.',
    sections: [
      {
        id: 'the-serving-size-trap',
        heading: 'The Serving Size Trap',
        body: [
          'Imagine comparing two brands of bread. Brand A claims 70 calories per serving, and Brand B claims 110 calories per serving. Brand A looks like the lower-calorie choice.',
          'However, if Brand A\'s serving size is one very thin slice (20g) and Brand B\'s serving size is one thick slice (40g), Brand A is actually more calorie-dense by weight.'
        ]
      },
      {
        id: 'the-100g-rule',
        heading: 'The 100g Rule',
        body: [
          'To make a fair comparison, you must normalize the data. In nutritional science, this is universally done by looking at the nutrition per 100 grams.',
          'By comparing per 100g, you strip away the arbitrary serving sizes chosen by marketing departments and look purely at the density of the food.'
        ],
        callout: {
          tone: 'info',
          title: 'When to compare per serving',
          body: 'Comparing per serving is only useful if you intend to eat exactly one discrete unit of both items (e.g., you are choosing between eating exactly one apple or exactly one banana, regardless of their slight weight differences).'
        }
      },
      {
        id: 'using-a-tool',
        heading: 'Using a Comparison Tool',
        body: [
          'Doing the math to convert varying serving sizes to 100g can be tedious. Using a dedicated comparison tool automatically aligns the data so you can spot the highest protein or lowest sodium options instantly.'
        ],
        toolCta: {
          label: 'Compare foods side-by-side',
          href: '/compare-foods'
        }
      }
    ],
    relatedSlugs: ['calories-vs-macros', 'serving-size-vs-portion-size']
  }
];
