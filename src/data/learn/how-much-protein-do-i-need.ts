import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'how-much-protein-do-i-need',
  slug: 'how-much-protein-do-i-need',
  title: 'How Much Protein Do I Need a Day?',
  description: 'The official protein recommendations in the US and UK, higher ranges for strength training and older adults, and how to turn grams per kilo or per pound into a daily target.',
  category: 'Macros',
  tags: ['protein', 'macros', 'strength training', 'healthy ageing'],
  readingTimeMinutes: 8,
  updatedAt: '2026-10-23',
  relatedTool: { label: 'Protein Calculator', href: '/protein-calculator' },
  heroSummary: "Most healthy adults need at least 0.8 g of protein per kilogram of body weight a day (about 0.36 g per pound), which is the US RDA; the UK reference figure is a little lower at 0.75 g/kg. People who lift weights, and adults over about 65, often do better with more, roughly 1.0 to 2.0 g/kg depending on the goal. This guide shows where those numbers come from, how to work out your own target in kilos, pounds or stone, and what a day of food that hits it actually looks like.",
  keyTakeaway: "Multiply your weight in kg by 0.8 (or your weight in lb by 0.36) for the basic minimum. A 150 lb (68 kg) adult needs about 54 g a day. If you strength train, aim for 1.2 to 2.0 g/kg; if you are over 65, 1.0 to 1.2 g/kg is a common recommendation.",
  seoTitle: 'How Much Protein Do I Need a Day? (Per kg and Per lb) | Food Nutrition Calculator',
  seoDescription: 'US RDA is 0.8 g protein per kg (0.36 g per lb); the UK uses 0.75 g/kg. Higher targets for lifting and over-65s, worked examples and a sample day.',
  sections: [
    {
      id: 'official-recommendations',
      heading: 'The official recommendations: US and UK',
      body: [
        'In the US, the National Academies (formerly the Institute of Medicine) set the Recommended Dietary Allowance (RDA) for protein at 0.8 g per kilogram of body weight per day for adults. Expressed as round numbers for a reference adult, that works out at 46 g a day for women and 56 g for men.',
        'In the UK, the Reference Nutrient Intake (RNI) for adults is 0.75 g per kilogram per day, which gives about 45 g for women and 55.5 g for men aged 19 to 50. The difference from the US figure is small and comes from slightly different assumptions, not a disagreement about how much protein people need.',
        'You will also see a single "50 g" figure on food packaging in both countries. On UK front-of-pack labels the reference intake (RI) for protein is 50 g, and the FDA Daily Value for protein on US Nutrition Facts labels is also 50 g. These are labelling benchmarks based on a 2,000 calorie diet, not personal targets. A tall man or someone who trains hard will need more.'
      ],
      bullets: [
        'US RDA (National Academies): 0.8 g/kg/day for adults',
        'UK RNI (Department of Health): 0.75 g/kg/day for adults',
        'UK front-of-pack reference intake: 50 g/day',
        'FDA Daily Value on US labels: 50 g/day',
        'Acceptable range as a share of calories (National Academies): 10% to 35% of energy'
      ]
    },
    {
      id: 'per-pound-conversion',
      heading: 'Converting grams per kilo to grams per pound',
      body: [
        'One kilogram is 2.2 lb, so to convert a grams-per-kilo figure to grams per pound, divide by 2.2. To go from your weight in pounds to kilos, divide by 2.2. If you think in stone, multiply by 14 to get pounds first (1 stone is 14 lb, or about 6.35 kg).',
        'Here are the common targets written both ways so you can use whichever unit you weigh yourself in.'
      ],
      bullets: [
        '0.75 g/kg = 0.34 g/lb (UK RNI)',
        '0.8 g/kg = 0.36 g/lb (US RDA)',
        '1.0 g/kg = 0.45 g/lb',
        '1.2 g/kg = 0.55 g/lb',
        '1.6 g/kg = 0.73 g/lb',
        '2.0 g/kg = 0.91 g/lb'
      ],
      callout: {
        tone: 'info',
        title: 'The "1 gram per pound" rule',
        body: 'Gym advice often says to eat 1 g of protein per pound of body weight. That is 2.2 g/kg, slightly above the top of the ranges in sports nutrition position statements. It will not harm a healthy person, but it is more than most people need, and it can crowd out carbohydrate and fibre.'
      }
    },
    {
      id: 'strength-training',
      heading: 'If you lift weights or train hard',
      body: [
        'Regular resistance training increases the amount of protein your muscles can use for repair and growth. A joint position statement from the American College of Sports Medicine, the Academy of Nutrition and Dietetics and Dietitians of Canada recommends 1.2 to 2.0 g/kg a day for athletes. The International Society of Sports Nutrition recommends 1.4 to 2.0 g/kg for most exercising people who want to build and maintain muscle.',
        'The ISSN also suggests spreading intake across the day, with about 0.25 g/kg per meal, which is roughly 20 to 40 g for most adults, rather than eating most of it at dinner. This is the easiest habit to change: many people eat very little protein at breakfast and make up for it in the evening.'
      ]
    },
    {
      id: 'older-adults',
      heading: 'Older adults',
      body: [
        'Adults lose muscle mass gradually from middle age, and the loss speeds up later in life. The RDA of 0.8 g/kg applies to all adults regardless of age, but several expert groups argue that older people benefit from more. The PROT-AGE study group (2013) and the European Society for Clinical Nutrition and Metabolism (ESPEN) both recommend 1.0 to 1.2 g/kg a day for healthy adults over 65, with more for people who are ill or recovering.',
        'Appetite often drops with age, so in practice the challenge is fitting the protein in. Small, protein-rich additions help: a glass of milk with a meal, an egg at breakfast, Greek yogurt as a snack, or beans added to soup.'
      ],
      callout: {
        tone: 'warning',
        title: 'When to check with a doctor first',
        body: 'If you have chronic kidney disease, your doctor or renal dietitian may advise you to limit protein rather than increase it. The same goes for some liver conditions. Pregnancy and breastfeeding raise protein needs (the US RDA in pregnancy is 1.1 g/kg), so follow your midwife or GP. This article is general information, not personal medical advice.'
      }
    },
    {
      id: 'worked-examples',
      heading: 'Worked examples',
      body: [
        'Pick the figure that matches your situation and multiply it by your body weight. Using a weight close to your healthy weight gives a more sensible number if you are carrying a lot of extra body fat, since fat tissue needs very little protein.'
      ],
      bullets: [
        'Sedentary adult, 150 lb (68 kg, about 10 st 10 lb): 68 x 0.8 = 54 g a day (US RDA), or 68 x 0.75 = 51 g (UK RNI)',
        'Woman, 10 st 7 lb (147 lb, 66.7 kg): 66.7 x 0.75 = 50 g a day, the same as the UK label reference intake',
        'Man who lifts weights, 185 lb (84 kg): 84 x 1.6 = 134 g a day, within a range of 101 g (1.2 g/kg) to 168 g (2.0 g/kg)',
        'Adult aged 70, 160 lb (72.6 kg): 72.6 x 1.0 to 1.2 = 73 to 87 g a day',
        'Same 150 lb adult training for muscle gain: 68 x 1.6 = 109 g a day, or about 27 g at each of four meals and snacks'
      ],
      toolCta: { label: 'Check the protein in your meals', href: '/meal-calorie-calculator' }
    },
    {
      id: 'sample-day',
      heading: 'A sample day that hits about 110 g',
      body: [
        'This is a realistic day for the 150 lb person training at 1.6 g/kg. All figures are calculated from the USDA data used on this site. It comes to about 111 g of protein and roughly 1,410 calories before cooking oil, spreads, drinks and any extra snacks, so there is plenty of room to build a full day around it.'
      ],
      bullets: [
        'Breakfast: plain nonfat Greek yogurt, 1 container (150 g): 15.5 g protein, 89 calories',
        'Breakfast: raspberries, 1 cup (150 g): 1.5 g protein, 86 calories',
        'Breakfast: almonds, 1 oz (28 g): 5.9 g protein, 162 calories',
        'Lunch: 2 hard-boiled eggs (100 g): 12.6 g protein, 155 calories',
        'Lunch: 2 slices whole wheat bread (72 g): 8.9 g protein, 183 calories',
        'Lunch: skim milk, 1 cup (244 g): 8.2 g protein, 83 calories',
        'Dinner: roasted chicken breast, 4 oz (113 g): 35.0 g protein, 186 calories',
        'Dinner: cooked lentils, 1 cup (198 g): 17.9 g protein, 230 calories',
        'Dinner: cooked brown rice, 1 cup (195 g): 5.3 g protein, 240 calories',
        'Total: about 111 g protein and 1,410 calories'
      ],
      callout: {
        tone: 'trust',
        title: 'An easy swap',
        body: 'Replace the two eggs at lunch with a can of tuna in water (172 g) and the day jumps by about 28 g of protein: the tuna has about 40.6 g protein and 220 calories per can, according to USDA data.'
      },
      toolCta: { label: 'See roasted chicken breast nutrition', href: '/compare-foods?a=baked-chicken-breast' }
    },
    {
      id: 'protein-sources',
      heading: 'Where the protein comes from',
      body: [
        'Animal foods (meat, fish, eggs and dairy) contain all the essential amino acids in useful proportions. Plant foods vary more, but eating a mix of beans, lentils, soy, grains, nuts and seeds over the day covers your needs. Vegans and vegetarians can hit the same targets; it usually takes a bit more planning and a little more total food, because beans and grains bring carbohydrate along with their protein.',
        'Per 100 g in USDA data, roasted chicken breast has about 31 g protein, canned tuna in water about 24 g, firm tofu about 17 g, cottage cheese about 11 g, plain nonfat Greek yogurt about 10 g and cooked lentils about 9 g. Both the NHS Eatwell Guide and the US Dietary Guidelines encourage choosing beans, pulses, fish and lean meat, and eating less processed and red meat.'
      ],
      toolCta: { label: 'Compare protein foods side by side', href: '/compare-foods' }
    },
    {
      id: 'common-mistakes',
      heading: 'Common mistakes',
      body: ['A few patterns trip people up when they first start paying attention to protein.'],
      bullets: [
        'Counting the whole food weight as protein. A 4 oz chicken breast is 113 g of food but about 35 g of protein.',
        'Using raw and cooked figures interchangeably. Raw chicken breast has about 22.5 g protein per 100 g; roasted has about 31 g because water is lost in cooking.',
        'Assuming more is always better. Sports nutrition position statements put the useful range at up to about 2 g/kg, and protein calories still count toward your total.',
        'Leaning on protein bars and shakes. They are convenient, but whole foods bring fibre, vitamins and minerals too.',
        'Ignoring breakfast. Toast with jam or a small bowl of cereal often provides well under 20 g of protein, which leaves a lot to make up later.'
      ]
    }
  ],
  faqs: [
    {
      question: 'How much protein do I need to build muscle?',
      answer: 'Sports nutrition bodies recommend 1.2 to 2.0 g per kg of body weight a day (about 0.55 to 0.9 g per pound), alongside regular resistance training. For a 180 lb (82 kg) person, 1.6 g/kg is about 131 g a day.'
    },
    {
      question: 'Is 0.8 g per kg enough protein?',
      answer: 'For most healthy, sedentary adults, yes. The US RDA is designed to meet the needs of nearly all healthy people. It may be on the low side if you train hard, are dieting to lose fat or are over 65.'
    },
    {
      question: 'Can you eat too much protein?',
      answer: 'The National Academies did not set an upper limit for protein, and high intakes appear safe for healthy people. People with kidney disease should follow their doctor or dietitian, who may recommend less.'
    },
    {
      question: 'How much protein should I eat per meal?',
      answer: 'The International Society of Sports Nutrition suggests about 0.25 g per kg per meal, which is roughly 20 to 40 g for most adults, spread over three or four meals.'
    }
  ],
  relatedSlugs: ['high-protein-foods-list', 'how-to-count-macros-for-beginners', 'calories-vs-macros']
};
