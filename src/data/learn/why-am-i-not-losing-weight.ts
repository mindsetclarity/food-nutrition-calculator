import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'why-am-i-not-losing-weight',
  slug: 'why-am-i-not-losing-weight',
  title: 'Why Am I Not Losing Weight? 8 Common Reasons and a 2-Week Check',
  description: "The most common reasons weight loss stalls, from untracked cooking oil and weekend eating to water retention and plateaus, plus a two-week checklist to find yours.",
  category: 'Calories',
  tags: ['weight loss', 'calorie deficit', 'plateau', 'calorie tracking'],
  readingTimeMinutes: 8,
  updatedAt: '2026-10-23',
  relatedTool: { label: 'Food Calorie Counter', href: '/food-calorie-counter' },
  heroSummary: "If you are eating less but the scale will not move, the most likely reason is that you are eating more than you think, usually through small untracked extras, drinks and weekends. The next most likely is that normal water swings are hiding fat loss that is actually happening. Medical causes exist, but they are less common, and a careful two-week check will usually show you which group you fall into.",
  keyTakeaway: "Judge progress on 2 to 4 weeks of averaged weigh-ins, not single days. Log everything for two weeks, including oil, drinks and weekends, and treat exercise calorie estimates as rough. If you have truly been in a deficit for a month with no change, or you have symptoms such as tiredness and feeling cold, speak to a doctor.",
  seoTitle: "Why Am I Not Losing Weight? 8 Reasons and a Fix | Food Nutrition Calculator",
  seoDescription: "Not losing weight on a diet? Check hidden calories, weekends, drinks, water retention, plateaus and sleep, with a 2-week checklist and when to see a doctor.",
  sections: [
    {
      id: 'are-you-really-stuck',
      heading: 'First, check you are actually stuck',
      body: [
        "Body weight moves around from one day to the next for reasons that have nothing to do with fat. A salty takeaway, a bigger carbohydrate meal than usual, constipation, a hard new workout and the menstrual cycle can all make the scale read higher for a few days because your body is holding more water. It is common to see a swing of 1 to 2 lb (about 0.5 to 1 kg) between mornings.",
        "Carbohydrate is stored in muscle and liver as glycogen, and glycogen is stored with water. That is why the first week of a diet often shows a fast drop, and why one high-carb weekend can seem to undo it. Neither is mostly fat.",
        "So before changing anything, weigh yourself under the same conditions (after the toilet, before eating, same scale) several mornings a week and compare weekly averages. If the average has not moved in 3 to 4 weeks, you are genuinely stuck. If it has moved slowly, you are probably doing fine.",
        "For context, the NHS suggests aiming to lose 0.5 to 1 kg (1 to 2 lb) a week, and the CDC says people who lose about 1 to 2 lb a week are more likely to keep it off. At that rate, a week of water retention can easily hide a week of fat loss. Over a month it cannot."
      ],
      callout: {
        tone: 'info',
        title: 'Other measures help',
        body: "A tape measure around your waist once a week, how your clothes fit and progress photos are less affected by water than the scale. If those are improving, the scale will usually catch up."
      }
    },
    {
      id: 'underestimating-intake',
      heading: 'Reason 1: You are eating more than you log',
      body: [
        "This is the most common reason by a wide margin, and it is not about willpower. Most people log the main foods accurately and miss the small, calorie-dense extras. Cooking fats, spreads, sauces and tastes while cooking add up quickly, and portion sizes drift when you stop weighing.",
        "Here is what some common extras add, using USDA data:"
      ],
      bullets: [
        "Olive oil, 1 tablespoon (14 g): about 126 calories",
        "Butter, 1 tablespoon (14 g): about 102 calories",
        "Peanut butter, 1 level tablespoon (16 g): about 95 calories. A heaped spoon can be close to double",
        "A splash of oil in the pan, a buttered slice of toast and a spoon of peanut butter from the jar: easily 300 calories that may never be written down"
      ],
      toolCta: { label: 'Look up calories for any food', href: '/food-calorie-counter' }
    },
    {
      id: 'overestimating-exercise',
      heading: 'Reason 2: You are counting too much for exercise',
      body: [
        "Gym machines, apps and fitness trackers estimate calories burned from formulas, and those estimates can be well off for any one person. If your plan lets you eat back every exercise calorie the watch reports, a generous estimate can quietly cancel your deficit.",
        "A simple fix is to set your daily target from your normal activity level and treat workouts as a bonus rather than extra food. If you do want to eat some of it back, eat back only part of it and see what your weekly average weight does.",
        "None of this means exercise is not worth it. The NHS and the CDC both recommend at least 150 minutes of moderate activity a week plus muscle-strengthening activity on at least 2 days, and activity helps you keep weight off and protects your heart, bones and mood. It is just a less precise way to create a deficit than eating slightly less."
      ]
    },
    {
      id: 'weekends',
      heading: 'Reason 3: Weekends cancel the weekdays',
      body: [
        "A calorie deficit works over the whole week, not day by day. That makes the arithmetic of weekends unforgiving.",
        "Say you hit a 500 calorie deficit Monday to Friday. That is 5 x 500 = 2,500 calories. If Saturday and Sunday each run about 1,250 calories over maintenance with a takeaway, a few drinks and a brunch, you finish the week at roughly zero. You feel like you dieted for five days, and the scale says nothing happened.",
        "You do not need to give up weekends. Log them as carefully as weekdays, plan one bigger meal instead of three, and watch drinks in particular."
      ]
    },
    {
      id: 'liquid-calories',
      heading: 'Reason 4: Drinks you do not count',
      body: [
        "Drinks do not fill you up the way food does, so their calories are easy to forget. Using USDA data:"
      ],
      bullets: [
        "Regular cola, 12 oz can (372 g): about 156 calories and 37 g of sugar",
        "Mocha, medium (496 g): about 317 calories",
        "Latte with nonfat milk, medium (480 g): about 144 calories",
        "Regular beer, UK pint (568 ml): about 244 calories",
        "Red wine, 175 ml glass: about 150 calories"
      ],
      callout: {
        tone: 'warning',
        title: 'A week of drinks',
        body: "One medium mocha on each of 5 workdays (about 1,585 calories) plus four pints of beer at the weekend (about 976) is roughly 2,560 calories a week. That is about the same as a 500 calorie daily deficit for five days."
      }
    },
    {
      id: 'plateau-and-adaptation',
      heading: 'Reason 5: Your target was set for a heavier you',
      body: [
        "A smaller body uses less energy, both at rest and when moving. If you worked out your calorie target when you were 1 or 2 stone (6 to 13 kg) heavier, the same number may now be close to your new maintenance, so weight loss slows and then stops. This is a normal plateau, not a broken metabolism.",
        "Many people also move a little less without noticing when they eat less: fewer steps, more sitting, less fidgeting. That small drop in everyday activity narrows the deficit further.",
        "Recalculate your maintenance calories every 5 kg (about 10 lb) you lose, keep your daily steps roughly steady, and keep protein up so you hold on to muscle. Then give the new target 3 to 4 weeks before judging it."
      ],
      toolCta: { label: 'Recalculate your calorie needs', href: '/calculator' }
    },
    {
      id: 'sleep-and-stress',
      heading: 'Reason 6: Short sleep and stress',
      body: [
        "The CDC recommends at least 7 hours of sleep a night for adults, and the NHS says most adults need 7 to 9 hours. When you are short on sleep you are usually hungrier, more likely to reach for snacks and less likely to feel like being active. Stress tends to push in the same direction.",
        "Sleep does not burn fat on its own, but it makes sticking to your plan much easier. If your logs show that most of your overeating happens late at night or after bad nights, sleep may be the real lever."
      ]
    },
    {
      id: 'medical-causes',
      heading: 'Medical reasons to raise with a doctor',
      body: [
        "Most stalls come down to the reasons above, but some medical conditions and medicines can make weight harder to lose or cause weight gain. These are worth discussing with a GP or doctor rather than guessing at.",
        "Do not stop or change any prescribed medicine on your own. If you think a medicine is affecting your weight, ask the doctor who prescribed it about options."
      ],
      bullets: [
        "Underactive thyroid (hypothyroidism): the NHS lists tiredness, weight gain, feeling cold and constipation among the symptoms. A simple blood test can check it",
        "Polycystic ovary syndrome (PCOS): weight gain and difficulty losing weight are common symptoms",
        "Some medicines, including steroid tablets, some antidepressants and antipsychotics, and insulin and some other diabetes medicines, can lead to weight gain",
        "Rarer hormone conditions, such as Cushing's syndrome, which a doctor can rule in or out"
      ],
      callout: {
        tone: 'trust',
        title: 'When not to diet without advice',
        body: "This article is general information, not medical advice. If you are pregnant or breastfeeding, under 18, have diabetes or another long-term condition, or have a history of an eating disorder, talk to a doctor or registered dietitian before cutting calories."
      }
    },
    {
      id: 'two-week-checklist',
      heading: 'The 2-week checklist',
      body: [
        "Run this for 14 days without changing your target, then look at the results. Most people find the answer in the logs."
      ],
      bullets: [
        "Weigh yourself at least 4 mornings a week under the same conditions and write down the weekly average",
        "Weigh solid food with a kitchen scale instead of estimating, at least for meals you eat often",
        "Log every cooking oil, spread, sauce, dressing and bite, including tastes while cooking",
        "Log every drink: coffee orders, juice, soft drinks and alcohol",
        "Log weekends with the same care as weekdays",
        "Stop eating back exercise calories for these two weeks",
        "Check your target against your current weight, not your starting weight",
        "Note your sleep each night and whether you overate the next day",
        "Measure your waist at the start and end",
        "If you are under target every day for a month with no change in average weight or waist, book a GP or doctor appointment"
      ],
      toolCta: { label: 'Add up a full day of meals', href: '/meal-calorie-calculator' }
    }
  ],
  faqs: [
    {
      question: 'Why am I gaining weight on a calorie deficit?',
      answer: "Short-term gains are almost always water, from salt, carbohydrate, a new exercise routine or the menstrual cycle. If your average weight has risen over several weeks, the most likely explanation is that intake is higher than logged, so run the two-week checklist."
    },
    {
      question: 'How long does a weight loss plateau last?',
      answer: "There is no fixed length. If you were losing steadily and then stopped for 3 to 4 weeks, recalculate your target for your current weight and tighten your logging. Plateaus that are just water often break within a week or two."
    },
    {
      question: 'Is starvation mode real?',
      answer: "Your body does use somewhat less energy as you get lighter and as you eat less, which slows loss. But it does not stop you losing weight altogether while you are in a real deficit. When people stall at very low reported intakes, untracked food is the usual reason."
    },
    {
      question: 'Should I eat back the calories I burn exercising?',
      answer: "Treat tracker estimates as rough. If you are not losing, stop eating them back for two weeks. If you are losing well and feel fine, eating back part of them is reasonable."
    },
    {
      question: 'Can a thyroid problem stop me losing weight?',
      answer: "An underactive thyroid can cause weight gain and make loss harder. It usually comes with other symptoms such as tiredness, feeling cold and constipation. A GP can check it with a blood test, and treatment helps."
    }
  ],
  relatedSlugs: ['how-to-track-calories-accurately', 'tdee-explained', 'what-is-a-calorie-deficit']
};
