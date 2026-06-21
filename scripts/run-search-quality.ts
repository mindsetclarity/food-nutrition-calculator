import { searchLocalFoods } from '../src/lib/nutrition-engine/search/foodSearch';

const terms = [
  'banana', 'bannana', 'oatmeal', 'rolled oats', 'greek yogurt',
  'greek yoghurt', 'garbanzo', 'chickpeas', 'brown rice', 'peanut butter',
  'almond milk', 'broccoli', 'salmon', 'chicken breast', 'olive oil',
  'pizza', 'coffee'
];

async function main() {
  console.log("======================================");
  console.log("Search Quality Test");
  console.log("======================================\n");
  
  let passed = true;

  for (const term of terms) {
    const start = performance.now();
    const result = searchLocalFoods({ query: term, limit: 5 });
    const ms = performance.now() - start;
    
    if (result.results.length === 0) {
      console.log(`❌ [${ms.toFixed(2)}ms] "${term}": No results found!`);
      passed = false;
    } else {
      const top = result.results[0];
      const matchName = top.food.displayName;
      console.log(`✅ [${ms.toFixed(2)}ms] "${term}": Found ${result.totalCount} results. Top: ${matchName}`);
    }
  }

  if (passed) {
    console.log("\nAll search terms returned results successfully.");
  } else {
    console.log("\nSome search terms failed.");
    process.exit(1);
  }
}

main().catch(e => {
  console.error("Search Quality Error:", e);
  process.exit(1);
});
