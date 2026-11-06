/**
 * Checks the BMR, calorie target and macro formulas behind the calculators.
 *
 *   node --experimental-strip-types scripts/test-energy.mjs
 */
import assert from 'node:assert/strict';

const { bmr, calorieTargets, macros, lbToKg, kgToLb, ftInToCm, cmToFtIn, validateProfile, ACTIVITY_FACTORS } =
  await import('../src/lib/nutrition/energy.ts');

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
assert.equal(macros({ calories: 1200, weightKg: 300, goal: 'lose' }).carbs, 0, 'carbs never go negative');

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

console.log('energy checks passed');
