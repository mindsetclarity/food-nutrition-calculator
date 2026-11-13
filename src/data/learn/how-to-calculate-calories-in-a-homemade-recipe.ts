import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'how-to-calculate-calories-in-a-homemade-recipe',
  slug: 'how-to-calculate-calories-in-a-homemade-recipe',
  title: 'How to Calculate Calories in a Homemade Recipe',
  description: 'A step-by-step worked example: spaghetti bolognese for 4, ingredient by ingredient, with total calories, calories per serving and calories per gram from weighing the finished pot.',
  category: 'Recipes',
  tags: ['recipes', 'home cooking', 'calorie counting', 'batch cooking'],
  readingTimeMinutes: 7,
  updatedAt: '2026-10-23',
  relatedTool: { label: 'Recipe Nutrition Calculator', href: '/recipe-nutrition-calculator' },
  heroSummary: "To calculate calories in a homemade recipe, weigh each raw ingredient, multiply its weight by its calories per gram, and add everything up. Divide the total by the number of servings, or weigh the finished dish and divide by its cooked weight to get calories per gram, which is the more accurate way to portion it. Below is a full worked example for a spaghetti bolognese that serves 4, using USDA data for every ingredient.",
  keyTakeaway: "Our 4-serving spaghetti bolognese comes to about 2,840 calories, or about 710 per serving. The sauce alone is about 1,571 calories, and weighing the finished pot gives about 1.37 calories per gram, so you can portion any amount accurately.",
  seoTitle: 'How to Calculate Calories in a Homemade Recipe (Worked Example) | Food Nutrition Calculator',
  seoDescription: 'Add up raw ingredient calories, divide by servings, then weigh the pot for calories per gram. Full spaghetti bolognese example using USDA data.',
  sections: [
    {
      id: 'the-method',
      heading: 'The method in four steps',
      body: [
        "Every recipe calculation follows the same pattern. It does not matter whether you are making a curry, a stew or a tray of flapjacks."
      ],
      bullets: [
        'Weigh each ingredient raw, in grams, before it goes in the pan',
        'Find its calories per 100 g and multiply: grams x (calories per 100 g / 100)',
        'Add every ingredient to get the recipe total, including oil',
        'Divide by servings, or weigh the finished dish and work out calories per gram'
      ],
      callout: {
        tone: 'info',
        title: 'Why raw weights?',
        body: "Raw weights match the standard database entries and do not depend on how long you cooked the food. Cooking changes water content, not calories, so you account for that at the end by weighing the finished dish."
      }
    },
    {
      id: 'the-recipe',
      heading: 'The recipe: spaghetti bolognese for 4',
      body: [
        "This is a plain, everyday bolognese of the kind cooked in kitchens across the UK and US. Beef mince in the UK is often sold in 500 g packs, which is about 1.1 lb, so that is our starting point. Amounts are weighed raw."
      ],
      bullets: [
        '500 g (1.1 lb) 80% lean ground beef / beef mince',
        '1 tbsp (14 g) olive oil',
        '1 medium onion (110 g)',
        '1 medium carrot (61 g)',
        '1 celery stalk (40 g)',
        '2 garlic cloves (6 g)',
        '400 g can chopped tomatoes',
        '2 tbsp (32 g) tomato paste (tomato puree in the UK)',
        '320 g (11.3 oz) dry spaghetti',
        '20 g grated parmesan, to serve',
        'Salt, pepper, dried herbs to taste'
      ]
    },
    {
      id: 'ingredient-by-ingredient',
      heading: 'Ingredient by ingredient',
      body: [
        "Here is each ingredient's calories, using the per 100 g values from USDA data on this site. The arithmetic is shown so you can check it or swap in your own amounts.",
        "Salt, pepper and dried herbs add so little that you can leave them out of the sum. A teaspoon of dried oregano or a pinch of pepper is a few calories at most."
      ],
      bullets: [
        'Ground beef, 80% lean, raw: 500 g x 2.54 = 1,270 kcal',
        'Olive oil: 14 g x 9.00 = 126 kcal',
        'Onion: 110 g x 0.40 = 44 kcal',
        'Carrot: 61 g x 0.41 = 25 kcal',
        'Celery: 40 g x 0.17 = 7 kcal',
        'Garlic: 6 g x 1.43 = 9 kcal',
        'Canned tomatoes: 400 g x 0.16 = 64 kcal',
        'Tomato paste: 32 g x 0.82 = 26 kcal',
        'Sauce subtotal: about 1,571 kcal',
        'Dry pasta: 320 g x 3.71 = 1,187 kcal',
        'Parmesan: 20 g x 4.12 = 82 kcal',
        'Recipe total: about 2,840 kcal'
      ],
      toolCta: { label: 'See ground beef nutrition', href: '/compare-foods?a=ground-beef' }
    },
    {
      id: 'per-serving',
      heading: 'Calories per serving',
      body: [
        "Divide the total by the number of servings: 2,840 / 4 = 710 calories per plate, with sauce, pasta and a sprinkle of parmesan. Using the same USDA data, each serving also has about 35 g of protein, mostly from the beef, plus some from the pasta and cheese.",
        "Notice where the calories come from. The beef is about 45% of the total and the pasta about 42%. The vegetables, tomatoes and garlic together are only about 6%. That pattern is typical: in most savoury recipes, the meat, the starch and the fat decide the number. If you want to lower it, those are the levers. Using leaner mince, cutting the pasta to 70 g per person, or skipping the parmesan each changes the total far more than any vegetable swap.",
        "To put 710 calories in context, UK labels use a reference intake of 2,000 kcal a day for an average adult, and the FDA bases its Daily Values on 2,000 calories. On that basis, one plate is a bit over a third of a day's energy, which is reasonable for a main meal for many adults but more than some people want at dinner."
      ]
    },
    {
      id: 'weigh-the-pot',
      heading: 'Weighing the finished pot for calories per gram',
      body: [
        "Dividing by four only works if the four portions are equal, and at home they rarely are. One person takes a big ladle, another a small one, and leftovers go in a box. The fix is to weigh the finished food and work out calories per gram.",
        "Weigh your empty pan before you start and write the number down, or note it once and keep it on a sticky label inside a cupboard. When the sauce is cooked, weigh the full pan and subtract the empty weight. Say the empty pan is 1,400 g and the full pan is 2,550 g. The sauce weighs 1,150 g.",
        "Now divide: 1,571 calories / 1,150 g = about 1.37 calories per gram, or 137 calories per 100 g. A 290 g ladle of sauce is about 396 calories. A bigger 350 g portion is about 479. A small 200 g portion is about 274. Each person can log what they actually took.",
        "Your finished weight will differ from ours. A lid on the pan keeps more water in; a long simmer without one boils more off. That changes calories per gram, but not the total calories in the pot, which is why you weigh it every time rather than reuse an old figure."
      ],
      callout: {
        tone: 'trust',
        title: 'Weigh pasta and sauce separately',
        body: "Pasta and sauce have very different calories per gram, so keep them apart until you serve. It makes portioning far more accurate."
      }
    },
    {
      id: 'cooked-pasta',
      heading: 'Doing the same with cooked pasta',
      body: [
        "Pasta gains a lot of weight as it absorbs water. USDA data lists dry pasta at 371 calories per 100 g and cooked pasta at 158, which means cooked pasta weighs roughly 2.35 times its dry weight. So 320 g of dry spaghetti should come out at around 750 g cooked, depending on how long you boil it.",
        "Weigh the drained pasta. If it is 750 g, then 1,187 calories / 750 g = about 1.58 calories per gram. A 190 g serving of cooked pasta is about 300 calories. Add that to your sauce portion and the parmesan (5 g is about 21 calories) and you have your plate total, close to the 710 average but based on what you really ate."
      ],
      toolCta: { label: 'Compare dry and cooked pasta', href: '/foods/cooked-pasta' }
    },
    {
      id: 'common-mistakes',
      heading: 'Common mistakes to avoid',
      body: [
        "Most recipe errors come from the same few slips. Check these before trusting your number."
      ],
      bullets: [
        'Forgetting the cooking oil or butter; 1 tbsp of olive oil is about 126 kcal',
        'Using cooked database entries for ingredients you weighed raw',
        'Logging the meat after draining fat as if no fat was removed (draining lowers calories, so the raw figure gives a slightly high, safe estimate)',
        'Assuming cans contain their full labelled weight of food; drained beans or vegetables weigh less than the can',
        'Counting a splash of wine at full value: some alcohol cooks off, so the raw figure slightly overestimates',
        'Reusing calories per gram from last time when the dish was cooked down differently'
      ]
    },
    {
      id: 'leftovers-and-saving',
      heading: 'Leftovers, batch cooking and saving recipes',
      body: [
        "Calories per gram makes batch cooking easy. Weigh each container as you fill it and write the calories on the lid: a 400 g tub of this sauce is about 546 calories. The USDA advises refrigerating leftovers within 2 hours of cooking and eating them within 3 to 4 days, or freezing them for longer.",
        "If you make a recipe often, save it once in a calculator with its ingredient weights. Next time you only need to adjust anything you changed and enter the new finished weight."
      ],
      toolCta: { label: 'Calculate your own recipe', href: '/recipe-nutrition-calculator' }
    }
  ],
  faqs: [
    {
      question: 'How do I calculate calories per serving of a homemade recipe?',
      answer: 'Add up the calories of every raw ingredient, then divide by the number of servings. For uneven portions, weigh the finished dish and divide total calories by total grams to get calories per gram.'
    },
    {
      question: 'How many calories are in homemade spaghetti bolognese?',
      answer: 'Our recipe for 4, made with 500 g of 80% lean beef, 320 g of dry spaghetti and 20 g of parmesan, is about 2,840 calories in total, or about 710 per serving, using USDA data.'
    },
    {
      question: 'Should I weigh ingredients raw or cooked?',
      answer: 'Weigh ingredients raw and use raw database entries. Then weigh the finished dish to account for water lost or gained during cooking.'
    },
    {
      question: 'Does simmering a sauce reduce its calories?',
      answer: 'No. Simmering mostly removes water, so the total calories stay about the same while the calories per gram go up. The main exception is alcohol, some of which cooks off.'
    },
    {
      question: 'Do I need to count herbs and spices?',
      answer: 'Not usually. Normal amounts of salt, pepper, dried herbs and spices add only a few calories. Oils, sauces, cheese and sugar are the additions worth weighing.'
    }
  ],
  relatedSlugs: ['how-recipe-nutrition-calculators-work', 'how-to-track-calories-accurately', 'calories-in-rice-cooked-vs-uncooked']
};
