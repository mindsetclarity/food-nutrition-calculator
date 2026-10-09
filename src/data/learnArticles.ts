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
    updatedAt: '2026-06-19',
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
    updatedAt: '2026-06-19',
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
    updatedAt: '2026-06-19',
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
    updatedAt: '2026-06-19',
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
    updatedAt: '2026-06-19',
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
    updatedAt: '2026-06-19',
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
    updatedAt: '2026-06-19',
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
    updatedAt: '2026-06-19',
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
  },
  {
    id: 'calories-in-pizza',
    slug: 'how-many-calories-in-a-slice-of-pizza',
    title: 'How Many Calories in a Slice of Pizza?',
    description: 'Calories in a slice of cheese and pepperoni pizza, a whole medium pizza, and how crust and toppings change the total, using USDA data.',
    category: 'Calories',
    tags: ['pizza', 'fast food', 'calories'],
    readingTimeMinutes: 4,
    updatedAt: '2026-10-09',
    relatedTool: { label: 'Meal Calorie Calculator', href: '/meal-calorie-calculator' },
    heroSummary: "A slice of restaurant cheese pizza from a medium (11 to 12 inch) pie has about 229 calories. Pepperoni adds roughly 20 more. The number that matters most is how many slices you eat and how big the pizza is.",
    keyTakeaway: "One slice of medium cheese pizza is about 229 calories and a slice of pepperoni is about 248. A whole medium cheese pizza is roughly 1,840 calories.",
    seoTitle: 'Calories in a Slice of Pizza: Cheese vs Pepperoni | Food Nutrition Calculator',
    seoDescription: 'A slice of medium cheese pizza has about 229 calories; pepperoni about 248. See per-slice, per-100 g and whole-pizza calories from USDA data.',
    sections: [
      {
        id: 'per-slice',
        heading: 'Calories per slice',
        body: [
          "USDA's survey data for restaurant and fast-food pizza with a medium crust puts one slice from a medium pizza at about 86 g for cheese and 88 g for pepperoni.",
          "Those weights give the per-slice numbers below. Thin crust slices weigh less and land lower; deep dish and stuffed crust weigh more and land higher."
        ],
        bullets: [
          'Cheese pizza, 1 slice (86 g): about 229 calories, 9.8 g protein, 28.6 g carbs, 8.3 g fat',
          'Pepperoni pizza, 1 slice (88 g): about 248 calories, 10.3 g protein, 28.2 g carbs, 10.5 g fat'
        ],
        toolCta: { label: 'See full cheese pizza nutrition', href: '/foods/cheese-pizza' }
      },
      {
        id: 'whole-pizza',
        heading: 'Calories in a whole pizza',
        body: [
          "USDA weighs a whole medium (11 to 12 inch) cheese pizza at about 691 g. At 266 calories per 100 g, that is roughly 1,840 calories for the whole pie, or about 230 per slice if it is cut into eight.",
          "Large pizzas are often cut into the same number of slices, so each slice is bigger. If you are tracking, weighing a slice once is the quickest way to know what your local pizzeria serves."
        ]
      },
      {
        id: 'what-changes-the-number',
        heading: 'What changes the number',
        body: [
          'Three things move pizza calories the most: crust thickness, the amount of cheese, and fatty toppings such as pepperoni, sausage and extra cheese. Vegetable toppings add volume with few calories.'
        ],
        bullets: [
          'Thin crust: fewer calories per slice, mostly because the slice is lighter',
          'Pepperoni and sausage: more fat, so more calories per gram',
          'Vegetables: little change per slice'
        ],
        toolCta: { label: 'Compare cheese and pepperoni pizza', href: '/compare/cheese-pizza-vs-pepperoni-pizza' }
      }
    ],
    faqs: [
      { question: 'How many calories are in 2 slices of pizza?', answer: 'Two slices of medium cheese pizza are about 458 calories; two slices of pepperoni are about 496.' },
      { question: 'Is pizza high in protein?', answer: 'A slice of cheese pizza has about 10 g of protein, mostly from the cheese. That is a moderate amount for the calories it provides.' }
    ],
    relatedSlugs: ['calories-in-a-burger-and-fries', 'how-to-calculate-calories-in-a-meal']
  },
  {
    id: 'calories-in-burger',
    slug: 'calories-in-a-burger-and-fries',
    title: 'Calories in a Burger and Fries',
    description: 'How many calories are in a hamburger, cheeseburger and double cheeseburger, plus a medium order of fries, using USDA fast-food data.',
    category: 'Calories',
    tags: ['burger', 'fast food', 'fries'],
    readingTimeMinutes: 4,
    updatedAt: '2026-10-09',
    relatedTool: { label: 'Meal Calorie Calculator', href: '/meal-calorie-calculator' },
    heroSummary: "A typical fast-food cheeseburger with one medium patty has about 488 calories. Add a medium order of fries and the meal passes 900 calories before a drink.",
    keyTakeaway: "Hamburger: about 418 calories. Cheeseburger: about 488. Double cheeseburger: about 987. Medium fries: about 452.",
    seoTitle: 'Calories in a Burger and Fries: Hamburger vs Cheeseburger | Food Nutrition Calculator',
    seoDescription: 'A fast-food cheeseburger has about 488 calories, a hamburger about 418, and medium fries about 452. Compare burgers and sides with USDA data.',
    sections: [
      {
        id: 'burgers',
        heading: 'Burgers side by side',
        body: [
          "These figures come from USDA's survey data for fast-food burgers on a bun. Restaurant burgers vary a lot, so treat them as typical values rather than any one chain's menu."
        ],
        bullets: [
          'Hamburger, 1 medium patty (145 g): about 418 calories, 25 g protein',
          'Cheeseburger, 1 medium patty (165 g): about 488 calories, 30 g protein',
          'Double cheeseburger, 2 large patties (330 g): about 987 calories, 67 g protein',
          'Veggie burger patty, no bun (100 g): about 177 calories, 16 g protein'
        ],
        toolCta: { label: 'Compare a cheeseburger and a hamburger', href: '/compare/cheeseburger-vs-hamburger' }
      },
      {
        id: 'fries-and-sides',
        heading: 'Fries and sides',
        body: [
          "A medium fast-food order of French fries (145 g) has about 452 calories, which is close to a whole hamburger. Fries are often the easiest place to save calories in a burger meal.",
          'Onion rings, mozzarella sticks and loaded fries add similar or larger amounts. A side salad or swapping to a small fries cuts the total the most.'
        ],
        toolCta: { label: 'See French fries nutrition', href: '/foods/french-fries' }
      },
      {
        id: 'build-the-meal',
        heading: 'Adding up the whole meal',
        body: [
          'A cheeseburger, medium fries and a 12 oz can of regular cola come to about 488 + 452 + 156 = 1,096 calories. Swapping the cola for diet cola drops that to about 947.'
        ],
        toolCta: { label: 'Add up your own meal', href: '/meal-calorie-calculator' }
      }
    ],
    faqs: [
      { question: 'Does cheese add a lot of calories to a burger?', answer: 'In USDA data the cheeseburger is about 70 calories more than the hamburger, mostly from one slice of cheese and a slightly larger serving.' },
      { question: 'How much protein is in a cheeseburger?', answer: 'About 30 g for a single medium-patty cheeseburger and about 67 g for a double with two large patties.' }
    ],
    relatedSlugs: ['how-many-calories-in-a-slice-of-pizza', 'how-to-calculate-calories-in-a-meal']
  },
  {
    id: 'calories-in-alcohol',
    slug: 'calories-in-beer-wine-and-spirits',
    title: 'Calories in Beer, Wine and Spirits',
    description: 'Calories in a can of beer, a UK pint, a glass of wine and a shot of vodka, with the reason alcohol is so calorie-dense.',
    category: 'Calories',
    tags: ['alcohol', 'beer', 'wine', 'drinks'],
    readingTimeMinutes: 4,
    updatedAt: '2026-10-09',
    relatedTool: { label: 'Food Nutrition Calculator', href: '/calculator' },
    heroSummary: "Alcohol itself carries about 7 calories per gram, almost as much as fat. That is why a couple of drinks can add several hundred calories without feeling like much food.",
    keyTakeaway: "A 12 oz can of regular beer is about 155 calories, a UK pint about 245, a 6 oz glass of wine about 150, and a 1.5 oz shot of vodka about 97.",
    seoTitle: 'Calories in Beer, Wine and Spirits (Pint, Glass, Shot) | Food Nutrition Calculator',
    seoDescription: 'A can of beer has about 155 calories, a UK pint about 245, a glass of wine about 150 and a shot of vodka about 97. USDA-based figures.',
    sections: [
      {
        id: 'beer',
        heading: 'Beer',
        body: [
          "USDA lists regular beer at about 43 calories per 100 g. A standard US 12 oz can or bottle (about 360 g) comes to roughly 155 calories.",
          "A UK pint is 568 ml, so a pint of regular-strength beer is about 245 calories. Stronger craft beers and IPAs have more alcohol and more calories per pint."
        ],
        bullets: [
          'Regular beer, 12 oz can: about 155 calories',
          'Regular beer, UK pint (568 ml): about 245 calories',
          'Light beer, 12 oz can: about 103 calories'
        ],
        toolCta: { label: 'See beer nutrition', href: '/foods/beer' }
      },
      {
        id: 'wine',
        heading: 'Wine',
        body: [
          "A 6 oz (about 175 ml) glass of red wine is about 153 calories and white wine about 148. In the UK a standard glass is 175 ml and a large one 250 ml, which is about 210 calories."
        ],
        toolCta: { label: 'Compare red and white wine', href: '/compare/red-wine-vs-white-wine' }
      },
      {
        id: 'spirits',
        heading: 'Spirits and mixers',
        body: [
          "Vodka has about 231 calories per 100 g, so a 1.5 oz (44 ml) shot is roughly 97 calories. Gin, rum and whisky at the same strength are similar.",
          "Mixers often matter more than the spirit. A cup of regular cola adds about 100 calories; diet mixers add almost none."
        ]
      }
    ],
    faqs: [
      { question: 'Why does alcohol have so many calories?', answer: 'Pure alcohol provides about 7 calories per gram, compared with 4 for protein and carbohydrate and 9 for fat. Beer and cocktails also add calories from carbohydrates and sugar.' },
      { question: 'Is light beer much lower in calories?', answer: 'Yes. A 12 oz can of light beer is about 103 calories versus about 155 for regular beer.' }
    ],
    relatedSlugs: ['calories-in-coffee-drinks', 'calories-vs-macros']
  },
  {
    id: 'high-protein-foods',
    slug: 'high-protein-foods-list',
    title: 'High-Protein Foods: A Practical List',
    description: 'The highest-protein everyday foods per 100 g and per serving, from chicken and fish to Greek yogurt, eggs, tofu and lentils.',
    category: 'Macros',
    tags: ['protein', 'macros', 'meal planning'],
    readingTimeMinutes: 5,
    updatedAt: '2026-10-09',
    featured: true,
    relatedTool: { label: 'Compare Foods', href: '/compare-foods' },
    heroSummary: "Lean meat and fish give the most protein per calorie, but dairy, eggs, soy and beans make it easy to hit a protein target without eating meat at every meal.",
    keyTakeaway: "Baked chicken breast has about 31 g of protein per 100 g and canned tuna about 24 g. Greek yogurt, cottage cheese, tofu and lentils are strong options from dairy and plants.",
    seoTitle: 'High-Protein Foods List (Per 100 g and Per Serving) | Food Nutrition Calculator',
    seoDescription: 'Highest-protein everyday foods with grams per 100 g and per serving: chicken, tuna, salmon, Greek yogurt, cottage cheese, eggs, tofu, lentils.',
    sections: [
      {
        id: 'meat-and-fish',
        heading: 'Meat and fish',
        body: ['Per serving these are the easiest way to get 25 to 40 g of protein in one go.'],
        bullets: [
          'Baked chicken breast, 4 oz (113 g): about 35 g protein, 186 calories',
          'Canned tuna in water, 1 can (172 g): about 41 g protein, 220 calories',
          'Grilled salmon, 4 oz: about 29 g protein, 293 calories',
          'Shrimp, 4 oz raw: about 23 g protein, 96 calories',
          'Roast turkey, 1 medium slice (60 g): about 17 g protein, 101 calories'
        ],
        toolCta: { label: 'See baked chicken breast nutrition', href: '/foods/baked-chicken-breast' }
      },
      {
        id: 'dairy-and-eggs',
        heading: 'Dairy and eggs',
        bullets: [
          'Greek yogurt, plain nonfat, 1 container (150 g): about 16 g protein, 89 calories',
          'Cottage cheese, 1 cup (210 g): about 23 g protein, 172 calories',
          'Egg, 1 large: about 6 g protein, 72 calories',
          'Skim milk, 1 cup: about 8 g protein, 83 calories'
        ],
        body: ['Greek yogurt and cottage cheese are two of the best protein-per-calorie foods outside meat and fish.'],
        toolCta: { label: 'See Greek yogurt nutrition', href: '/foods/greek-yogurt-plain-nonfat' }
      },
      {
        id: 'plant-protein',
        heading: 'Plant protein',
        body: ['Plant foods carry more carbohydrate alongside their protein, but they also bring fiber.'],
        bullets: [
          'Firm tofu, 1/2 cup (124 g): about 22 g protein',
          'Cooked lentils, 1 cup: about 18 g protein and 16 g fiber',
          'Edamame, 1 cup: about 18 g protein',
          'Cooked chickpeas, 1 cup: about 15 g protein',
          'Almonds, 1 oz: about 6 g protein'
        ],
        toolCta: { label: 'Compare foods side by side', href: '/compare-foods' }
      }
    ],
    faqs: [
      { question: 'Which food has the most protein per 100 g?', answer: 'Among everyday foods on this site, beef jerky (about 33 g) and cooked chicken breast (about 30 to 33 g) are at the top per 100 g.' },
      { question: 'What is a good vegetarian high-protein food?', answer: 'Greek yogurt, cottage cheese, tofu, edamame and lentils all provide a substantial amount of protein per serving.' }
    ],
    relatedSlugs: ['calories-vs-macros', 'how-to-compare-two-foods']
  },
  {
    id: 'low-calorie-snacks',
    slug: 'low-calorie-snacks-under-100-calories',
    title: 'Low-Calorie Snacks Under 100 Calories',
    description: 'Filling snacks with 100 calories or less per serving, from fruit and vegetables to Greek yogurt, eggs and popcorn.',
    category: 'Meal Planning Basics',
    tags: ['snacks', 'low calorie', 'weight management'],
    readingTimeMinutes: 4,
    updatedAt: '2026-10-09',
    relatedTool: { label: 'Food Nutrition Calculator', href: '/calculator' },
    heroSummary: "The most filling low-calorie snacks combine water, fiber or protein. Each of these comes in at 100 calories or less for a normal serving.",
    keyTakeaway: "Three cups of air-popped popcorn, a medium apple, a container of plain nonfat Greek yogurt and a hard-boiled egg all come in under 100 calories.",
    seoTitle: 'Low-Calorie Snacks Under 100 Calories | Food Nutrition Calculator',
    seoDescription: 'Snacks under 100 calories with exact USDA numbers: apple, air-popped popcorn, Greek yogurt, hard-boiled egg, strawberries, carrots and more.',
    sections: [
      {
        id: 'fruit-and-veg',
        heading: 'Fruit and vegetables',
        bullets: [
          'Apple, 1 medium: about 95 calories and 4.4 g fiber',
          'Strawberries, 1 cup: about 49 calories',
          'Watermelon, 1 cup diced: about 46 calories',
          'Kiwi, 1 fruit: about 48 calories',
          'Cucumber, 1 medium: about 30 calories',
          'Carrot, 1 medium: about 25 calories',
          'Celery, 1 stalk: about 7 calories'
        ],
        body: ['Fruit and vegetables are mostly water, which is why a large portion stays low in calories.'],
        toolCta: { label: 'See apple nutrition', href: '/foods/apple' }
      },
      {
        id: 'protein-snacks',
        heading: 'Protein snacks',
        body: ['Protein keeps you full for longer than the same calories from sugar.'],
        bullets: [
          'Greek yogurt, plain nonfat, 1 container: about 89 calories, 16 g protein',
          'Hard-boiled egg, 1 large: about 78 calories, 6 g protein',
          'Deli turkey, 2 slices: about 60 calories, 8 g protein',
          'Smoked salmon, 1 oz: about 33 calories, 5 g protein'
        ],
        toolCta: { label: 'See hard-boiled egg nutrition', href: '/foods/hard-boiled-egg' }
      },
      {
        id: 'crunchy',
        heading: 'Crunchy snacks',
        body: [
          'Air-popped popcorn is about 31 calories per cup, so three cups is under 100. Microwave butter popcorn is more than double that per cup. A small handful of chips, by contrast, uses up 100 calories fast: a single-serving bag of potato chips is about 319 calories.'
        ],
        toolCta: { label: 'Compare popcorn types', href: '/foods/air-popped-popcorn' }
      }
    ],
    faqs: [
      { question: 'What is the most filling low-calorie snack?', answer: 'Snacks high in protein or water and fiber, such as Greek yogurt, eggs, apples and popcorn, tend to be the most filling per calorie.' }
    ],
    relatedSlugs: ['high-protein-foods-list', 'calories-in-fruit-lowest-to-highest']
  },
  {
    id: 'calories-in-coffee',
    slug: 'calories-in-coffee-drinks',
    title: 'Calories in Coffee Drinks: Black Coffee to Mocha',
    description: 'Calories in black coffee, lattes, cappuccinos, mochas and hot chocolate, and what makes coffee-shop drinks add up.',
    category: 'Calories',
    tags: ['coffee', 'drinks', 'calories'],
    readingTimeMinutes: 3,
    updatedAt: '2026-10-09',
    relatedTool: { label: 'Food Nutrition Calculator', href: '/calculator' },
    heroSummary: "Black coffee is close to zero calories. Almost all the calories in coffee-shop drinks come from milk, sugar, syrup and whipped cream.",
    keyTakeaway: "Black coffee: about 2 calories a cup. Medium nonfat latte: about 144. Medium mocha: about 317.",
    seoTitle: 'Calories in Coffee: Latte, Cappuccino, Mocha | Food Nutrition Calculator',
    seoDescription: 'Black coffee has about 2 calories, a medium nonfat latte about 144 and a medium mocha about 317. Compare coffee drinks with USDA data.',
    sections: [
      {
        id: 'the-numbers',
        heading: 'The numbers',
        body: ["These figures use USDA survey data. A 'medium' coffee-shop drink is about 16 fl oz (480 g)."],
        bullets: [
          'Black coffee, 1 cup: about 2 calories',
          'Latte with nonfat milk, medium: about 144 calories, 14 g protein',
          'Mocha, medium: about 317 calories, 46 g sugar',
          'Hot chocolate, 1 cup: about 179 calories'
        ],
        toolCta: { label: 'See black coffee nutrition', href: '/foods/black-coffee' }
      },
      {
        id: 'what-adds-calories',
        heading: 'What adds the calories',
        body: [
          'Milk is the main source in a latte or cappuccino, and a cup of whole milk carries about 8 g of fat that nonfat milk does not. Flavored syrups add mostly sugar, and whipped cream on top can add 50 to 100 calories on its own.',
          'Switching from a medium mocha to a medium nonfat latte saves about 170 calories.'
        ],
        toolCta: { label: 'Compare cappuccino and latte', href: '/compare/cappuccino-vs-latte-nonfat-milk' }
      }
    ],
    faqs: [
      { question: 'Does black coffee have calories?', answer: 'Only about 2 calories per cup, so it is effectively calorie-free.' },
      { question: 'Is a latte or a cappuccino lower in calories?', answer: 'For the same cup size a cappuccino usually has less milk and so fewer calories than a latte.' }
    ],
    relatedSlugs: ['calories-in-beer-wine-and-spirits', 'how-to-read-a-nutrition-facts-label']
  },
  {
    id: 'calories-in-bread',
    slug: 'calories-in-bread',
    title: 'Calories in Bread: White, Whole Wheat, Sourdough and More',
    description: 'Calories per slice of white, whole wheat, rye, multigrain and sourdough bread, plus bagels, English muffins, pita, croissants, naan and roti.',
    category: 'Food Comparison',
    tags: ['bread', 'carbs', 'breakfast'],
    readingTimeMinutes: 4,
    updatedAt: '2026-10-09',
    relatedTool: { label: 'Compare Foods', href: '/compare-foods' },
    heroSummary: "Most sliced breads land between 75 and 95 calories a slice. The bigger differences are fiber and portion size: a bagel can be the same as three or four slices of bread.",
    keyTakeaway: "White bread is about 75 calories a slice, whole wheat about 91 and multigrain about 95. A regular bagel is about 277.",
    seoTitle: 'Calories in Bread: White vs Whole Wheat vs Sourdough | Food Nutrition Calculator',
    seoDescription: 'Calories per slice of white (75), whole wheat (91), rye (83) and multigrain (95) bread, plus bagels, pita, croissants, naan and roti.',
    sections: [
      {
        id: 'sliced-bread',
        heading: 'Sliced bread',
        bullets: [
          'White bread, 1 slice (28 g): about 75 calories, 0.6 g fiber',
          'Whole wheat bread, 1 slice (36 g): about 91 calories, 2.2 g fiber',
          'Rye bread, 1 slice (32 g): about 83 calories, 1.9 g fiber',
          'Multigrain bread, 1 slice (36 g): about 95 calories, 2.7 g fiber',
          'Sourdough, 1 oz (28 g): about 77 calories'
        ],
        body: ['Per 100 g these breads are within about 20 calories of each other. Whole wheat and multigrain slices are heavier, which is why they come out a little higher per slice, but they carry roughly four times the fiber.'],
        toolCta: { label: 'Compare white and whole wheat bread', href: '/compare/white-bread-vs-whole-wheat-bread' }
      },
      {
        id: 'other-breads',
        heading: 'Bagels, muffins and flatbreads',
        bullets: [
          'Bagel, 1 regular (105 g): about 277 calories',
          'Pita, 1 medium (57 g): about 157 calories',
          'Croissant, 1 medium (57 g): about 231 calories',
          'Naan, 1 piece (44 g): about 137 calories',
          'Roti or chapati, 1 medium (40 g): about 120 calories'
        ],
        body: ['Bagels and croissants are where bread calories climb fastest, because one item is a large portion.'],
        toolCta: { label: 'Compare naan and roti', href: '/compare/naan-vs-roti-chapati' }
      }
    ],
    faqs: [
      { question: 'Is whole wheat bread lower in calories than white?', answer: 'Not per slice: a typical whole wheat slice is heavier and slightly higher in calories. Its advantage is several times more fiber.' }
    ],
    relatedSlugs: ['serving-size-vs-portion-size', 'calories-in-rice-cooked-vs-uncooked']
  },
  {
    id: 'indian-takeaway-calories',
    slug: 'indian-takeaway-calories',
    title: 'Indian Takeaway Calories: Curry, Naan, Biryani and Sides',
    description: 'Calories in common Indian takeaway and restaurant dishes: chicken curry, dal, biryani, naan, roti, samosas, pakora and poppadoms.',
    category: 'Calories',
    tags: ['indian food', 'takeaway', 'curry'],
    readingTimeMinutes: 5,
    updatedAt: '2026-10-09',
    relatedTool: { label: 'Meal Calorie Calculator', href: '/meal-calorie-calculator' },
    heroSummary: "Curries themselves are often moderate in calories per cup. Totals climb because of portion size, oil and ghee, and the breads and fried sides that come with them.",
    keyTakeaway: "A cup of chicken curry is about 257 calories, chicken biryani about 204 per cup, and a whole 10-inch naan about 550.",
    seoTitle: 'Indian Takeaway Calories: Curry, Naan, Biryani | Food Nutrition Calculator',
    seoDescription: 'Calories in chicken curry, dal, biryani, naan, roti, samosas and poppadoms using USDA data, with tips for a lighter Indian takeaway.',
    sections: [
      {
        id: 'mains',
        heading: 'Curries and rice dishes',
        body: ["These are per-cup values from USDA survey data. A takeaway container is commonly 2 cups or more, so check how much you actually eat."],
        bullets: [
          'Chicken curry, 1 cup: about 257 calories, 16 g protein',
          'Beef curry, 1 cup: about 271 calories',
          'Vegetable curry, 1 cup: about 206 calories',
          'Dal (lentil curry), 1 cup: about 266 calories, 8 g fiber',
          'Palak paneer, 1 cup: about 202 calories',
          'Chicken biryani, 1 cup: about 204 calories'
        ],
        toolCta: { label: 'See chicken curry nutrition', href: '/foods/chicken-curry' }
      },
      {
        id: 'breads',
        heading: 'Naan and roti',
        body: [
          'USDA weighs a whole 10-inch naan at about 177 g. At 311 calories per 100 g, that is about 550 calories, as much as two cups of curry. A quarter of a naan is about 137.',
          'Roti or chapati is far lighter at about 120 calories for a medium one.'
        ],
        toolCta: { label: 'Compare naan and roti', href: '/compare/naan-vs-roti-chapati' }
      },
      {
        id: 'sides',
        heading: 'Starters and sides',
        bullets: [
          'Samosa, 1 small (25 g): about 78 calories; a large 100 g samosa is about 310',
          'Pakora, 1 piece: about 15 calories',
          'Poppadom (papad), 1: about 33 calories'
        ],
        body: ['For a lighter order: choose a tomato or lentil based curry, pick roti over naan, and share the fried starters.']
      }
    ],
    faqs: [
      { question: 'What is the lowest-calorie bread at an Indian restaurant?', answer: 'Roti or chapati, at about 120 calories for a medium one, versus about 550 for a whole naan.' },
      { question: 'Is dal healthy?', answer: 'Dal is a good source of fiber and plant protein. A cup has about 266 calories in USDA data, depending on how much oil or ghee is used.' }
    ],
    relatedSlugs: ['calories-in-bread', 'calories-in-rice-cooked-vs-uncooked']
  },
  {
    id: 'calories-in-rice',
    slug: 'calories-in-rice-cooked-vs-uncooked',
    title: 'Calories in Rice: Cooked vs Uncooked',
    description: 'Why uncooked rice has almost three times the calories per 100 g of cooked rice, and how many calories are in a cup of white and brown rice.',
    category: 'Serving Sizes',
    tags: ['rice', 'carbs', 'serving sizes'],
    readingTimeMinutes: 3,
    updatedAt: '2026-10-09',
    relatedTool: { label: 'Recipe Nutrition Calculator', href: '/recipe-nutrition-calculator' },
    heroSummary: "Rice soaks up water as it cooks, so the same grains weigh far more afterwards. The calories do not change, but the calories per 100 g drop by almost two thirds.",
    keyTakeaway: "Uncooked white rice is about 365 calories per 100 g; cooked white rice is about 130. A cup of cooked white rice is about 205 calories.",
    seoTitle: 'Calories in Rice: Cooked vs Uncooked, White vs Brown | Food Nutrition Calculator',
    seoDescription: 'Cooked white rice has about 130 calories per 100 g; uncooked about 365. A cup of cooked white rice is about 205 calories, brown about 240.',
    sections: [
      {
        id: 'why-it-differs',
        heading: 'Why the numbers look so different',
        body: [
          'Dry rice absorbs about twice its weight in water. 100 g of dry white rice becomes roughly 280 g cooked, but it still contains the same calories.',
          'The most common tracking mistake is weighing cooked rice and logging it as dry rice, which nearly triples the calories logged.'
        ],
        toolCta: { label: 'See uncooked white rice nutrition', href: '/foods/dry-white-rice' }
      },
      {
        id: 'per-cup',
        heading: 'Per cup of cooked rice',
        bullets: [
          'White rice, 1 cup cooked (158 g): about 205 calories',
          'Brown rice, 1 cup cooked (195 g): about 240 calories, 3.1 g fiber',
          'Wild rice, 1 cup cooked: about 200 calories',
          'Fried rice, 1 cup: about 289 calories'
        ],
        body: ['Brown rice is about the same per gram as white rice. Its cup weighs more and it carries more fiber.'],
        toolCta: { label: 'Compare brown and white rice', href: '/compare/cooked-brown-rice-vs-cooked-white-rice' }
      }
    ],
    faqs: [
      { question: 'Should I weigh rice cooked or uncooked?', answer: 'Either works as long as the entry you log matches. Weighing dry rice is more consistent, because cooked weight depends on how much water was absorbed.' }
    ],
    relatedSlugs: ['serving-size-vs-portion-size', 'calories-in-bread']
  },
  {
    id: 'calories-in-eggs',
    slug: 'how-many-calories-in-an-egg',
    title: 'How Many Calories in an Egg?',
    description: 'Calories and protein in a large egg, and how boiling, poaching, frying and scrambling change the total.',
    category: 'Calories',
    tags: ['eggs', 'protein', 'breakfast'],
    readingTimeMinutes: 3,
    updatedAt: '2026-10-09',
    relatedTool: { label: 'Food Nutrition Calculator', href: '/calculator' },
    heroSummary: "A large egg has about 72 calories and 6 g of protein. Boiling and poaching add nothing; frying adds whatever fat goes in the pan.",
    keyTakeaway: "Large egg: about 72 calories raw or poached, 78 hard-boiled, 75 scrambled and 98 fried.",
    seoTitle: 'How Many Calories in an Egg? Boiled, Fried, Scrambled | Food Nutrition Calculator',
    seoDescription: 'A large egg has about 72 calories and 6 g protein. Hard-boiled is about 78, scrambled 75 and fried 98, based on USDA data.',
    sections: [
      {
        id: 'by-cooking-method',
        heading: 'By cooking method (1 large egg)',
        bullets: [
          'Raw or poached: about 72 calories, 6.3 g protein',
          'Hard-boiled: about 78 calories',
          'Scrambled: about 75 calories',
          'Fried: about 98 calories'
        ],
        body: ['The differences come from cooking fat and USDA sampling. Frying in a teaspoon of butter or oil adds around 35 to 40 calories.'],
        toolCta: { label: 'See egg nutrition', href: '/foods/egg' }
      },
      {
        id: 'egg-meals',
        heading: 'Egg dishes',
        body: [
          'A cheese omelet is about 203 calories per cup in USDA data, and an egg, cheese and ham English muffin breakfast sandwich is about 322.'
        ],
        toolCta: { label: 'Compare hard-boiled and scrambled eggs', href: '/compare/hard-boiled-egg-vs-scrambled-egg' }
      }
    ],
    faqs: [
      { question: 'How much protein is in an egg?', answer: 'About 6 g in a large egg.' },
      { question: 'How many calories are in 2 eggs?', answer: 'About 144 calories for two large poached eggs, 156 hard-boiled, or about 196 fried.' }
    ],
    relatedSlugs: ['high-protein-foods-list', 'low-calorie-snacks-under-100-calories']
  },
  {
    id: 'calories-in-fruit',
    slug: 'calories-in-fruit-lowest-to-highest',
    title: 'Calories in Fruit: Lowest to Highest',
    description: 'Common fruits ranked by calories per 100 g, plus why dried fruit and juice are so much more calorie-dense than whole fruit.',
    category: 'Food Comparison',
    tags: ['fruit', 'calories', 'sugar'],
    readingTimeMinutes: 4,
    updatedAt: '2026-10-09',
    relatedTool: { label: 'Compare Foods', href: '/compare-foods' },
    heroSummary: "Whole fruit is low in calories because it is mostly water. Drying removes the water, which concentrates the calories about five-fold.",
    keyTakeaway: "Watermelon and strawberries are about 30 calories per 100 g, apples 52 and bananas 89. Avocado is the outlier at 160 because of its fat.",
    seoTitle: 'Calories in Fruit Ranked: Lowest to Highest | Food Nutrition Calculator',
    seoDescription: 'Fruit ranked by calories per 100 g: watermelon 30, strawberries 32, orange 47, apple 52, banana 89, avocado 160. Plus dried fruit and juice.',
    sections: [
      {
        id: 'ranked',
        heading: 'Ranked per 100 g',
        bullets: [
          'Watermelon: 30 calories',
          'Strawberries: 32 calories',
          'Grapefruit: 42 calories',
          'Orange: 47 calories',
          'Apple: 52 calories',
          'Blueberries: 57 calories',
          'Kiwi: 64 calories',
          'Grapes: 69 calories',
          'Banana: 89 calories',
          'Avocado: 160 calories'
        ],
        body: ['Per piece, a medium apple is about 95 calories and a medium banana about 105.'],
        toolCta: { label: 'Compare apple and banana', href: '/compare/apple-vs-banana' }
      },
      {
        id: 'dried-and-juice',
        heading: 'Dried fruit and juice',
        body: [
          'Raisins are about 299 calories per 100 g compared with 69 for fresh grapes. One ounce of raisins is about 85 calories, close to a whole cup of fresh grapes (about 104) but in a small handful.',
          'Juice keeps the sugar but loses most of the fiber. A cup of apple juice has a similar number of calories to a medium apple but far less fiber and much less staying power.'
        ],
        toolCta: { label: 'See raisins nutrition', href: '/foods/dried-grape' }
      }
    ],
    faqs: [
      { question: 'Which fruit has the fewest calories?', answer: 'Of common fruits, watermelon and strawberries are lowest at about 30 calories per 100 g.' },
      { question: 'Why is avocado so high in calories?', answer: 'Avocado is high in fat (about 15 g per 100 g), mostly monounsaturated, which makes it far more calorie-dense than other fruit.' }
    ],
    relatedSlugs: ['low-calorie-snacks-under-100-calories', 'how-to-compare-two-foods']
  }
];
