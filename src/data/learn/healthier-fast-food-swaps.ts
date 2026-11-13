import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'healthier-fast-food-swaps',
  slug: 'healthier-fast-food-swaps',
  title: 'Healthier Fast Food Swaps: How Many Calories Each One Saves',
  description: "Simple fast food swaps for burgers, fries, pizza, drinks, coffee and beer, with the calories saved per serving worked out from USDA data.",
  category: 'Food Comparison',
  tags: ['fast food', 'swaps', 'calories', 'takeaway'],
  readingTimeMinutes: 6,
  updatedAt: '2026-10-23',
  relatedTool: { label: 'Compare Foods', href: '/compare-foods' },
  heroSummary: "The swaps that save the most calories at a fast food counter are usually the drink and the side, not the main. Switching a medium regular cola to diet saves about 205 calories, and a kids-size fries instead of a medium saves about 234, while swapping a cheeseburger for a hamburger saves about 70. Put together, three small changes can take a typical burger meal from about 1,155 calories to about 646.",
  keyTakeaway: "Change the drink first, then the side size, then the main. Diet cola instead of regular, a nonfat latte instead of a mocha and light beer instead of regular each save 50 to 205 calories a serving. Pizza toppings matter less than the number of slices.",
  seoTitle: "Healthier Fast Food Swaps and Calories Saved | Food Nutrition Calculator",
  seoDescription: "Fast food swaps with calories saved: hamburger vs cheeseburger, small vs medium fries, diet vs regular cola, latte vs mocha, light beer. USDA data.",
  sections: [
    {
      id: 'about-the-numbers',
      heading: 'Where these numbers come from',
      body: [
        "Every figure here uses USDA survey data for typical fast food and takeaway items, worked out per serving from calories per 100 g. These are generic versions, not any one chain's recipe, so a particular restaurant's burger or pizza may be higher or lower.",
        "For a specific chain, check its own nutrition information. In the US, the FDA requires restaurant chains with 20 or more locations to show calories on menus. In England, businesses with 250 or more employees have had to show calories on menus since April 2022. Use those numbers when they are available and these as a guide when they are not.",
        "For context, the FDA Daily Values on US labels are based on 2,000 calories a day, and UK reference intakes also use 2,000 calories. A single fast food meal can easily be half of that."
      ]
    },
    {
      id: 'burgers',
      heading: 'Cheeseburger vs hamburger',
      body: [
        "Dropping the cheese is a modest swap, but it also cuts saturated fat and salt. Using USDA data:"
      ],
      bullets: [
        "Cheeseburger, 1 medium patty (165 g): about 488 calories, 29.5 g protein, 11.3 g saturated fat, 723 mg sodium",
        "Hamburger, 1 medium patty (145 g): about 418 calories, 25.4 g protein, 8.0 g saturated fat, 515 mg sodium",
        "Calories saved: about 70 per burger, plus about 3 g of saturated fat and 208 mg of sodium"
      ],
      callout: {
        tone: 'info',
        title: 'Doubles cost the most',
        body: "Adding a second patty roughly doubles a burger. In our data a double cheeseburger with two large patties is about 987 calories, so ordering a single instead of a double is a bigger saving than leaving off the cheese."
      },
      toolCta: { label: 'Compare a cheeseburger and a hamburger', href: '/compare-foods?a=cheeseburger&b=hamburger' }
    },
    {
      id: 'fries',
      heading: 'Fries: change the size, not just the side',
      body: [
        "Fries are often nearly as many calories as the burger. The simplest saving is the portion size."
      ],
      bullets: [
        "French fries, medium fast food order (145 g): about 452 calories",
        "French fries, kids meal order (70 g): about 218 calories",
        "Calories saved by going from medium to kids size: about 234",
        "Onion rings, 1 fast food order (120 g): about 422 calories, so about 30 fewer than medium fries per order",
        "Garden salad, 1 cup (74 g): about 17 calories before dressing"
      ],
      toolCta: { label: 'Compare French fries and onion rings', href: '/compare/french-fries-vs-onion-rings' }
    },
    {
      id: 'onion-rings-catch',
      heading: 'The onion rings catch',
      body: [
        "Onion rings look like the lighter side in the list above, but only because a typical order weighs less. Gram for gram, USDA data puts onion rings at about 352 calories per 100 g against 312 for fries. An order of rings also carries about 690 mg of sodium against about 305 mg for medium fries.",
        "So if the portion is the same weight, fries are the lower calorie choice. A small fries or a side salad beats both."
      ]
    },
    {
      id: 'pizza',
      heading: 'Pepperoni vs cheese pizza',
      body: [
        "Pepperoni adds less than most people expect per slice. Using USDA data for restaurant pizza with a medium crust:"
      ],
      bullets: [
        "Cheese pizza, 1 slice (86 g): about 229 calories, 464 mg sodium",
        "Pepperoni pizza, 1 slice (88 g): about 248 calories, 546 mg sodium",
        "Calories saved per slice by choosing cheese: about 19. Over three slices: about 57",
        "Whole medium pizza: cheese about 1,838 calories, pepperoni about 1,994, a difference of about 156",
        "Sodium in a whole medium pepperoni pizza: about 4,383 mg, almost twice the FDA Daily Value of 2,300 mg"
      ],
      callout: {
        tone: 'trust',
        title: 'The bigger lever',
        body: "Eating two slices instead of three saves about 229 calories on cheese pizza, far more than any topping swap. Adding a side salad first helps make two slices feel like enough."
      }
    },
    {
      id: 'soft-drinks',
      heading: 'Regular cola vs diet cola',
      body: [
        "This is the single easiest swap on the menu, because you lose almost nothing you would notice except the sugar."
      ],
      bullets: [
        "Regular cola, 12 oz can (372 g): about 156 calories, 37 g sugar",
        "Diet cola, 12 oz can (360 g): about 7 calories, 0 g sugar",
        "Calories saved per can: about 149",
        "Regular cola, medium fountain drink (512 g): about 215 calories, 51 g sugar",
        "Diet cola, medium fountain drink (495 g): about 10 calories",
        "Calories saved per medium drink: about 205"
      ],
      callout: {
        tone: 'warning',
        title: 'Sugar limits',
        body: "The NHS says adults should have no more than 30 g of free sugars a day, so one can of regular cola goes over that on its own. The FDA Daily Value for added sugars is 50 g. Water, sparkling water or unsweetened tea saves the same calories if you prefer to avoid sweeteners."
      },
      toolCta: { label: 'Compare cola and diet cola', href: '/compare/cola-vs-diet-cola' }
    },
    {
      id: 'coffee',
      heading: 'Latte vs mocha',
      body: [
        "Coffee shop drinks are where many people's hidden calories live. The chocolate syrup in a mocha more than doubles a nonfat latte."
      ],
      bullets: [
        "Mocha, medium (496 g): about 317 calories, 46 g sugar",
        "Latte with nonfat milk, medium (480 g): about 144 calories, 13.8 g protein",
        "Calories saved: about 173 per drink",
        "Cappuccino, medium (480 g): about 130 calories",
        "Black coffee, medium (480 g): about 5 calories"
      ],
      callout: {
        tone: 'info',
        title: 'Over a working week',
        body: "Swapping a daily medium mocha for a nonfat latte on five workdays saves about 865 calories a week. That is more than one and a half days' worth of a 500 calorie deficit."
      },
      toolCta: { label: 'Compare a nonfat latte and a mocha', href: '/compare/latte-nonfat-milk-vs-mocha' }
    },
    {
      id: 'beer-and-chicken',
      heading: 'Beer and chicken swaps',
      body: [
        "Two more swaps that come up often with takeaway and pub food:"
      ],
      bullets: [
        "Regular beer, 12 oz (360 g): about 155 calories. Light beer, 12 oz: about 104. Saved: about 51 per bottle or can",
        "Regular beer, UK pint (568 ml): about 244 calories. Light beer, pint: about 165. Saved: about 79 per pint",
        "Fried chicken sandwich (140 g): about 393 calories, 17 g protein",
        "Grilled chicken sandwich (140 g): about 294 calories, 31.5 g protein",
        "Saved by choosing grilled: about 99 calories, with almost twice the protein"
      ]
    },
    {
      id: 'whole-meal',
      heading: 'Putting the swaps together',
      body: [
        "Single swaps are small. Stacked, they make a real difference. Here is a typical burger meal before and after, using the USDA figures above:",
        "Before: cheeseburger (488) + medium fries (452) + medium regular cola (215) = about 1,155 calories.",
        "After: hamburger (418) + kids size fries (218) + medium diet cola (10) = about 646 calories.",
        "That is about 509 calories saved, and you still had a burger, fries and a cold drink. Over a week of two fast food meals, that is roughly 1,000 calories."
      ],
    }
  ],
  faqs: [
    {
      question: 'What is the healthiest swap at a fast food restaurant?',
      answer: "Changing a regular soft drink to diet, water or unsweetened tea saves the most for the least effort: about 149 calories per can and about 205 per medium drink of cola."
    },
    {
      question: 'Is a hamburger healthier than a cheeseburger?',
      answer: "A hamburger has about 70 fewer calories, about 3 g less saturated fat and about 208 mg less sodium than a cheeseburger in USDA data. Choosing a single instead of a double saves far more."
    },
    {
      question: 'Are onion rings better than fries?',
      answer: "Not really. A typical order of onion rings has about 30 fewer calories than medium fries only because it weighs less. Per 100 g rings are higher in calories and an order has more than twice the sodium."
    },
    {
      question: 'Is cheese pizza much lower in calories than pepperoni?',
      answer: "Only about 19 calories per slice in USDA data. The number of slices matters far more: each slice of medium cheese pizza is about 229 calories."
    },
    {
      question: 'How many calories does a light beer save?',
      answer: "About 51 calories per 12 oz bottle or can and about 79 per UK pint compared with regular beer, based on USDA data."
    }
  ],
  relatedSlugs: ['calories-in-a-burger-and-fries', 'how-many-calories-in-a-slice-of-pizza', 'calories-in-coffee-drinks']
};
