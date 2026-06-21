import type { RecipeInput, RecipeCalculationResult, ResolvedIngredient, IngredientLine } from './recipeTypes';
import { validateRecipeInput, clampMaxIngredientLines } from './recipeGuards';
import { parseRecipeTextToIngredientLines } from './ingredientLineParser';
import { parseFoodTextWithLLM } from '../llm';
import { resolveIngredients } from './ingredientResolver';
import { calculateRecipeTotals, calculatePerServingNutrition } from '../calculation';
import { calculateRecipeConfidence, getRecipeNeedsReview } from './recipeConfidence';
import { createRecipeWarning } from './recipeWarnings';
import { createRecoverableError } from '../index';
import type { EngineResult, EngineWarning } from '../index';
import type { SourceSummary } from '../sources/sourceTypes';

export async function calculateRecipeNutrition(input: RecipeInput): Promise<EngineResult<RecipeCalculationResult>> {
  try {
    const validated = validateRecipeInput(input);
    const warnings: EngineWarning[] = [];

    if (!validated.ingredientsText) {
      return {
        ok: false,
        error: createRecoverableError("RECIPE_EMPTY_INPUT", "Recipe text is empty", "Please provide ingredients to calculate."),
        warnings: [],
        fallbackAvailable: false
      };
    }

    const lines = validated.ingredientsText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    const clampedLines = clampMaxIngredientLines(lines, validated.options?.maxIngredients || 50);

    if (lines.length > clampedLines.length) {
      warnings.push(createRecipeWarning("RECIPE_TOO_MANY_LINES", `Only the first ${clampedLines.length} ingredients were processed.`));
    }

    let parsedLines: IngredientLine[] = [];
    
    if (validated.options?.parserMode === "llm_assisted") {
      const llmResult = await parseFoodTextWithLLM({
        text: clampedLines.join('\n'),
        mode: "recipe",
        allowRecipeParsing: true
      });
      if (llmResult.ok && llmResult.data) {
        parsedLines = llmResult.data.items.map((item: any, i: number) => ({
          lineNumber: i + 1,
          originalText: item.originalText || clampedLines[i] || "",
          cleanedText: item.originalText || clampedLines[i] || "",
          quantity: item.quantity,
          unit: item.unit,
          foodText: item.foodName,
          preparation: item.preparation,
          confidence: { level: item.confidence, reasons: [], needsReview: item.needsReview },
          needsReview: item.needsReview,
          warnings: item.warnings || []
        }));
        if (llmResult.warnings) warnings.push(...llmResult.warnings);
      } else {
        parsedLines = parseRecipeTextToIngredientLines(clampedLines.join('\n'));
      }
    } else {
      parsedLines = parseRecipeTextToIngredientLines(clampedLines.join('\n'));
    }
    
    // Filter out skipped lines before resolving
    const toResolve = parsedLines.filter(p => !p.needsReview || p.foodText.length > 0); 
    const skipped = parsedLines.filter(p => !toResolve.includes(p));

    const resolved = await resolveIngredients(toResolve, validated.options);
    
    // Combine skipped (as unresolved/skipped) with resolved for the final list
    const allIngredients: ResolvedIngredient[] = [...resolved];
    for (const s of skipped) {
      allIngredients.push({
        lineNumber: s.lineNumber,
        originalText: s.originalText,
        parsed: s,
        status: "skipped",
        confidence: s.confidence,
        warnings: s.warnings
      });
    }

    // Sort by line number
    allIngredients.sort((a, b) => a.lineNumber - b.lineNumber);

    const validIngredients = resolved.filter(r => r.status === 'resolved' || r.status === 'needs_review');

    if (validIngredients.length === 0) {
      warnings.push(createRecipeWarning("RECIPE_NO_RESOLVED_INGREDIENTS", "Could not resolve any ingredients."));
    } else if (validIngredients.length < resolved.length) {
      warnings.push(createRecipeWarning("RECIPE_PARTIAL_RESULT", "Some ingredients could not be resolved."));
    }

    const totalNutrition = calculateRecipeTotals(validIngredients);
    const perServingNutrition = calculatePerServingNutrition(totalNutrition, validated.servings);

    const confidence = calculateRecipeConfidence(allIngredients);
    const needsReview = getRecipeNeedsReview(confidence, warnings);

    if (needsReview) {
      confidence.needsReview = true;
    }

    // Aggregate Source Summary
    let hasUsda = false;
    let hasLocal = false;
    let hasEstimated = false;
    let hasPartialData = false;
    let sourcesUsed = new Set<string>();

    for (const ing of validIngredients) {
      if (ing.resolvedSource === 'usda') {
        hasUsda = true;
        sourcesUsed.add('usda');
      } else if (ing.resolvedSource?.includes('local')) {
        hasLocal = true;
        sourcesUsed.add('local');
      }
      if (ing.resolvedFood?.isEstimated || ing.resolvedServing?.isEstimated) hasEstimated = true;
      if (ing.warnings.some(w => w.code === "PARTIAL_USDA_NUTRIENTS")) hasPartialData = true;
    }

    const labels = [];
    if (hasUsda) labels.push("USDA FoodData Central");
    if (hasLocal) labels.push("Local fallback");
    if (hasEstimated) labels.push("Estimated local value");

    const sourceSummary: SourceSummary = {
      primarySource: hasUsda ? "usda" : "local",
      sourcesUsed: Array.from(sourcesUsed),
      hasUsda,
      hasLocal,
      hasEstimated,
      hasLlmParsed: false,
      hasPartialData,
      labels,
      warnings: []
    };

    const result: RecipeCalculationResult = {
      recipeName: validated.recipeName,
      servings: validated.servings,
      ingredients: allIngredients,
      totalNutrition,
      perServingNutrition,
      sourceSummary,
      confidence,
      warnings
    };

    return {
      ok: true,
      data: result,
      warnings,
      sourceSummary,
      confidence
    };

  } catch (error: any) {
    return {
      ok: false,
      error: createRecoverableError("INTERNAL_ENGINE_ERROR", error.message || "Recipe calculation failed", "An error occurred while calculating the recipe."),
      warnings: [],
      fallbackAvailable: false
    };
  }
}
