// Formulas behind the TDEE and macro calculators. Estimates for adults, not medical advice.
export type Sex = 'male' | 'female';
export type Goal = 'lose' | 'maintain' | 'gain';
export type Activity = 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';

export const ACTIVITY_FACTORS: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9,
};

export const CALORIE_FLOOR: Record<Sex, number> = { female: 1200, male: 1500 };

const DEFICIT = 500;
const SURPLUS = 300;
const PROTEIN_G_PER_KG: Record<Goal, number> = { lose: 1.8, maintain: 1.6, gain: 1.8 };
const FAT_SHARE = 0.25;
const MAX_PROTEIN_SHARE = 0.35;

// Mifflin-St Jeor.
export function bmr(p: { sex: Sex; age: number; weightKg: number; heightCm: number }): number {
  return 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age + (p.sex === 'male' ? 5 : -161);
}

export function calorieTargets(tdee: number, sex: Sex) {
  const floor = CALORIE_FLOOR[sex];
  return {
    // Capped at TDEE: someone already under the floor must not be told to eat more to "lose".
    lose: Math.min(tdee, Math.max(floor, tdee - DEFICIT)),
    maintain: tdee,
    gain: tdee + SURPLUS,
    floorApplied: tdee - DEFICIT < floor,
  };
}

// Grams per day. Protein is set by body weight up to 35% of calories (the top of the usual
// 10 to 35% range), fat by share of calories, and carbs take the rest.
export function macros(p: { calories: number; weightKg: number; goal: Goal }) {
  const protein = Math.round(Math.min(p.weightKg * PROTEIN_G_PER_KG[p.goal], (p.calories * MAX_PROTEIN_SHARE) / 4));
  const fatCalories = p.calories * FAT_SHARE;
  return {
    protein,
    fat: Math.round(fatCalories / 9),
    carbs: Math.round((p.calories - protein * 4 - fatCalories) / 4),
  };
}

const LB_PER_KG = 2.20462;
const CM_PER_IN = 2.54;

export const lbToKg = (lb: number) => lb / LB_PER_KG;
export const kgToLb = (kg: number) => kg * LB_PER_KG;
export const ftInToCm = (ft: number, inches: number) => (ft * 12 + inches) * CM_PER_IN;

export function cmToFtIn(cm: number) {
  // Round total inches first so the result can never read as 5 ft 12 in.
  const total = Math.round(cm / CM_PER_IN);
  return { ft: Math.floor(total / 12), inches: total % 12 };
}

const inRange = (v: number, min: number, max: number) => Number.isFinite(v) && v >= min && v <= max;

// Checked before conversion, because 5.11 ft or 5 ft 15 in still make a believable height in cm.
// Empty boxes are left to validateProfile.
export function validateUsHeight(ft: number, inches: number): string[] {
  const badFt = Number.isFinite(ft) && (!Number.isInteger(ft) || ft < 1);
  const badIn = Number.isFinite(inches) && (inches < 0 || inches >= 12);
  return badFt || badIn ? ['Enter height as whole feet plus 0 to 11 inches, for example 5 ft 11 in.'] : [];
}

export function validateProfile(p: { age: number; weightKg: number; heightCm: number }): string[] {
  const errors: string[] = [];
  if (!inRange(p.age, 18, 100)) errors.push('Enter an age from 18 to 100. These formulas are for adults.');
  if (!inRange(p.heightCm, 120, 230)) errors.push('Enter a height between 4 ft (120 cm) and 7 ft 6 in (230 cm).');
  if (!inRange(p.weightKg, 30, 300)) errors.push('Enter a weight between 67 lb (30 kg) and 660 lb (300 kg).');
  return errors;
}
