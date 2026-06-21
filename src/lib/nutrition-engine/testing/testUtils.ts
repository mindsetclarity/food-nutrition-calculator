import { searchLocalFoods } from '../search/foodSearch';
import { calculateRecipeEngine } from '../index';
import type { FoodSearchInput } from '../search/searchTypes';

export function runGoldenSearchTest(query: string, expectedMatches: string[]): boolean {
  const result = searchLocalFoods({ query, limit: 10, mode: 'strict' });
  if (!result.results || result.results.length === 0) return false;
  
  const topMatch = result.results[0].displayName.toLowerCase();
  return expectedMatches.some(m => topMatch.includes(m.toLowerCase()));
}

export function isBetween(val: number, range: [number, number]): boolean {
  return val >= range[0] && val <= range[1];
}

// Simple test helper logging
export function printTestResult(name: string, passed: boolean, errorMsg?: string) {
  if (passed) {
    console.log(`✅ PASS: ${name}`);
  } else {
    console.log(`❌ FAIL: ${name}`);
    if (errorMsg) console.log(`   └─ ${errorMsg}`);
  }
}
