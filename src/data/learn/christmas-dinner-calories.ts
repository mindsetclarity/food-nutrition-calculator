import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'christmas-dinner-calories',
  slug: 'christmas-dinner-calories',
  title: 'How Many Calories Are in a Christmas Dinner?',
  description: 'Calories in every part of a traditional Christmas dinner, from roast turkey and roast potatoes to pigs in blankets, Yorkshire puddings, trifle and mince pies. A typical plate added up (about 1,880 calories) and a lighter one at about 1,170. All figures from USDA data.',
  category: 'Calories',
  tags: ['christmas', 'holiday', 'turkey', 'roast dinner', 'calories'],
  readingTimeMinutes: 7,
  updatedAt: '2026-11-22',
  relatedTool: { label: 'Meal Calorie Calculator', href: '/meal-calorie-calculator' },
  heroSummary: 'A typical Christmas dinner of roast turkey, four roast potatoes, a Yorkshire pudding, three pigs in blankets, stuffing, sprouts, carrots, parsnips, gravy and cranberry sauce, followed by a bowl of trifle, with two glasses of red wine and a glass of prosecco, comes to about 1,880 calories. This guide breaks the meal down dish by dish using USDA data, shows a lighter plate of the same meal at about 1,170 calories, and covers the mince pies, Christmas cake and drinks that come before and after.',
  keyTakeaway: 'The turkey is one of the lighter things on the plate: 120 g of roast turkey is about 203 calories with 34 g of protein. Roast potatoes (63 calories each), pigs in blankets (about 68 each), stuffing, dessert and drinks carry most of the meal. Two fewer roast potatoes, two fewer pigs in blankets, half the trifle and one drink instead of three save about 710 calories without leaving anything off the table.',
  // The "|" stops metadata.ts appending the site name, keeping the title under 60 chars.
  seoTitle: 'Christmas Dinner Calories | Every Dish and a Full Plate',
  seoDescription: 'A typical Christmas dinner is about 1,880 calories. Calories in turkey, roast potatoes, pigs in blankets, Yorkshire pudding, trifle and mince pies, plus a lighter plate.',
  sections: [
    {
      id: 'dish-by-dish',
      heading: 'Calories in each part of Christmas dinner',
      body: [
        'These figures are calculated from the USDA data used on this site, for a common serving of each item. Home cooking varies a lot, especially in how much goose fat, butter and oil goes on the potatoes and vegetables, so treat them as a typical middle rather than an exact count for your own roast.'
      ],
      bullets: [
        'Roast turkey, 2 medium slices (120 g): 203 calories, 34 g protein',
        'Roast beef, 3 oz (85 g): 175 calories, 25 g protein',
        'Ham, 3 oz (85 g): 139 calories',
        'Roast potato, 1 medium (50 g): 63 calories',
        'Yorkshire pudding, 1 (31 g): 83 calories',
        'Pig in blanket, 1 (a 15 g cocktail sausage wrapped in 4 g of bacon): about 68 calories',
        'Bread stuffing, 100 g: 177 calories',
        'Brussels sprouts, 5 sprouts (100 g): 67 calories',
        'Roast parsnips, 80 g: 74 calories',
        'Glazed carrots, 80 g: 78 calories',
        'Gravy, 1/4 cup (60 g): 32 calories',
        'Cranberry sauce, 2 tbsp (30 g): 48 calories'
      ],
      callout: {
        tone: 'info',
        title: 'How we worked out pigs in blankets',
        body: 'USDA has no record for British pigs in blankets, so we built one from its pork sausage (325 calories per 100 g) and cooked bacon (468 per 100 g). A cocktail sausage of about 15 g wrapped in half a thin rasher comes to about 68 calories. Larger shop-bought ones can be 100 calories or more each, so check the pack if you buy them ready-made.'
      }
    },
    {
      id: 'typical-plate',
      heading: 'A typical Christmas dinner, added up',
      body: [
        'Here is a generous but ordinary Christmas Day plate, with trifle for pudding and three drinks across the meal. It adds up to about 1,880 calories, 72 g of protein, 64 g of fat and 174 g of carbohydrate.'
      ],
      bullets: [
        'Roast turkey, 2 medium slices (120 g): 203 calories',
        'Roast potatoes, 4 (200 g): 252 calories',
        'Yorkshire pudding, 1 (31 g): 83 calories',
        'Pigs in blankets, 3: 202 calories',
        'Bread stuffing, 100 g: 177 calories',
        'Brussels sprouts, 100 g: 67 calories',
        'Glazed carrots, 80 g: 78 calories',
        'Roast parsnips, 80 g: 74 calories',
        'Gravy, 1/2 cup (120 g): 64 calories',
        'Cranberry sauce, 2 tbsp (30 g): 48 calories',
        'Trifle, 1 bowl (145 g): 245 calories',
        'Red wine, 2 medium glasses (2 x 175 ml): 298 calories',
        'Prosecco, 1 glass (125 ml): 94 calories',
        'Total: about 1,880 calories'
      ],
      callout: {
        tone: 'warning',
        title: 'Salt adds up too',
        body: 'The same plate has about 3,500 mg of sodium, mostly from the turkey, stuffing, gravy and pigs in blankets. That is about 8.7 g of salt, well over the UK maximum of 6 g (2,400 mg of sodium) and above the US limit of 2,300 mg of sodium a day. Gravy and stuffing are the easiest places to cut back.'
      },
      toolCta: { label: 'Add up your own plate', href: '/meal-calorie-calculator' }
    },
    {
      id: 'lighter-plate',
      heading: 'A lighter plate of the same meal',
      body: [
        'You do not need to skip anything to eat a lot less. This plate keeps every part of the dinner, with fewer roast potatoes and pigs in blankets, a smaller scoop of stuffing, extra sprouts and one drink. It comes to about 1,170 calories and still has 57 g of protein.'
      ],
      bullets: [
        'Roast turkey, 2 medium slices (120 g): 203 calories',
        'Roast potatoes, 2 (100 g): 126 calories',
        'Yorkshire pudding, 1 (31 g): 83 calories',
        'Pig in blanket, 1: 68 calories',
        'Bread stuffing, 50 g: 89 calories',
        'Brussels sprouts, 150 g: 101 calories',
        'Glazed carrots, 80 g: 78 calories',
        'Roast parsnips, 80 g: 74 calories',
        'Gravy, 1/4 cup (60 g): 32 calories',
        'Cranberry sauce, 2 tbsp (30 g): 48 calories',
        'Trifle, half a bowl (72 g): 122 calories',
        'Red wine, 1 medium glass (175 ml): 149 calories',
        'Total: about 1,170 calories'
      ],
      callout: {
        tone: 'trust',
        title: 'Where the savings came from',
        body: 'About 710 calories were saved. The biggest single change was drinks: one glass of red instead of two plus a prosecco saved 243 calories. Two fewer pigs in blankets saved 135, two fewer roast potatoes 126, half the trifle 123, half the stuffing 88 and half the gravy 32. The extra sprouts added back 34.'
      }
    },
    {
      id: 'puddings',
      heading: 'Christmas pudding, mince pies and cake',
      body: [
        'Most of the calories in Christmas puddings and cakes come from dried fruit, sugar and fat. Per typical portion:'
      ],
      bullets: [
        'Christmas pudding, 100 g: 285 calories (UK shop-bought, CoFID)',
        'Mince pie, 1 individual pie (about 55 g): 159 calories by USDA data, or about 207 for a UK shop-bought pie (CoFID)',
        'Trifle, 1 bowl (145 g): 245 calories, 23 g sugar',
        'Christmas cake (plain fruitcake), 1 thin slice (43 g): 139 calories; a 100 g slice is 324',
        'Gingerbread cake, 1 piece (115 g): 317 calories',
        'Bread pudding, 100 g: 156 calories'
      ],
      callout: {
        tone: 'info',
        title: 'Where the Christmas pudding figure comes from',
        body: "USDA has no record for a British Christmas pudding, so its figure comes from the UK government's food composition tables (CoFID), which list shop-bought Christmas pudding at 285 calories per 100 g. A 100 g portion with 2 tablespoons of brandy butter or cream can easily pass 400. Home recipes vary, so the pack label is the best guide for a bought pudding. Iced Christmas cake with marzipan is also higher than the plain fruitcake above."
      },
      toolCta: { label: 'Compare Christmas pudding and Christmas cake', href: '/compare-foods?a=christmas-pudding&b=fruitcake-christmas-cake' }
    },
    {
      id: 'drinks',
      heading: 'Christmas drinks and nibbles',
      body: [
        'Drinks are the easiest calories to miss over Christmas. A medium glass of red wine (175 ml) is about 149 calories and a glass of prosecco (125 ml) about 94. A 50 ml measure of Irish cream liqueur is about 148 calories with 17 g of sugar, and a 250 ml glass of eggnog about 220. A handful of roasted chestnuts (30 g) is about 72 calories.',
        'Across a long day, three glasses of wine, a Baileys and a couple of mince pies add up to about 900 calories before or after the main meal.'
      ],
      toolCta: { label: 'Look up Christmas drinks', href: '/foods/cream-liqueur-irish-cream' }
    },
    {
      id: 'one-day',
      heading: 'Does one big day matter?',
      body: [
        'Not much, for most people. Body fat changes with your average intake over weeks, not one day. A common rule of thumb is that a pound of body fat stores about 3,500 calories, so one day 1,000 calories over what you burn adds well under half a pound of fat.',
        'What matters more over the holidays is the run of days between Christmas Eve and New Year, when leftovers, drinks and snacks can keep intake high for a week or more. Going back to normal meals on Boxing Day, rather than eating leftovers at every meal, makes the biggest difference.',
        'The scale may jump by a kilo or more the next morning. That is mostly water from salty food and stored carbohydrate, and it usually settles within a few days of normal eating.'
      ],
      callout: {
        tone: 'warning',
        title: 'Medical diets come first',
        body: 'If you manage diabetes, kidney disease, heart failure or another condition with a prescribed diet, follow the advice of your doctor or dietitian over Christmas. The figures here are general information, not a personal plan.'
      },
      toolCta: { label: 'Work out your maintenance calories', href: '/tdee-calculator' }
    }
  ],
  faqs: [
    {
      question: 'How many calories are in Christmas pudding?',
      answer: "Shop-bought Christmas pudding has about 285 calories per 100 g, according to the UK government's food composition tables (CoFID). Brandy butter, cream or custard on top adds more, so a typical serving with a topping can pass 400 calories."
    },
    {
      question: 'How many calories are in a Christmas dinner?',
      answer: 'A typical Christmas dinner with turkey, roast potatoes, a Yorkshire pudding, pigs in blankets, stuffing, vegetables, gravy, trifle and three drinks is about 1,880 calories using USDA data. Fewer roast potatoes and pigs in blankets, half the trifle and one drink bring the same meal to about 1,170.'
    },
    {
      question: 'How many calories are in a roast potato?',
      answer: 'A medium roast potato of about 50 g has around 63 calories, or 126 per 100 g. Potatoes roasted in more fat, such as goose fat, will be higher.'
    },
    {
      question: 'How many calories are in a pig in blanket?',
      answer: 'About 68 calories for a small homemade one: a 15 g cocktail sausage wrapped in half a thin rasher of bacon. Larger shop-bought pigs in blankets can be 100 calories or more each.'
    },
    {
      question: 'How many calories are in a Yorkshire pudding?',
      answer: 'A Yorkshire pudding of about 31 g has around 83 calories, or 268 per 100 g. USDA records it as a popover, which is made from the same egg, flour and milk batter.'
    },
    {
      question: 'How many calories are in a mince pie?',
      answer: 'An individual mince pie of about 55 g has around 159 calories and 16 g of sugar, based on USDA data for mince pie at 289 calories per 100 g. UK shop-bought mince pies are richer: the UK food composition tables (CoFID) list them at 377 calories per 100 g, about 207 for a 55 g pie.'
    },
    {
      question: 'Will I gain weight from Christmas dinner?',
      answer: 'Not meaningfully from one meal. A day 1,000 calories over your needs adds well under half a pound of fat. The week of leftovers and drinks that follows matters more than Christmas Day itself.'
    }
  ],
  relatedSlugs: ['thanksgiving-dinner-calories', 'calories-in-beer-wine-and-spirits', 'how-to-calculate-calories-in-a-meal']
};
