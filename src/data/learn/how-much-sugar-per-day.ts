import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'how-much-sugar-per-day',
  slug: 'how-much-sugar-per-day',
  title: 'How Much Sugar Per Day Is Too Much?',
  description: 'The daily sugar limits from the US Dietary Guidelines, the FDA and the NHS, what counts as added or free sugar, and how to turn grams into teaspoons.',
  category: 'Food Labels',
  tags: ['sugar', 'added sugar', 'free sugars', 'food labels', 'nhs'],
  readingTimeMinutes: 7,
  updatedAt: '2026-10-23',
  relatedTool: { label: 'Food Nutrition Calculator', href: '/calculator' },
  heroSummary: "In the US, the Dietary Guidelines for Americans advise keeping added sugars under 10% of calories, which is 50 g a day on a 2,000 kcal diet and matches the FDA Daily Value. In the UK, the NHS says adults should have no more than 30 g of free sugars a day, about 7 teaspoons. Neither limit applies to the sugar naturally found in whole fruit, vegetables or plain milk, so the number on the label is not always the number that counts.",
  keyTakeaway: "US: under 50 g of added sugars a day at 2,000 kcal. UK: no more than 30 g of free sugars for adults and children aged 11 and over. One teaspoon of sugar is about 4 g, so a single 12 oz can of regular cola, at about 37 g, already passes the UK limit.",
  seoTitle: 'How Much Sugar Per Day? US and UK Limits in Grams and Teaspoons | Food Nutrition Calculator',
  seoDescription: 'Daily sugar limits: under 50 g added sugar (US, 2,000 kcal) or 30 g free sugars (NHS, adults). What counts, hidden sources and grams to teaspoons.',
  sections: [
    {
      id: 'the-limits',
      heading: 'The official limits',
      body: [
        "Health bodies agree that sugar added to food is the part to limit, but they draw the line in slightly different places and use slightly different definitions.",
        "Sugar provides about 4 calories per gram, so 10% of a 2,000 kcal day is 200 kcal, or 50 g."
      ],
      bullets: [
        'US Dietary Guidelines for Americans 2020-2025: added sugars under 10% of calories per day from age 2, and avoid added sugars entirely for children under 2',
        'FDA Daily Value for added sugars: 50 g, based on a 2,000 kcal diet',
        'NHS (UK): no more than 30 g of free sugars a day for adults and children 11 and over',
        'SACN (UK scientific advisers): free sugars should make up no more than 5% of daily energy from age 2, which is where the NHS figures come from',
        'WHO: free sugars under 10% of energy, with a further reduction to under 5% suggested for extra benefit',
        'American Heart Association: no more than about 25 g (6 teaspoons) a day for women and 36 g (9 teaspoons) for men'
      ],
      callout: {
        tone: 'info',
        title: 'Limits, not targets',
        body: "None of these numbers is an amount you need to eat. Your body does not need any added sugar, so coming in under the limit is fine."
      }
    },
    {
      id: 'added-free-total',
      heading: 'Added, free and total sugars: what counts',
      body: [
        "Total sugars is every sugar in the food, including lactose in milk and the fructose and glucose in whole fruit. This is the figure on UK labels (\"of which sugars\") and the \"Total Sugars\" line on US labels. It is not what the limits are based on.",
        "Added sugars (the US term) are sugars and syrups put into food during processing or preparation, plus honey and syrups sold as sugars. The FDA does not count the sugar in 100% fruit juice as added.",
        "Free sugars (the UK and WHO term) are all added sugars plus the sugars naturally present in honey, syrups, fruit juice and smoothies. The key difference is juice: a glass of orange juice counts toward the NHS 30 g limit but not toward the US added-sugar limit.",
        "Sugars inside whole fruit and vegetables, and lactose in plain milk and plain yogurt, do not count toward either limit."
      ],
      bullets: [
        'Plain yogurt, per 100 g (USDA data): about 4.7 g total sugars, essentially all lactose, so close to zero added sugar',
        'Low-fat fruit yogurt, per 100 g: about 12.8 g total sugars, about 8 g more than plain, from added sugar and the fruit',
        'Whole apple: its sugars do not count. The same apple pressed into juice: they count as free sugars in the UK',
        'Honey, 1 tablespoon (20 g): about 16 g of sugars, all counted as added (US) and free (UK)'
      ],
      toolCta: { label: 'See honey nutrition', href: '/foods/honey' }
    },
    {
      id: 'children',
      heading: 'Limits for children',
      body: [
        "The NHS sets lower free-sugar limits for younger children, based on their smaller energy needs.",
        "In the US, the Dietary Guidelines advise no added sugars at all before age 2, and the under-10% guideline from age 2 onward. The American Heart Association suggests less than 25 g a day for children aged 2 to 18."
      ],
      bullets: [
        'Children 4 to 6 years: no more than 19 g of free sugars a day (about 5 teaspoons)',
        'Children 7 to 10 years: no more than 24 g a day (about 6 teaspoons)',
        'Children 11 and over: no more than 30 g a day, the same as adults',
        'Under 4s: the NHS sets no gram figure but advises avoiding sugar-sweetened drinks and food with sugar added'
      ]
    },
    {
      id: 'teaspoons',
      heading: 'Grams to teaspoons',
      body: [
        "A level teaspoon of granulated sugar weighs about 4 g (USDA lists it at 4.2 g). To turn any label figure into teaspoons, divide the grams by 4. It is a quick way to make a number feel real.",
        "Using the site's USDA data, here is what common foods and drinks work out to."
      ],
      bullets: [
        'NHS adult limit, 30 g: about 7.5 teaspoons',
        'FDA Daily Value, 50 g: about 12.5 teaspoons',
        'Regular cola, 12 oz can (372 g): about 37 g sugar, or 9 teaspoons',
        'Regular cola, medium fountain drink (512 g): about 51 g, or 13 teaspoons',
        'Sweet iced tea, medium (512 g): about 39 g, or 10 teaspoons',
        'Frosted corn flakes, 1 cup (40 g): about 13 g, or 3 teaspoons',
        'Granola bar, 1 bar (43 g): about 12 g, or 3 teaspoons',
        'Ketchup, 1 tablespoon (17 g): about 3.7 g, or almost 1 teaspoon',
        'Barbecue sauce, 1 tablespoon (17 g): about 5.6 g, or 1.5 teaspoons'
      ],
      toolCta: { label: 'Check sugar in any food', href: '/food-calorie-counter' }
    },
    {
      id: 'reading-labels',
      heading: 'Finding sugar on US and UK labels',
      body: [
        "US labels make this easier. Under Total Sugars there is an \"Includes Xg Added Sugars\" line with a % Daily Value. Using the FDA rule of thumb, 5% DV or less per serving is low and 20% DV or more (10 g of added sugars) is high.",
        "UK labels only give total sugars, so you need two extra checks. First, the traffic light: for foods, green is 5 g of sugars or less per 100 g and red is more than 22.5 g per 100 g. Second, the ingredients list, which is in order of weight. If a form of sugar is near the top, much of the total is added.",
        "Sugar appears under many names on both sides of the Atlantic."
      ],
      bullets: [
        'Sucrose, glucose, fructose, dextrose, maltose',
        'Corn syrup and high-fructose corn syrup (US); glucose-fructose syrup and glucose syrup (UK)',
        'Invert sugar, molasses, treacle, golden syrup',
        'Honey, maple syrup, agave syrup, rice syrup',
        'Fruit juice concentrate'
      ]
    },
    {
      id: 'hidden-sources',
      heading: 'Where the sugar actually comes from',
      body: [
        "Sweet drinks are the largest single lever for most people because they deliver a full day's limit with no food at all. The UK has taxed sugary soft drinks since 2018, with a lower rate above 5 g of sugar per 100 ml and a higher rate above 8 g, and many UK drinks were reformulated as a result. US sodas are often still full-sugar.",
        "After drinks, the usual sources are breakfast cereals, flavoured yogurts, cereal and granola bars, baked goods, sauces and condiments, and fruit juice. Savoury foods count too: ketchup, barbecue sauce, teriyaki and sweet chilli sauces and many ready-made pasta sauces contain added sugar."
      ],
      toolCta: { label: 'Compare two drinks side by side', href: '/compare-foods' }
    },
    {
      id: 'a-day-of-sugar',
      heading: 'Adding up a typical day',
      body: [
        "Here is a normal-looking day built from USDA data: a 40 g bowl of frosted corn flakes (13 g sugar), a granola bar mid-morning (12 g), a 12 oz can of cola at lunch (37 g) and a tablespoon of ketchup at dinner (3.7 g). That totals about 66 g, most of it added sugar.",
        "That is more than double the NHS limit and above the FDA's 50 g Daily Value, without a single dessert. Now swap three things: plain corn flakes (30 g, about 2.8 g sugar), an apple instead of the bar (its sugar does not count), and diet cola or sparkling water (0 g). The day drops to about 6.5 g of added or free sugar, keeping the ketchup."
      ],
      toolCta: { label: 'Add up your own day', href: '/meal-calorie-calculator' }
    },
    {
      id: 'cutting-down',
      heading: 'Cutting down without giving up everything',
      body: ['Small, repeatable swaps work better than banning foods.'],
      bullets: [
        'Switch sugary drinks to water, sparkling water, unsweetened tea or coffee, or diet versions',
        'Keep fruit juice and smoothies to one small glass. The NHS suggests no more than 150 ml a day in total',
        'Choose plain yogurt and add fruit yourself',
        'Pick cereals that are green or amber for sugars on UK labels, or low in added sugars on US labels',
        'Halve the sugar in tea or coffee for a couple of weeks, then halve it again',
        'Treat sauces as a measured tablespoon rather than a free pour'
      ],
      callout: {
        tone: 'trust',
        title: 'Health conditions',
        body: "If you have diabetes, prediabetes or take medicine that affects blood sugar, your total carbohydrate matters as well as added sugar. Follow the plan from your doctor, GP or registered dietitian rather than general limits."
      }
    }
  ],
  faqs: [
    {
      question: 'Is 50 g of sugar a day too much?',
      answer: "For added sugars, 50 g is the FDA Daily Value and the US guideline limit at 2,000 kcal, so it is the upper end in the US. The NHS limit for free sugars is lower, at 30 g for adults. Sugar in whole fruit and plain milk does not count toward either."
    },
    {
      question: 'Does sugar in fruit count?',
      answer: "Not when you eat the whole fruit. Under NHS guidance, sugar in fruit juice and smoothies does count as free sugar, and the NHS suggests keeping juice and smoothies to 150 ml a day combined."
    },
    {
      question: 'How many teaspoons is 30 g of sugar?',
      answer: "About 7 teaspoons, using roughly 4 g per level teaspoon of granulated sugar."
    },
    {
      question: 'Is honey better than sugar?',
      answer: "For these limits, no. Honey counts as added sugar in the US and free sugar in the UK. A tablespoon of honey has about 16 g of sugars."
    },
    {
      question: 'Why does a UK label not show added sugar?',
      answer: "UK and EU rules require total sugars only. To estimate added sugar, check the traffic-light colour and look for sugars near the start of the ingredients list."
    }
  ],
  relatedSlugs: ['uk-vs-us-food-labels', 'how-to-read-a-nutrition-facts-label', 'how-much-salt-per-day'],
};
