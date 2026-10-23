import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'uk-vs-us-food-labels',
  slug: 'uk-vs-us-food-labels',
  title: 'UK vs US Food Labels: How to Read Both',
  description: 'How the US Nutrition Facts panel differs from UK traffic-light and back-of-pack labels, with Daily Values vs reference intakes, kcal vs kJ, and salt vs sodium.',
  category: 'Food Labels',
  tags: ['food labels', 'nutrition facts', 'traffic light labels', 'uk', 'us'],
  readingTimeMinutes: 8,
  updatedAt: '2026-10-23',
  relatedTool: { label: 'Compare Foods', href: '/compare-foods' },
  heroSummary: "US labels show nutrition per serving with a % Daily Value, while UK labels must show nutrition per 100 g and often add a colour-coded traffic light on the front. The US lists sodium in milligrams; the UK lists salt in grams, and salt is roughly sodium multiplied by 2.5. Once you know those three differences, you can read either label in under a minute and compare products from both countries fairly.",
  keyTakeaway: "Compare products per 100 g, not per serving. Convert sodium to salt by multiplying by 2.5, and kcal to kJ by multiplying by 4.184. US Daily Values and UK reference intakes are both based on 2,000 kcal a day but use slightly different nutrient targets.",
  seoTitle: 'UK vs US Food Labels: Traffic Lights vs Nutrition Facts | Food Nutrition Calculator',
  seoDescription: 'How to read US Nutrition Facts and UK traffic-light labels: per serving vs per 100 g, Daily Values vs reference intakes, kcal vs kJ, salt vs sodium.',
  sections: [
    {
      id: 'at-a-glance',
      heading: 'The two systems at a glance',
      body: [
        "Both countries require a nutrition table on most packaged food, but they were designed around different questions. The US Nutrition Facts panel answers \"how much am I getting in the amount I will probably eat?\" The UK back-of-pack table answers \"how rich in this nutrient is the food itself?\", and the front-of-pack traffic light turns that answer into a colour."
      ],
      bullets: [
        'Basis: US labels are per serving (with servings per container). UK labels must be per 100 g or 100 ml, and may also show per portion.',
        'Targets: US labels use Daily Values (DV) set by the FDA. UK labels use reference intakes (RI) for an average adult.',
        'Energy: US labels show calories only. UK labels show both kilojoules (kJ) and kilocalories (kcal).',
        'Sodium vs salt: US labels show sodium in mg. UK labels show salt in g.',
        'Sugars: US labels show total sugars and added sugars. UK labels show total sugars only, listed as "of which sugars" under carbohydrate.',
        'Front of pack: the UK has a widely used voluntary traffic-light scheme. The US Nutrition Facts panel is usually on the side or back.'
      ]
    },
    {
      id: 'us-nutrition-facts',
      heading: 'How the US Nutrition Facts panel works',
      body: [
        "The panel starts with the serving size and the number of servings per container. Every number below it applies to one serving. Serving sizes are based on the amount people typically eat, so a pint of ice cream or a 20 oz bottle of soda may be labelled as one or two servings, and some packages show a second column for the whole container.",
        "The right-hand column shows % Daily Value. The FDA's rule of thumb is simple: 5% DV or less of a nutrient per serving is low, and 20% DV or more is high. Use it to spot foods high in saturated fat, sodium and added sugars, and high in fiber, calcium, iron, potassium and vitamin D.",
        "The FDA Daily Values used on the updated label, required since 2020 for larger manufacturers, include the following for adults and children 4 years and older."
      ],
      bullets: [
        'Total fat: 78 g',
        'Saturated fat: 20 g',
        'Sodium: 2,300 mg',
        'Total carbohydrate: 275 g',
        'Dietary fiber: 28 g',
        'Added sugars: 50 g',
        'Protein: 50 g',
        'Total sugars: no Daily Value, so no % is shown'
      ],
      toolCta: { label: 'Look up any food in the calculator', href: '/calculator' }
    },
    {
      id: 'uk-back-of-pack',
      heading: 'How UK back-of-pack labels work',
      body: [
        "UK food law, which kept the EU labelling rules after Brexit, requires a nutrition declaration on most prepacked food. It lists energy, fat, saturates, carbohydrate, sugars, protein and salt, always per 100 g or per 100 ml. Fibre is often listed but is optional.",
        "Many packs add a per-portion column and a % reference intake. Reference intakes are guide amounts for an average adult eating about 2,000 kcal a day, not personal targets."
      ],
      bullets: [
        'Energy: 8,400 kJ / 2,000 kcal',
        'Fat: 70 g',
        'Saturates: 20 g',
        'Carbohydrate: 260 g',
        'Sugars: 90 g (total sugars, not a recommended amount)',
        'Protein: 50 g',
        'Salt: 6 g'
      ],
      callout: {
        tone: 'info',
        title: 'The 90 g sugars figure is not a target',
        body: "The UK reference intake for total sugars is 90 g, but the NHS advises adults to have no more than 30 g of free sugars a day. The 90 g figure includes sugars naturally in milk, fruit and vegetables."
      }
    },
    {
      id: 'traffic-lights',
      heading: 'UK traffic-light labels, explained',
      body: [
        "The front-of-pack label shows energy plus four nutrients: fat, saturates, sugars and salt. Each gets a colour (green for low, amber for medium, red for high) and a % of the reference intake for one portion. The colour comes from the per-100 g figure, so two portion sizes of the same food get the same colour.",
        "For foods, the UK government guidance sets these cut-offs per 100 g."
      ],
      bullets: [
        'Fat: green 3 g or less, amber more than 3 g up to 17.5 g, red over 17.5 g',
        'Saturates: green 1.5 g or less, amber more than 1.5 g up to 5 g, red over 5 g',
        'Sugars: green 5 g or less, amber more than 5 g up to 22.5 g, red over 22.5 g',
        'Salt: green 0.3 g or less, amber more than 0.3 g up to 1.5 g, red over 1.5 g'
      ],
      callout: {
        tone: 'warning',
        title: 'Drinks and large portions follow different rules',
        body: "Drinks have their own, lower thresholds per 100 ml, and there is an extra per-portion rule for large portions, so a big ready meal can show red even when its per-100 g figure would be amber. The scheme is voluntary, so not every product carries it."
      }
    },
    {
      id: 'units',
      heading: 'Converting the units: kcal, kJ, salt and sodium',
      body: [
        "Energy: 1 kcal is 4.184 kJ. A UK label showing 1,569 kJ / 375 kcal per 100 g is telling you the same thing twice. In everyday speech, and on US labels, \"calories\" means kilocalories.",
        "Salt and sodium: salt is sodium chloride, and UK and EU labelling rules calculate salt as sodium multiplied by 2.5. To go the other way, divide salt by 2.5. Always check the unit too, because US sodium is in milligrams and UK salt is in grams."
      ],
      bullets: [
        '400 mg sodium x 2.5 = 1,000 mg = 1.0 g salt',
        '2,300 mg sodium (the FDA Daily Value) x 2.5 = 5.75 g salt',
        '6 g salt (the UK reference intake) / 2.5 = 2.4 g = 2,400 mg sodium',
        '1.5 g salt per 100 g (the UK red line) / 2.5 = 600 mg sodium per 100 g',
        '200 kcal x 4.184 = about 837 kJ'
      ]
    },
    {
      id: 'worked-example',
      heading: 'Worked example: one cereal, both labels',
      body: [
        "Take frosted corn flakes. USDA data gives these values per 100 g: 375 kcal, 1.27 g fat, 0.15 g saturated fat, 32.5 g sugars and 516 mg sodium. USDA lists a 1 cup serving as 40 g, while UK cereal packs commonly use a 30 g portion.",
        "Read the US way, one 40 g serving has about 150 calories, 0.5 g fat (1% DV), 13 g total sugars and 206 mg sodium (9% DV). On a real label these would be rounded, and the added sugars line would tell you how much of the 13 g was added during processing. USDA's general data does not separate that out.",
        "Read the UK way, start with the per-100 g colours: fat 1.27 g is green, saturates 0.15 g is green, sugars 32.5 g is red, and salt (516 mg x 2.5 = 1.29 g) is amber. Then the portion figures for 30 g: about 471 kJ / 113 kcal (6% RI), 9.8 g sugars (11% RI) and 0.39 g salt (6% RI).",
        "Same food, different first impression. The US panel shows a modest-looking 9% DV for sodium and no % for total sugars. The UK label puts a red light on sugars because a third of the cereal's weight is sugar."
      ],
      toolCta: { label: 'See frosted corn flakes nutrition', href: '/foods/frosted-corn-flakes' }
    },
    {
      id: 'per-serving-vs-per-100g',
      heading: 'Per serving vs per 100 g: which to use',
      body: [
        "Use per 100 g to compare two products. Serving sizes are chosen by the manufacturer within rules, and they vary: one cereal might list 30 g, another 40 g, another 45 g. A smaller serving makes every number look lower without the food being any different. Per 100 g removes that trick.",
        "Use per serving to track what you actually ate, but check it against your real portion. If you pour 60 g of cereal into the bowl, you need to double the 30 g figures.",
        "For a US product, you can work out per-100 g values yourself: divide each number by the serving weight in grams and multiply by 100. A 40 g serving with 13 g of sugars is 13 / 40 x 100 = 32.5 g per 100 g."
      ],
      toolCta: { label: 'Compare two foods per 100 g', href: '/compare-foods' }
    },
    {
      id: 'common-mistakes',
      heading: 'Common mistakes',
      body: ['These are the slips that most often lead to a wrong reading of either label.'],
      bullets: [
        'Reading the sodium number on a US label as salt. 500 mg sodium is 1.25 g salt, not 0.5 g.',
        'Comparing a US per-serving figure with a UK per-100 g figure. Convert one to match the other first.',
        'Treating a green light as "healthy" overall. A food can be green for sugar and red for fat and salt.',
        'Using kJ as if it were kcal. 500 kJ is about 120 kcal, not 500.',
        'Ignoring servings per container. A bag of snacks listed as 2.5 servings means the whole bag is 2.5 times every number.',
        'Assuming the UK 90 g sugars reference intake is a healthy limit. It is not; the NHS limit for free sugars is 30 g for adults.'
      ],
      toolCta: { label: 'Check a food in our database', href: '/foods' }
    }
  ],
  faqs: [
    {
      question: 'Why do UK labels show kJ as well as kcal?',
      answer: "UK and EU rules require energy in both kilojoules and kilocalories. The kilojoule is the metric unit of energy. 1 kcal equals 4.184 kJ, so a 2,000 kcal day is about 8,400 kJ."
    },
    {
      question: 'How do I convert sodium to salt?',
      answer: "Multiply sodium by 2.5. A US label showing 920 mg sodium per serving is about 2.3 g salt, which is close to 40% of the UK adult reference intake of 6 g."
    },
    {
      question: 'Are US Daily Values and UK reference intakes the same?',
      answer: "They are similar but not identical. Both assume 2,000 kcal a day and both use 20 g for saturated fat and 50 g for protein. They differ on fat (78 g in the US, 70 g in the UK), carbohydrate (275 g vs 260 g) and sugar, where the US sets 50 g for added sugars and the UK uses 90 g for total sugars."
    },
    {
      question: 'Do US foods have traffic-light labels?',
      answer: "The traffic-light scheme is a UK system. US packaged foods rely on the Nutrition Facts panel, so to get a traffic-light style reading, convert the US figures to per 100 g and check them against the UK cut-offs."
    },
    {
      question: 'What does "of which sugars" mean on a UK label?',
      answer: "It is the part of the total carbohydrate that is sugars. It includes both added sugars and sugars naturally present in milk and fruit, so it is closer to the US \"total sugars\" line than to \"added sugars\"."
    }
  ],
  relatedSlugs: ['how-to-read-a-nutrition-facts-label', 'serving-size-vs-portion-size', 'how-much-salt-per-day'],
};
