import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'calories-in-porridge-and-oatmeal',
  slug: 'calories-in-porridge-and-oatmeal',
  title: 'Calories in Porridge and Oatmeal: With Water, Milk and Toppings',
  description: 'How many calories are in a bowl of porridge or oatmeal made with water, whole, semi-skimmed, skim, oat or almond milk, plus what toppings like banana, honey and peanut butter add. All figures from USDA data.',
  category: 'Calories',
  tags: ['porridge', 'oatmeal', 'oats', 'breakfast', 'calories'],
  readingTimeMinutes: 6,
  updatedAt: '2026-11-22',
  relatedTool: { label: 'Recipe Nutrition Calculator', href: '/recipe-nutrition-calculator' },
  heroSummary: 'A 40 g portion of oats, the usual UK serving and close to the US half cup, has about 152 calories before anything else goes in. Made with water, that is the whole bowl. Made with 200 ml of semi-skimmed or 2% milk it comes to about 252 calories, and with whole milk about 274. Toppings are where most of the variation comes from: a sliced banana adds 105 calories and a tablespoon of honey 61.',
  keyTakeaway: 'Start from 152 calories for 40 g of oats, add your milk (30 to 122 calories for 200 ml) and add each topping. A plain bowl with semi-skimmed milk is about 250 calories with 12 g of protein and 4 g of fibre; a bowl with milk, banana and honey is about 420.',
  // The "|" stops metadata.ts appending the site name, keeping the title under 60 chars.
  seoTitle: 'Calories in Porridge & Oatmeal | With Milk, Water, Toppings',
  seoDescription: 'A 40 g bowl of porridge is about 152 calories with water or 252 with semi-skimmed milk. Oatmeal calories with every milk, plus banana, honey and nut butter.',
  sections: [
    {
      id: 'the-oats',
      heading: 'Start with the oats',
      body: [
        'Porridge (the UK name) and oatmeal (the US name) are the same thing: oats cooked in water or milk. Dry rolled oats have about 379 calories per 100 g in USDA data, with 13.2 g of protein and 10.1 g of fibre. Because oats soak up liquid, a cooked bowl looks large for its calories.',
        'The serving on most UK packs is 40 g. In the US, the usual serving is half a cup of dry oats, about 40.5 g. The figures below use 40 g.'
      ],
      bullets: [
        'Rolled oats, 40 g dry: 152 calories, 5.3 g protein, 4 g fibre',
        'Rolled oats, 50 g dry (a larger bowl): 190 calories, 6.6 g protein, 5 g fibre',
        'Steel-cut oats have almost the same calories per gram as rolled oats; they just take longer to cook'
      ],
      toolCta: { label: 'See oats nutrition', href: '/foods/oats' }
    },
    {
      id: 'milk',
      heading: 'Porridge calories with water or milk',
      body: [
        'The liquid makes the biggest difference to the base bowl. Per bowl, made with 40 g of oats and 200 ml of liquid:'
      ],
      bullets: [
        'With water: 152 calories, 5.3 g protein',
        'With unsweetened almond milk: 182 calories, 6.4 g protein',
        'With skim (skimmed) milk: 220 calories, 12 g protein',
        'With oat milk: 242 calories, 6.6 g protein',
        'With 2% (semi-skimmed) milk: 252 calories, 11.9 g protein',
        'With whole milk: 274 calories, 11.6 g protein'
      ],
      callout: {
        tone: 'info',
        title: 'Half and half',
        body: 'Many people use half milk and half water. With semi-skimmed milk that comes to about 202 calories for the bowl, a creamy texture for 50 calories less than all milk.'
      }
    },
    {
      id: 'toppings',
      heading: 'What toppings add',
      body: [
        'Toppings can easily double the calories of a bowl, so they are worth measuring at least once. Using USDA data:'
      ],
      bullets: [
        'Banana, 1 medium (118 g), sliced: 105 calories',
        'Half a banana (59 g): 53 calories',
        'Blueberries, half a cup (74 g): 42 calories',
        'Honey, 1 tablespoon (20 g): 61 calories; 1 teaspoon (7 g): 21 calories',
        'Maple syrup, 1 tablespoon (20 g): 52 calories',
        'Brown sugar, 1 teaspoon (4.6 g): 17 calories',
        'Peanut butter, 1 tablespoon (16 g): 95 calories, 4.2 g protein',
        'Walnuts, 15 g: 98 calories',
        'Chia seeds, 1 tablespoon (about 10.5 g): 51 calories, 3.6 g fibre'
      ],
      toolCta: { label: 'Work out your own bowl', href: '/recipe-nutrition-calculator' }
    },
    {
      id: 'example-bowls',
      heading: 'Three example bowls',
      body: [
        'Each uses 40 g of oats and 200 ml of milk or water.'
      ],
      bullets: [
        'Light: oats with water, half a cup of blueberries and a teaspoon of honey: about 215 calories',
        'Everyday: oats with semi-skimmed milk and half a banana: about 305 calories, 12.5 g protein',
        'Big: oats with whole milk, a sliced banana, a tablespoon of honey and a tablespoon of peanut butter: about 535 calories, 17 g protein'
      ],
      callout: {
        tone: 'trust',
        title: 'Making porridge more filling',
        body: 'Porridge made with water is low in protein. Cooking it with milk roughly doubles the protein, and stirring in Greek yogurt or a spoon of nut butter adds more. Protein and fibre together help keep you full until lunch.'
      }
    },
    {
      id: 'instant-and-shop',
      heading: 'Instant oatmeal and shop-bought porridge',
      body: [
        'Flavoured instant oatmeal packets are convenient but usually contain added sugar. A prepared packet of flavoured instant oatmeal (163 g) has about 194 calories in USDA data, with 12.6 g of sugar, against under 1 g in plain oats.',
        'High-street porridge varies by chain. Pret\'s Proper Porridge is 216 calories and the Greggs Simply Creamy Porridge 249, both before toppings, according to the chains\' own published nutrition.'
      ],
      toolCta: { label: 'Compare plain and instant oatmeal', href: '/compare-foods?a=cooked-oats&b=instant-oatmeal-flavored' }
    }
  ],
  faqs: [
    {
      question: 'How many calories are in a bowl of porridge?',
      answer: 'A bowl made with 40 g of oats has about 152 calories with water, 252 with 200 ml of semi-skimmed or 2% milk, and 274 with whole milk, before toppings.'
    },
    {
      question: 'How many calories are in 40 g of oats?',
      answer: 'About 152 calories, with 5.3 g of protein and 4 g of fibre, based on USDA data for rolled oats at 379 calories per 100 g.'
    },
    {
      question: 'Is porridge good for weight loss?',
      answer: 'It can be. Oats are filling for their calories because they absorb liquid and contain fibre. The toppings decide whether a bowl is 200 or 500 calories, so measure sweeteners and nut butters.'
    },
    {
      question: 'How many calories are in oatmeal made with water?',
      answer: 'One cup of cooked oatmeal made with water (234 g) has about 166 calories, the same as the dry oats in it, because water adds none.'
    },
    {
      question: 'Do overnight oats have the same calories?',
      answer: 'Yes. Soaking oats instead of cooking them does not change the calories. Overnight oats are often made with milk, yogurt and fruit, so add those up as you would for porridge.'
    }
  ],
  relatedSlugs: ['calories-in-breakfast-foods', 'how-much-fiber-do-you-need', 'new-year-weight-loss-plan']
};
