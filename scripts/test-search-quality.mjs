

const terms = [
  'banana', 'bannana', 'oatmeal', 'rolled oats', 'greek yogurt',
  'greek yoghurt', 'garbanzo', 'chickpeas', 'brown rice', 'peanut butter',
  'almond milk', 'broccoli', 'salmon', 'chicken breast', 'olive oil',
  'pizza', 'coffee'
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log("======================================");
  console.log("Search Quality API Test");
  console.log("======================================\n");
  
  // Wait for dev server to be ready
  await sleep(3000);

  let passed = true;

  for (const term of terms) {
    const start = performance.now();
    try {
      const res = await fetch(`http://localhost:4321/api/foods/search?q=${encodeURIComponent(term)}`);
      const ms = performance.now() - start;
      
      if (!res.ok) {
        const text = await res.text();
        console.log(`❌ [${ms.toFixed(2)}ms] "${term}": API Error ${res.status} - ${text}`);
        passed = false;
        continue;
      }

      const responseBody = await res.json();
      const results = responseBody.data;
      
      if (!results || results.length === 0) {
        console.log(`❌ [${ms.toFixed(2)}ms] "${term}": No results found!`);
        passed = false;
      } else {
        const top = results[0];
        const matchName = top.food.displayName;
        console.log(`✅ [${ms.toFixed(2)}ms] "${term}": Found ${results.length} results. Top: ${matchName} (${top.sourceLabel})`);
      }
    } catch (e) {
      console.log(`❌ "${term}": Request failed - ${e.message}`);
      passed = false;
    }
  }

  if (passed) {
    console.log("\nAll search terms returned results successfully.");
    console.log("Status: READY");
  } else {
    console.log("\nSome search terms failed.");
    process.exit(1);
  }
}

main().catch(e => {
  console.error("Search Quality Error:", e);
  process.exit(1);
});
