import fs from 'fs';
import path from 'path';

// --- CONFIGURATION ---
const TERMS = {
  fruits: ['banana', 'apple', 'orange', 'grapes', 'strawberries', 'blueberries', 'raspberries', 'mango', 'pineapple', 'watermelon', 'cantaloupe', 'peach', 'pear', 'plum', 'avocado', 'grapefruit', 'kiwi', 'cherries', 'dates', 'raisins'],
  vegetables: ['broccoli', 'spinach', 'kale', 'carrot', 'potato', 'sweet potato', 'tomato', 'cucumber', 'onion', 'garlic', 'bell pepper', 'lettuce', 'cabbage', 'cauliflower', 'green beans', 'peas', 'corn', 'mushrooms', 'zucchini', 'asparagus'],
  grains_cereals: ['rice', 'brown rice', 'white rice', 'oats', 'rolled oats', 'oatmeal', 'quinoa', 'pasta', 'spaghetti', 'bread', 'whole wheat bread', 'bagel', 'tortilla', 'corn tortilla', 'flour tortilla', 'couscous', 'barley', 'cereal', 'granola', 'crackers'],
  dairy_alternatives: ['milk', 'whole milk', 'skim milk', 'yogurt', 'greek yogurt', 'cheddar cheese', 'mozzarella', 'cottage cheese', 'cream cheese', 'butter', 'ice cream', 'sour cream', 'half and half', 'almond milk', 'soy milk', 'oat milk', 'coconut milk'],
  protein_foods: ['chicken breast', 'chicken thigh', 'turkey', 'beef', 'ground beef', 'pork', 'salmon', 'tuna', 'shrimp', 'cod', 'tilapia', 'egg', 'egg white', 'tofu', 'tempeh'],
  beans_legumes: ['lentils', 'black beans', 'kidney beans', 'chickpeas', 'garbanzo beans', 'pinto beans', 'navy beans', 'split peas', 'edamame', 'hummus', 'refried beans'],
  nuts_seeds: ['almonds', 'walnuts', 'cashews', 'peanuts', 'peanut butter', 'almond butter', 'chia seeds', 'flax seeds', 'sunflower seeds', 'pumpkin seeds', 'sesame seeds'],
  condiments_oils: ['olive oil', 'canola oil', 'vegetable oil', 'coconut oil', 'avocado oil', 'mayonnaise', 'margarine', 'ketchup', 'mustard', 'soy sauce', 'salsa', 'barbecue sauce', 'hot sauce', 'vinegar', 'honey', 'maple syrup', 'jam'],
  beverages: ['coffee', 'tea', 'orange juice', 'apple juice', 'soda', 'cola', 'sports drink', 'lemonade'],
  snacks: ['chips', 'potato chips', 'popcorn', 'pretzels', 'granola bar', 'protein bar', 'chocolate', 'cookies', 'trail mix'],
  sauces_dressings: ['ranch dressing', 'salad dressing', 'pasta sauce'],
  prepared_meals: ['pizza', 'hamburger', 'sandwich', 'soup', 'chili', 'macaroni and cheese', 'lasagna', 'burrito', 'taco', 'fried rice', 'pancakes', 'waffles', 'salad'],
  baking_ingredients: ['flour', 'sugar', 'brown sugar', 'baking powder', 'cocoa powder', 'chocolate chips', 'cornstarch', 'yeast']
};

const PAGE_SIZE = 30; // Max per term to avoid huge payloads

const DATA_TYPES = ['Foundation', 'SR Legacy', 'Survey (FNDDS)'];

// Mapping USDA nutrient IDs to our keys
const NUTRIENT_MAPPING = {
  1008: 'calories', // Energy
  1003: 'protein', // Protein
  1005: 'carbs', // Carbohydrate, by difference
  1004: 'fat', // Total lipid (fat)
  1079: 'fiber', // Fiber, total dietary
  2000: 'sugar', // Total Sugars
  1093: 'sodium', // Sodium, Na
  1258: 'saturatedFat', // Fatty acids, total saturated
  1253: 'cholesterol', // Cholesterol
  1092: 'potassium', // Potassium, K
  1087: 'calcium', // Calcium, Ca
  1089: 'iron', // Iron, Fe
  1104: 'vitaminA', // Vitamin A, IU
  1106: 'vitaminA', // Vitamin A, RAE
  1162: 'vitaminC', // Vitamin C
};

function getApiKey() {
  let key = process.env.USDA_API_KEY;
  if (!key) {
    try {
      const envPath = path.resolve('.env.local');
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        for (const line of content.split('\n')) {
          if (line.trim().startsWith('USDA_API_KEY=')) {
            key = line.trim().split('=')[1].trim();
            break;
          }
        }
      }
    } catch (e) {}
  }
  return key;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function toSlug(name, fdcId) {
  let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `${slug}-${fdcId}`;
}

async function fetchUsda(query, key) {
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${key}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      pageSize: PAGE_SIZE,
      dataType: DATA_TYPES
    })
  });
  if (!res.ok) {
    if (res.status === 429) {
      console.warn(`Rate limit hit, waiting 5s...`);
      await sleep(5000);
      return fetchUsda(query, key);
    }
    throw new Error(`USDA API Error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function main() {
  console.log("Starting USDA Import Pipeline...");
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error("Pipeline ready, import blocked by missing USDA key");
    process.exit(1);
  }

  const maskedKey = apiKey.length > 8 ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}` : '***';
  console.log(`Using key: ${maskedKey}`);

  let totalRawFetched = 0;
  let totalRejected = 0;
  
  const foodsBySlug = new Map();
  const rejectionReasons = {};

  function addRejection(reason) {
    rejectionReasons[reason] = (rejectionReasons[reason] || 0) + 1;
    totalRejected++;
  }

  for (const [category, terms] of Object.entries(TERMS)) {
    console.log(`\nImporting category: ${category}`);
    for (const term of terms) {
      console.log(`  - Fetching '${term}'...`);
      try {
        const data = await fetchUsda(term, apiKey);
        if (!data.foods) continue;
        
        totalRawFetched += data.foods.length;

        for (const f of data.foods) {
          if (!f.fdcId) { addRejection('no_fdcId'); continue; }
          if (!f.description) { addRejection('no_description'); continue; }
          
          let hasCalories = false;
          let hasMacros = 0;
          let caloriesVal = 0;
          
          const nutrients = {};
          if (f.foodNutrients) {
            for (const n of f.foodNutrients) {
              const mappedKey = NUTRIENT_MAPPING[n.nutrientId];
              if (mappedKey) {
                if (n.value !== undefined && !isNaN(n.value) && n.value !== null && n.value >= 0) {
                  nutrients[mappedKey] = n.value;
                  if (mappedKey === 'calories') { hasCalories = true; caloriesVal = n.value; }
                  if (['protein', 'carbs', 'fat'].includes(mappedKey)) hasMacros++;
                }
              }
            }
          }

          if (!hasCalories) { addRejection('no_calories'); continue; }
          if (hasMacros === 0) { addRejection('no_macros'); continue; }
          
          const slug = toSlug(f.description, f.fdcId);
          if (foodsBySlug.has(slug)) { addRejection('duplicate_slug'); continue; }
          
          let name = f.description.toLowerCase();
          
          // Basic normalization to title case for display
          let displayName = name.split(',')[0].replace(/\b\w/g, c => c.toUpperCase());
          if (displayName.length < 3) displayName = name.replace(/\b\w/g, c => c.toUpperCase());
          
          let servingSizes = [];
          if (f.foodPortions && f.foodPortions.length > 0) {
            f.foodPortions.forEach(p => {
              if (p.gramWeight && p.gramWeight > 0) {
                servingSizes.push({
                  id: `srv-${p.id || Math.random().toString(36).substr(2, 9)}`,
                  label: p.portionDescription || p.modifier || "Serving",
                  grams: p.gramWeight,
                  unit: p.modifier || "serving",
                  quantity: 1,
                  isDefault: servingSizes.length === 0,
                  source: 'usda'
                });
              }
            });
          }
          if (servingSizes.length === 0) {
            servingSizes.push({
              id: 'srv-100g',
              label: '100g',
              grams: 100,
              unit: 'g',
              quantity: 100,
              isDefault: true,
              source: 'usda'
            });
          } else {
             if (!servingSizes.some(s => s.isDefault)) servingSizes[0].isDefault = true;
          }

          const foodItem = {
            id: `usda-${f.fdcId}`,
            slug,
            displayName,
            canonicalName: name,
            searchName: `${name} ${term}`.trim(),
            category: category,
            source: 'usda',
            sourceLabel: 'USDA FoodData Central',
            isEstimated: false,
            nutrientsPer100g: nutrients,
            servingSizes,
            aliases: [term.toLowerCase()],
            tags: [f.dataType || 'USDA'],
            fdcId: f.fdcId,
            dataType: f.dataType,
            publicationDate: f.publishedDate || undefined,
            importedAt: new Date().toISOString()
          };

          foodsBySlug.set(slug, foodItem);
        }
        await sleep(200); // Polite rate limit
      } catch (e) {
        console.error(`  Error fetching ${term}: ${e.message}`);
      }
    }
  }

  console.log(`\nImport complete.`);
  console.log(`Raw records fetched: ${totalRawFetched}`);
  console.log(`Records rejected: ${totalRejected}`);
  console.log(`Valid unique foods: ${foodsBySlug.size}`);
  
  const generatedDir = path.resolve('src/data/foods/generated');
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }

  const byCategory = {};
  for (const food of foodsBySlug.values()) {
    if (!byCategory[food.category]) byCategory[food.category] = [];
    byCategory[food.category].push(food);
  }

  const generatedFiles = [];
  
  for (const [cat, items] of Object.entries(byCategory)) {
    const filename = `usda-${cat.replace(/_/g, '-')}.ts`;
    const filepath = path.join(generatedDir, filename);
    const content = `import type { CuratedFoodItem } from '../../../lib/nutrition-engine/data/foodSchema';

export const ${cat}Foods: CuratedFoodItem[] = ${JSON.stringify(items, null, 2)};
`;
    fs.writeFileSync(filepath, content);
    generatedFiles.push({ cat, filename, count: items.length, varName: `${cat}Foods` });
  }

  const indexContent = `// Auto-generated USDA index
${generatedFiles.map(f => `import { ${f.varName} } from './${f.filename.replace('.ts', '')}';`).join('\n')}

export const usdaFoods = [
  ${generatedFiles.map(f => `...${f.varName}`).join(',\n  ')}
];
`;
  fs.writeFileSync(path.join(generatedDir, 'index.ts'), indexContent);
  
  // Write report
  const reportPath = path.resolve('docs/food-dataset-expansion-report.md');
  const reportContent = `# Food Dataset Expansion Report
Date: ${new Date().toISOString()}

## Summary
- USDA API Key status: Working (Masked: ${maskedKey})
- Search Terms Used: ${Object.values(TERMS).flat().length}
- Raw USDA Records Fetched: ${totalRawFetched}
- Records Rejected: ${totalRejected}
- Final Imported USDA Foods: ${foodsBySlug.size}

## Category Breakdown
${generatedFiles.map(f => `- ${f.cat}: ${f.count}`).join('\n')}

## Rejection Reasons
${Object.entries(rejectionReasons).map(([k, v]) => `- ${k}: ${v}`).join('\n')}

**Note**: Final food count verification will be done by the validation script.
`;
  fs.writeFileSync(reportPath, reportContent);
  
  console.log(`Wrote ${generatedFiles.length} category files and index to src/data/foods/generated/`);
  console.log(`Wrote report to docs/food-dataset-expansion-report.md`);
}

main().catch(e => {
  console.error("Fatal Error:", e);
  process.exit(1);
});
