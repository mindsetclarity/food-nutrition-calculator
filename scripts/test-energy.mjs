/**
 * Checks the BMR, calorie target and macro formulas behind the calculators.
 *
 *   node --experimental-strip-types scripts/test-energy.mjs
 */
import assert from 'node:assert/strict';

const {
  bmr, calorieTargets, macros, lbToKg, kgToLb, ftInToCm, cmToFtIn, validateProfile, validateUsHeight, ACTIVITY_FACTORS,
  deficitPlan, validateGoalWeight, proteinRange, validateWeight,
} = await import('../src/lib/nutrition/energy.ts');

// Deficit plan. BMR 1780 x 1.55 = 2759, minus 500 = 2259 a day.
const man = { sex: 'male', age: 30, heightCm: 180, activity: 'moderate' };
const plan = deficitPlan({ ...man, weightKg: 80, goalKg: 75, lbPerWeek: 1 });
assert.equal(plan.tdee, 2759);
assert.equal(plan.target, 2259);
assert.equal(plan.dailyDeficit, 500);
assert.equal(plan.floorLimited, false);
assert.equal(plan.plateauKg, null);
assert.ok(plan.weeks > 11 && plan.weeks <= 14, `loss slows as weight falls: ${plan.weeks} weeks`);
assert.equal(plan.goalTdee, Math.round(bmr({ ...man, weightKg: 75 }) * 1.55));

// A fixed intake levels off when TDEE falls to meet it: 2879 kcal is about 88 kg here.
const far = deficitPlan({ ...man, weightKg: 120, goalKg: 70, lbPerWeek: 1 });
assert.equal(far.weeks, null);
assert.ok(far.plateauKg > 87 && far.plateauKg < 91, `levels off near 88 kg: ${far.plateauKg}`);

// The floor limits the pace, and the date reflects the real deficit.
const small = { sex: 'female', age: 30, heightCm: 165, activity: 'sedentary' };
const limited = deficitPlan({ ...small, weightKg: 55, goalKg: 53, lbPerWeek: 2 });
assert.equal(limited.target, 1200);
assert.equal(limited.floorLimited, true);
assert.equal(limited.dailyDeficit, 324);

// TDEE already under the floor: no target above TDEE, no loss, no date.
const under = deficitPlan({ sex: 'female', age: 60, heightCm: 150, activity: 'sedentary', weightKg: 45, goalKg: 43, lbPerWeek: 1 });
assert.equal(under.target, under.tdee);
assert.equal(under.dailyDeficit, 0);
assert.equal(under.weeks, null);
assert.equal(under.plateauKg, 45);

// A deficit too small to move the scale is reported as such, not as a level-off.
const tiny = deficitPlan({ sex: 'female', age: 60, heightCm: 150, activity: 'sedentary', weightKg: 53.4, goalKg: 52, lbPerWeek: 2 });
assert.equal(tiny.floorLimited, true);
assert.ok(tiny.dailyDeficit >= 0 && tiny.dailyDeficit < 22, `tiny deficit: ${tiny.dailyDeficit}`);
assert.equal(tiny.noRealDeficit, true);
assert.equal(plan.noRealDeficit, false);
assert.equal(under.noRealDeficit, true);

// Goal weight: below current, and not under a healthy BMI of 18.5 (about 59.9 kg at 180 cm).
assert.deepEqual(validateGoalWeight(70, 80, 180), []);
assert.deepEqual(validateGoalWeight(61, 80, 180), []);
assert.equal(validateGoalWeight(59, 80, 180).length, 1, 'under BMI 18.5');
assert.equal(validateGoalWeight(80, 80, 180).length, 1, 'same as current');
assert.equal(validateGoalWeight(90, 80, 180).length, 1, 'above current');
assert.equal(validateGoalWeight(NaN, 80, 180).length, 1, 'empty');

// Protein ranges. The macro calculator assumes regular exercise, so it sits inside the active ranges.
assert.deepEqual(proteinRange({ weightKg: 80, goal: 'maintain', activity: 'low' }), { min: 64, max: 96, perMealMin: 16, perMealMax: 32 });
assert.deepEqual(proteinRange({ weightKg: 80, goal: 'maintain', activity: 'active' }), { min: 112, max: 128, perMealMin: 28, perMealMax: 43 });
assert.deepEqual(proteinRange({ weightKg: 80, goal: 'lose', activity: 'low' }), { min: 128, max: 160, perMealMin: 32, perMealMax: 53 });
assert.deepEqual(proteinRange({ weightKg: 80, goal: 'gain', activity: 'active' }), { min: 128, max: 176, perMealMin: 32, perMealMax: 59 });
for (const goal of ['maintain', 'lose', 'gain']) {
  const { protein } = macros({ calories: 2500, weightKg: 80, goal });
  const { min, max } = proteinRange({ weightKg: 80, goal, activity: 'active' });
  assert.ok(protein >= min && protein <= max, `macro calculator's ${protein} g is inside ${min}-${max} for ${goal}`);
}
assert.deepEqual(validateWeight(80), []);
for (const bad of [NaN, 0, -5, 29, 301]) assert.equal(validateWeight(bad).length, 1, `weight ${bad}`);

// Mifflin-St Jeor, worked by hand.
assert.equal(bmr({ sex: 'male', age: 30, weightKg: 80, heightCm: 180 }), 1780);
assert.equal(bmr({ sex: 'female', age: 30, weightKg: 65, heightCm: 165 }), 1370.25);
assert.deepEqual(Object.values(ACTIVITY_FACTORS), [1.2, 1.375, 1.55, 1.725, 1.9]);

// Targets and the calorie floor.
assert.deepEqual(calorieTargets(2759, 'male'), { lose: 2259, maintain: 2759, gain: 3059, floorApplied: false });
assert.deepEqual(calorieTargets(1600, 'female'), { lose: 1200, maintain: 1600, gain: 1900, floorApplied: true });
assert.deepEqual(calorieTargets(1800, 'male'), { lose: 1500, maintain: 1800, gain: 2100, floorApplied: true });
// A TDEE already under the floor must not produce a "lose" target above maintenance.
assert.deepEqual(calorieTargets(1112, 'female'), { lose: 1112, maintain: 1112, gain: 1412, floorApplied: true });

// Macros: 128 g protein (512 kcal) + 25% fat (500 kcal, 56 g) leaves 988 kcal = 247 g carbs.
assert.deepEqual(macros({ calories: 2000, weightKg: 80, goal: 'maintain' }), { protein: 128, fat: 56, carbs: 247 });
assert.equal(macros({ calories: 2000, weightKg: 80, goal: 'lose' }).protein, 144);
assert.equal(macros({ calories: 2000, weightKg: 80, goal: 'gain' }).protein, 144);
// Body-weight protein is capped at 35% of calories, which matters at higher weights.
assert.deepEqual(macros({ calories: 1200, weightKg: 300, goal: 'lose' }), { protein: 105, fat: 33, carbs: 120 });
assert.equal(macros({ calories: 2500, weightKg: 150, goal: 'lose' }).protein, 219);

// Units.
assert.ok(Math.abs(lbToKg(176) - 79.83) < 0.01);
assert.ok(Math.abs(kgToLb(80) - 176.37) < 0.01);
assert.ok(Math.abs(ftInToCm(5, 11) - 180.34) < 0.01);
assert.deepEqual(cmToFtIn(180), { ft: 5, inches: 11 });
assert.deepEqual(cmToFtIn(182.8), { ft: 6, inches: 0 }, 'inches must not round up to 12');

// Validation at the form boundary.
const ok = { age: 30, weightKg: 80, heightCm: 180 };
assert.deepEqual(validateProfile(ok), []);
for (const bad of [NaN, 0, -5, Infinity]) {
  assert.equal(validateProfile({ ...ok, age: bad }).length, 1, `age ${bad}`);
  assert.equal(validateProfile({ ...ok, weightKg: bad }).length, 1, `weight ${bad}`);
  assert.equal(validateProfile({ ...ok, heightCm: bad }).length, 1, `height ${bad}`);
}
assert.equal(validateProfile({ ...ok, age: 17 }).length, 1, 'adult formula: under 18 rejected');
assert.equal(validateProfile({ age: NaN, weightKg: NaN, heightCm: NaN }).length, 3);

// US height has to be checked before it becomes centimetres: 5.11 ft is not 5 ft 11 in.
assert.deepEqual(validateUsHeight(5, 11), []);
assert.deepEqual(validateUsHeight(5, 0), []);
assert.deepEqual(validateUsHeight(5, 6.5), []);
for (const [ft, inches] of [[5.11, 0], [5, 15], [5, 12], [5, -3], [-1, 90], [0, 70]]) {
  assert.equal(validateUsHeight(ft, inches).length, 1, `${ft} ft ${inches} in`);
}
assert.deepEqual(validateUsHeight(NaN, 0), [], 'an empty box is reported by validateProfile');

console.log('energy checks passed');
