import type { MealExample } from './types';

export const MEAL_EXAMPLES: MealExample[] = [
  {
    id: 'breakfast_oatmeal',
    label: 'Oatmeal Breakfast',
    sectionId: 'breakfast',
    items: [
      { query: 'oatmeal cooked', quantity: 1, unit: 'cup' },
      { query: 'banana', quantity: 1, unit: 'piece' },
      { query: 'peanut butter', quantity: 1, unit: 'tbsp' }
    ]
  },
  {
    id: 'lunch_salad',
    label: 'Chickpea Salad Lunch',
    sectionId: 'lunch',
    items: [
      { query: 'chickpeas', quantity: 0.5, unit: 'cup' },
      { query: 'spinach raw', quantity: 2, unit: 'cup' },
      { query: 'cucumber', quantity: 0.5, unit: 'cup' },
      { query: 'olive oil', quantity: 1, unit: 'tbsp' }
    ]
  },
  {
    id: 'snack_yogurt',
    label: 'Avocado Toast Snack',
    sectionId: 'snacks',
    items: [
      { query: 'whole wheat bread', quantity: 1, unit: 'slice' },
      { query: 'avocado', quantity: 0.25, unit: 'piece' }
    ]
  }
];
