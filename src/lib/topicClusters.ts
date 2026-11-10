// Topic clusters behind the "Related tools and guides" block. Each page lists
// same-topic tools, articles and charts so readers and Google can follow a topic.
// Adding a page? Put it in at least one cluster; scripts/test-topic-clusters.mjs checks.

export type RelatedKind = 'tool' | 'article' | 'chart';
export type Related = { tools: string[]; articles: string[]; charts: string[] };

export const LIMITS: Record<keyof Related, number> = { tools: 2, articles: 3, charts: 2 };

export const TOOL_NAMES: Record<string, string> = {
  '/calculator': 'Food nutrition calculator',
  '/compare-foods': 'Compare foods',
  '/meal-calorie-calculator': 'Meal calorie calculator',
  '/recipe-nutrition-calculator': 'Recipe nutrition calculator',
  '/nutrition-label-generator': 'Nutrition label generator',
  '/tdee-calculator': 'TDEE calculator',
  '/macro-calculator': 'Macro calculator',
  '/calorie-deficit-calculator': 'Calorie deficit calculator',
  '/protein-calculator': 'Protein calculator',
  '/bmi-calculator': 'BMI calculator',
  '/body-fat-calculator': 'Body fat calculator',
  '/calories-burned-calculator': 'Calories burned calculator',
  '/water-intake-calculator': 'Water intake calculator',
  '/ideal-weight-calculator': 'Ideal weight calculator',
};

export const TOPIC_CLUSTERS: ({ id: string } & Related)[] = [
  {
    id: 'weight-loss',
    tools: ['/tdee-calculator', '/calorie-deficit-calculator', '/calories-burned-calculator'],
    articles: ['tdee-explained', 'what-is-a-calorie-deficit', 'how-many-calories-should-i-eat-to-lose-weight', 'why-am-i-not-losing-weight', 'how-to-track-calories-accurately', 'low-calorie-snacks-under-100-calories'],
    charts: ['snacks', 'fruits', 'vegetables'],
  },
  {
    id: 'protein-macros',
    tools: ['/macro-calculator', '/protein-calculator'],
    articles: ['how-much-protein-do-i-need', 'high-protein-foods-list', 'how-to-count-macros-for-beginners', 'calories-vs-macros', 'how-much-fiber-do-you-need'],
    charts: ['protein-foods', 'beans-plant-protein', 'dairy-alternatives', 'nuts-seeds'],
  },
  {
    id: 'body',
    tools: ['/bmi-calculator', '/body-fat-calculator', '/ideal-weight-calculator', '/water-intake-calculator'],
    articles: ['how-many-calories-should-i-eat-to-lose-weight', 'what-is-a-calorie-deficit'],
    charts: ['beverages'],
  },
  {
    id: 'labels-tracking',
    tools: ['/calculator', '/compare-foods', '/nutrition-label-generator'],
    articles: ['how-to-read-a-nutrition-facts-label', 'how-to-calculate-calories-in-food', 'serving-size-vs-portion-size', 'usda-fooddata-central-explained', 'how-to-compare-two-foods', 'how-much-salt-per-day', 'how-much-sugar-per-day', 'uk-vs-us-food-labels', 'calories-in-rice-cooked-vs-uncooked'],
    charts: ['condiments-oils', 'baking-cooking-ingredients', 'grains-cereals'],
  },
  {
    id: 'meals',
    tools: ['/recipe-nutrition-calculator', '/meal-calorie-calculator', '/nutrition-label-generator'],
    articles: ['how-to-calculate-calories-in-a-meal', 'how-to-calculate-calories-in-a-homemade-recipe', 'how-recipe-nutrition-calculators-work', 'healthy-meal-planning-on-a-budget', 'how-many-calories-in-a-slice-of-pizza', 'calories-in-a-burger-and-fries', 'calories-in-beer-wine-and-spirits', 'calories-in-coffee-drinks', 'calories-in-bread', 'indian-takeaway-calories', 'how-many-calories-in-an-egg', 'calories-in-fruit-lowest-to-highest', 'calories-in-breakfast-foods', 'healthier-fast-food-swaps'],
    charts: ['breakfast', 'bread-bakery', 'fast-food-style', 'prepared-meals', 'desserts', 'indian-foods', 'beverages'],
  },
];

const GROUP: Record<RelatedKind, keyof Related> = { tool: 'tools', article: 'articles', chart: 'charts' };

/** Same-topic pages for one page, excluding itself and `skip`. */
export function getRelated(kind: RelatedKind, id: string, skip: string[] = []): Related {
  const own = GROUP[kind];
  const clusters = TOPIC_CLUSTERS.filter(c => c[own].includes(id));
  const result: Related = { tools: [], articles: [], charts: [] };
  if (!clusters.length) return result;
  // Rotate by the page's position so neighbours show different links rather
  // than every page in a cluster linking to its first few members.
  const offset = clusters[0][own].indexOf(id);
  for (const group of Object.keys(result) as (keyof Related)[]) {
    const pool = [...new Set(clusters.flatMap(c => c[group]))].filter(x => x !== id && !skip.includes(x));
    const start = pool.length ? offset % pool.length : 0;
    result[group] = [...pool.slice(start), ...pool.slice(0, start)].slice(0, LIMITS[group]);
  }
  return result;
}
