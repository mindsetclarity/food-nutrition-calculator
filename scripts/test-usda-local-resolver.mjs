import { resolveFoodSources, hasUsdaApiKey } from '../src/lib/nutrition-engine/sources/index.ts';

// Manual test script for the USDA + Local Resolver
console.log("=========================================");
console.log("Testing Phase 4: USDA + Local Resolver");
console.log("=========================================\n");

console.log(`USDA API Key Detected: ${hasUsdaApiKey() ? 'YES' : 'NO (Using local fallback only)'}`);
console.log("-----------------------------------------\n");

const queries = [
  "banana",
  "oatmeal",
  "greek yogurt",
  "brown rice",
  "chickpeas"
];

async function runTests() {
  for (const q of queries) {
    console.log(`\nQUERY: "${q}"`);
    const res = await resolveFoodSources({ query: q, limit: 3, includeUsda: true, includeLocal: true });
    
    if (!res.ok) {
      console.log(`  ❌ Failed: ${res.error.message}`);
      continue;
    }

    const { mergedResults, sourceSummary, fallbackUsed } = res.data;
    console.log(`  Source: ${sourceSummary.primarySource.toUpperCase()} (Fallback Used: ${fallbackUsed})`);
    console.log(`  Warnings: ${res.data.warnings.map(w => w.code).join(', ') || 'None'}`);
    
    if (mergedResults.length === 0) {
      console.log(`  (No results found)`);
    } else {
      mergedResults.forEach((r, idx) => {
        console.log(`  ${idx + 1}. [${r.provider.toUpperCase()}] ${r.displayName} (${r.sourceLabel}) - Cal: ${r.preview?.calories || '?'}`);
      });
    }
  }
}

runTests().catch(e => console.error("Test error:", e));
