import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'calories-in-chicken-breast',
  slug: 'calories-in-chicken-breast',
  title: 'Calories in Chicken Breast: Raw vs Cooked, Per 100 g and Per Oz',
  description: 'How many calories and how much protein are in chicken breast, raw and cooked, per 100 g, per ounce and per 4 oz serving, plus how skin, cooking method and thighs compare. All figures from USDA data.',
  category: 'Calories',
  tags: ['chicken', 'protein', 'calories', 'meal prep'],
  readingTimeMinutes: 6,
  updatedAt: '2026-11-22',
  relatedTool: { label: 'Protein Calculator', href: '/protein-calculator' },
  heroSummary: 'Cooked skinless chicken breast has about 165 calories and 31 g of protein per 100 g, or about 186 calories and 35 g of protein in a 4 oz (113 g) portion. Raw chicken breast is lower per 100 g, at about 120 calories, only because it still contains water that cooking drives off. This guide covers raw versus cooked, per ounce and per portion, and how skin, frying and other cuts change the numbers.',
  keyTakeaway: 'Weigh chicken the same way every time and use the matching figure: about 120 calories per 100 g raw, or about 165 per 100 g cooked (baked or roasted, no skin). The skin adds about 27 calories per 100 g, and a baked thigh has about 14 more calories per 100 g than a baked breast.',
  // The "|" stops metadata.ts appending the site name, keeping the title under 60 chars.
  seoTitle: 'Calories in Chicken Breast | Raw vs Cooked, Per 100 g & Oz',
  seoDescription: 'Cooked chicken breast has about 165 calories and 31 g protein per 100 g. Raw vs cooked, per ounce, per 4 oz portion, with skin, fried, and thighs compared.',
  sections: [
    {
      id: 'the-numbers',
      heading: 'Calories in chicken breast at a glance',
      body: [
        'These figures come from the USDA data used on this site, for skinless, boneless chicken breast unless stated. Cooked figures assume no breading or sauce.'
      ],
      bullets: [
        'Raw, per 100 g: 120 calories, 22.5 g protein, 2.6 g fat',
        'Baked or roasted, per 100 g: 165 calories, 31 g protein, 3.6 g fat',
        'Baked or roasted, per ounce (28 g): 47 calories, 8.8 g protein',
        'Baked or roasted, 3 oz (85 g): 140 calories, 26 g protein',
        'Baked or roasted, 4 oz (113 g): 186 calories, 35 g protein',
        'A typical large cooked breast of about 200 g: 330 calories, 62 g protein'
      ],
      toolCta: { label: 'See baked chicken breast nutrition', href: '/foods/baked-chicken-breast' }
    },
    {
      id: 'raw-vs-cooked',
      heading: 'Raw vs cooked: why the numbers differ',
      body: [
        'Chicken loses water as it cooks, but keeps almost all of its protein and calories. The same piece therefore weighs less after cooking, and the calories per 100 g go up. In USDA data, raw breast is 120 calories per 100 g and cooked breast 165, which means the meat loses roughly a quarter of its weight in the oven.',
        'In practice, 113 g (4 oz) of raw chicken breast, about 136 calories, cooks down to about 82 g. If you weigh it raw and log it with the cooked figure, you overcount by about 37%. If you weigh it cooked and log it as raw, you undercount by about 27%. Either method works, as long as the weight and the entry match.'
      ],
      callout: {
        tone: 'info',
        title: 'Meal prep tip',
        body: 'If you cook a batch, weigh all the raw chicken first and all the cooked chicken after. Dividing one by the other gives your own cooking loss, so you can log each portion accurately whichever way you weigh it.'
      },
      toolCta: { label: 'Read the guide to raw vs cooked weights', href: '/learn/how-to-track-calories-accurately' }
    },
    {
      id: 'cooking-method',
      heading: 'Does the cooking method matter?',
      body: [
        'Less than most people expect, as long as no breading or sauce is added. Per 100 g of cooked skinless breast in USDA data:'
      ],
      bullets: [
        'Boiled or poached: 151 calories, 29 g protein',
        'Baked or roasted: 165 calories, 31 g protein',
        'Grilled: 176 calories, 29.6 g protein',
        'Pan-fried without breading: 187 calories, 33.4 g protein',
        'Roasted with the skin on: 192 calories, 26.2 g protein, 8.8 g fat'
      ],
      callout: {
        tone: 'warning',
        title: 'Breading and sauces are the big change',
        body: 'Breaded, battered and deep-fried chicken is a different food. A KFC Original Recipe breast, for example, comes to about 490 calories by USDA analysis, against about 350 for a plain roasted skinless breast of the same 212 g weight. Creamy or sugary sauces can add 100 to 200 calories a portion as well.'
      },
      toolCta: { label: 'Compare grilled and fried chicken', href: '/compare-foods?a=grilled-chicken-breast&b=fried-chicken-breast' }
    },
    {
      id: 'other-cuts',
      heading: 'Chicken breast vs thigh and other proteins',
      body: [
        'Chicken breast is one of the leanest common protein foods, which is why it is popular for weight loss and muscle building. One useful way to compare is calories per gram of protein: the lower the number, the more protein you get for your calories. Per 100 g cooked:'
      ],
      bullets: [
        'Chicken breast, baked: 165 calories, 31 g protein (5.3 calories per gram of protein)',
        'Chicken thigh, baked, no skin: 179 calories, 24.8 g protein (7.2)',
        'Chicken drumstick: 205 calories, 21 g protein (9.8)',
        '90% lean ground beef, cooked: 214 calories, 26.6 g protein (8.0)',
        'Salmon: 208 calories, 20.4 g protein (10.2), with more healthy fats'
      ],
      toolCta: { label: 'See the protein foods chart', href: '/foods/category/protein-foods' }
    },
    {
      id: 'protein-target',
      heading: 'How much chicken to hit your protein target',
      body: [
        'The 2025-2030 Dietary Guidelines for Americans set a protein goal of 1.2 to 1.6 g per kg of body weight a day. For someone weighing 75 kg (about 165 lb) that is 90 to 120 g. A 4 oz portion of cooked chicken breast provides 35 g, so one portion at lunch and one at dinner covers most of the lower end, with eggs, dairy, beans or grains making up the rest.'
      ],
      toolCta: { label: 'Work out your protein target', href: '/protein-calculator' }
    }
  ],
  faqs: [
    {
      question: 'How many calories are in 100 g of chicken breast?',
      answer: 'Cooked skinless chicken breast has about 165 calories per 100 g, with 31 g of protein. Raw chicken breast has about 120 calories per 100 g, because it still contains the water that cooking removes.'
    },
    {
      question: 'How many calories are in 4 oz of chicken breast?',
      answer: 'About 186 calories and 35 g of protein for 4 oz (113 g) of cooked, skinless chicken breast, or about 136 calories for 4 oz weighed raw.'
    },
    {
      question: 'Should I weigh chicken raw or cooked?',
      answer: 'Either is fine if you log it with the matching figure. Raw weights are more consistent, because cooking loss varies with time and temperature. Mixing them up, such as a raw weight with a cooked entry, can throw your count off by about a third.'
    },
    {
      question: 'How many calories does chicken skin add?',
      answer: 'Roasted chicken breast with skin has about 192 calories per 100 g, against about 165 without it, so the skin adds about 27 calories per 100 g, mostly as fat.'
    },
    {
      question: 'Is chicken thigh or breast better for weight loss?',
      answer: 'Breast is leaner, at about 165 calories per 100 g cooked against 179 for a skinless thigh, and it has more protein. Thighs are still a good choice; the difference is small once the skin is removed.'
    }
  ],
  relatedSlugs: ['how-much-protein-do-i-need', 'high-protein-foods-list', 'how-to-track-calories-accurately']
};
