import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'how-much-salt-per-day',
  slug: 'how-much-salt-per-day',
  title: 'How Much Salt Per Day? Sodium Limits Explained',
  description: 'Daily salt and sodium limits in the US and UK, how to convert between them, where most of the salt in your diet comes from and how to cut down.',
  category: 'Food Labels',
  tags: ['salt', 'sodium', 'food labels', 'blood pressure', 'nhs'],
  readingTimeMinutes: 7,
  updatedAt: '2026-10-23',
  relatedTool: { label: 'Food Nutrition Calculator', href: '/calculator' },
  heroSummary: "US guidance says adults should have less than 2,300 mg of sodium a day, and the NHS says adults should have no more than 6 g of salt a day. Those are almost the same limit in different units: 2,300 mg of sodium is about 5.75 g of salt, and 6 g of salt contains about 2,400 mg of sodium. Most people go over without ever touching a salt shaker, because most salt is already in bread, processed meat, cheese, sauces and takeaway food.",
  keyTakeaway: "Adults: under 2,300 mg sodium (US) or no more than 6 g salt (UK), roughly a level teaspoon of salt. Salt = sodium x 2.5. On UK labels, more than 1.5 g of salt per 100 g is high and 0.3 g or less is low.",
  seoTitle: 'How Much Salt Per Day? US Sodium and UK Salt Limits | Food Nutrition Calculator',
  seoDescription: 'Adults should have under 2,300 mg sodium (US) or 6 g salt (NHS) a day. Convert salt and sodium, see where salt hides, and read UK and US labels.',
  sections: [
    {
      id: 'the-limits',
      heading: 'The daily limits',
      body: [
        "Sodium is the part of salt that affects blood pressure. US guidance and labels talk about sodium in milligrams; UK guidance and labels talk about salt in grams. The limits line up closely once you convert them.",
        "Too much salt raises blood pressure, and high blood pressure increases the risk of heart disease and stroke. That is the reason every major health body sets a ceiling."
      ],
      bullets: [
        'Dietary Guidelines for Americans 2020-2025: less than 2,300 mg of sodium a day for ages 14 and over',
        'FDA Daily Value for sodium: 2,300 mg, used for the % DV on Nutrition Facts labels',
        'NHS (UK): no more than 6 g of salt a day for adults, about a level teaspoon',
        'American Heart Association: no more than 2,300 mg, with an ideal limit of 1,500 mg for most adults',
        'WHO: less than 5 g of salt a day, which is under 2,000 mg of sodium'
      ],
      callout: {
        tone: 'info',
        title: 'Most people are over',
        body: "The Dietary Guidelines report that average sodium intake in the US is around 3,400 mg a day, well above the 2,300 mg limit."
      }
    },
    {
      id: 'conversion',
      heading: 'Converting salt and sodium',
      body: [
        "Salt (sodium chloride) is about 40% sodium by weight. UK and EU labelling rules use a simple factor: salt = sodium x 2.5, and sodium = salt / 2.5. Watch the units, because sodium is usually given in milligrams and salt in grams.",
        "A few conversions worth knowing:"
      ],
      bullets: [
        '100 mg sodium = 0.25 g salt',
        '600 mg sodium = 1.5 g salt',
        '1,000 mg sodium = 2.5 g salt',
        '2,300 mg sodium = 5.75 g salt',
        '6 g salt = 2,400 mg sodium',
        '1 g salt = 400 mg sodium'
      ],
      toolCta: { label: 'Look up sodium in any food', href: '/calculator' }
    },
    {
      id: 'children',
      heading: 'Limits for children',
      body: [
        "Children need less. Both countries set lower limits by age, and the UK figures are in salt while the US figures are in sodium."
      ],
      bullets: [
        'NHS, babies under 1: less than 1 g of salt a day. Do not add salt to baby food',
        'NHS, 1 to 3 years: 2 g salt (800 mg sodium)',
        'NHS, 4 to 6 years: 3 g salt (1,200 mg sodium)',
        'NHS, 7 to 10 years: 5 g salt (2,000 mg sodium)',
        'NHS, 11 and over: 6 g salt, the same as adults',
        'US Dietary Guidelines: under 1,200 mg sodium at 1 to 3 years, 1,500 mg at 4 to 8, 1,800 mg at 9 to 13, and 2,300 mg from 14'
      ]
    },
    {
      id: 'where-salt-hides',
      heading: 'Where the salt actually comes from',
      body: [
        "The NHS says about three-quarters of the salt we eat is already in everyday foods such as bread, breakfast cereals and ready meals. The CDC says more than 70% of the sodium Americans eat comes from packaged and restaurant foods. The salt shaker is a small part of the picture.",
        "Bread is a good example. It is not very salty per slice, but people eat a lot of it. These figures come from the site's USDA data."
      ],
      bullets: [
        'White bread, 1 slice (28 g): about 126 mg sodium (0.32 g salt)',
        'Ham, 1 slice (28 g): about 228 mg sodium (0.57 g salt)',
        'Bacon, 1 medium slice (8 g): about 134 mg sodium (0.34 g salt)',
        'Cheese, 1 oz (28 g): about 183 mg sodium (0.46 g salt)',
        'Cheese pizza, 1 slice (86 g): about 464 mg sodium (1.16 g salt)',
        'Chicken noodle soup, 1 cup (245 g): about 608 mg sodium (1.52 g salt)',
        'Soy sauce, 1 tablespoon (16 g): about 878 mg sodium (2.2 g salt)',
        'Pretzels, 1 single-serve bag (57 g): about 638 mg sodium (1.6 g salt)',
        'Potato chips (crisps), 1 single-serve bag (57 g): about 150 mg sodium (0.38 g salt)'
      ],
      callout: {
        tone: 'warning',
        title: 'Taste is a poor guide',
        body: "Pretzels taste salty and have about four times the sodium of the same weight of potato chips in USDA data, but bread and breakfast cereal do not taste salty at all and still add up. Corn flakes have about 211 mg of sodium in a 30 g bowl."
      },
      toolCta: { label: 'See white bread nutrition', href: '/foods/white-bread' }
    },
    {
      id: 'a-day-of-salt',
      heading: 'Adding up a typical day',
      body: [
        "Here is an ordinary day built from USDA data: a 30 g bowl of corn flakes (211 mg), a ham and cheese sandwich for lunch (205 g, 1,468 mg), two slices of cheese pizza for dinner (928 mg) and a bag of pretzels as a snack (638 mg).",
        "That comes to 3,245 mg of sodium, or about 8.1 g of salt, without adding any salt at the table. It is about 141% of the US limit and 135% of the UK limit. The sandwich alone provides nearly two-thirds of a day's allowance.",
        "Swapping the pretzels for a piece of fruit and the pizza for a home-cooked meal seasoned with herbs and a little salt could bring the day under 2,300 mg."
      ],
      toolCta: { label: 'Add up sodium in your meals', href: '/meal-calorie-calculator' }
    },
    {
      id: 'reading-labels',
      heading: 'Reading salt on UK and US labels',
      body: [
        "On UK labels, salt is listed per 100 g, and the front-of-pack traffic light uses these cut-offs for foods: green (low) is 0.3 g of salt or less per 100 g, amber is more than 0.3 g up to 1.5 g, and red (high) is more than 1.5 g. In sodium terms, that is 120 mg or less for low and more than 600 mg for high.",
        "On US labels, sodium is given in milligrams per serving with a % DV. The FDA rule of thumb is that 5% DV (115 mg) or less per serving is low and 20% DV (460 mg) or more is high.",
        "To judge a US product by UK colours, convert to per 100 g: divide the sodium by the serving weight in grams, multiply by 100, then multiply by 2.5 and divide by 1,000 to get grams of salt. White bread at 450 mg sodium per 100 g is 1.13 g salt per 100 g, so amber. Ham at 814 mg is 2.0 g, so red."
      ]
    },
    {
      id: 'cutting-down',
      heading: 'Cutting down in practice',
      body: [
        "Because most salt arrives already in food, the biggest wins come from choosing products and meals, not from the shaker. Many people find that food tastes less bland after a few weeks of eating less salt."
      ],
      bullets: [
        'Compare labels for bread, cereal, soup and sauces. Sodium varies a lot between brands of the same food',
        'Limit processed meats such as bacon, ham, salami and sausages',
        'Use strong cheeses in smaller amounts',
        'Choose beans and vegetables canned without added salt, or cook dried beans. USDA data puts canned black beans at about 660 mg sodium per drained cup against about 2 mg for beans cooked from dry without salt',
        'Season with lemon, garlic, herbs, spices and black pepper before reaching for salt',
        'Go easy on soy sauce, stock cubes, gravy granules and ready-made sauces',
        'At restaurants and takeaways, ask for sauces on the side'
      ],
      toolCta: { label: 'Compare two foods for sodium', href: '/compare-foods' }
    },
    {
      id: 'who-this-is-not-for',
      heading: 'When the general limit may not fit you',
      body: [
        "These limits are for the general population. If you have high blood pressure, heart failure or kidney disease, your doctor or GP may give you a lower target. Some people are told to be careful with salt for other reasons, such as certain medicines.",
        "A few people may need more, for example after heavy sweating during long endurance exercise, or with some medical conditions. Salt substitutes that replace sodium with potassium are not suitable for everyone, especially people with kidney problems or on some blood pressure medicines. Ask a doctor or pharmacist before using them."
      ]
    }
  ],
  faqs: [
    {
      question: 'Is 2,300 mg of sodium the same as 6 g of salt?',
      answer: "Close. 2,300 mg of sodium is about 5.75 g of salt, and 6 g of salt contains about 2,400 mg of sodium. For everyday purposes they are the same limit."
    },
    {
      question: 'How many teaspoons of salt is 6 g?',
      answer: "About one level teaspoon. That is the whole day's limit for an adult, including the salt already in food."
    },
    {
      question: 'Is sea salt or pink salt healthier than table salt?',
      answer: "Not in any way that matters for these limits. They are all mostly sodium chloride, so gram for gram they count the same."
    },
    {
      question: 'What counts as a high-salt food in the UK?',
      answer: "More than 1.5 g of salt (600 mg sodium) per 100 g is high and gets a red traffic light. 0.3 g of salt or less per 100 g is low."
    },
    {
      question: 'Why does a US label say sodium instead of salt?',
      answer: "US rules require sodium in milligrams. To convert to salt, multiply by 2.5. A 600 mg serving is 1.5 g of salt."
    }
  ],
  relatedSlugs: ['uk-vs-us-food-labels', 'how-much-sugar-per-day', 'how-to-read-a-nutrition-facts-label'],
};
