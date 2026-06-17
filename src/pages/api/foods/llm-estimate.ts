import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { query } = await request.json();
    if (!query) {
      return new Response(JSON.stringify({ error: "No query provided" }), { status: 400 });
    }

    const provider = import.meta.env.LLM_PROVIDER || 'gemini';
    const geminiKey = import.meta.env.GEMINI_API_KEY;
    
    if (provider === 'gemini' && geminiKey) {
      const prompt = `
You are a nutrition estimator. We failed to find "${query}" in our verified USDA and local databases.
Estimate the nutrition values for 1 serving (or 100g) of this item.

Rules:
- Respond ONLY with valid JSON.
- Do NOT invent precision.
- Required fields:
  - id: "llm-est-" + a random string
  - name: string (e.g. "Estimated: " + query)
  - category: string
  - source: "LLM"
  - defaultUnit: "serving"
  - standardUnits: { "serving": 100, "g": 1 } (guess grams per serving roughly)
  - nutritionPer100g: { calories, protein, carbs, fat, fiber, sugar, sodium } (values per 100g)
- No markdown formatting.
`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${import.meta.env.LLM_MODEL || 'gemini-2.5-flash'}:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.1 }
        })
      });

      if (!res.ok) {
        throw new Error("Gemini API error");
      }

      const data = await res.json();
      let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const parsed = JSON.parse(responseText);
      return new Response(JSON.stringify(parsed), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: "LLM API key missing" }), { status: 500 });
  } catch (err) {
    console.error("LLM Estimate Error:", err);
    return new Response(JSON.stringify({ error: "Failed to estimate" }), { status: 500 });
  }
}
