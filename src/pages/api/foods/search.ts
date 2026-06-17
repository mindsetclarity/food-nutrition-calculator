import type { APIRoute } from 'astro';
import { localFoods } from '../../../data/foods';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return new Response(JSON.stringify([]), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  const usdaApiKey = import.meta.env.USDA_API_KEY;

  if (usdaApiKey) {
    try {
      const res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&api_key=${usdaApiKey}&pageSize=10`);
      if (res.ok) {
        const data = await res.json();
        const results = data.foods.map((f: any) => ({
          id: f.fdcId.toString(),
          name: f.description,
          category: f.foodCategory || 'Unknown',
          source: 'USDA'
        }));
        if (results.length > 0) {
          return new Response(JSON.stringify(results), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
          });
        }
      }
    } catch (err) {
      console.error("USDA Search Error:", err);
      // Fallback to local
    }
  }

  // Fallback to local
  const matches = localFoods.filter(f => 
    f.name.toLowerCase().includes(query) || 
    (f.aliases && f.aliases.some(a => a.toLowerCase().includes(query)))
  ).slice(0, 10).map(f => ({
    id: f.id,
    name: f.name,
    category: f.category,
    source: f.source // 'Local'
  }));

  return new Response(JSON.stringify(matches), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
