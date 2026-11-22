import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'how-many-calories-in-a-banana',
  slug: 'how-many-calories-in-a-banana',
  title: 'How Many Calories in a Banana? Small, Medium and Large',
  description: 'Calories, carbs, sugar and fibre in a banana by size, from extra small to extra large, per 100 g and per cup, plus how bananas compare with other fruit, dried banana and banana chips. All figures from USDA data.',
  category: 'Calories',
  tags: ['banana', 'fruit', 'calories', 'sugar', 'snacks'],
  readingTimeMinutes: 5,
  updatedAt: '2026-11-22',
  relatedTool: { label: 'Food Nutrition Calculator', href: '/calculator' },
  heroSummary: 'A medium banana (7 to 7 7/8 inches long, about 118 g without the peel) has about 105 calories, 27 g of carbohydrate, 14 g of sugar and 3 g of fibre. Bananas range from about 72 calories for an extra small one to 135 for an extra large one. The sugar in a whole banana does not count toward added or free sugar limits in the US or the UK.',
  keyTakeaway: 'Bananas have 89 calories per 100 g of peeled fruit. A small banana is about 90 calories, a medium one 105 and a large one 121. Dried banana and especially banana chips are far more concentrated: a single ounce of banana chips has 147 calories.',
  // The "|" stops metadata.ts appending the site name, keeping the title under 60 chars.
  seoTitle: 'How Many Calories in a Banana? | By Size, Small to Large',
  seoDescription: 'A medium banana has about 105 calories, 27 g carbs and 14 g sugar. Calories in small, large and extra large bananas, per 100 g and per cup, plus banana chips.',
  sections: [
    {
      id: 'by-size',
      heading: 'Calories in a banana by size',
      body: [
        'USDA sorts bananas into five sizes by length. Weights are for the peeled fruit, which is what you eat; the peel is roughly a third of the total weight.'
      ],
      bullets: [
        'Extra small (under 6 in, 81 g): 72 calories, 18.5 g carbs, 9.9 g sugar',
        'Small (6 to 6 7/8 in, 101 g): 90 calories, 23 g carbs, 12.3 g sugar',
        'Medium (7 to 7 7/8 in, 118 g): 105 calories, 26.9 g carbs, 14.4 g sugar',
        'Large (8 to 8 7/8 in, 136 g): 121 calories, 31 g carbs, 16.6 g sugar',
        'Extra large (9 in or longer, 152 g): 135 calories, 34.7 g carbs, 18.5 g sugar'
      ],
      toolCta: { label: 'See full banana nutrition', href: '/foods/banana' }
    },
    {
      id: 'per-100g-and-cup',
      heading: 'Per 100 g and per cup',
      body: [
        'If you weigh fruit or use it in recipes, these are easier to work with.'
      ],
      bullets: [
        'Per 100 g: 89 calories, 22.8 g carbs, 12.2 g sugar, 2.6 g fibre, 1.1 g protein',
        '1 cup sliced (150 g): 134 calories',
        '1 cup mashed (225 g), as in banana bread: 200 calories'
      ],
      toolCta: { label: 'Work out a banana bread recipe', href: '/recipe-nutrition-calculator' }
    },
    {
      id: 'sugar',
      heading: 'Is the sugar in bananas a problem?',
      body: [
        'A medium banana has about 14 g of sugar, but sugar inside whole fruit is not counted as added sugar in the US or as free sugar in the UK, so it does not count toward the NHS limit of 30 g a day or the US guidance on added sugars. It comes with fibre and is digested more slowly than sugar in drinks.',
        'Riper bananas taste sweeter because some of their starch turns into sugar as they ripen. The calories stay about the same; only the balance of starch and sugar changes.'
      ],
      toolCta: { label: 'Read how much sugar a day is too much', href: '/learn/how-much-sugar-per-day' }
    },
    {
      id: 'compared',
      heading: 'Bananas compared with other fruit and banana snacks',
      body: [
        'Bananas are higher in calories than most fresh fruit because they contain less water and more starch, but they are still a light, filling snack. Dried banana and banana chips are much more concentrated.'
      ],
      bullets: [
        'Medium banana (118 g): 105 calories',
        'Medium apple (182 g): 95 calories',
        'Medium orange (131 g): 62 calories',
        'Dried banana, 1 oz (28 g): 98 calories',
        'Banana chips, 1 oz (28 g): 147 calories, 9.5 g fat, because they are fried',
        'Banana chips, 1 cup (72 g): 374 calories'
      ],
      callout: {
        tone: 'info',
        title: 'Banana chips are not a fruit portion swap',
        body: 'Banana chips are usually deep-fried in coconut oil, so most of their fat is saturated. A cup has about as many calories as three and a half medium bananas.'
      },
      toolCta: { label: 'See fruit ranked by calories', href: '/learn/calories-in-fruit-lowest-to-highest' }
    }
  ],
  faqs: [
    {
      question: 'How many calories are in a medium banana?',
      answer: 'About 105 calories for a medium banana of 7 to 7 7/8 inches, which weighs about 118 g peeled. It has 27 g of carbohydrate, 14 g of sugar and 3 g of fibre.'
    },
    {
      question: 'How many calories are in a large banana?',
      answer: 'About 121 calories for a large banana of 8 to 8 7/8 inches (136 g peeled), and about 135 for an extra large one of 9 inches or more.'
    },
    {
      question: 'How many calories are in a small banana?',
      answer: 'About 90 calories for a small banana of 6 to 6 7/8 inches (101 g peeled), and about 72 for an extra small one under 6 inches.'
    },
    {
      question: 'Are bananas fattening?',
      answer: 'No single food is fattening on its own. A banana is about 105 calories with almost no fat, and its fibre makes it filling for the calories, which suits weight loss as part of your daily total.'
    },
    {
      question: 'Does a riper banana have more calories?',
      answer: 'Not meaningfully. As a banana ripens, some starch turns into sugar, which makes it sweeter, but the total calories stay about the same.'
    }
  ],
  relatedSlugs: ['calories-in-fruit-lowest-to-highest', 'low-calorie-snacks-under-100-calories', 'how-much-sugar-per-day']
};
