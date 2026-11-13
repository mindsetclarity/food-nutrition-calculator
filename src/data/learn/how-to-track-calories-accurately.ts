import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'how-to-track-calories-accurately',
  slug: 'how-to-track-calories-accurately',
  title: 'How to Track Calories Accurately',
  description: 'Where calorie tracking goes wrong and how to fix it: weighing food, raw vs cooked weights, oils and sauces, restaurant meals and label rounding, with worked numbers from USDA data.',
  category: 'Serving Sizes',
  tags: ['calorie tracking', 'food scale', 'portion size', 'weight loss'],
  readingTimeMinutes: 8,
  updatedAt: '2026-10-23',
  relatedTool: { label: 'Food Nutrition Calculator', href: '/calculator' },
  heroSummary: "The most accurate way to track calories is to weigh food in grams on a digital kitchen scale, log it in the state you weighed it (raw or cooked), and count every oil, spread and sauce. Measuring cups and spoons are fine for liquids but can be off by 50% or more for dense foods like peanut butter, oats and granola. Below are the common errors, with real numbers from USDA data, and a simple routine that keeps your log close to reality without turning meals into a chore.",
  keyTakeaway: "Weigh dense and calorie-rich foods, match raw weights to raw entries and cooked to cooked, log cooking fats, and judge progress on weekly averages. A consistent log that is slightly off is more useful than a perfect one you abandon after a week.",
  seoTitle: 'How to Track Calories Accurately: Scale, Raw vs Cooked, Oils | Food Nutrition Calculator',
  seoDescription: 'Weigh food, match raw and cooked entries, and count oils and sauces. Worked examples with peanut butter, olive oil and pasta from USDA data.',
  sections: [
    {
      id: 'where-errors-come-from',
      heading: 'Where calorie tracking goes wrong',
      body: [
        "It is very common to under-record what you eat, even when you are trying hard to be careful. The gap rarely comes from one big meal. It builds from small, repeated misses: a heaped spoon logged as level, cooked pasta logged with a dry-pasta entry, a splash of oil that never gets written down, a restaurant dish guessed from a photo.",
        "Each miss might be 50 to 150 calories. Two or three a day can add up to a few hundred, which is roughly the size of the daily deficit many people aim for. The biggest errors come from a short list of foods and habits:"
      ],
      bullets: [
        'Dense foods measured by volume (nut butters, oats, granola, cereal, rice)',
        'Raw and cooked weights mixed up (pasta, rice, meat)',
        'Cooking oil, butter and dressings left out',
        'Restaurant and takeaway meals estimated by eye',
        'Bites, tastes and drinks that never get logged'
      ]
    },
    {
      id: 'scale-vs-cups',
      heading: 'Food scale vs cups and spoons',
      body: [
        "A digital kitchen scale that reads in 1 g steps costs less than a takeaway meal and removes most guesswork. Cups and spoons measure volume, and the weight that fits into a cup depends on how you fill it. Packed, heaped or fluffed, the same cup can hold very different amounts.",
        "Peanut butter is the classic example. USDA data gives peanut butter 598 calories per 100 g. A level tablespoon weighs about 16 g, which is roughly 96 calories. A generous heaped spoon from the jar is often closer to 28 g (1 oz), which is about 167 calories. Log the heaped spoon as one tablespoon and you miss about 70 calories every time.",
        "Breakfast cereals show the same problem in a bowl. USDA lists 1 cup of granola at about 110 g, or 462 calories, while 1 cup of corn flakes weighs about 30 g and comes to about 110 calories. Rolled oats are 379 calories per 100 g, so a full cup of dry oats (81 g) is about 307 calories, nearly double a typical 40 g bowl of porridge oats at about 152.",
        "For liquids such as milk and stock, a measuring jug in ml or fl oz is accurate enough. For solid, calorie-dense foods, use grams (1 oz is about 28 g)."
      ],
      toolCta: { label: 'See peanut butter nutrition', href: '/foods/butter-peanut' }
    },
    {
      id: 'raw-vs-cooked',
      heading: 'Raw vs cooked weights',
      body: [
        "Food changes weight when you cook it. Pasta and rice absorb water and get heavier, so their calories per gram fall. Meat loses water and gets lighter, so its calories per gram rise. The calories in the food barely change; the weight they are spread across does.",
        "USDA data puts dry pasta at 371 calories per 100 g and cooked pasta at 158. A 75 g portion of dry pasta is about 278 calories. If you cook it, weigh the cooked pasta, then log that cooked weight against the dry entry, you will badly over-count. If you weigh 75 g of cooked pasta and log it as cooked, that is only about 119 calories, which is a much smaller plate than 75 g dry.",
        "Rice works the same way. White rice is 365 calories per 100 g dry and 130 per 100 g cooked. A 1/4 cup of dry rice (46 g) is about 168 calories; a cup of cooked rice (158 g) is about 205.",
        "Meat goes the other way. Raw chicken breast is 120 calories per 100 g in USDA data, while stewed chicken breast is 151, because cooking drives out water. Raw 80% lean ground beef is 254 calories per 100 g; pan-browned it is 272. The rule is simple: weigh raw and use a raw entry, or weigh cooked and use a cooked entry. Weighing raw is usually more reliable, because cooked weight depends on how long and how hot you cooked it."
      ],
      callout: {
        tone: 'info',
        title: 'Cooking for more than one person',
        body: "Weigh the dry pasta or rice for the whole pot, then weigh the cooked total. Divide your portion's cooked weight by the cooked total and multiply by the dry-weight calories. Our recipe guide walks through this for a full meal."
      },
      toolCta: { label: 'Compare dry and cooked pasta', href: '/compare-foods?a=dry-pasta&b=cooked-pasta' }
    },
    {
      id: 'oils-sauces-spreads',
      heading: 'Oils, butter, sauces and dressings',
      body: [
        "Fat carries about 9 calories per gram, more than twice as much as protein or carbohydrate at about 4. A small pour holds a lot of energy and vanishes into the food.",
        "USDA data gives olive oil 900 calories per 100 g. One tablespoon (14 g) is about 126 calories. A free pour into a pan is often 2 tablespoons or more, so 30 g of oil is about 270 calories before any food goes in. Vegetable oil is the same at 900 per 100 g. Butter is 717 per 100 g, so a tablespoon (14.2 g) is about 102 calories and a small pat (5 g) about 36.",
        "Dressings and spreads add up too. A tablespoon of mayonnaise (13.8 g) is about 94 calories and a tablespoon of ranch dressing (15 g) about 65. A sandwich with a thick layer of mayo can easily carry two or three tablespoons.",
        "The fix is to weigh the bottle or tub. Put the oil bottle on the scale, press tare (zero), pour what you need, and the scale shows a negative number equal to what you used. The same trick works for peanut butter jars and butter dishes. If several people share the dish, log your share of the fat used."
      ],
      toolCta: { label: 'See olive oil nutrition', href: '/foods/olive-oil' }
    },
    {
      id: 'restaurant-meals',
      heading: 'Restaurant and takeaway meals',
      body: [
        "Eating out is hardest, because you cannot see the oil or butter in the dish. In the US, the FDA requires restaurant chains with 20 or more locations to show calories on menus. In England, businesses with 250 or more employees have had to show calories on menus since April 2022. Use those numbers when they exist; they are far better than a guess.",
        "When there is no label, find the closest match in a database and round up. Restaurant portions are usually larger and richer than home cooking. A USDA slice of medium cheese pizza (86 g) is about 229 calories, but slices from a large or thick-crust pie can weigh much more."      ],
      toolCta: { label: 'Build a meal and add up its calories', href: '/meal-calorie-calculator' }
    },
    {
      id: 'label-accuracy',
      heading: 'How accurate are nutrition labels?',
      body: [
        "Labels are close, not exact. In the US, FDA rules allow the calories in a packaged food to be up to 20% higher than the number printed on the label before the product is considered misbranded. Calories are also rounded: to the nearest 5 calories up to 50, and to the nearest 10 above 50. A food with fewer than 5 calories per serving can be labelled as zero.",
        "So a cooking spray with a tiny serving size can show zero, but a long spray is not zero.",
        "UK and EU labels must show energy per 100 g or 100 ml, in both kilojoules (kJ) and kilocalories (kcal). One kcal is about 4.2 kJ, so make sure you log the kcal figure. The per 100 g column is the most useful one for anyone who weighs food, because you can multiply it by your own portion instead of trusting the manufacturer's suggested serving."      ],
      callout: {
        tone: 'trust',
        title: 'Our data',
        body: "Food figures on this site come from USDA FoodData Central and are shown per 100 g so you can scale them to any weight."
      }
    },
    {
      id: 'consistency',
      heading: 'Consistency beats perfection',
      body: [
        "You do not need to weigh every lettuce leaf. Vegetables such as lettuce, cucumber and tomatoes are so low in calories that rough estimates barely move your total. Spend your effort where the calories are: oils, nuts, nut butters, cheese, grains, meat, snacks and drinks.",
        "Body weight swings from day to day with water, salt, carbohydrate intake and hormones, so a single weigh-in tells you little. Compare weekly averages instead. If your logged intake has been steady for two to three weeks and your average weight is not moving in the direction you expect, adjust your target by 100 to 200 calories rather than doubting every entry."
      ],
      bullets: [
        'Log before you eat or straight after, not at the end of the day',
        'Use the same database entries for repeat foods',
        'Count drinks, including milky coffee, juice and alcohol'
      ]
    },
    {
      id: 'who-should-not',
      heading: 'When detailed tracking is not a good idea',
      body: [
        "Detailed calorie tracking is not suitable for everyone. If you are pregnant or breastfeeding, under 18, managing diabetes with insulin or other medication, or have a history of disordered eating, talk to your GP, doctor or a registered dietitian before counting calories. If tracking starts to make you anxious about food, stop and get support. A food diary without numbers, or simply eating regular balanced meals based on the NHS Eatwell Guide or the Dietary Guidelines for Americans, can work well too."
      ],
      callout: {
        tone: 'warning',
        title: 'Not medical advice',
        body: 'This guide explains how to measure food. It does not replace advice from a qualified health professional about your own needs.'
      }
    }
  ],
  faqs: [
    {
      question: 'Should I weigh food raw or cooked?',
      answer: 'Either works if you match the entry: raw weight with a raw entry, cooked weight with a cooked entry. Weighing raw is more consistent because cooked weight depends on cooking time and how much water is absorbed or lost.'
    },
    {
      question: 'Do I need a food scale to count calories?',
      answer: 'It is not required, but it is the single biggest accuracy upgrade. A tablespoon of peanut butter can be about 96 or about 167 calories depending on how full it is, and a scale removes that guess.'
    },
    {
      question: 'Should I log cooking oil?',
      answer: 'Yes. One tablespoon of olive oil is about 126 calories in USDA data. Weigh the bottle before and after cooking and divide by the number of people eating if you share the dish.'
    },
    {
      question: 'How wrong can a nutrition label be?',
      answer: 'In the US, FDA rules allow actual calories to be up to 20% above the label, and figures are rounded to the nearest 5 or 10 calories. Over weeks these errors are usually small compared with portion-size errors.'
    }
  ],
  relatedSlugs: ['serving-size-vs-portion-size', 'how-to-read-a-nutrition-facts-label', 'why-am-i-not-losing-weight']
};
