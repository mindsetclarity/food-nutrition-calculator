import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'calories-in-breakfast-foods',
  slug: 'calories-in-breakfast-foods',
  title: 'Calories in Breakfast Foods: US and UK Favourites',
  description: 'Calories and protein in common breakfasts, from porridge, cereal and toast to eggs, bacon, a full English, pancakes and avocado toast, calculated from USDA data.',
  category: 'Calories',
  tags: ['breakfast', 'calories', 'protein', 'full english', 'oatmeal'],
  readingTimeMinutes: 7,
  updatedAt: '2026-10-23',
  relatedTool: { label: 'Meal Calorie Calculator', href: '/meal-calorie-calculator' },
  heroSummary: "Most everyday breakfasts land between about 170 and 560 calories: a bowl of corn flakes with milk is about 171, porridge made with 2% milk about 252, and a stack of three pancakes with syrup and butter about 563. A full English fry-up is the big outlier at around 1,000 calories. Below are per-serving numbers for US and UK breakfast staples, all worked out from USDA data, plus the options that give the most protein for the fewest calories.",
  keyTakeaway: "For a filling, lower-calorie breakfast, lean on Greek yogurt, cottage cheese and eggs. A 245 g bowl of nonfat Greek yogurt has about 145 calories and 25 g of protein, while a cup of granola alone is about 462 calories with under 11 g.",
  seoTitle: 'Calories in Breakfast Foods: Oatmeal, Eggs, Toast, Full English | Food Nutrition Calculator',
  seoDescription: 'Calories in porridge, cereal, toast, bagels, eggs, bacon, a full English, pancakes and yogurt, from USDA data, plus high-protein low-calorie picks.',
  sections: [
    {
      id: 'at-a-glance',
      heading: 'Breakfast calories at a glance',
      body: [
        "These are typical servings, calculated from the per 100 g values in USDA data on this site. Your own bowl or plate may be bigger or smaller, so weigh it once if you eat it often."
      ],
      bullets: [
        'Corn flakes, 30 g, with 122 g (1/2 cup) 2% milk: about 171 kcal, 6 g protein',
        'Porridge, 40 g oats with 200 g 2% milk: about 252 kcal, 12 g protein',
        '2 slices white toast with 2 pats butter: about 222 kcal, 5 g protein',
        'Bagel (105 g) with 30 g cream cheese: about 382 kcal, 13 g protein',
        '2 poached eggs on 1 slice wholewheat toast: about 234 kcal, 17 g protein',
        'Avocado toast with a poached egg: about 283 kcal, 12 g protein',
        '3 pancakes with 2 tbsp maple syrup and butter: about 563 kcal, 11 g protein',
        'Full English (see below): about 1,006 kcal, 52 g protein',
        'Greek yogurt bowl with berries and granola: about 313 kcal, 29 g protein'
      ],
      toolCta: { label: 'Add up your own breakfast', href: '/meal-calorie-calculator' }
    },
    {
      id: 'porridge-oatmeal',
      heading: 'Porridge and oatmeal',
      body: [
        "USDA data gives rolled oats 379 calories per 100 g, so a 40 g portion of dry oats, a common UK porridge serving, is about 152 calories and 5 g of protein. What you cook it with changes the total more than people expect.",
        "Made with 200 g of skim milk, the bowl is about 220 calories. With 2% milk (a little richer than UK semi-skimmed), about 252. With whole milk, about 274. Made with water, it stays at about 152. A US microwave cup of oatmeal prepared with milk (210 g) is about 233 calories.",
        "Toppings are where porridge climbs. A medium banana (118 g) adds about 105 calories and a tablespoon of honey (20 g) about 61, so a banana-and-honey bowl made with 2% milk is about 418. A tablespoon of peanut butter (16 g) adds about 96 calories and 4 g of protein."
      ],
      toolCta: { label: 'See rolled oats nutrition', href: '/compare-foods?a=oats' }
    },
    {
      id: 'cereal-and-milk',
      heading: 'Cereal with milk',
      body: [
        "Cereal boxes usually base their numbers on a 30 g serving, which looks small in a bowl. Most people pour more, so weighing your usual bowl once is worth it.",
        "Light flaked cereals are low per serving because they are mostly air. Corn flakes are about 110 calories per 30 g and bran flakes about 108, but bran flakes carry far more fibre: 6 g per 30 g against about 1 g. Two shredded wheat biscuits (50 g) are about 179 calories with 6.5 g of fibre.",
        "Granola is the one to watch. At 420 calories per 100 g, a 30 g serving is about 126 calories, but a full cup (110 g) is about 462 before any milk. Add 122 g of 2% milk (61 calories) or skim milk (41 calories) to any of these."
      ]
    },
    {
      id: 'toast-bagels-muffins',
      heading: 'Toast, bagels and English muffins',
      body: [
        "A medium slice of white bread (28 g) is about 75 calories and a slice of wholewheat (36 g) about 91, with more than three times the fibre. Spreads usually add more than the bread: a 5 g pat of butter is about 36 calories, a tablespoon of jam (20 g) about 56, and a tablespoon of peanut butter about 96.",
        "Bagels are dense. A regular 105 g bagel is about 277 calories, nearly as much as four slices of white bread, and 30 g of cream cheese brings it to about 382. A bagel thin (46 g) is about 121. An English muffin (57 g) is about 129 calories, a lighter base for eggs or a breakfast sandwich."
      ],
      bullets: [
        'White toast, 1 slice (28 g): about 75 kcal',
        'Wholewheat toast, 1 slice (36 g): about 91 kcal',
        'Regular bagel (105 g): about 277 kcal',
        'English muffin (57 g): about 129 kcal',
        'Croissant, medium (57 g): about 231 kcal'
      ]
    },
    {
      id: 'eggs-bacon-full-english',
      heading: 'Eggs, bacon and a full English',
      body: [
        "One large egg (50 g) is about 72 calories poached, 75 scrambled and 98 fried in USDA data, with 5 to 7 g of protein. The extra calories in fried eggs come from the fat in the pan.",
        "A medium slice of cooked US-style bacon (8 g) is about 37 calories. UK back bacon rashers are usually larger, so weigh one. Turkey bacon is not much lighter per slice: an 11 g slice is about 41 calories.",
        "A full English adds up quickly. Here is one built from USDA values: 2 fried eggs (196), 2 slices of bacon (75), 2 pork sausages of 50 g each (325), 200 g of baked beans (210), 70 g of mushrooms (22) fried in a teaspoon of oil (45), a grilled tomato (22), and a slice of white toast with butter (111). That is about 1,006 calories and 52 g of protein. Add 80 g of hash browns and it passes 1,150. Black pudding and fried bread push it higher still.",
        "A lighter version keeps the feel of the meal: 2 poached eggs (143), 2 slices of bacon (75), 130 g of beans (137), dry-fried mushrooms (22), a grilled tomato (22) and a slice of wholewheat toast without butter (91). That is about 490 calories with around 31 g of protein."
      ],
      toolCta: { label: 'See bacon nutrition', href: '/compare-foods?a=bacon' }
    },
    {
      id: 'pancakes-and-pastries',
      heading: 'Pancakes, waffles, pastries and drive-through breakfasts',
      body: [
        "A medium pancake (50 g) is about 141 calories, so a stack of three is about 423. Two tablespoons of maple syrup (40 g) add about 104 and a pat of butter about 36, for a total near 563 with only about 11 g of protein. A medium waffle (75 g) is about 280 calories before toppings.",
        "Pastries are mostly flour and fat. A medium croissant is about 231 calories. Fast-food breakfast sandwiches are larger than they look: in USDA data a sausage, egg and English muffin sandwich (180 g) is about 475 calories, and a bacon, egg and cheese bagel (200 g) about 536."
      ]
    },
    {
      id: 'yogurt-fruit-avocado',
      heading: 'Yogurt, fruit and avocado toast',
      body: [
        "Plain nonfat Greek yogurt is 59 calories and 10.3 g of protein per 100 g. A 150 g pot is about 89 calories with 15.5 g of protein; a 245 g cup is about 145 with 25 g. Whole-milk plain yogurt has similar calories per cup (about 149) but only about 8.5 g of protein. Flavoured Greek yogurt with fruit is about 171 calories per 150 g pot.",
        "A yogurt bowl of 245 g nonfat Greek yogurt, 74 g of blueberries (42) and 30 g of granola (126) is about 313 calories and 29 g of protein.",
        "Avocado is calorie-dense for a fruit at 160 per 100 g. Half a 150 g avocado (75 g) on a slice of wholewheat toast is about 211 calories; add a poached egg and it is about 283, with 12 g of protein and a good amount of fibre.",
        "If you drink juice, the NHS says fruit juice and smoothies count as a maximum of one of your 5 A Day and recommends no more than 150 ml a day combined. A 150 ml glass of fresh orange juice is about 71 calories."
      ],
      toolCta: { label: 'See Greek yogurt nutrition', href: '/foods/greek-yogurt-plain-nonfat' }
    },
    {
      id: 'high-protein-lower-calorie',
      heading: 'Best high-protein, lower-calorie breakfasts',
      body: [
        "Protein helps a breakfast keep you full. The FDA Daily Value for protein is 50 g, and the UK reference intake is also 50 g, so 20 to 30 g at breakfast covers a big share. These options all deliver at least 15 g for around 350 calories or less."
      ],
      bullets: [
        'Nonfat Greek yogurt (245 g) with blueberries and 30 g granola: about 313 kcal, 29 g protein',
        'Cottage cheese (210 g) with a banana: about 277 kcal, 24 g protein',
        'Smoked salmon (50 g) and 2 scrambled eggs on an English muffin: about 337 kcal, 24 g protein',
        '3 scrambled eggs on 1 slice wholewheat toast: about 315 kcal, 19 g protein',
        '2 poached eggs on 1 slice wholewheat toast: about 234 kcal, 17 g protein'
      ],
      callout: {
        tone: 'info',
        title: 'Who this is for',
        body: "These numbers suit healthy adults. If you are pregnant, under 18, managing a medical condition or have a history of disordered eating, ask your GP, doctor or a registered dietitian before changing what you eat to cut calories."
      }
    }
  ],
  faqs: [
    {
      question: 'How many calories are in a full English breakfast?',
      answer: 'A typical full English with 2 fried eggs, 2 slices of bacon, 2 sausages, beans, mushrooms, tomato and buttered toast is about 1,000 calories using USDA data. A grilled and poached version can be under 500.'
    },
    {
      question: 'Is porridge or cereal lower in calories?',
      answer: 'They are close per standard serving. Corn flakes with half a cup of 2% milk are about 171 calories; 40 g of oats with 200 g of 2% milk is about 252 but has more protein and fibre.'
    },
    {
      question: 'How many calories are in two eggs on toast?',
      answer: 'Two poached eggs on a slice of wholewheat toast are about 234 calories. Fried eggs and a buttered slice bring it to about 323.'
    },
    {
      question: 'What is the highest-protein low-calorie breakfast?',
      answer: 'Nonfat Greek yogurt and cottage cheese lead. A 245 g bowl of nonfat Greek yogurt has about 145 calories and 25 g of protein.'
    },
    {
      question: 'Is granola healthy for breakfast?',
      answer: 'It can be, but it is calorie-dense at about 420 calories per 100 g. Use it as a 30 g topping (about 126 calories) rather than a full bowl.'
    }
  ],
  relatedSlugs: ['how-many-calories-in-an-egg', 'high-protein-foods-list', 'calories-in-bread']
};
