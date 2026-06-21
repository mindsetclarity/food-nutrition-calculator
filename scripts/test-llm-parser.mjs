import { parseFoodTextWithLLM } from '../src/lib/nutrition-engine/index.ts';

async function runTest() {
  console.log("======================================");
  console.log("Testing LLM Parser (Phase 7)");
  console.log("======================================\n");

  const testRecipe = `1 cup rolled oats
1 banana
2 tbsp peanut butter
1 cup almond milk
1 tbsp chia seeds`;

  console.log(`Input Recipe:\n${testRecipe}\n`);

  const res = await parseFoodTextWithLLM({
    text: testRecipe,
    mode: "recipe",
    allowRecipeParsing: true
  });

  if (!res.ok) {
    console.log("❌ Test Failed:", res.error.message);
    return;
  }

  const { items, confidence, warnings, needsReview } = res.data;

  console.log("✅ Parsing Completed\n");
  console.log(`Confidence: ${confidence.level.toUpperCase()} (${confidence.reasons.join(', ')})`);
  console.log(`Needs Review: ${needsReview}\n`);

  console.log("--- Parsed Items ---");
  items.forEach((item, index) => {
    console.log(`[${index + 1}] ${item.originalText}`);
    console.log(`    Food: ${item.foodName}`);
    console.log(`    Qty:  ${item.quantity || '?'} ${item.unit || ''}`);
    if (item.preparation) console.log(`    Prep: ${item.preparation}`);
    console.log(`    Conf: ${item.confidence}`);
  });

  if (warnings.length > 0) {
    console.log("\n--- Warnings ---");
    warnings.forEach(w => console.log(`- [${w.code}] ${w.message}`));
  }

  // Unsafe Test Mock
  console.log("\n======================================");
  console.log("Testing Safety Boundary (Nutrition Stripping)");
  console.log("======================================\n");

  const unsafeMockResult = {
    items: [
      {
        originalText: "1 banana",
        foodName: "banana",
        quantity: 1,
        calories: 105,
        protein: 1.3,
        fat: 0.4
      }
    ]
  };

  // We test the internal boundary function
  const { enforceLLMNutritionBoundary } = await import('../src/lib/nutrition-engine/llm/llmSafety.ts');
  const boundaryRes = enforceLLMNutritionBoundary(unsafeMockResult);

  console.log("Unsafe Input:");
  console.log(unsafeMockResult.items[0]);
  console.log("\nSafe Output:");
  console.log(boundaryRes.safeOutput[0]);

  if (boundaryRes.warnings.length > 0) {
    console.log(`\nWarnings Generated:`);
    boundaryRes.warnings.forEach(w => console.log(`- ${w.message}`));
  }
}

runTest().catch(console.error);
