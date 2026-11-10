// Formulas for the BMI, body fat, calories burned, water and ideal weight calculators.
// Estimates for healthy adults, not medical advice. scripts/test-body-metrics.mjs checks them.
import type { Sex } from './energy';

const round1 = (v: number) => Math.round(v * 10) / 10;

// --- BMI (WHO and CDC adult categories) ----------------------------------------------
export const bmi = (weightKg: number, heightCm: number) => weightKg / (heightCm / 100) ** 2;

export function bmiCategory(value: number): { label: string; tone: 'low' | 'ok' | 'high' } {
  if (value < 18.5) return { label: 'Underweight', tone: 'low' };
  if (value < 25) return { label: 'Healthy weight', tone: 'ok' };
  if (value < 30) return { label: 'Overweight', tone: 'high' };
  return { label: 'Obesity', tone: 'high' };
}

// Weight for a BMI of 18.5 to 24.9 at this height.
export function healthyWeightRange(heightCm: number) {
  const m2 = (heightCm / 100) ** 2;
  return { min: round1(18.5 * m2), max: round1(24.9 * m2) };
}

// --- Body fat (US Navy circumference method, metric form) -----------------------------
export function navyBodyFat(p: { sex: Sex; heightCm: number; neckCm: number; waistCm: number; hipCm?: number }): number {
  const pct = p.sex === 'male'
    ? 495 / (1.0324 - 0.19077 * Math.log10(p.waistCm - p.neckCm) + 0.15456 * Math.log10(p.heightCm)) - 450
    : 495 / (1.29579 - 0.35004 * Math.log10(p.waistCm + (p.hipCm ?? 0) - p.neckCm) + 0.221 * Math.log10(p.heightCm)) - 450;
  return round1(pct);
}

// American Council on Exercise ranges.
const BODY_FAT_BANDS: Record<Sex, [number, string][]> = {
  male: [[6, 'Essential fat'], [14, 'Athletes'], [18, 'Fitness'], [25, 'Average']],
  female: [[14, 'Essential fat'], [21, 'Athletes'], [25, 'Fitness'], [32, 'Average']],
};

// Below essential fat, or implausibly high, means the measurements are off rather than
// the body: very lean builds can push the Navy formula negative.
const PLAUSIBLE_BODY_FAT: Record<Sex, [number, number]> = { male: [2, 60], female: [10, 65] };

export function isPlausibleBodyFat(sex: Sex, pct: number): boolean {
  const [min, max] = PLAUSIBLE_BODY_FAT[sex];
  return Number.isFinite(pct) && pct >= min && pct <= max;
}

// ACE calls the top band "Obese"; it is shown here as "Above average".
export function bodyFatCategory(sex: Sex, pct: number): string {
  return BODY_FAT_BANDS[sex].find(([upTo]) => pct < upTo)?.[1] ?? 'Above average';
}

const inRange = (v: number | undefined, min: number, max: number) => v !== undefined && Number.isFinite(v) && v >= min && v <= max;

export function validateTape(p: { sex: Sex; neckCm: number; waistCm: number; hipCm?: number }): string[] {
  if (!inRange(p.neckCm, 20, 70) || !inRange(p.waistCm, 40, 250)) {
    return ['Check your neck and waist measurements: a neck of 8 to 27 in (20 to 70 cm) and a waist of 16 to 98 in (40 to 250 cm), in the units you chose.'];
  }
  if (p.sex === 'female' && !inRange(p.hipCm, 50, 250)) return ['Enter your hip measurement. The method for women uses it.'];
  if (p.waistCm <= p.neckCm) return ['Your waist measurement needs to be larger than your neck. Check both measurements.'];
  return [];
}

// --- Calories burned (Compendium of Physical Activities, 2011 MET values) -------------
export interface Activity { id: string; label: string; met: number }

export const ACTIVITIES: Activity[] = [
  { id: 'walk-slow', label: 'Walking, slow (2 mph, 3.2 km/h)', met: 2.8 },
  { id: 'walk-moderate', label: 'Walking, moderate (3 mph, 4.8 km/h)', met: 3.5 },
  { id: 'walk-brisk', label: 'Walking, brisk (3.5 mph, 5.6 km/h)', met: 4.3 },
  { id: 'walk-fast', label: 'Walking, very brisk (4 mph, 6.4 km/h)', met: 5.0 },
  { id: 'hiking', label: 'Hiking, cross-country', met: 6.0 },
  { id: 'run-5', label: 'Running, 5 mph (12 min/mile)', met: 8.3 },
  { id: 'run-6', label: 'Running, 6 mph (10 min/mile)', met: 9.8 },
  { id: 'run-7', label: 'Running, 7 mph (8.5 min/mile)', met: 11.0 },
  { id: 'run-8', label: 'Running, 8 mph (7.5 min/mile)', met: 11.8 },
  { id: 'cycle-leisure', label: 'Cycling, leisurely (10 to 12 mph)', met: 6.8 },
  { id: 'cycle-moderate', label: 'Cycling, moderate (12 to 14 mph)', met: 8.0 },
  { id: 'cycle-fast', label: 'Cycling, fast (14 to 16 mph)', met: 10.0 },
  { id: 'cycle-stationary', label: 'Stationary bike, general', met: 7.0 },
  { id: 'elliptical', label: 'Elliptical trainer, moderate', met: 5.0 },
  { id: 'swim-leisure', label: 'Swimming, leisurely', met: 6.0 },
  { id: 'swim-laps', label: 'Swimming laps, freestyle, moderate', met: 5.8 },
  { id: 'weights', label: 'Weight training, moderate', met: 3.5 },
  { id: 'weights-vigorous', label: 'Weight training, vigorous', met: 6.0 },
  { id: 'yoga', label: 'Yoga, hatha', met: 2.5 },
  { id: 'jump-rope', label: 'Jumping rope, moderate pace', met: 11.8 },
  { id: 'tennis', label: 'Tennis, singles', met: 8.0 },
  { id: 'basketball', label: 'Basketball, game', met: 8.0 },
  { id: 'golf', label: 'Golf, walking and carrying clubs', met: 4.3 },
  { id: 'gardening', label: 'Gardening, general', met: 3.8 },
  { id: 'cleaning', label: 'House cleaning, general', met: 3.3 },
];

// kcal per minute = MET x 3.5 x kg / 200. Includes what the body burns at rest in that time.
export const caloriesBurned = (p: { met: number; weightKg: number; minutes: number }) =>
  Math.round(((p.met * 3.5 * p.weightKg) / 200) * p.minutes);

// --- Water (US National Academies adequate intake, total water from food and drinks) ---
const BASE_WATER_L: Record<Sex, number> = { male: 3.7, female: 2.7 };
const FROM_DRINKS = 0.8; // About 20% of water comes from food.
// Rules of thumb (about 12 fl oz per 30 minutes of exercise), not National Academies figures.
const EXERCISE_L_PER_30_MIN = 0.35;
const HOT_WEATHER_L = 0.5;

export function waterIntake(p: { sex: Sex; exerciseMinutes: number; hot: boolean }) {
  const extra = (Math.max(0, p.exerciseMinutes) / 30) * EXERCISE_L_PER_30_MIN + (p.hot ? HOT_WEATHER_L : 0);
  const base = BASE_WATER_L[p.sex];
  return { totalL: round1(base + extra), drinksL: round1(base * FROM_DRINKS + extra) };
}

// --- Ideal weight formulas (kg), defined from 5 ft (60 in) ----------------------------
// [kg at 5 ft, kg per inch over 5 ft], men then women.
const IDEAL: Record<'devine' | 'robinson' | 'miller' | 'hamwi', Record<Sex, [number, number]>> = {
  devine: { male: [50, 2.3], female: [45.5, 2.3] },
  robinson: { male: [52, 1.9], female: [49, 1.7] },
  miller: { male: [56.2, 1.41], female: [53.1, 1.36] },
  hamwi: { male: [48, 2.7], female: [45.5, 2.2] },
};

export function idealWeights(sex: Sex, heightCm: number) {
  const over = heightCm / 2.54 - 60;
  const calc = (name: keyof typeof IDEAL) => (over < 0 ? null : round1(IDEAL[name][sex][0] + IDEAL[name][sex][1] * over));
  return { devine: calc('devine'), robinson: calc('robinson'), miller: calc('miller'), hamwi: calc('hamwi') };
}
