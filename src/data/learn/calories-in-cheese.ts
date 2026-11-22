import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'calories-in-cheese',
  slug: 'calories-in-cheese',
  title: 'Calories in Cheese: Cheddar, Mozzarella, Feta and More',
  description: 'Calories and protein in 18 cheeses per ounce, per slice and per 100 g, from cottage cheese and ricotta to cheddar and Parmesan, plus which cheeses are lowest in calories and highest in salt. All figures from USDA and UK CoFID data.',
  category: 'Calories',
  tags: ['cheese', 'dairy', 'protein', 'calories'],
  readingTimeMinutes: 6,
  updatedAt: '2026-11-22',
  relatedTool: { label: 'Food Nutrition Calculator', href: '/calculator' },
  heroSummary: 'Most hard and semi-hard cheeses have about 100 to 117 calories per ounce (28 g). Cheddar is about 116, Swiss 111 and Parmesan 117. Fresh and soft cheeses are lower: feta is about 77 per ounce, mozzarella 84 and cottage cheese just 23. Because cheese is easy to overeat, especially grated or melted, weighing it a few times is the quickest way to know what a portion really looks like.',
  keyTakeaway: 'Per ounce: cottage cheese 23 calories, ricotta 42, feta 77, mozzarella 84, halloumi 89, brie 95, American 96, cream cheese 99, cheddar 116, Parmesan and Gruyère 117. For the most protein per calorie, choose cottage cheese, Parmesan or mozzarella.',
  // The "|" stops metadata.ts appending the site name, keeping the title under 60 chars.
  seoTitle: 'Calories in Cheese | Cheddar, Mozzarella, Feta and More',
  seoDescription: 'Cheddar has about 116 calories per ounce, mozzarella 84 and feta 77. Calories and protein in 18 cheeses per ounce, per slice and per 100 g, lowest to highest.',
  sections: [
    {
      id: 'per-ounce',
      heading: 'Calories in cheese per ounce, lowest to highest',
      body: [
        'Per ounce (28 g), from USDA data, with halloumi from the UK CoFID tables. Protein is in brackets.'
      ],
      bullets: [
        'Cottage cheese: 23 calories (3.1 g)',
        'Ricotta: 42 calories (2.7 g)',
        'Feta: 77 calories (5.6 g)',
        'Mozzarella: 84 calories (6.7 g)',
        'Halloumi: 89 calories (6.8 g)',
        'Brie: 95 calories (5.9 g)',
        'American cheese: 96 calories (4.8 g)',
        'Cream cheese: 99 calories (1.7 g)',
        'Blue cheese: 100 calories (6.1 g)',
        'Provolone and Gouda: 101 calories (6.6 and 7.1 g)',
        'Goat cheese: 103 calories (6.1 g)',
        'Swiss, Monterey Jack and Colby Jack: 111 calories (6.4 to 7.7 g)',
        'Cheddar: 116 calories (6.6 g)',
        'Parmesan and Gruyère: 117 calories (8.5 and 8.4 g)'
      ],
      toolCta: { label: 'See the dairy and alternatives chart', href: '/foods/category/dairy-alternatives' }
    },
    {
      id: 'per-portion',
      heading: 'Per slice, spoonful and cup',
      body: [
        'Cheese is often eaten in slices, spoonfuls or handfuls rather than ounces. Common portions:'
      ],
      bullets: [
        'Slice of cheddar (21 g): 86 calories',
        'Slice of Swiss (21 g): 83 calories; provolone or Gouda: 75; American: 71; mozzarella: 62',
        'String cheese, 1 stick (28 g): 83 calories, 6.6 g protein',
        'Grated Parmesan, 1 tablespoon (5 g): 21 calories',
        'Cream cheese, 1 tablespoon (about 14.5 g): 51 calories',
        'Feta, 1 wedge (38 g): 104 calories',
        'Cottage cheese, half a cup (105 g): 86 calories, 11.6 g protein',
        'Ricotta, half a cup (123 g): 182 calories',
        'Shredded mozzarella, 1 cup (113 g): 334 calories; shredded cheddar, 1 cup (113 g): 461 calories'
      ],
      callout: {
        tone: 'info',
        title: 'Grated cheese adds up fast',
        body: 'A cup of shredded cheddar weighs about 113 g and has about 461 calories. A generous handful on pasta, nachos or a baked potato is easily 1 to 2 oz, or 116 to 232 calories, so it is worth weighing once to see what your usual handful is.'
      }
    },
    {
      id: 'protein',
      heading: 'Best cheeses for protein',
      body: [
        'Cheese is a good source of protein, but some types give far more protein for their calories than others. Cottage cheese stands out: half a cup has 11.6 g of protein for 86 calories. Among firm cheeses, Parmesan has the most protein per ounce (8.5 g), and mozzarella gives a good amount (6.7 g) for fewer calories than cheddar. Cream cheese is the opposite: mostly fat, with only 1.7 g of protein per ounce.'
      ],
      toolCta: { label: 'Work out your protein target', href: '/protein-calculator' }
    },
    {
      id: 'salt',
      heading: 'Salt in cheese',
      body: [
        'Cheese can be a big source of salt. Per 100 g, Swiss cheese has about 185 mg of sodium, while feta has 1,030 mg, halloumi 1,200, Parmesan 1,400 and American cheese 1,430. An ounce of American cheese has about 405 mg of sodium, nearly a fifth of the US limit of 2,300 mg a day. If you are watching your salt, Swiss, ricotta and mozzarella are lower-salt choices.'
      ],
      toolCta: { label: 'Read how much salt a day', href: '/learn/how-much-salt-per-day' }
    }
  ],
  faqs: [
    {
      question: 'How many calories are in cheddar cheese?',
      answer: 'About 116 calories per ounce (28 g), or 408 per 100 g. A 21 g slice is about 86 calories, and a cup of shredded cheddar (113 g) about 461.'
    },
    {
      question: 'Which cheese has the fewest calories?',
      answer: 'Cottage cheese, at about 23 calories per ounce or 82 per 100 g, followed by ricotta at 42 per ounce. Of the firmer cheeses, feta (77 per ounce) and mozzarella (84) are lowest.'
    },
    {
      question: 'How many calories are in mozzarella?',
      answer: 'About 84 calories per ounce, or 296 per 100 g. A slice (21 g) is about 62 calories and a string cheese stick about 83.'
    },
    {
      question: 'Is cheese good for weight loss?',
      answer: 'It can fit into a weight-loss diet. Cheese is filling and rich in protein and calcium, but it is calorie-dense, so measured portions matter. Lower-calorie options such as cottage cheese, feta and mozzarella make it easier.'
    },
    {
      question: 'How many calories are in halloumi?',
      answer: 'About 313 calories per 100 g, or 89 per ounce, according to the UK government\'s CoFID tables. It is also high in salt, at about 1,200 mg of sodium per 100 g.'
    }
  ],
  relatedSlugs: ['high-protein-foods-list', 'how-much-salt-per-day', 'how-much-protein-do-i-need']
};
