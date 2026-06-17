import type { APIRoute } from 'astro';
import { localFoods } from '../../../data/foods';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing ID" }), { 
      status: 400, headers: { 'Content-Type': 'application/json' } 
    });
  }

  if (id.startsWith('local-')) {
    const food = localFoods.find(f => f.id === id);
    if (food) {
      return new Response(JSON.stringify(food), { 
        status: 200, headers: { 'Content-Type': 'application/json' } 
      });
    }
    return new Response(JSON.stringify({ error: "Not found in local DB" }), { 
      status: 404, headers: { 'Content-Type': 'application/json' } 
    });
  }

  const usdaApiKey = import.meta.env.USDA_API_KEY;
  if (!usdaApiKey) {
    return new Response(JSON.stringify({ error: "USDA key missing and not local" }), { 
      status: 500, headers: { 'Content-Type': 'application/json' } 
    });
  }

  try {
    const res = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=${usdaApiKey}`);
    if (res.ok) {
      const data = await res.json();
      
      const findNutrient = (name: string, unitName: string = '') => {
        const nut = data.foodNutrients.find((n: any) => 
          n.nutrient?.name?.toLowerCase().includes(name.toLowerCase()) &&
          (unitName === '' || n.nutrient?.unitName?.toLowerCase() === unitName.toLowerCase())
        );
        return nut ? nut.amount : 0;
      };

      let servingGrams = 100;
      if (data.servingSize && data.servingSizeUnit === 'g') {
        servingGrams = data.servingSize;
      }

      const foodItem = {
        id: data.fdcId.toString(),
        name: data.description,
        category: data.foodCategory?.description || 'USDA Food',
        source: 'USDA',
        defaultUnit: 'serving',
        standardUnits: {
          'g': 1,
          'oz': 28.35,
          'lb': 453.59,
          'serving': servingGrams
        },
        nutritionPer100g: {
          calories: findNutrient('Energy', 'kcal'),
          protein: findNutrient('Protein', 'g'),
          carbs: findNutrient('Carbohydrate', 'g'),
          fat: findNutrient('Total lipid (fat)', 'g'),
          fiber: findNutrient('Fiber, total dietary', 'g'),
          sugar: findNutrient('Sugars, total', 'g'),
          sodium: findNutrient('Sodium', 'mg')
        }
      };

      return new Response(JSON.stringify(foodItem), { 
        status: 200, headers: { 'Content-Type': 'application/json' } 
      });
    }
    return new Response(JSON.stringify({ error: "USDA API error" }), { 
      status: res.status, headers: { 'Content-Type': 'application/json' } 
    });
  } catch (err) {
    console.error("USDA Details Error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), { 
      status: 500, headers: { 'Content-Type': 'application/json' } 
    });
  }
}
