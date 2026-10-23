import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'how-to-count-macros-for-beginners',
  slug: 'how-to-count-macros-for-beginners',
  title: 'How to Count Macros: A Beginner\'s Guide',
  description: 'A step-by-step method for setting a calorie target, then protein, fat and carbohydrate in grams, with a full worked example and the logging mistakes that throw most beginners off.',
  category: 'Macros',
  tags: ['macros', 'protein', 'carbs', 'fat', 'tracking'],
  readingTimeMinutes: 7,
  updatedAt: '2026-10-23',
  relatedTool: { label: 'Food Nutrition Calculator', href: '/calculator' },
  heroSummary: "To count macros, set a daily calorie target first, then give protein its grams, give fat a share of calories, and let carbohydrate fill whatever is left. You then log what you eat in grams and aim to land close to each number most days. Below is the full method, a worked example with every sum shown, and the handful of logging errors (cooking oil, sauces, raw versus cooked weights) that cause most of the gap between what people log and what they actually eat.",
  keyTakeaway: "Protein and carbohydrate have 4 calories per gram, fat has 9 and alcohol has 7. Set calories, then protein (about 1.2 to 1.6 g/kg if you are active), then fat (20% to 35% of calories), then carbs from the remainder. Weigh food where you can, and always log cooking oil.",
  seoTitle: 'How to Count Macros for Beginners (With Worked Example) | Food Nutrition Calculator',
  seoDescription: 'Set calories, then protein, fat and carbs in grams. A worked example with every sum shown, how to log food, and common mistakes with oils and cooked weights.',
  sections: [
    {
      id: 'what-macros-are',
      heading: 'What macros are and why grams matter',
      body: [
        '"Macros" is short for macronutrients: protein, fat and carbohydrate, the three nutrients that supply calories. Alcohol also supplies calories but is not counted as a nutrient you need. Counting macros means tracking the grams of each, rather than only total calories.',
        'The useful thing about grams is that they convert directly into calories with fixed factors, the same ones used on US Nutrition Facts labels and UK nutrition panels. Once you know the grams, the calories follow.'
      ],
      bullets: [
        'Protein: 4 calories per gram',
        'Carbohydrate: 4 calories per gram',
        'Fat: 9 calories per gram',
        'Alcohol: 7 calories per gram'
      ],
      callout: {
        tone: 'info',
        title: 'Do you need to count macros at all?',
        body: 'For weight change, total calories matter most. Macro counting is most useful when you also care about what that weight is made of (keeping muscle while losing fat, for example) or when you want to make sure you eat enough protein. If calorie counting already works for you, it is fine to just track protein on top.'
      }
    },
    {
      id: 'step-1-calories',
      heading: 'Step 1: Set your calorie target',
      body: [
        'Start by estimating your total daily energy expenditure (TDEE), the calories you burn in a typical day. The most widely used formula is Mifflin-St Jeor, which estimates your resting energy use from weight, height, age and sex, then multiplies it by an activity factor.',
        'For weight loss, a deficit of around 500 calories a day below TDEE is a common starting point. For maintenance, eat at TDEE. For muscle gain, a small surplus of a few hundred calories is usually enough. Treat any formula result as a first guess and adjust after two to four weeks based on what your weight actually does.',
        'Worked example: a 35-year-old woman, 5 ft 5 in (165 cm), 154 lb (70 kg, or 11 stone), who exercises a few times a week.'
      ],
      bullets: [
        'Resting energy (Mifflin-St Jeor, women): (10 x 70) + (6.25 x 165) - (5 x 35) - 161 = 1,395 calories',
        'Moderately active factor of 1.55: 1,395 x 1.55 = 2,163 calories (TDEE)',
        'Minus about 500 for gradual weight loss: 1,663 calories',
        'Rounded for easy maths: 1,700 calories a day'
      ],
      toolCta: { label: 'Estimate your calorie needs', href: '/calculator' }
    },
    {
      id: 'step-2-protein',
      heading: 'Step 2: Set protein in grams',
      body: [
        'Set protein first, because it is the macro with the clearest per-kilo guidance. The US RDA is 0.8 g per kg of body weight and the UK reference figure is 0.75 g/kg, but these are minimums for healthy adults. If you exercise or are eating in a deficit, sports nutrition bodies recommend roughly 1.2 to 2.0 g/kg. A middle value of 1.6 g/kg (0.73 g per pound) suits most active people who are trying to lose fat.',
        'For the example: 70 kg x 1.6 = 112 g protein. At 4 calories per gram, that is 448 calories.'
      ]
    },
    {
      id: 'step-3-fat',
      heading: 'Step 3: Set fat as a share of calories',
      body: [
        'The US National Academies give an acceptable range for adults of 20% to 35% of calories from fat. In the UK, the guidance is that total fat should make up no more than about 35% of food energy. Going below 20% makes meals less satisfying and makes it harder to get enough fat-soluble vitamins and essential fatty acids, so it is rarely worth it.',
        'For the example, choose 25%: 1,700 x 0.25 = 425 calories from fat. Divide by 9 to get grams: 425 / 9 = 47 g fat.',
        'Within that, both countries ask you to limit saturated fat. The Dietary Guidelines for Americans 2020-2025 say less than 10% of calories, and the UK reference intake on labels is 20 g of saturates a day.'
      ]
    },
    {
      id: 'step-4-carbs',
      heading: 'Step 4: Carbohydrate fills the rest',
      body: [
        'Subtract protein and fat calories from the total, then divide by 4.',
        'For the example: 1,700 - 448 - 425 = 827 calories left. 827 / 4 = 207 g carbohydrate. That is about 49% of calories, which sits inside the National Academies range of 45% to 65% for carbohydrate. Aim for 14 g of fibre per 1,000 calories (the US guideline), so about 24 g at 1,700 calories.'
      ],
      bullets: [
        'Calories: 1,700',
        'Protein: 112 g (448 calories, 26%)',
        'Fat: 47 g (425 calories, 25%)',
        'Carbohydrate: 207 g (827 calories, 49%)',
        'Check: 448 + 425 + 828 = 1,701, which rounds back to the target'
      ],
      callout: {
        tone: 'trust',
        title: 'Split it across your meals',
        body: 'Divided across three meals and a snack, the example works out at roughly 28 g protein, 12 g fat and 52 g carbohydrate each time. You do not need to hit every meal exactly; the daily total is what counts.'
      }
    },
    {
      id: 'how-to-log',
      heading: 'How to log food so the numbers mean something',
      body: [
        'Your targets are only as good as your logging. The most accurate approach is to weigh food in grams on a kitchen scale, at least for the first few weeks, until you can judge portions by eye. Cups and spoons are much less consistent, especially for things like cereal, rice and nut butter.',
        'Log as you go, or plan the day in advance and adjust, rather than trying to remember everything at night. For packaged food, use the label but check the serving size it is based on. For home-cooked dishes, weigh the ingredients, add them up and divide by the number of portions, or use a recipe calculator to do it for you.',
        'Most people only need to log precisely for a while. Once you know what 30 g of protein or a 1 tbsp serving of oil looks like, you can log your usual meals quickly and only weigh new foods.'
      ],
      toolCta: { label: 'Work out a homemade recipe', href: '/recipe-nutrition-calculator' }
    },
    {
      id: 'mistakes-oils-sauces',
      heading: 'Mistake 1: Forgetting oils, spreads and sauces',
      body: [
        'Fat has more than twice the calories of protein or carbohydrate per gram, so small amounts of oil and dressing move your numbers a lot. Using USDA data on this site:'
      ],
      bullets: [
        'Olive oil, 1 tbsp (14 g): 126 calories, 14 g fat',
        'Butter, 1 tbsp (14.2 g): 102 calories, 11.5 g fat',
        'Mayonnaise, 1 tbsp (13.8 g): 94 calories, 10.3 g fat',
        'Ranch dressing, 2 tbsp (30 g): 129 calories, 13.4 g fat',
        'Peanut butter, 1 oz (28 g, about 2 tbsp): 167 calories, 14.4 g fat',
        'Ketchup, 1 tbsp (17 g): 19 calories, 4.6 g carbohydrate'
      ],
      callout: {
        tone: 'warning',
        title: 'The free pour',
        body: 'Two unmeasured glugs of oil in a pan can easily be 2 to 3 tbsp, which is 250 to 380 calories and most of the fat budget in the example above. Measure oil with a spoon, or weigh the bottle before and after cooking.'
      }
    },
    {
      id: 'mistakes-raw-cooked',
      heading: 'Mistake 2: Mixing up raw and cooked weights',
      body: [
        'Meat loses water when cooked, so it gets lighter and its nutrients per 100 g go up. Rice and pasta absorb water, so they get heavier and their nutrients per 100 g go down. Logging a cooked weight against a raw entry, or the other way round, is one of the biggest sources of error.',
        'The fix is to weigh and log in the same state. If you weigh chicken raw, choose a raw entry. If you weigh cooked rice, choose a cooked entry. When you batch cook, weigh the raw ingredients, then weigh the whole cooked batch, and divide.'
      ],
      bullets: [
        'Chicken breast, raw: 120 calories and 22.5 g protein per 100 g (USDA)',
        'Chicken breast, roasted: 165 calories and 31 g protein per 100 g. Logging 113 g of cooked chicken as raw undercounts by about 50 calories and 10 g protein.',
        'White rice, dry: 365 calories per 100 g. White rice, cooked: 130 calories per 100 g. Logging a 158 g cup of cooked rice as dry would record about 577 calories instead of 205.',
        'Pasta, dry: 371 calories per 100 g. Pasta, cooked: 158 calories per 100 g.'
      ],
      toolCta: { label: 'Compare raw and cooked foods', href: '/compare-foods' }
    },
    {
      id: 'other-mistakes',
      heading: 'Other common mistakes, and who this is not for',
      body: [
        'Beginners also tend to forget drinks (milky coffee, juice, alcohol), tastes while cooking, and leftovers from children\'s plates. Weekends matter: a careful Monday to Friday followed by two untracked days can cancel out a weekly deficit. Chasing perfect numbers is another trap. Landing within about 5 to 10 g of protein and carbohydrate and a few grams of fat most days is plenty.',
        'Macro counting is not suitable for everyone. If you are pregnant or breastfeeding, under 18, have diabetes that is treated with insulin or other medication, have kidney disease, or have a history of disordered eating, speak to your GP, doctor or a registered dietitian before setting targets. If tracking starts to make you anxious about food, stop and get support.'
      ]
    }
  ],
  faqs: [
    {
      question: 'What is a good macro ratio for beginners?',
      answer: 'There is no single best ratio. A practical start is protein at 1.2 to 1.6 g per kg of body weight, fat at 25% to 30% of calories, and carbohydrate for the rest, which usually lands around 25% protein, 25% to 30% fat and 45% to 50% carbs.'
    },
    {
      question: 'Do I count macros on cooked or raw food?',
      answer: 'Either works as long as you match the weight to the right database entry. Raw weights are more consistent because cooking time changes how much water is lost, so many people weigh meat raw.'
    },
    {
      question: 'Do fibre grams count toward carbs?',
      answer: 'On US Nutrition Facts labels, fibre is included in total carbohydrate. On UK and EU labels, carbohydrate excludes fibre, which is listed separately. Pick one convention and stick to it.'
    },
    {
      question: 'How long until I see results?',
      answer: 'Give a new target two to four weeks before changing it. Day-to-day weight swings from water and food in your gut are normal, so compare weekly averages rather than single days.'
    },
    {
      question: 'Do I have to hit my macros exactly every day?',
      answer: 'No. Getting protein and calories roughly right most days matters far more than exact fat and carbohydrate numbers. Close and consistent beats perfect and occasional.'
    }
  ],
  relatedSlugs: ['how-much-protein-do-i-need', 'calories-vs-macros', 'how-to-calculate-calories-in-food']
};
