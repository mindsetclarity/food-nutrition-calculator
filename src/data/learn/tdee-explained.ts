import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'tdee-explained',
  slug: 'tdee-explained',
  title: 'TDEE Explained: How Many Calories You Really Burn',
  description: 'TDEE is the total number of calories you burn in a day. Learn what makes it up, how to estimate it, and how to calibrate it from two to three weeks of your own data.',
  category: 'Calories',
  tags: ['TDEE', 'BMR', 'NEAT', 'metabolism', 'maintenance calories'],
  readingTimeMinutes: 8,
  updatedAt: '2026-10-23',
  relatedTool: { label: 'TDEE Calculator', href: '/tdee-calculator' },
  heroSummary: "TDEE, or total daily energy expenditure, is the total number of calories your body burns in a day, and it is the number you would eat to keep your weight stable. It is made up of four parts: your basal metabolic rate (BMR), everyday movement (NEAT), the energy used to digest food (TEF), and deliberate exercise. Online calculators give a reasonable first estimate, but the most accurate TDEE is the one you work out from your own food log and weigh-ins over two to three weeks, and this guide shows the arithmetic.",
  keyTakeaway: "TDEE = BMR + NEAT + TEF + exercise. Estimate it with the Mifflin-St Jeor equation and an activity factor, then correct it: average intake + (weight lost in kg x 7,700 / days) gives your real maintenance.",
  seoTitle: 'TDEE Explained: BMR, NEAT, TEF and How to Calculate It | Food Nutrition Calculator',
  seoDescription: 'TDEE is the total calories you burn each day. Learn what BMR, NEAT and TEF are, how to estimate TDEE, and how to calibrate it from your own data.',
  sections: [
    {
      id: 'what-is-tdee',
      heading: 'What TDEE means',
      body: [
        "Total daily energy expenditure is everything your body burns in 24 hours. It is sometimes called maintenance calories, because eating about that amount keeps your weight roughly steady. Eat less and you lose weight; eat more and you gain.",
        "TDEE matters because every calorie target is built on it. A weight loss target is TDEE minus a deficit, and a muscle-gain target is TDEE plus a small surplus. If the TDEE estimate is 300 kcal too high, a planned 500 kcal deficit is really only 200 kcal, and progress will be far slower than expected.",
        "The 2,000 kcal figure on food labels is not anyone's TDEE. The FDA uses 2,000 calories as the basis for Daily Values, and the UK uses a 2,000 kcal reference intake on labels, so that percentages can be compared between products. Your own number may be well above or below it."
      ]
    },
    {
      id: 'the-four-parts',
      heading: 'The four parts of TDEE',
      body: [
        "TDEE is the sum of four components. Their size varies between people, but the order is fairly consistent: BMR is usually the largest share, often more than half of the total for people who are not very active.",
        "The component that varies most between people is NEAT. Two people with the same BMR and the same gym routine can differ by several hundred calories a day simply because one has an active job, walks everywhere or fidgets, and the other sits most of the day."
      ],
      bullets: [
        'BMR (basal metabolic rate): energy to keep you alive at rest, including breathing, circulation, brain function and maintaining body temperature',
        'NEAT (non-exercise activity thermogenesis): all movement that is not planned exercise, such as walking, standing, housework, gardening, fidgeting and climbing stairs',
        'TEF (thermic effect of food): energy used to digest, absorb and process food, commonly estimated at around 10% of what you eat; protein takes more energy to process than fat or carbohydrate',
        'Exercise: deliberate training such as running, cycling, swimming, classes and weights'
      ],
      callout: {
        tone: 'info',
        title: 'Why steps matter more than you think',
        body: 'Because NEAT happens all day, small habits add up. Taking the stairs, walking for short trips and standing during calls can matter as much over a week as one or two gym sessions.'
      }
    },
    {
      id: 'estimating-bmr',
      heading: 'Step 1: estimate BMR',
      body: [
        "The Mifflin-St Jeor equation is one of the most widely used ways to estimate BMR in adults. It needs weight in kg, height in cm and age in years. To convert: 1 lb = 0.4536 kg, 1 stone = 6.35 kg, 1 inch = 2.54 cm.",
        "Take a 30-year-old man who is 6 ft (183 cm) and 12 st 8 lb (176 lb, about 80 kg). His BMR is (10 x 80) + (6.25 x 183) - (5 x 30) + 5 = 800 + 1,144 - 150 + 5 = about 1,799 kcal.",
        "For a 50-year-old woman who is 5 ft 4 in (163 cm) and 154 lb (70 kg): (10 x 70) + (6.25 x 163) - (5 x 50) - 161 = 700 + 1,019 - 250 - 161 = about 1,308 kcal."
      ],
      bullets: [
        'Men: (10 x kg) + (6.25 x cm) - (5 x age) + 5',
        'Women: (10 x kg) + (6.25 x cm) - (5 x age) - 161'
      ]
    },
    {
      id: 'estimating-tdee',
      heading: 'Step 2: turn BMR into an estimated TDEE',
      body: [
        "Calculators multiply BMR by an activity factor that rolls NEAT, TEF and exercise into one number. These multipliers are widely used conventions, not measurements, so the result is a ballpark.",
        "If the man above has a desk job and lifts weights three times a week, 'lightly active' or 'moderately active' fits: 1,799 x 1.375 = about 2,474 kcal, or 1,799 x 1.55 = about 2,788 kcal. That gap of more than 300 kcal shows why the next step, calibration, is worth doing."
      ],
      bullets: [
        'Sedentary: BMR x 1.2',
        'Lightly active (1 to 3 exercise days a week): BMR x 1.375',
        'Moderately active (3 to 5 days): BMR x 1.55',
        'Very active (6 to 7 days): BMR x 1.725',
        'Extra active (physical job plus training): BMR x 1.9'
      ]
    },
    {
      id: 'calibrating-tdee',
      heading: 'Step 3: calibrate TDEE from your own data',
      body: [
        "Your real TDEE can be worked out from what you eat and what your weight does. For two to three weeks, log everything you eat and drink as accurately as you can, ideally weighing food, and weigh yourself every morning under the same conditions. Do not try to diet or change habits during this period; just record.",
        "Then compare the average weight of the first week with the average of the last week, and the average daily intake across the whole period. Using weekly averages rather than single days smooths out water swings. The rough conversion is 7,700 kcal per kg of body weight, or 3,500 kcal per lb.",
        "The formula is: TDEE = average daily intake + (weight lost x 7,700 / number of days). If you gained weight, the second part is negative, so you subtract it."
      ],
      bullets: [
        'Days tracked: 21 (three weeks)',
        'Average intake: 2,350 kcal a day',
        'Week 1 average weight: 80.4 kg; week 3 average weight: 80.0 kg',
        'Change: 0.4 kg lost over 14 days between the middle of week 1 and the middle of week 3',
        'Energy from stores: 0.4 x 7,700 = 3,080 kcal; 3,080 / 14 = 220 kcal a day',
        'Calibrated TDEE: 2,350 + 220 = about 2,570 kcal a day'
      ],
      toolCta: { label: 'Log foods with the calculator', href: '/calculator' }
    },
    {
      id: 'calibrating-in-pounds',
      heading: 'The same method in pounds',
      body: [
        "If you weigh yourself in pounds or stone, use 3,500 kcal per lb. Say a woman averages 1,900 kcal a day for three weeks and her weekly average goes from 165.0 lb in week 1 to 166.0 lb in week 3.",
        "Because she gained, the stored energy is negative: 1.0 x 3,500 = 3,500 kcal over 14 days, or 250 kcal a day. Her calibrated TDEE is 1,900 - 250 = about 1,650 kcal a day. If her calculator had said 1,950, she now knows why a 1,900 kcal 'diet' was not working, and that a real deficit for her is around 1,150 to 1,400 kcal. At that level she should check her plan with a GP or dietitian before going lower."
      ],
      callout: {
        tone: 'trust',
        title: 'Why 14 days, not 21?',
        body: 'A weekly average represents the middle of that week. The middle of week 1 and the middle of week 3 are 14 days apart, so dividing by 14 matches the weight change to the time it actually took.'
      }
    },
    {
      id: 'what-throws-it-off',
      heading: 'What throws the estimate off',
      body: [
        "Calibration is only as good as the food log. If you leave out cooking oil, drinks, sauces or weekend meals, your calculated TDEE will come out too low, because the log says you ate less than you did. Weighing food for the tracking period makes the biggest difference.",
        "Water is the other big variable. Starting a new exercise plan, changing how much salt or carbohydrate you eat, illness, travel and the menstrual cycle can all shift weight by a kilo or more. Avoid starting the tracking period during one of these, or extend it to four weeks.",
        "Finally, TDEE is not fixed. It falls as you lose weight, partly because a smaller body burns less and partly because people tend to move a little less in a deficit. Re-check every 5 kg (about 10 lb) lost or when your routine changes."
      ],
      bullets: [
        'Untracked oils, drinks and snacks: calibrated TDEE comes out too low',
        'Big change in salt or carbs: water swings distort the weight trend',
        'Fewer than 14 days of data: too noisy to trust',
        'Fitness tracker estimates: useful for trends, but often overstate calories burned'
      ],
      toolCta: { label: 'Work out calories in a homemade recipe', href: '/recipe-nutrition-calculator' }
    },
    {
      id: 'using-your-tdee',
      heading: 'Using your TDEE',
      body: [
        "Once you have a calibrated number, everything else is simple subtraction or addition. For weight loss, a deficit of about 500 kcal a day gives roughly 1 lb (0.45 kg) a week, in line with the NHS advice to aim for 0.5 to 1 kg (1 to 2 lb) a week. For maintenance, eat close to TDEE. For muscle gain, a small surplus alongside strength training is the usual approach.",
        "Keep an eye on minimums. The NHS says very low calorie diets of 800 kcal a day or less should only be followed with medical supervision, and it is sensible not to set a target below your estimated BMR without advice."
      ],
      callout: {
        tone: 'warning',
        title: 'Not for everyone',
        body: 'These methods are for healthy adults. If you are pregnant or breastfeeding, under 18, have or have had an eating disorder, or have a medical condition such as diabetes, speak to a GP, doctor or registered dietitian before changing how much you eat.'
      }
    }
  ],
  faqs: [
    {
      question: 'What is the difference between BMR and TDEE?',
      answer: 'BMR is the energy you would burn lying still all day. TDEE adds everything else: daily movement, digesting food and exercise. TDEE is always higher than BMR.'
    },
    {
      question: 'How accurate are online TDEE calculators?',
      answer: 'They are a reasonable starting point but can easily be a few hundred calories off, mostly because activity levels are hard to judge. Calibrating from two to three weeks of your own intake and weight data is more accurate.'
    },
    {
      question: 'Can I increase my TDEE?',
      answer: 'Yes. More daily movement (NEAT) and regular exercise raise it most directly. Building muscle through strength training can also increase it slightly over time.'
    },
    {
      question: 'Does eating more protein raise TDEE?',
      answer: 'A little. Protein takes more energy to digest than fat or carbohydrate, so a higher-protein diet slightly increases the thermic effect of food. The bigger benefit for most people is that protein is filling.'
    },
    {
      question: 'How often should I recalculate my TDEE?',
      answer: 'After every 5 kg (about 10 lb) of weight change, or whenever your job, training or daily routine changes noticeably.'
    }
  ],
  relatedSlugs: ['how-many-calories-should-i-eat-to-lose-weight', 'what-is-a-calorie-deficit', 'how-to-track-calories-accurately']
};
