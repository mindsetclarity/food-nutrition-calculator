import { searchLocalFoods } from '../src/lib/nutrition-engine/search/index.ts';

// Setup TS Node environment mock to test TypeScript safely 
// Note: To run this properly, use node with tsx or ts-node, or run transpiled output.
// For manual validation:

const testQueries = [
  "banana",
  "bannana",
  "oatmeal",
  "oat meal",
  "greek yogurt",
  "greek yoghurt",
  "chickpeas",
  "garbanzo",
  "brown rice",
  "cooked rice",
  "peanut butter",
  "almond milk",
  "broccoli",
  "apple",
  "lentils",
  "orange juice"
];

console.log("=========================================");
console.log("Testing Nutrition Engine V2 Food Search");
console.log("=========================================\n");

testQueries.forEach(q => {
  const result = searchLocalFoods({ query: q, limit: 3, mode: "calculator" });
  console.log(`QUERY: "${q}"`);
  console.log(`  Hits: ${result.returned} / ${result.total}`);
  
  if (result.results.length === 0) {
    console.log(`  (No results found)`);
  } else {
    result.results.forEach((r, idx) => {
      console.log(`  ${idx + 1}. [${r.confidence.level.toUpperCase()}] ${r.displayName} (Score: ${r.score}) - Reason: ${r.matchReason}`);
    });
  }
  console.log("");
});
