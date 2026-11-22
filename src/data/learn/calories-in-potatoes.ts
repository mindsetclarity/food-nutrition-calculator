import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'calories-in-potatoes',
  slug: 'calories-in-potatoes',
  title: 'Calories in Potatoes: Baked, Boiled, Mashed, Roast and Fries',
  description: 'How many calories are in a potato cooked every common way, from boiled and baked to mashed, roast potatoes, chips, fries and crisps, plus what toppings add and how sweet potatoes compare. All figures from USDA and UK CoFID data.',
  category: 'Calories',
  tags: ['potatoes', 'fries', 'chips', 'carbs', 'calories'],
  readingTimeMinutes: 6,
  updatedAt: '2026-11-22',
  relatedTool: { label: 'Food Nutrition Calculator', href: '/calculator' },
  heroSummary: 'A plain potato is a low-calorie food: about 77 calories per 100 g raw and 93 per 100 g baked with the skin, so a medium potato (173 g) is about 161 calories baked. Cooking it in fat changes that. The same potato is about 218 calories roasted, a medium fast-food order of fries is about 452, and crisps are 559 calories per 100 g. Toppings such as butter, sour cream and cheese often add more than the potato itself.',
  keyTakeaway: 'Boiled, baked and jacket potatoes are around 87 to 97 calories per 100 g. Roast potatoes are about 126, UK chip-shop chips 214, fast-food fries 312 and crisps 559. The more surface that meets oil, the higher the number.',
  // The "|" stops metadata.ts appending the site name, keeping the title under 60 chars.
  seoTitle: 'Calories in Potatoes | Baked, Boiled, Mashed, Roast, Fries',
  seoDescription: 'A medium baked potato has about 161 calories. Calories per 100 g for boiled, mashed and roast potatoes, chips, fries and crisps, plus toppings and sweet potato.',
  sections: [
    {
      id: 'by-cooking-method',
      heading: 'Calories in potatoes by cooking method',
      body: [
        'Per 100 g, from USDA data unless noted. Cooked weights are for the potato as eaten.'
      ],
      bullets: [
        'Raw potato: 77 calories',
        'Boiled: 87 calories',
        'Baked, flesh and skin: 93 calories',
        'Jacket potato (UK CoFID): 97 calories',
        'Mashed, made with milk and butter: 114 calories',
        'Roasted: 126 calories',
        'Hash browns: 190 calories; home fries: 197',
        'UK chip-shop chips (CoFID): 214 calories',
        'Tater tots: 237 calories',
        'Fast-food french fries: 312 calories',
        'Potato crisps (chips): 559 calories'
      ],
      toolCta: { label: 'See baked potato nutrition', href: '/foods/baked-potato' }
    },
    {
      id: 'per-potato',
      heading: 'Per potato and per portion',
      body: [
        'A medium potato weighs about 173 g. Using that weight:'
      ],
      bullets: [
        'Medium potato, raw: 133 calories, 30 g carbs, 3.6 g fibre',
        'Medium potato, boiled: 151 calories',
        'Medium potato, baked with skin: 161 calories, 4.3 g protein',
        'Medium potato, roasted: 218 calories',
        'Mashed potato, half a cup (125 g): 143 calories; 1 cup (250 g): 285',
        'Fries, medium fast-food order (145 g): 452 calories; kids order (70 g): 218',
        'Crisps, 1 oz (28 g): 158 calories; a 57 g bag: 319'
      ]
    },
    {
      id: 'toppings',
      heading: 'What toppings add to a baked potato',
      body: [
        'A baked potato is a filling, low-fat food until the toppings go on.'
      ],
      bullets: [
        'Butter, 1 pat (5 g): 36 calories; 1 tablespoon (14 g): 102',
        'Sour cream, 2 tablespoons (30 g): 59 calories',
        'Cheddar cheese, 1 oz (28 g): 116 calories',
        'Baked potato with a tablespoon of butter, 2 tablespoons of sour cream and 1 oz of cheddar: about 438 calories, nearly three times the potato on its own'
      ],
      callout: {
        tone: 'trust',
        title: 'Lighter ways to top a potato',
        body: 'Plain Greek yogurt instead of sour cream, a smaller amount of a strong cheese, baked beans or salsa all add flavour for fewer calories than butter. Leaving the skin on keeps the fibre.'
      },
      toolCta: { label: 'Add up your plate', href: '/meal-calorie-calculator' }
    },
    {
      id: 'chips-and-fries',
      heading: 'Chips, fries and crisps',
      body: [
        'The thinner the cut and the longer it spends in oil, the more fat it absorbs. Thick-cut UK chip-shop chips (214 calories per 100 g in CoFID) are lower per 100 g than thin fast-food fries (312 in USDA data), though chip-shop portions are often large.',
        'Crisps are mostly about surface area: a 100 g bag-equivalent has 559 calories and 35 g of fat, more than six times a boiled potato of the same weight.'
      ],
      toolCta: { label: 'Compare chips and fries', href: '/compare-foods?a=chip-shop-chips&b=french-fries' }
    },
    {
      id: 'sweet-potato',
      heading: 'Sweet potatoes vs white potatoes',
      body: [
        'Sweet potatoes are not lower in calories. Baked, a sweet potato has about 90 calories per 100 g and a white potato about 93. Sweet potatoes do have more fibre and are rich in beta-carotene, while white potatoes with the skin are a good source of vitamin C and potassium. Both are good choices; the cooking method matters far more than the type.'
      ],
      bullets: [
        'Sweet potato, roasted, 1 medium (114 g): 103 calories',
        'Sweet potato fries: 192 calories per 100 g, against 312 for regular fast-food fries'
      ],
      toolCta: { label: 'Compare sweet and white potato', href: '/compare-foods?a=roasted-sweet-potato&b=baked-potato' }
    }
  ],
  faqs: [
    {
      question: 'How many calories are in a baked potato?',
      answer: 'A medium baked potato (173 g) with the skin has about 161 calories, or 93 per 100 g, before toppings. In the UK, CoFID lists a jacket potato at 97 calories per 100 g.'
    },
    {
      question: 'How many calories are in a boiled potato?',
      answer: 'About 87 calories per 100 g, or about 151 for a medium potato of 173 g.'
    },
    {
      question: 'How many calories are in roast potatoes?',
      answer: 'About 126 calories per 100 g, so a medium roast potato of 50 g is about 63 calories. Potatoes roasted in more fat, such as goose fat, will be higher.'
    },
    {
      question: 'Are potatoes fattening?',
      answer: 'Plain potatoes are not. Boiled or baked, they have under 100 calories per 100 g and are filling. Frying, butter, cream and cheese are what make potato dishes high in calories.'
    },
    {
      question: 'Do sweet potatoes have fewer calories than regular potatoes?',
      answer: 'No. Baked sweet potato has about 90 calories per 100 g against 93 for a baked white potato. Sweet potatoes have more fibre and vitamin A, but the calories are almost the same.'
    }
  ],
  relatedSlugs: ['christmas-dinner-calories', 'calories-in-a-burger-and-fries', 'low-calorie-snacks-under-100-calories']
};
