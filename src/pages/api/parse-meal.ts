import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { text } = await request.json();
    if (!text) {
      return new Response(JSON.stringify({ error: "No text provided" }), { status: 400 });
    }

    const provider = import.meta.env.LLM_PROVIDER || 'gemini';
    const geminiKey = import.meta.env.GEMINI_API_KEY;
    const openaiKey = import.meta.env.OPENAI_API_KEY;
    
    // We only support Gemini in this scaffold for simplicity, 
    // but the architecture allows others.
    if (provider === 'gemini' && geminiKey) {
      const prompt = `
You are a food parser. Extract the food items, quantities, and units from the following text.
Text: "${text}"

Rules:
- Respond ONLY with a valid JSON array of objects.
- Each object must have: "query" (string), "quantity" (number), "unit" (string: g, oz, lb, serving, cup, tbsp, tsp, piece, slice, can, bottle, packet, scoop).
- If unit is unknown, guess the closest matching unit or default to "serving".
- Do not add markdown backticks.

Example text: "2 scrambled eggs and a cup of orange juice"
Output: [{"query": "scrambled eggs", "quantity": 2, "unit": "piece"}, {"query": "orange juice", "quantity": 1, "unit": "cup"}]
`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${import.meta.env.LLM_MODEL || 'gemini-2.5-flash'}:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
          }
        })
      });

      if (!res.ok) {
        throw new Error("Gemini API error");
      }

      const data = await res.json();
      let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
      // Clean up markdown if any
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const parsed = JSON.parse(responseText);
      return new Response(JSON.stringify(parsed), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } else if (provider === 'openai' && openaiKey) {
       // OpenAI implementation placeholder
       throw new Error("OpenAI not fully implemented in scaffold");
    } else {
      return new Response(JSON.stringify({ error: "LLM API key missing or provider unsupported" }), { status: 500 });
    }
  } catch (err) {
    console.error("Parse Meal Error:", err);
    return new Response(JSON.stringify({ error: "Internal or parsing error" }), { status: 500 });
  }
}
