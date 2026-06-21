import type { APIRoute } from 'astro';
import { calculateRecipeEngine } from '../../../lib/nutrition-engine';
import { compactRecipeIngredientResult, clampLimit } from '../../../lib/nutrition-engine/performance';

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Content-Type must be application/json" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const body = await request.json();
    
    if (typeof body.ingredientsText !== 'string' || !body.ingredientsText.trim()) {
      return new Response(JSON.stringify({ error: "Missing or invalid ingredientsText" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const servings = typeof body.servings === 'number' && body.servings > 0 ? body.servings : 1;

    const result = await calculateRecipeEngine({
      recipeName: body.recipeName || "Custom Recipe",
      ingredientsText: body.ingredientsText,
      servings: servings,
      options: body.options
    });

    if (!result.ok) {
      // Safe error return
      return new Response(JSON.stringify({
        error: result.error.safeMessage,
        code: result.error.code,
        warnings: result.warnings
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Strip out internal raw data from ingredients before sending to client
    const safeData = { ...result.data };
    safeData.ingredients = safeData.ingredients.map(compactRecipeIngredientResult);

    return new Response(JSON.stringify({
      data: safeData,
      warnings: result.warnings,
      sourceSummary: result.sourceSummary,
      confidence: result.confidence
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    // Catch generic unhandled exceptions safely
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
