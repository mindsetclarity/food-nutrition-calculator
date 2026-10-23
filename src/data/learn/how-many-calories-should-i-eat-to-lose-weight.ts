import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'how-many-calories-should-i-eat-to-lose-weight',
  slug: 'how-many-calories-should-i-eat-to-lose-weight',
  title: 'How Many Calories Should I Eat to Lose Weight?',
  description: 'Work out your own calorie target for weight loss in three steps: estimate your BMR, multiply by your activity level, then subtract about 500 kcal a day.',
  category: 'Calories',
  tags: ['weight loss', 'calorie deficit', 'BMR', 'TDEE', 'calorie target'],
  readingTimeMinutes: 8,
  updatedAt: '2026-10-23',
  relatedTool: { label: 'Food Calorie Counter', href: '/food-calorie-counter' },
  heroSummary: "To lose weight, most adults should eat about 500 calories a day less than they burn, which for many women lands around 1,400 to 1,800 kcal and for many men around 1,900 to 2,400 kcal. The exact number depends on your size, age, sex and how active you are, so the reliable way to find it is to estimate your maintenance calories first and then subtract from that. Below are the arithmetic, two worked examples and a realistic rate of loss.",
  keyTakeaway: "Estimate your BMR with the Mifflin-St Jeor equation, multiply it by an activity factor to get your maintenance calories, then subtract about 500 kcal a day. Aim to lose 0.5 to 1 kg (1 to 2 lb) a week, as the NHS advises, and do not go very low without medical supervision.",
  seoTitle: 'How Many Calories Should I Eat to Lose Weight? | Food Nutrition Calculator',
  seoDescription: 'Work out your weight loss calorie target: BMR, activity level and a 500 kcal deficit, with worked US and UK examples and NHS guidance on safe rates.',
  sections: [
    {
      id: 'how-the-number-is-worked-out',
      heading: 'How your calorie target is worked out',
      body: [
        "There is no single calorie number that suits everyone. A 5 ft 2 in woman who works at a desk and a 6 ft 2 in man who works on a building site can differ by well over 1,000 kcal a day in what they burn.",
        "The standard method has three steps. First, estimate your basal metabolic rate (BMR), the energy your body uses at complete rest. Second, multiply that by an activity factor to estimate your total daily energy expenditure (TDEE), which is roughly what you would eat to stay the same weight. Third, eat less than that number by a set amount, usually around 500 kcal a day.",
        "Every figure in this process is an estimate. Treat the result as a starting point, then adjust it after two or three weeks based on what your weight actually does."
      ],
      bullets: [
        'Step 1: BMR, from your weight, height, age and sex',
        'Step 2: BMR x activity factor = maintenance calories (TDEE)',
        'Step 3: maintenance minus about 500 kcal = weight loss target'
      ]
    },
    {
      id: 'step-1-bmr',
      heading: 'Step 1: estimate your BMR with Mifflin-St Jeor',
      body: [
        "The Mifflin-St Jeor equation is one of the most widely used formulas for estimating resting energy needs in adults. It uses metric units, so convert first: 1 lb = 0.4536 kg, 1 stone = 14 lb (6.35 kg), and 1 inch = 2.54 cm.",
        "It estimates an average person of your size, so someone with much more muscle may burn more."
      ],
      bullets: [
        'Women: BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age in years) - 161',
        'Men: BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age in years) + 5',
        'Example conversion: 180 lb x 0.4536 = 81.6 kg; 5 ft 5 in = 65 in x 2.54 = 165 cm'
      ]
    },
    {
      id: 'step-2-activity',
      heading: 'Step 2: multiply by your activity level',
      body: [
        "BMR does not include walking, working, standing, exercise or digesting food. To estimate maintenance calories, BMR is multiplied by an activity factor. The multipliers below are the ones most calculators use. They are conventions rather than precise measurements, so pick honestly and lean lower if you are unsure.",
        "Most people overestimate their activity. An office job plus three gym sessions a week is usually 'lightly active' or 'moderately active', not 'very active'. If your job keeps you on your feet all day, moving up one level is reasonable."
      ],
      bullets: [
        'Sedentary (desk job, little exercise): BMR x 1.2',
        'Lightly active (light exercise 1 to 3 days a week): BMR x 1.375',
        'Moderately active (moderate exercise 3 to 5 days a week): BMR x 1.55',
        'Very active (hard exercise 6 to 7 days a week): BMR x 1.725',
        'Extra active (physical job plus hard training): BMR x 1.9'
      ]
    },
    {
      id: 'step-3-deficit',
      heading: 'Step 3: subtract about 500 kcal a day',
      body: [
        "A common rule of thumb is that about 3,500 kcal equals 1 lb of body fat, or about 7,700 kcal per kg. A deficit of 500 kcal a day adds up to 3,500 kcal a week, which is where the familiar 'about 1 lb a week' figure comes from. In the UK, NICE guidance on managing obesity describes a diet with a 600 kcal a day deficit, which is in the same range.",
        "The 3,500 kcal rule is an approximation. Early weight loss is faster because of water, and later loss is slower because a lighter body burns less.",
        "You do not have to cut all 500 kcal from food. Walking more or adding exercise can make up part of it, though food is usually the bigger and more reliable lever. Swapping one 12 oz can of regular cola (about 156 kcal in USDA data) for diet cola (about 7 kcal) covers almost a third of the deficit on its own."
      ],
      toolCta: { label: 'Check calories in the foods you eat', href: '/food-calorie-counter' }
    },
    {
      id: 'worked-example-us-woman',
      heading: 'Worked example: a US woman in pounds',
      body: [
        "Sarah is 35, 5 ft 5 in (165 cm) tall and weighs 180 lb (81.6 kg). She works at a desk and walks or does a fitness class two or three times a week, so 'lightly active' fits.",
        "Her estimated target of about 1,580 kcal a day sits within the range the Dietary Guidelines for Americans 2020-2025 give for adult women's energy needs, which is about 1,600 to 2,400 kcal depending on age and activity."
      ],
      bullets: [
        'BMR: (10 x 81.6) + (6.25 x 165) - (5 x 35) - 161',
        'BMR: 816 + 1,031 - 175 - 161 = about 1,511 kcal',
        'Maintenance: 1,511 x 1.375 = about 2,078 kcal',
        'Weight loss target: 2,078 - 500 = about 1,580 kcal a day',
        'Expected rate: about 1 lb (0.45 kg) a week at first, slowing as she gets lighter'
      ]
    },
    {
      id: 'worked-example-uk-man',
      heading: 'Worked example: a UK man in stone',
      body: [
        "James is 42, 5 ft 10 in (178 cm) tall and weighs 15 st 10 lb (220 lb, about 100 kg). He has an office job and plays five-a-side football once a week plus some weekend walks, so 'lightly active' fits.",
        "His target of about 2,120 kcal is higher than the NHS rule of thumb for men trying to lose weight, which is no more than 1,900 kcal a day. That is expected: the NHS figure is a general guide for an average man, and James is heavier than average. Starting at his calculated figure and adjusting from real results is usually easier to stick to."
      ],
      bullets: [
        'BMR: (10 x 100) + (6.25 x 178) - (5 x 42) + 5',
        'BMR: 1,000 + 1,113 - 210 + 5 = about 1,908 kcal',
        'Maintenance: 1,908 x 1.375 = about 2,623 kcal',
        'Weight loss target: 2,623 - 500 = about 2,120 kcal a day',
        'Expected rate: about 0.5 kg (1 lb) a week at first'
      ],
      toolCta: { label: 'Add up the calories in a meal', href: '/meal-calorie-calculator' }
    },
    {
      id: 'reference-figures',
      heading: 'Reference figures from the NHS and US guidelines',
      body: [
        "If you do not want to calculate anything, official reference figures give a rough starting point. They describe an average adult, so they will be too high for some people and too low for others.",
        "The 2,000 kcal figure printed on labels is not a personal target. In the UK it is the reference intake used for the percentages on front-of-pack traffic-light labels, and in the US the FDA bases its Daily Values on a 2,000 calorie diet. It exists so that labels can be compared."
      ],
      bullets: [
        'NHS: around 2,000 kcal a day for women and 2,500 kcal for men to maintain weight',
        'NHS weight loss rule of thumb: no more than about 1,400 kcal a day for women and 1,900 kcal for men',
        'Dietary Guidelines for Americans 2020-2025: about 1,600 to 2,400 kcal a day for adult women and 2,000 to 3,000 kcal for adult men',
        'UK reference intake and FDA Daily Values: both based on 2,000 kcal for label percentages'
      ]
    },
    {
      id: 'minimum-intake-and-safety',
      heading: 'How low is too low?',
      body: [
        "Bigger deficits are not better. Eating very little makes it harder to get enough protein, fibre, vitamins and minerals, tends to leave you hungry and tired, and is harder to keep up. The NHS says very low calorie diets of 800 kcal a day or less should only be followed with medical supervision.",
        "A practical guard rail: do not set your target below your estimated BMR without professional advice. In the examples above that would mean not going under about 1,510 kcal for Sarah or about 1,910 kcal for James."
      ],
      callout: {
        tone: 'warning',
        title: 'Who this does not apply to',
        body: 'These calculations are for healthy adults. Do not diet without advice if you are pregnant or breastfeeding, under 18, have or have had an eating disorder, have diabetes or take medication affected by food intake, or have a medical condition. Speak to a GP, doctor or registered dietitian first.'
      }
    },
    {
      id: 'realistic-rate',
      heading: 'What a realistic rate of loss looks like',
      body: [
        "The NHS advises aiming to lose 0.5 to 1 kg (about 1 to 2 lb) a week. The CDC gives the same range, 1 to 2 lb a week, for people who want weight loss they can keep off. A 500 kcal daily deficit sits at the gentle end of that range.",
        "Expect the first week or two to show a bigger drop, often mostly water, followed by slower progress. Day-to-day weight can swing by a kilo or more from salt, carbohydrate and hormones, so judge progress over two to four weeks, not on any single morning.",
        "If your average weight has not moved after three or four weeks, the usual culprits are underestimated portions, untracked drinks and cooking oil, or an activity level set too high."
      ],
      bullets: [
        '1 lb (0.45 kg) a week: about 13 lb, or just under 1 stone (6 kg), in 3 months',
        '2 lb (0.9 kg) a week: the upper end of the NHS and CDC range, usually only realistic early on or for heavier people'
      ],
      toolCta: { label: 'Look up USDA nutrition for any food', href: '/foods' }
    }
  ],
  faqs: [
    {
      question: 'Is 1,200 calories a day enough to lose weight?',
      answer: 'It will cause weight loss for almost everyone, but for many people it is a larger deficit than they need and harder to keep up. Calculate your maintenance first, subtract about 500 kcal, and avoid going below your estimated BMR without advice from a doctor or dietitian.'
    },
    {
      question: 'Should I eat back the calories I burn exercising?',
      answer: 'If you used an activity factor that already includes your exercise, no. If you chose sedentary and log workouts separately, eating back about half is a cautious approach, because fitness trackers often overestimate calories burned.'
    },
    {
      question: 'Do I need to recalculate as I lose weight?',
      answer: 'Yes. A lighter body burns fewer calories, so your maintenance drops. Recalculating after every 5 kg (about 10 lb or three quarters of a stone) lost keeps your target realistic.'
    },
    {
      question: 'Why does the NHS say 1,900 kcal for men when my calculation says more?',
      answer: 'The NHS figure is a general rule of thumb for an average man. A taller, heavier or more active man burns more, so his personal deficit target can be higher and still produce steady weight loss.'
    }
  ],
  relatedSlugs: ['what-is-a-calorie-deficit', 'tdee-explained', 'how-to-track-calories-accurately']
};
