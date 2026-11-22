import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'calories-in-pasta',
  slug: 'calories-in-pasta',
  title: 'Calories in Pasta: Dry vs Cooked, Portions and Sauces',
  description: 'How many calories are in pasta dry and cooked, per 100 g, per cup and per portion, what sauces and cheese add, and how whole wheat pasta, noodles and gnocchi compare. All figures from USDA data.',
  category: 'Calories',
  tags: ['pasta', 'spaghetti', 'noodles', 'carbs', 'calories'],
  readingTimeMinutes: 6,
  updatedAt: '2026-11-22',
  relatedTool: { label: 'Recipe Nutrition Calculator', href: '/recipe-nutrition-calculator' },
  heroSummary: 'Dry pasta has about 371 calories per 100 g and cooked pasta about 158, because it absorbs water as it boils. A 2 oz (56 g) US serving of dry pasta is about 208 calories, and a 75 g UK portion about 278. The sauce decides the rest: half a cup of marinara adds 61 calories, while the same amount of Alfredo adds 195.',
  keyTakeaway: 'Weigh pasta dry if you can: about 371 calories per 100 g. If you weigh it cooked, use about 158 per 100 g, since pasta grows to roughly 2.35 times its dry weight when boiled. A 75 g portion with tomato sauce and a spoon of Parmesan is about 360 calories; with a creamy or pesto sauce it is closer to 470.',
  // The "|" stops metadata.ts appending the site name, keeping the title under 60 chars.
  seoTitle: 'Calories in Pasta | Dry vs Cooked, Portions and Sauces',
  seoDescription: 'Dry pasta has 371 calories per 100 g and cooked pasta 158. Calories per cup and per portion, what marinara, Alfredo and pesto add, and noodles compared.',
  sections: [
    {
      id: 'dry-vs-cooked',
      heading: 'Dry vs cooked pasta',
      body: [
        'Pasta takes in a lot of water as it cooks, so its weight goes up and its calories per 100 g go down. The calories in the pasta itself do not change. In USDA data, dry pasta has about 371 calories per 100 g and cooked pasta about 158, so pasta weighs roughly 2.35 times as much once cooked.',
        'That is why the most common mistake is mixing the two: weighing cooked pasta and logging it as dry more than doubles the count.'
      ],
      bullets: [
        'Dry, per 100 g: 371 calories, 13 g protein, 75 g carbs',
        'Cooked, per 100 g: 158 calories, 5.8 g protein, 31 g carbs',
        'Dry, 2 oz (56 g), the usual US serving: 208 calories',
        'Dry, 75 g, a typical UK portion: 278 calories, about 176 g once cooked',
        'Cooked, 1 cup (140 g): 221 calories'
      ],
      toolCta: { label: 'See pasta nutrition', href: '/foods/dry-pasta' }
    },
    {
      id: 'sauces',
      heading: 'What sauces and toppings add',
      body: [
        'Plain pasta is low in fat. Most of the difference between a light and a heavy plate comes from the sauce, oil and cheese on top.'
      ],
      bullets: [
        'Marinara or tomato sauce, half a cup (135 g): 61 calories',
        'Alfredo sauce, half a cup (130 g): 195 calories, 19.5 g fat',
        'Pesto, 1 tablespoon (16 g): 93 calories; 2 tablespoons: 186 calories',
        'Grated Parmesan, 1 tablespoon (5 g): 21 calories',
        'Olive oil, 1 tablespoon (14 g): 126 calories'
      ],
      callout: {
        tone: 'info',
        title: 'Three plates, same pasta',
        body: 'With 75 g of dry pasta: tomato sauce and a tablespoon of Parmesan come to about 360 calories, two tablespoons of pesto to about 464, and half a cup of Alfredo to about 473.'
      },
      toolCta: { label: 'Work out your own recipe', href: '/recipe-nutrition-calculator' }
    },
    {
      id: 'dishes',
      heading: 'Pasta dishes',
      body: [
        'Restaurant and ready-made pasta dishes are often larger than a home portion. In USDA data:'
      ],
      bullets: [
        'Spaghetti with meat sauce, a large serving (554 g): 670 calories, 32 g protein',
        'Lasagna with meat, 1 piece (206 g): 286 calories',
        'Macaroni and cheese and creamy pasta bakes are usually higher again, because of the cheese sauce'
      ],
      toolCta: { label: 'Add up a pasta meal', href: '/meal-calorie-calculator' }
    },
    {
      id: 'alternatives',
      heading: 'Whole wheat pasta, noodles and lighter swaps',
      body: [
        'Per cup cooked, from USDA data:'
      ],
      bullets: [
        'White pasta (140 g): 221 calories, 2.5 g fibre',
        'Whole wheat pasta (140 g): 223 calories, 6.4 g fibre',
        'Egg noodles (160 g): 221 calories',
        'Rice noodles (175 g): 187 calories',
        'Soba noodles (114 g): 113 calories',
        'Potato gnocchi (188 g): 254 calories',
        'Spaghetti squash (155 g): 76 calories'
      ],
      callout: {
        tone: 'trust',
        title: 'Whole wheat is about fibre, not calories',
        body: 'Whole wheat pasta has about the same calories as white pasta, but more than twice the fibre. The fibre can help you feel full for longer. If you want fewer calories, a smaller portion with more vegetables makes a bigger difference than the type of pasta.'
      }
    }
  ],
  faqs: [
    {
      question: 'How many calories are in 100 g of pasta?',
      answer: 'About 371 calories per 100 g of dry pasta, or about 158 per 100 g of cooked pasta. The difference is water absorbed during cooking.'
    },
    {
      question: 'How many calories are in a cup of cooked pasta?',
      answer: 'About 221 calories for 1 cup (140 g) of cooked white pasta, with 8 g of protein and 43 g of carbohydrate.'
    },
    {
      question: 'How much dry pasta is one portion?',
      answer: 'The usual serving is 2 oz (56 g) dry in the US and 75 g dry in the UK, about 208 and 278 calories respectively, before sauce.'
    },
    {
      question: 'Is pasta fattening?',
      answer: 'No more than other foods with similar calories. Plain pasta is low in fat; large portions, creamy sauces, oil and cheese are what push a plate up. Measuring the pasta dry is the easiest way to keep portions steady.'
    },
    {
      question: 'Does whole wheat pasta have fewer calories?',
      answer: 'Not really. A cup of cooked whole wheat pasta has about 223 calories against 221 for white, but it has more than twice the fibre.'
    }
  ],
  relatedSlugs: ['how-to-calculate-calories-in-a-homemade-recipe', 'calories-in-rice-cooked-vs-uncooked', 'how-to-track-calories-accurately']
};
