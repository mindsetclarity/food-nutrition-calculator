import { calculateRecipeNutrition } from '../src/lib/nutrition-engine/index.ts';

async function runTest() {
  console.log("======================================");
  console.log("Testing Recipe Engine (Phase 6)");
  console.log("======================================\n");

  const testRecipe = `1 cup rolled oats
1 banana, sliced
2 tbsp peanut butter
1 cup almond milk
1 tbsp chia seeds`;

  console.log(`Input Recipe:\n${testRecipe}\n`);

  const res = await calculateRecipeNutrition({
    recipeName: "Protein Oat Bowl",
    ingredientsText: testRecipe,
    servings: 2,
    options: {
      includeLocalFallback: true
    }
  });

  if (!res.ok) {
    console.log("❌ Test Failed:", res.error.message);
    return;
  }

  const { totalNutrition, perServingNutrition, ingredients, sourceSummary, warnings, confidence } = res.data;

  console.log("✅ Recipe Processed Successfully\n");
  console.log(`Sources Used: ${sourceSummary.labels.join(', ')}`);
  console.log(`Confidence: ${confidence.level.toUpperCase()} (${confidence.reasons.join(', ')})\n`);

  console.log("--- Ingredients ---");
  ingredients.forEach(ing => {
    const statusIcon = ing.status === 'resolved' ? '✅' : ing.status === 'needs_review' ? '⚠️' : '❌';
    console.log(`${statusIcon} [${ing.lineNumber}] ${ing.originalText}`);
    if (ing.status === 'resolved' || ing.status === 'needs_review') {
      console.log(`    Parsed: ${ing.parsed.quantity || 1} ${ing.parsed.unit || ''} ${ing.parsed.foodText}`);
      console.log(`    Matched: ${ing.resolvedFood?.displayName} (${ing.resolvedSource})`);
      console.log(`    Amount: ${ing.resolvedServing?.grams}g (${ing.resolvedServing?.servingLabel})`);
      console.log(`    Calories: ${ing.calculatedNutrition?.calories?.toFixed(1) || '?'} kcal`);
      if (ing.warnings.length > 0) {
        console.log(`    Warnings: ${ing.warnings.map(w => w.message).join(' | ')}`);
      }
    }
    console.log('');
  });

  console.log("--- Totals ---");
  console.log(`Total Calories: ${totalNutrition.calories?.toFixed(1)} kcal`);
  console.log(`Total Protein: ${totalNutrition.protein?.toFixed(1)} g`);
  
  console.log("\n--- Per Serving (2 servings) ---");
  console.log(`Calories: ${perServingNutrition.calories?.toFixed(1)} kcal`);
  console.log(`Protein: ${perServingNutrition.protein?.toFixed(1)} g`);

  if (warnings.length > 0) {
    console.log("\n--- Global Warnings ---");
    warnings.forEach(w => console.log(`- ${w.message}`));
  }
}

runTest().catch(console.error);
