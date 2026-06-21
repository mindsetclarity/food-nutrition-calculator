import type { APIRoute } from 'astro';
import { searchCalculatorFoods } from '../../../lib/nutrition-engine';

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  try {
    const headers = Object.fromEntries(request.headers.entries());
    console.log("DEV DEBUG HEADERS:", headers);
    
    const urlParams = new URL(request.url);
    const q = urlParams.searchParams.get("q") || urlParams.searchParams.get("query") || "";
    const query = q.trim().substring(0, 100);
    
    if (!query) {
      return new Response(JSON.stringify({ error: "Missing query 'q'" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const result = await searchCalculatorFoods(query);

    if (!result.ok) {
      return new Response(JSON.stringify({ 
        error: result.error.safeMessage,
        code: result.error.code,
        warnings: result.warnings 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({
      data: result.data.results,
      sourceSummary: result.data.sourceSummary,
      warnings: result.warnings,
      fallbackUsed: result.data.fallbackUsed
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
