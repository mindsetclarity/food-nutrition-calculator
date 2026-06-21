import type { APIRoute } from 'astro';
import { resolveBestFoodSource } from '../../../lib/nutrition-engine';

export const GET: APIRoute = async ({ request, url }) => {
  try {
    const foodId = url.searchParams.get('id');
    const sourceHint = url.searchParams.get('source') || "local";

    if (!foodId || typeof foodId !== 'string') {
      return new Response(JSON.stringify({ error: "Missing food 'id'" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const result = await resolveBestFoodSource(sourceHint, foodId);

    if (!result.ok) {
      return new Response(JSON.stringify({ 
        error: result.error.safeMessage,
        code: result.error.code,
        warnings: result.warnings 
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({
      data: result.data.food,
      sourceSummary: result.data.sourceSummary,
      warnings: result.warnings
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
