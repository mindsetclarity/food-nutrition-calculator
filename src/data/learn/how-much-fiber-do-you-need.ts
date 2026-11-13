import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'how-much-fiber-do-you-need',
  slug: 'how-much-fiber-do-you-need',
  title: 'How Much Fiber Do You Need a Day?',
  description: 'US and UK fiber (fibre) recommendations, the difference between soluble and insoluble fiber, the highest-fiber everyday foods with USDA numbers, and how to increase your intake without discomfort.',
  category: 'Macros',
  tags: ['fiber', 'fibre', 'carbs', 'gut health', 'whole grains'],
  readingTimeMinutes: 8,
  updatedAt: '2026-10-23',
  relatedTool: { label: 'Food Nutrition Calculator', href: '/calculator' },
  heroSummary: "In the US, adults are advised to eat 14 g of fiber for every 1,000 calories, which works out at about 25 g a day for women and 38 g for men under 51. In the UK, SACN and the NHS recommend 30 g a day for all adults. Most people in both countries eat well below that. This guide explains what the targets mean, the two main types of fiber, which foods carry the most per serving, and how to build up to the target without bloating.",
  keyTakeaway: "Aim for 25 to 38 g a day (US) or 30 g (UK). A cup of cooked lentils has about 16 g, a cup of raspberries about 10 g and a medium pear about 6 g. Add fiber gradually over a few weeks and drink plenty of fluids as you do.",
  seoTitle: 'How Much Fiber Do You Need a Day? (US and UK) | Food Nutrition Calculator',
  seoDescription: 'US: 14 g fiber per 1,000 kcal (about 25 g women, 38 g men). UK: 30 g a day. Soluble vs insoluble fiber, high-fiber foods with USDA numbers.',
  sections: [
    {
      id: 'us-recommendations',
      heading: 'US recommendations',
      body: [
        'The US guidance comes from the National Academies (formerly the Institute of Medicine), which set an Adequate Intake for fiber of 14 g per 1,000 calories. The Dietary Guidelines for Americans 2020-2025 use the same figure. Because it scales with calories, people who eat more need more fiber.',
        'Turned into daily amounts using typical calorie intakes, the National Academies figures are:'
      ],
      bullets: [
        'Women 19 to 50: 25 g a day',
        'Men 19 to 50: 38 g a day',
        'Women 51 and over: 21 g a day',
        'Men 51 and over: 30 g a day',
        'FDA Daily Value on Nutrition Facts labels: 28 g (based on a 2,000 calorie diet)'
      ],
      callout: {
        tone: 'info',
        title: 'Working it out from calories',
        body: 'If you know your calorie target, multiply by 14 and divide by 1,000. At 1,800 calories that is 25 g of fiber; at 2,500 calories it is 35 g.'
      }
    },
    {
      id: 'uk-recommendations',
      heading: 'UK recommendations',
      body: [
        'In 2015 the Scientific Advisory Committee on Nutrition (SACN) recommended that adults in the UK eat 30 g of fibre a day, and this is the figure the NHS uses. The NHS notes that most adults eat only about 20 g a day.',
        'The UK target rose from an older figure of 18 g partly because the way fibre is measured changed. The new method counts more types of fibre, so 30 g today is not directly comparable with the old 18 g. It also brings UK figures closer to how fiber is measured on US labels.',
        'SACN also set targets for children: 15 g a day for ages 2 to 5, 20 g for 5 to 11, 25 g for 11 to 16, and 30 g for 16 to 18.'
      ],
      bullets: [
        'UK adults (SACN, NHS): 30 g a day',
        'UK "source of fibre" claim on packs: at least 3 g per 100 g',
        'UK "high fibre" claim on packs: at least 6 g per 100 g',
        'US "good source of fiber" claim: 10% to 19% of the Daily Value per serving (2.8 to 5.3 g)',
        'US "high fiber" or "excellent source" claim: 20% of the Daily Value or more per serving (5.6 g or more)'
      ]
    },
    {
      id: 'soluble-insoluble',
      heading: 'Soluble and insoluble fiber',
      body: [
        'Fiber is the part of plant foods that your small intestine cannot digest. It is usually divided into two kinds by how it behaves in water, and most high-fiber foods contain both.',
        'Soluble fiber absorbs water and forms a gel. It slows digestion, which can blunt the rise in blood sugar after a meal, and some types help lower LDL cholesterol. Oats and barley are good sources of a soluble fiber called beta-glucan, and the FDA allows a heart health claim for foods that provide oat beta-glucan as part of a diet low in saturated fat and cholesterol. Beans, lentils, apples, citrus fruit and psyllium are also good sources.',
        'Insoluble fiber does not dissolve. It adds bulk to stool and helps food move through the gut, which is why it is linked to fewer problems with constipation. Wheat bran, whole wheat bread, brown rice, nuts, and the skins of vegetables and fruit are good sources.',
        'You do not need to track the two types separately. If you eat a mix of whole grains, beans and lentils, fruit, vegetables, nuts and seeds, you will get plenty of both.'
      ]
    },
    {
      id: 'high-fiber-foods',
      heading: 'High-fiber foods, per serving',
      body: [
        'These figures are calculated from the USDA data used on this site, for a typical serving of each food. Beans, lentils and berries stand out; a single serving of some of them gets you halfway to the daily target.'
      ],
      bullets: [
        'Navy beans, cooked, 1 cup (182 g): 19.1 g',
        'Split peas, cooked, 1 cup (196 g): 16.3 g',
        'Lentils, cooked, 1 cup (198 g): 15.6 g',
        'Black beans, cooked, 1 cup (172 g): 15.0 g',
        'Chickpeas, cooked, 1 cup (164 g): 12.5 g',
        'Raspberries, 1 cup (150 g): 9.8 g',
        'Blackberries, 1 cup (150 g): 8.0 g',
        'Green peas, 1 cup (165 g): 7.3 g',
        'Baked potato with skin, 1 medium (285 g): 6.3 g',
        'Bran flakes, 1 single serving (30 g): 6.2 g',
        'Pear, 1 medium (180 g): 5.6 g',
        'Chia seeds, 1 tbsp (about 15 g): about 5.2 g',
        'Avocado, half (75 g): 5.0 g',
        'Whole wheat pasta, cooked, 1 cup (107 g): 4.9 g',
        'Apple, 1 medium (182 g): 4.4 g',
        'Rolled oats, 1/2 cup dry (40.5 g): 4.1 g',
        'Almonds, 1 oz (28 g): 3.5 g',
        'Air-popped popcorn, 3 cups (24 g): 3.5 g',
        'Brown rice, cooked, 1 cup (195 g): 3.1 g',
        'Broccoli, chopped, 1 cup (91 g): 2.4 g'
      ],
      toolCta: { label: 'See cooked lentils nutrition', href: '/compare-foods?a=cooked-lentil' }
    },
    {
      id: 'swaps',
      heading: 'Easy swaps that add up',
      body: [
        'Most of the gap between 20 g and 30 g a day can be closed with swaps, without adding much food. Using USDA data:'
      ],
      bullets: [
        'White bread (0.6 g per 28 g slice) to whole wheat bread (2.2 g per 36 g slice): about 3 g more for two slices',
        'White rice (0.6 g per cooked cup) to brown rice (3.1 g per cooked cup): about 2.5 g more',
        'Crisps or chips as a snack to 3 cups of air-popped popcorn: 3.5 g',
        'Adding half a cup of cooked black beans to a soup, salad or chilli: 7.5 g',
        'Keeping the skin on potatoes and apples rather than peeling them'
      ],
      toolCta: { label: 'Compare white and whole wheat bread', href: '/compare-foods' }
    },
    {
      id: 'sample-day',
      heading: 'A sample 30 g day',
      body: [
        'Here is what a day reaching the UK target can look like, using everyday foods and USDA figures. It comes to about 31 g of fiber, before counting any vegetables in sauces or extra fruit.'
      ],
      bullets: [
        'Breakfast: rolled oats, 1/2 cup dry (40.5 g), with half a cup of raspberries (75 g): 4.1 g + 4.9 g = 9.0 g',
        'Lunch: sandwich on 2 slices of whole wheat bread (72 g), plus a medium apple: 4.3 g + 4.4 g = 8.7 g',
        'Dinner: half a cup of cooked black beans (86 g) with a cup of chopped broccoli: 7.5 g + 2.4 g = 9.9 g',
        'Snack: almonds, 1 oz (28 g): 3.5 g',
        'Total: about 31 g'
      ],
      callout: {
        tone: 'trust',
        title: 'Spread it out',
        body: 'Notice that no single meal carries more than about 10 g. Spreading fiber across the day is easier on your gut than one very large serving of beans at dinner.'
      }
    },
    {
      id: 'increase-slowly',
      heading: 'Increase slowly and drink enough',
      body: [
        'If you currently eat around 15 to 20 g a day, jumping straight to 30 g or more can cause wind, bloating and cramps, because the bacteria in your large intestine ferment fiber and need time to adjust. A practical approach is to add one higher-fiber food every few days and reach your target over two to three weeks.',
        'Drink fluids as you increase fiber. Fiber, especially insoluble fiber, works by holding water in the gut, and without enough fluid it can make constipation worse rather than better. The NHS Eatwell Guide recommends 6 to 8 cups or glasses of fluid a day; water, lower-fat milk and sugar-free drinks including tea and coffee all count.',
        'Cooked beans and lentils are often easier to tolerate if you start with small portions, such as a quarter or half a cup, and rinse canned beans before using them.'
      ],
      callout: {
        tone: 'warning',
        title: 'When to get advice',
        body: 'If you have irritable bowel syndrome (IBS), Crohn\'s disease, a history of bowel obstruction, or have been told to follow a low-fibre diet, follow your GP or dietitian\'s advice rather than general targets. Fiber supplements such as psyllium can affect how some medicines are absorbed, so ask a pharmacist about timing. See a doctor about any lasting change in bowel habits, blood in your stool, or unexplained weight loss.'
      }
    },
    {
      id: 'labels',
      heading: 'Reading fiber on labels',
      body: [
        'On US Nutrition Facts labels, dietary fiber is listed under total carbohydrate and is included in that total, so subtracting it gives what some people call "net carbs". On UK and EU labels, carbohydrate does not include fibre; fibre is listed on its own line. This means a UK carbohydrate figure and a US total carbohydrate figure for the same food will not match, even before differences in recipes.',
        'Supplements and fiber-fortified products can help, but whole foods also supply vitamins, minerals and other plant compounds, so the NHS and the US Dietary Guidelines both encourage getting fiber mainly from food.'
      ],
      toolCta: { label: 'Look up fiber in any food', href: '/foods' }
    }
  ],
  faqs: [
    {
      question: 'Is 30 g of fiber a day too much?',
      answer: 'No. It is the UK recommendation for all adults and close to the US figure for many people. It only causes discomfort if you increase too quickly or do not drink enough.'
    },
    {
      question: 'Which fruit has the most fiber?',
      answer: 'Among common fruits in USDA data, raspberries lead with about 9.8 g per cup, followed by blackberries at about 8 g per cup and a medium pear at about 5.6 g.'
    },
    {
      question: 'Does fiber help with weight loss?',
      answer: 'High-fiber foods tend to be filling for their calories, which can make a calorie deficit easier to stick to. Fiber itself does not burn fat, but beans, vegetables, fruit and whole grains make it easier to eat less without feeling hungry.'
    },
    {
      question: 'Should I take a fiber supplement?',
      answer: 'Most people can reach the target with food. A supplement such as psyllium can help some people, particularly with constipation, but it is worth discussing with a pharmacist or GP, especially if you take regular medicines.'
    },
    {
      question: 'Why do US and UK fiber numbers differ?',
      answer: 'The US scales fiber to calories (14 g per 1,000 kcal), giving different amounts for women and men. The UK uses a single 30 g figure for all adults. Both are well above what most people currently eat.'
    }
  ],
  relatedSlugs: ['how-to-count-macros-for-beginners', 'calories-in-fruit-lowest-to-highest', 'how-to-read-a-nutrition-facts-label']
};
