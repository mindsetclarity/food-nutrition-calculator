// One menu for the header (dropdowns + mobile menu) and the footer columns.

export type NavLink = { name: string; href: string; description?: string };
export type NavGroup = { name: string; links: NavLink[] };

export const NAV_GROUPS: NavGroup[] = [
  {
    name: 'Food & Recipes',
    links: [
      { name: 'Food Calculator', href: '/calculator', description: 'Calories and macros for any food' },
      { name: 'Recipe Calculator', href: '/recipe-nutrition-calculator', description: 'Nutrition per serving for a recipe' },
      { name: 'Meal Calculator', href: '/meal-calorie-calculator', description: 'Add up a meal or a whole day' },
      { name: 'Compare Foods', href: '/compare-foods', description: 'Two foods side by side' },
      { name: 'Nutrition Label Generator', href: '/nutrition-label-generator', description: 'A label for your food blog' },
    ],
  },
  {
    name: 'Health & Fitness',
    links: [
      { name: 'TDEE Calculator', href: '/tdee-calculator', description: 'Calories you burn each day' },
      { name: 'Calorie Deficit Calculator', href: '/calorie-deficit-calculator', description: 'A weight loss plan and timeline' },
      { name: 'Macro Calculator', href: '/macro-calculator', description: 'Protein, carbs and fat targets' },
      { name: 'Protein Calculator', href: '/protein-calculator', description: 'How much protein you need' },
      { name: 'BMI Calculator', href: '/bmi-calculator', description: 'Body mass index and healthy range' },
      { name: 'Body Fat Calculator', href: '/body-fat-calculator', description: 'US Navy tape measure method' },
      { name: 'Ideal Weight Calculator', href: '/ideal-weight-calculator', description: 'Healthy weight for your height' },
      { name: 'Calories Burned Calculator', href: '/calories-burned-calculator', description: 'Walking, running, cycling and more' },
      { name: 'Water Intake Calculator', href: '/water-intake-calculator', description: 'How much to drink each day' },
    ],
  },
];

/** Plain top-level links next to the dropdowns. */
export const HOME: NavLink = { name: 'Home', href: '/' };

export const NAV_LINKS: NavLink[] = [
  { name: 'Calorie Charts', href: '/foods' },
  { name: 'Guides', href: '/learn' },
];

export const FOOTER_ABOUT: NavLink[] = [
  { name: 'About', href: '/about' },
  { name: 'Methodology', href: '/methodology' },
  { name: 'Data Sources', href: '/data-sources' },
  { name: 'Contact & Feedback', href: '/contact' },
];

export const FOOTER_LEGAL: NavLink[] = [
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
  { name: 'Disclaimer', href: '/disclaimer' },
];
