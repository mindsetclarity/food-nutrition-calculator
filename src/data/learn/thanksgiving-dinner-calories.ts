import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'thanksgiving-dinner-calories',
  slug: 'thanksgiving-dinner-calories',
  title: 'How Many Calories Are in a Thanksgiving Dinner?',
  description: 'Calories in every classic Thanksgiving dish, a typical plate added up (about 2,160 calories), a lighter plate that halves it, and how pumpkin, apple and pecan pie compare. All figures from USDA data.',
  category: 'Calories',
  tags: ['thanksgiving', 'holiday', 'turkey', 'pie', 'calories'],
  readingTimeMinutes: 7,
  updatedAt: '2026-11-16',
  relatedTool: { label: 'Meal Calorie Calculator', href: '/meal-calorie-calculator' },
  heroSummary: 'A typical Thanksgiving plate of turkey, mashed potatoes and gravy, stuffing, cranberry sauce, green bean casserole, candied sweet potatoes, a roll, a slice of pumpkin pie and a glass of wine comes to about 2,160 calories. That is roughly a full day\'s calories for many adults, in one meal. This guide breaks the meal down dish by dish using USDA data, shows a lighter plate of the same foods at about 1,100 calories, and compares the classic pies.',
  keyTakeaway: 'Turkey is not where the calories are: 3 oz of roast turkey is about 144 calories. Stuffing (354 per cup), mashed potatoes (285 per cup), candied sweet potatoes (468 per cup) and pie (374 to 674 per slice) carry most of the meal. Smaller scoops of those, with the same turkey and vegetables, cut the plate roughly in half.',
  // The "|" stops metadata.ts appending the site name, keeping the title under 60 chars.
  seoTitle: 'Thanksgiving Dinner Calories | Every Dish and a Full Plate',
  seoDescription: 'A typical Thanksgiving plate is about 2,160 calories. Calories in turkey, stuffing, mashed potatoes, gravy, casseroles and pie, plus a lighter 1,100 calorie plate.',
  sections: [
    {
      id: 'dish-by-dish',
      heading: 'Calories in each Thanksgiving dish',
      body: [
        'These figures are calculated from the USDA data used on this site, for a common serving of each dish. Home recipes vary a lot, especially in how much butter, cream and sugar go in, so treat them as a typical middle, not an exact count for your family\'s version.'
      ],
      bullets: [
        'Roast turkey, 3 oz (85 g): 144 calories, 24 g protein',
        'Mashed potatoes, 1 cup (250 g): 285 calories',
        'Brown gravy, 1/4 cup (60 g): 32 calories',
        'Bread stuffing, 1 cup (200 g): 354 calories',
        'Cranberry sauce, 1/4 cup (70 g): 111 calories, 22 g sugar',
        'Green bean casserole, 1 cup (230 g): 129 calories',
        'Plain green beans, 1 cup (140 g): 59 calories',
        'Sweet potato casserole, 1 cup (250 g): 248 calories',
        'Candied sweet potatoes, 1 cup (250 g): 468 calories',
        'Baked sweet potato, 1 medium (114 g): 103 calories',
        'Mac and cheese, 1 cup (230 g): 513 calories',
        'Cornbread, 1 piece (65 g): 187 calories',
        'Dinner roll, 1 medium (43 g): 120 calories',
        'Deviled egg, 1 piece (30 g): 59 calories',
        'Ham, 3 oz (85 g): 139 calories'
      ],
      callout: {
        tone: 'info',
        title: 'The same food, three ways',
        body: 'Sweet potatoes show how much the recipe matters. A plain baked sweet potato is about 90 calories per 100 g. As sweet potato casserole it is about 99, and as candied sweet potatoes, cooked with sugar and butter, about 187. A cup of candied sweet potatoes has around 74 g of sugar.'
      }
    },
    {
      id: 'typical-plate',
      heading: 'A typical plate, added up',
      body: [
        'Here is a generous but ordinary holiday plate, with dessert and one drink. It adds up to about 2,160 calories, 82 g of protein, 71 g of fat and 266 g of carbohydrate.'
      ],
      bullets: [
        'Roast turkey, 6 oz (170 g): 287 calories',
        'Mashed potatoes, 1 cup (250 g): 285 calories',
        'Brown gravy, 1/2 cup (120 g): 64 calories',
        'Bread stuffing, 1 cup (200 g): 354 calories',
        'Cranberry sauce, 1/4 cup (70 g): 111 calories',
        'Green bean casserole, 1 cup (230 g): 129 calories',
        'Candied sweet potatoes, 1/2 cup (125 g): 234 calories',
        'Dinner roll (43 g) with a pat of butter (5 g): 156 calories',
        'Pumpkin pie, 1/8 of a pie (150 g), with 2 tbsp whipped cream: 391 calories',
        'Red wine, 1 glass (180 ml): 153 calories',
        'Total: about 2,160 calories'
      ],
      callout: {
        tone: 'warning',
        title: 'Salt adds up too',
        body: 'The same plate has about 4,500 mg of sodium, mostly from the turkey, stuffing, gravy and casserole. That is roughly twice the US limit of 2,300 mg a day and nearly twice the UK maximum of 6 g of salt (2,400 mg of sodium). If you have been told to watch your salt, gravy and stuffing are the easiest places to cut back.'
      },
      toolCta: { label: 'Add up your own plate', href: '/meal-calorie-calculator' }
    },
    {
      id: 'lighter-plate',
      heading: 'A lighter plate of the same meal',
      body: [
        'You do not need to skip anything to eat a lot less. This plate keeps every dish on the table, with smaller scoops of the richest ones and plain vegetables in place of the casseroles. It comes to about 1,100 calories, roughly half the typical plate, and still has 49 g of protein.'
      ],
      bullets: [
        'Roast turkey, 4 oz (113 g): 191 calories',
        'Mashed potatoes, 1/2 cup (125 g): 143 calories',
        'Brown gravy, 1/4 cup (60 g): 32 calories',
        'Bread stuffing, 1/2 cup (100 g): 177 calories',
        'Cranberry sauce, 2 tbsp (35 g): 56 calories',
        'Plain green beans, 1 cup (140 g): 59 calories',
        'Baked sweet potato, 1 medium (114 g): 103 calories',
        'Pumpkin pie, half a slice (75 g), no topping: 187 calories',
        'Red wine, 1 glass (180 ml): 153 calories',
        'Total: about 1,100 calories'
      ],
      callout: {
        tone: 'trust',
        title: 'Where the savings came from',
        body: 'Most of the roughly 1,060 calories saved came from four changes: half as much stuffing (177 saved), a baked sweet potato instead of candied (131 saved), half a slice of pie without cream (204 saved) and skipping the roll and butter (156 saved). The rest came from a little less turkey, half the mashed potatoes and gravy, and plain green beans instead of the casserole.'
      }
    },
    {
      id: 'pies',
      heading: 'Pumpkin, apple or pecan pie?',
      body: [
        'Pie is the single biggest item on many plates, and the choice of pie matters more than almost any other swap. Per slice, taking a slice as one eighth of a standard pie (150 g):'
      ],
      bullets: [
        'Pumpkin pie: 374 calories, 15 g fat, 37 g sugar',
        'Sweet potato pie: 404 calories, 15 g fat, 38 g sugar',
        'Apple pie: 444 calories, 23 g fat, 24 g sugar',
        'Pecan pie: 674 calories, 38 g fat, 47 g sugar'
      ],
      callout: {
        tone: 'info',
        title: 'Why pecan pie is so much higher',
        body: 'Pecans are about 73% fat by weight, and the filling is mostly sugar syrup, eggs and butter. A slice of pecan pie has about 300 calories more than a slice of pumpkin pie and more than twice the fat. If it is your favourite, a thin sliver or half a slice is the easy fix.'
      },
      toolCta: { label: 'Compare pumpkin and pecan pie', href: '/compare-foods?a=pumpkin-pie&b=pecan-pie' }
    },
    {
      id: 'drinks',
      heading: 'Drinks and nibbles before dinner',
      body: [
        'Calories before the meal are easy to miss. A glass of red wine (180 ml) is about 153 calories and white wine about 148. A cup of eggnog is about 225 calories. Two deviled eggs, a handful of crackers and a couple of drinks can add 500 calories before anyone sits down.',
        'If you want to keep the total down, choose one or the other: a drink with the meal, or the appetizers, rather than both.'
      ],
      toolCta: { label: 'Look up holiday drinks', href: '/foods/category/beverages' }
    },
    {
      id: 'one-meal',
      heading: 'Does one big meal matter?',
      body: [
        'Not much, for most people. Body fat changes with your average intake over weeks, not one day. A common rule of thumb is that a pound of body fat stores about 3,500 calories, so eating 1,000 calories more than you burn on Thanksgiving adds well under half a pound of fat, even before allowing for the fact that the rule is only an approximation.',
        'The scale may still jump by two or three pounds the next morning. That is mostly water: salty food makes your body hold extra fluid, and the carbohydrates you store as glycogen bring water with them. It usually settles within a few days of normal eating.',
        'If you are tracking calories, the most useful thing is simply to log the day honestly and carry on with your normal plan the next morning, rather than trying to make up for it by skipping meals.'
      ],
      callout: {
        tone: 'warning',
        title: 'Medical diets come first',
        body: 'If you manage diabetes, kidney disease, heart failure or another condition with a prescribed diet, follow the advice of your doctor or dietitian for the holiday meal. The figures here are general information, not a personal plan.'
      },
      toolCta: { label: 'Work out your maintenance calories', href: '/tdee-calculator' }
    }
  ],
  faqs: [
    {
      question: 'How many calories are in a Thanksgiving dinner?',
      answer: 'A typical plate with turkey, the usual sides, a roll, a slice of pumpkin pie and a glass of wine is about 2,160 calories using USDA data. Smaller portions of the stuffing, potatoes and pie bring the same meal to about 1,100.'
    },
    {
      question: 'How many calories are in turkey?',
      answer: 'Roast turkey has about 169 calories per 100 g, or about 144 calories in a 3 oz (85 g) serving, with around 24 g of protein. It is one of the lower-calorie foods on the table.'
    },
    {
      question: 'Which Thanksgiving pie has the fewest calories?',
      answer: 'Of the classic pies, pumpkin is lowest at about 374 calories for an eighth of a pie. Apple is about 444 and pecan about 674.'
    },
    {
      question: 'How many calories are in stuffing?',
      answer: 'Bread stuffing has about 354 calories per cup (200 g), making it one of the highest-calorie side dishes, alongside candied sweet potatoes and mac and cheese.'
    },
    {
      question: 'Will I gain weight from Thanksgiving dinner?',
      answer: 'Not meaningfully from one meal. A day 1,000 calories over your needs adds well under half a pound of fat. A jump on the scale the next day is mostly water from salt and carbohydrates and usually goes within a few days.'
    }
  ],
  relatedSlugs: ['how-to-calculate-calories-in-a-meal', 'calories-in-beer-wine-and-spirits', 'what-is-a-calorie-deficit']
};
