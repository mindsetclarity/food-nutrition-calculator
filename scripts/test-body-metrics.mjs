/**
 * Checks the formulas behind the BMI, body fat, calories burned, water and ideal weight
 * calculators. Expected values are worked by hand from the published formulas.
 *
 *   node --experimental-strip-types scripts/test-body-metrics.mjs
 */
import assert from 'node:assert/strict';

const {
  bmi, bmiCategory, healthyWeightRange, navyBodyFat, bodyFatCategory, ACTIVITIES, caloriesBurned,
  waterIntake, idealWeights, validateTape,
} = await import('../src/lib/nutrition/bodyMetrics.ts');

const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg}: ${a} vs ${b}`);

// BMI: 80 kg at 180 cm = 80 / 1.8^2 = 24.69.
near(bmi(80, 180), 24.69, 0.01, 'bmi');
assert.equal(bmiCategory(18.4).label, 'Underweight');
assert.equal(bmiCategory(18.5).label, 'Healthy weight');
assert.equal(bmiCategory(24.9).label, 'Healthy weight');
assert.equal(bmiCategory(25).label, 'Overweight');
assert.equal(bmiCategory(29.9).label, 'Overweight');
assert.equal(bmiCategory(30).label, 'Obesity');
assert.equal(bmiCategory(40).label, 'Obesity');
// BMI 18.5 to 24.9 at 180 cm: 59.9 to 80.7 kg.
const range = healthyWeightRange(180);
near(range.min, 59.9, 0.05, 'range min');
near(range.max, 80.7, 0.05, 'range max');

// US Navy body fat, metric. Man 180 cm, neck 38, waist 85: 495 / 1.06199 - 450 = 16.1%.
near(navyBodyFat({ sex: 'male', heightCm: 180, neckCm: 38, waistCm: 85 }), 16.1, 0.1, 'navy male');
// Woman 165 cm, neck 32, waist 70, hips 95: 495 / 1.04241 - 450 = 24.9%.
near(navyBodyFat({ sex: 'female', heightCm: 165, neckCm: 32, waistCm: 70, hipCm: 95 }), 24.9, 0.1, 'navy female');
assert.equal(bodyFatCategory('male', 16.1), 'Fitness');
assert.equal(bodyFatCategory('female', 24.9), 'Fitness', 'ACE: women 21 to 24% is fitness');
assert.equal(bodyFatCategory('female', 25), 'Average', 'ACE: women 25 to 31% is average');
assert.equal(bodyFatCategory('male', 10), 'Athletes');
assert.equal(bodyFatCategory('female', 33), 'Above average');
// Tape checks: a waist not bigger than the neck cannot be measured this way.
assert.deepEqual(validateTape({ sex: 'male', neckCm: 38, waistCm: 85 }), []);
assert.equal(validateTape({ sex: 'male', neckCm: 40, waistCm: 38 }).length, 1);
assert.equal(validateTape({ sex: 'female', neckCm: 32, waistCm: 70, hipCm: NaN }).length, 1, 'women need hips');
assert.equal(validateTape({ sex: 'male', neckCm: NaN, waistCm: 85 }).length, 1);

// Calories burned: MET x 3.5 x kg / 200 per minute. Running 6 mph (9.8 MET), 70 kg, 30 min = 360.
assert.equal(caloriesBurned({ met: 9.8, weightKg: 70, minutes: 30 }), 360);
assert.ok(ACTIVITIES.length >= 12);
for (const a of ACTIVITIES) {
  assert.ok(a.met > 1 && a.met < 16, `${a.id} MET ${a.met}`);
  assert.ok(a.label.length > 3);
}
assert.equal(new Set(ACTIVITIES.map(a => a.id)).size, ACTIVITIES.length, 'activity ids unique');

// Water, US National Academies: total water 3.7 L (men) or 2.7 L (women), about 80% from drinks.
assert.deepEqual(waterIntake({ sex: 'male', exerciseMinutes: 0, hot: false }), { totalL: 3.7, drinksL: 3.0 });
assert.deepEqual(waterIntake({ sex: 'female', exerciseMinutes: 0, hot: false }), { totalL: 2.7, drinksL: 2.2 });
// Plus about 0.35 L of drinks for each 30 minutes of exercise and 0.5 L in hot weather.
assert.deepEqual(waterIntake({ sex: 'female', exerciseMinutes: 60, hot: true }), { totalL: 3.9, drinksL: 3.4 });

// Ideal weight at 180 cm (70.87 in, 10.87 in over 5 ft), men.
const ideal = idealWeights('male', 180);
near(ideal.devine, 75.0, 0.1, 'devine');
near(ideal.robinson, 72.65, 0.1, 'robinson');
near(ideal.miller, 71.5, 0.1, 'miller');
near(ideal.hamwi, 77.3, 0.1, 'hamwi');
// Women: 165 cm (64.96 in, 4.96 over), Devine 45.5 + 2.3 x 4.96 = 56.9.
near(idealWeights('female', 165).devine, 56.9, 0.1, 'devine female');
// The formulas are only defined from 5 ft; below that they are left out.
assert.equal(idealWeights('female', 150).devine, null);

console.log('body metrics checks passed');
