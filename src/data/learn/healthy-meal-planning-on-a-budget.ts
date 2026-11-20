import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'healthy-meal-planning-on-a-budget',
  slug: 'healthy-meal-planning-on-a-budget',
  title: 'Healthy Meal Planning on a Budget: A Simple System That Works',
  description: "How to plan cheap, balanced meals using the plate method, batch cooking, low-cost proteins and frozen vegetables, with a sample day and calories from USDA data.",
  category: 'Meal Planning Basics',
  tags: ['meal planning', 'budget', 'batch cooking', 'healthy eating'],
  readingTimeMinutes: 7,
  updatedAt: '2026-10-23',
  relatedTool: { label: 'Meal Calorie Calculator', href: '/meal-calorie-calculator' },
  heroSummary: "Healthy eating on a budget comes down to three habits: build each plate from cheap staples using a simple plate method, cook a few big batches a week so leftovers become lunches, and lean on low-cost proteins such as eggs, beans, lentils, canned fish and chicken thighs. Frozen and canned vegetables fill the gaps and cut waste. You do not need special foods or a big shop to eat well.",
  keyTakeaway: "Fill half the plate with vegetables and fruit, a quarter with starchy food (wholegrain where you can) and a quarter with protein. Plan three or four dinners that make double portions, and buy frozen vegetables and dried or canned pulses. A sample day built this way comes to about 1,740 calories, 106 g of protein and 31 g of fibre.",
  seoTitle: "Healthy Meal Planning on a Budget (With Sample Day) | Food Nutrition Calculator",
  seoDescription: "Plan cheap, healthy meals with the MyPlate and Eatwell plate method, batch cooking, low-cost proteins and frozen veg. Includes a sample day with calories.",
  sections: [
    {
      id: 'plate-method',
      heading: 'Start with the plate, not a recipe book',
      body: [
        "The easiest way to plan balanced meals without counting anything is to use a plate model. The US and UK versions say much the same thing.",
        "USDA MyPlate suggests filling half your plate with fruits and vegetables and splitting the other half between grains and protein foods, with dairy on the side. It also advises making at least half your grains whole grains. The NHS Eatwell Guide shows fruit and vegetables as just over a third of what you eat, starchy foods such as potatoes, bread, rice and pasta as just over a third, and smaller portions of beans, pulses, fish, eggs and meat, plus dairy or alternatives. Oils and spreads come in small amounts.",
        "In practice that gives you a simple template for any meal:"
      ],
      bullets: [
        "Half the plate: vegetables, salad or fruit (fresh, frozen or canned)",
        "A quarter: starchy food such as rice, pasta, potatoes, oats or bread, wholegrain where possible",
        "A quarter: protein such as eggs, beans, lentils, fish, chicken or tofu",
        "On the side: milk, yogurt or a fortified alternative",
        "A little oil for cooking, measured with a spoon rather than poured"
      ],
      callout: {
        tone: 'info',
        title: 'Five a day',
        body: "The NHS recommends at least 5 portions of fruit and vegetables a day, with an adult portion being 80 g. Fresh, frozen, canned and dried all count."
      }
    },
    {
      id: 'plan-the-week',
      heading: 'Plan the week in 20 minutes',
      body: [
        "Most food waste, and most expensive last-minute takeaways, come from not knowing what is for dinner. A short weekly plan fixes both.",
        "Check what is already in the fridge, freezer and cupboard first, and build at least one meal around it. Then choose three or four dinners that make double portions, so the extra becomes lunch or a second dinner. Write the shopping list from the plan, grouped by section of the shop, and stick to it."
      ],
      bullets: [
        "Pick dinners that share ingredients, such as onions, peppers, canned tomatoes and rice, so nothing is left half used",
        "Plan one 'use it up' night late in the week for leftovers and odds and ends",
        "Compare the unit price on shelf labels (price per kg or per 100 g in the UK, price per ounce or pound in the US) rather than the pack price",
        "Supermarket own-brand staples such as oats, rice, pasta, canned beans and frozen vegetables are usually the same basic food for less"
      ]
    },
    {
      id: 'cheap-protein',
      heading: 'Cheap protein sources that do the heavy lifting',
      body: [
        "Protein is usually the most expensive part of the plate, so this is where budget planning pays off. These foods are among the cheapest ways to get protein in both the US and the UK. Figures are per typical serving, from USDA data:"
      ],
      bullets: [
        "Egg, 1 large (50 g): about 72 calories, 6.3 g protein",
        "Lentils, cooked, 1 cup (198 g): about 230 calories, 17.9 g protein, 15.6 g fibre",
        "Black beans, canned and drained, 1 cup (172 g): about 157 calories, 10.4 g protein, 11.9 g fibre",
        "Chickpeas, cooked, 1 cup (164 g): about 269 calories, 14.5 g protein, 12.5 g fibre",
        "Tuna canned in water, 1 can (172 g): about 220 calories, 40.6 g protein",
        "Sardines, 1 standard can (75 g): about 156 calories, 18.5 g protein",
        "Chicken thigh, grilled, 4 oz (113 g): about 217 calories, 27.2 g protein",
        "Plain nonfat Greek yogurt, 150 g pot: about 89 calories, 15.5 g protein"
      ],
      toolCta: { label: 'See cooked lentil nutrition', href: '/foods/cooked-lentil' }
    },
    {
      id: 'frozen-and-canned',
      heading: 'Frozen and canned vegetables are not second best',
      body: [
        "Frozen vegetables are picked and frozen quickly, keep for months and come already chopped, so you only use what you need and throw less away. Canned vegetables, beans and fruit work the same way. The NHS counts frozen and canned fruit and vegetables towards your 5 a day.",
        "Frozen broccoli has about 26 calories per 100 g in USDA data and frozen spinach about 29, so a generous 150 g serving adds a lot of volume and fibre for very few calories.",
        "Choose vegetables canned in water without added salt or sugar, and fruit canned in juice rather than syrup. Rinsing canned beans in a sieve removes some of the salt from the canning liquid."
      ]
    },
    {
      id: 'batch-cooking',
      heading: 'Batch cooking: one pot, four meals',
      body: [
        "Batch cooking turns a single hour of cooking into several meals and makes it much less tempting to buy lunch. Soups, stews, chilli, curries and pasta sauces all freeze well.",
        "Here is an example lentil and bean chilli made from cheap staples, with calories worked out from USDA data for each ingredient:"
      ],
      bullets: [
        "Cooked lentils, 4 cups (792 g): 919 calories",
        "Canned black beans, drained, 2 cups (344 g): 313 calories",
        "Frozen chopped onion, 200 g: 58 calories",
        "Frozen sliced peppers, 200 g: 40 calories",
        "Fresh tomatoes, 4 medium (492 g): 89 calories",
        "Tomato paste, 2 tablespoons (32 g): 26 calories",
        "Olive oil, 2 tablespoons (28 g): 252 calories",
        "Total: about 1,697 calories. Split into 4 portions: about 424 calories, 25 g protein and 25 g fibre each"
      ],
      callout: {
        tone: 'warning',
        title: 'Storing leftovers safely',
        body: "Cool cooked food quickly and put it in the fridge within 2 hours. The UK Food Standards Agency advises eating leftovers within 2 days, and USDA advises 3 to 4 days in the fridge. Freeze anything you will not eat in that time. Cooked rice is riskier: the NHS advises cooling it quickly and not keeping it in the fridge for more than a day before reheating."
      },
      toolCta: { label: 'Work out calories for your own batch recipe', href: '/recipe-nutrition-calculator' }
    },
    {
      id: 'sample-day',
      heading: 'A sample day of budget meals',
      body: [
        "This day uses only cheap, widely available foods and follows the plate idea at each meal. Calories are from USDA data. It comes to about 1,740 calories, which suits many people aiming to lose weight slowly. For maintenance, scale the portions up. The NHS gives about 2,000 calories a day for women and 2,500 for men as a guide, though individual needs vary."
      ],
      bullets: [
        "Breakfast: 40 g oats cooked with 1 cup (244 g) of 2% milk (close to UK semi-skimmed), plus a medium banana. About 379 calories, 15 g protein",
        "Lunch: tuna sandwich on 2 slices of wholemeal bread with half a can (86 g) of tuna in water, a raw carrot (80 g) and an apple. About 421 calories, 30 g protein",
        "Snack: 150 g plain nonfat Greek yogurt with 80 g frozen blueberries. About 130 calories, 16 g protein",
        "Dinner: grilled chicken thigh (113 g), 1 cup cooked brown rice (195 g), 150 g frozen broccoli and 1 tablespoon olive oil for cooking. About 622 calories, 37 g protein",
        "Evening: 1 slice wholemeal toast with 1 level tablespoon peanut butter. About 186 calories, 9 g protein",
        "Day total: about 1,738 calories, 106 g protein, 31 g fibre and 6 portions of fruit and vegetables"
      ],
      callout: {
        tone: 'trust',
        title: 'How it lines up with guidance',
        body: "The fibre total meets the NHS recommendation of 30 g a day for adults, which most people in the UK fall short of. Swap the chicken for the lentil chilli above on alternate days and the protein stays similar while the cost drops further."
      },
      toolCta: { label: 'Build and total your own day', href: '/meal-calorie-calculator' }
    },
    {
      id: 'common-mistakes',
      heading: 'Common budget meal planning mistakes',
      body: [
        "Most plans fail for practical reasons rather than nutrition ones. Watch out for these:"
      ],
      bullets: [
        "Planning seven different new recipes a week. Two or three reliable meals on rotation are cheaper and easier",
        "Buying fresh produce you will not use before it goes off. Buy frozen for anything you eat slowly",
        "Free-pouring oil. Each tablespoon is about 126 calories, so measure it",
        "Skipping protein at breakfast and lunch, then feeling hungry and snacking by mid-afternoon",
        "Treating ready meals and snacks as cheap. Per portion, home-cooked pulses, oats and eggs usually work out far cheaper",
        "Forgetting to label and date what goes in the freezer"
      ]
    }
  ],
  faqs: [
    {
      question: 'What are the cheapest healthy foods to buy?',
      answer: "Dried or canned beans and lentils, eggs, oats, rice, pasta, potatoes, frozen vegetables, canned fish, chicken thighs and seasonal fruit are consistently among the cheapest nutritious foods in both the US and the UK."
    },
    {
      question: 'Is frozen veg as healthy as fresh?',
      answer: "Frozen vegetables are a perfectly good choice, and the NHS counts them towards your 5 a day. They also reduce waste because you only cook what you need."
    },
    {
      question: 'How long do batch-cooked meals keep?',
      answer: "The UK Food Standards Agency advises eating leftovers within 2 days and USDA advises 3 to 4 days in the fridge. Frozen portions keep much longer. Reheat until steaming hot all the way through, and only reheat once."
    },
    {
      question: 'How much protein do I need a day?',
      answer: "The US RDA and the UK reference nutrient intake are both 0.75 to 0.8 g per kg of body weight a day for most adults, so about 56 g for a 70 kg (11 stone) adult. The sample day here gives more than that."
    },
    {
      question: 'Can I eat healthily without cooking much?',
      answer: "Yes. Canned fish, canned beans, eggs, wholemeal bread, yogurt, fruit and microwaveable frozen vegetables need little or no cooking and still fit the plate method."
    }
  ],
  relatedSlugs: ['how-much-protein-do-i-need', 'how-to-calculate-calories-in-a-homemade-recipe', 'high-protein-foods-list']
};
