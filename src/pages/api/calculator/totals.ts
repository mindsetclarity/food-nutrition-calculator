import type { APIRoute } from 'astro';
import { resolveCalculatorFood, calculateCalculatorTotals } from '../../../lib/nutrition-engine';

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Content-Type must be application/json" }), { status: 400 });
    }

    const body = await request.json();
    const itemsInput = body.items || [];

    const resolvedItems = [];
    for (const input of itemsInput) {
      const res = await resolveCalculatorFood({
        foodId: input.foodId,
        selectedSourceId: input.sourceHint,
        quantity: input.quantity,
        unit: input.unit,
        servingId: input.servingId
      });
      if (res.ok && res.data) {
        // Keep the temporary id so the UI can map it back
        res.data.selectedItem.id = input.id;
        resolvedItems.push(res.data.selectedItem);
      }
    }

    const stateResult = calculateCalculatorTotals(resolvedItems);

    return new Response(JSON.stringify({ data: stateResult }), {
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
