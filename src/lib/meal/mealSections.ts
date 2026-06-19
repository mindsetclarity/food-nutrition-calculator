import type { MealSectionDefinition } from './types';

export const MEAL_SECTIONS: MealSectionDefinition[] = [
  {
    id: 'breakfast',
    label: 'Breakfast',
    description: 'Morning meal and early snacks.',
    sortOrder: 1
  },
  {
    id: 'lunch',
    label: 'Lunch',
    description: 'Midday meal.',
    sortOrder: 2
  },
  {
    id: 'dinner',
    label: 'Dinner',
    description: 'Evening meal.',
    sortOrder: 3
  },
  {
    id: 'snacks',
    label: 'Snacks',
    description: 'Light bites between meals.',
    sortOrder: 4
  },
  {
    id: 'drinks',
    label: 'Drinks',
    description: 'Beverages and shakes.',
    sortOrder: 5
  }
];

export function getMealSectionDefinition(id: string): MealSectionDefinition | undefined {
  return MEAL_SECTIONS.find(s => s.id === id);
}
