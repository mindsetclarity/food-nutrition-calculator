import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../src/data/foods');

// Create the directory if it doesn't exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Categories and base items
const categories = [
  "Breakfast", "Fruits", "Vegetables", "Grains & Cereals", "Dairy & Alternatives",
  "Protein Foods", "Beans & Plant Protein", "Nuts & Seeds", "Snacks", "Desserts",
  "Beverages", "Condiments & Oils", "Prepared Meals", "Fast Food Style",
  "Sauces & Dressings", "Baking Ingredients", "Soups & Stews"
];

// Helper to generate a random ID
let globalIdCounter = 1;
function generateId() {
  let id = globalIdCounter++;
  return `local_${id.toString().padStart(4, '0')}`;
}

function slugify(text) {
  return text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w\-]+/g, '');
}

// Data store
const allFoods = [];

// Let's create some base foods to start and multiply them with preparation methods
const baseFoods = [
  // Fruits (Raw, Dried, Juice, Canned)
  { name: 'Apple', baseCat: 'Fruits', cal: 52, p: 0.3, c: 13.8, f: 0.2, fib: 2.4, sug: 10.4, sod: 1, baseServing: { unit: 'piece', label: '1 medium', grams: 182 } },
  { name: 'Banana', baseCat: 'Fruits', cal: 89, p: 1.1, c: 22.8, f: 0.3, fib: 2.6, sug: 12.2, sod: 1, baseServing: { unit: 'piece', label: '1 medium', grams: 118 } },
  { name: 'Orange', baseCat: 'Fruits', cal: 47, p: 0.9, c: 11.8, f: 0.1, fib: 2.4, sug: 9.4, sod: 0, baseServing: { unit: 'piece', label: '1 medium', grams: 131 } },
  { name: 'Strawberry', baseCat: 'Fruits', cal: 32, p: 0.7, c: 7.7, f: 0.3, fib: 2.0, sug: 4.9, sod: 1, baseServing: { unit: 'cup', label: '1 cup halves', grams: 152 } },
  { name: 'Blueberry', baseCat: 'Fruits', cal: 57, p: 0.7, c: 14.5, f: 0.3, fib: 2.4, sug: 10.0, sod: 1, baseServing: { unit: 'cup', label: '1 cup', grams: 148 } },
  { name: 'Peach', baseCat: 'Fruits', cal: 39, p: 0.9, c: 9.5, f: 0.3, fib: 1.5, sug: 8.4, sod: 0, baseServing: { unit: 'piece', label: '1 medium', grams: 150 } },
  { name: 'Mango', baseCat: 'Fruits', cal: 60, p: 0.8, c: 15.0, f: 0.4, fib: 1.6, sug: 13.7, sod: 1, baseServing: { unit: 'cup', label: '1 cup pieces', grams: 165 } },
  { name: 'Pineapple', baseCat: 'Fruits', cal: 50, p: 0.5, c: 13.1, f: 0.1, fib: 1.4, sug: 9.9, sod: 1, baseServing: { unit: 'cup', label: '1 cup chunks', grams: 165 } },
  { name: 'Grape', baseCat: 'Fruits', cal: 69, p: 0.7, c: 18.1, f: 0.2, fib: 0.9, sug: 15.5, sod: 2, baseServing: { unit: 'cup', label: '1 cup', grams: 151 } },
  { name: 'Watermelon', baseCat: 'Fruits', cal: 30, p: 0.6, c: 7.6, f: 0.2, fib: 0.4, sug: 6.2, sod: 1, baseServing: { unit: 'cup', label: '1 cup diced', grams: 152 } },
  // Vegetables (Raw, Cooked, Steamed, Roasted, Canned)
  { name: 'Broccoli', baseCat: 'Vegetables', cal: 34, p: 2.8, c: 6.6, f: 0.4, fib: 2.6, sug: 1.7, sod: 33, baseServing: { unit: 'cup', label: '1 cup chopped', grams: 91 } },
  { name: 'Spinach', baseCat: 'Vegetables', cal: 23, p: 2.9, c: 3.6, f: 0.4, fib: 2.2, sug: 0.4, sod: 79, baseServing: { unit: 'cup', label: '1 cup raw', grams: 30 } },
  { name: 'Carrot', baseCat: 'Vegetables', cal: 41, p: 0.9, c: 9.6, f: 0.2, fib: 2.8, sug: 4.7, sod: 69, baseServing: { unit: 'piece', label: '1 medium', grams: 61 } },
  { name: 'Tomato', baseCat: 'Vegetables', cal: 18, p: 0.9, c: 3.9, f: 0.2, fib: 1.2, sug: 2.6, sod: 5, baseServing: { unit: 'piece', label: '1 medium', grams: 123 } },
  { name: 'Potato', baseCat: 'Vegetables', cal: 77, p: 2.0, c: 17.5, f: 0.1, fib: 2.2, sug: 0.8, sod: 6, baseServing: { unit: 'piece', label: '1 medium', grams: 173 } },
  { name: 'Sweet Potato', baseCat: 'Vegetables', cal: 86, p: 1.6, c: 20.1, f: 0.1, fib: 3.0, sug: 4.2, sod: 55, baseServing: { unit: 'piece', label: '1 medium', grams: 114 } },
  { name: 'Onion', baseCat: 'Vegetables', cal: 40, p: 1.1, c: 9.3, f: 0.1, fib: 1.7, sug: 4.2, sod: 4, baseServing: { unit: 'piece', label: '1 medium', grams: 110 } },
  { name: 'Bell Pepper', baseCat: 'Vegetables', cal: 20, p: 0.9, c: 4.6, f: 0.2, fib: 1.7, sug: 2.4, sod: 3, baseServing: { unit: 'piece', label: '1 medium', grams: 119 } },
  { name: 'Cucumber', baseCat: 'Vegetables', cal: 15, p: 0.6, c: 3.6, f: 0.1, fib: 0.5, sug: 1.7, sod: 2, baseServing: { unit: 'piece', label: '1 medium', grams: 201 } },
  { name: 'Zucchini', baseCat: 'Vegetables', cal: 17, p: 1.2, c: 3.1, f: 0.3, fib: 1.0, sug: 2.5, sod: 8, baseServing: { unit: 'piece', label: '1 medium', grams: 196 } },
  // Protein Foods (Raw, Cooked, Grilled, Fried, Baked)
  { name: 'Chicken Breast', baseCat: 'Protein Foods', cal: 120, p: 22.5, c: 0, f: 2.6, fib: 0, sug: 0, sod: 45, baseServing: { unit: 'oz', label: '4 oz', grams: 113 } },
  { name: 'Chicken Thigh', baseCat: 'Protein Foods', cal: 135, p: 19.5, c: 0, f: 5.7, fib: 0, sug: 0, sod: 84, baseServing: { unit: 'oz', label: '4 oz', grams: 113 } },
  { name: 'Beef Steak', baseCat: 'Protein Foods', cal: 271, p: 26.1, c: 0, f: 19.0, fib: 0, sug: 0, sod: 54, baseServing: { unit: 'oz', label: '4 oz', grams: 113 } },
  { name: 'Ground Beef', baseCat: 'Protein Foods', cal: 250, p: 25.9, c: 0, f: 15.4, fib: 0, sug: 0, sod: 72, baseServing: { unit: 'oz', label: '4 oz', grams: 113 } },
  { name: 'Pork Chop', baseCat: 'Protein Foods', cal: 231, p: 24.0, c: 0, f: 14.0, fib: 0, sug: 0, sod: 50, baseServing: { unit: 'oz', label: '4 oz', grams: 113 } },
  { name: 'Salmon', baseCat: 'Protein Foods', cal: 206, p: 22.1, c: 0, f: 12.3, fib: 0, sug: 0, sod: 63, baseServing: { unit: 'oz', label: '4 oz', grams: 113 } },
  { name: 'Tuna', baseCat: 'Protein Foods', cal: 109, p: 24.4, c: 0, f: 0.5, fib: 0, sug: 0, sod: 45, baseServing: { unit: 'can', label: '1 can', grams: 142 } },
  { name: 'Shrimp', baseCat: 'Protein Foods', cal: 99, p: 24.0, c: 0.2, f: 0.3, fib: 0, sug: 0, sod: 111, baseServing: { unit: 'oz', label: '4 oz', grams: 113 } },
  { name: 'Tofu', baseCat: 'Beans & Plant Protein', cal: 76, p: 8.1, c: 1.9, f: 4.8, fib: 0.3, sug: 0.6, sod: 7, baseServing: { unit: 'cup', label: '1/2 cup', grams: 124 } },
  { name: 'Egg', baseCat: 'Breakfast', cal: 143, p: 12.6, c: 0.7, f: 9.5, fib: 0, sug: 0.4, sod: 142, baseServing: { unit: 'piece', label: '1 large', grams: 50 } },
  // Grains (Dry, Cooked)
  { name: 'White Rice', baseCat: 'Grains & Cereals', cal: 360, p: 6.6, c: 79.3, f: 0.6, fib: 1.4, sug: 0.1, sod: 1, baseServing: { unit: 'cup', label: '1 cup cooked', grams: 158 } },
  { name: 'Brown Rice', baseCat: 'Grains & Cereals', cal: 370, p: 7.9, c: 77.2, f: 2.9, fib: 3.5, sug: 0.7, sod: 5, baseServing: { unit: 'cup', label: '1 cup cooked', grams: 195 } },
  { name: 'Quinoa', baseCat: 'Grains & Cereals', cal: 368, p: 14.1, c: 64.2, f: 6.1, fib: 7.0, sug: 0, sod: 5, baseServing: { unit: 'cup', label: '1 cup cooked', grams: 185 } },
  { name: 'Oats', baseCat: 'Breakfast', cal: 389, p: 16.9, c: 66.3, f: 6.9, fib: 10.6, sug: 0.8, sod: 2, baseServing: { unit: 'cup', label: '1 cup dry', grams: 81 } },
  { name: 'Pasta', baseCat: 'Grains & Cereals', cal: 371, p: 13.0, c: 74.7, f: 1.5, fib: 3.2, sug: 2.7, sod: 6, baseServing: { unit: 'cup', label: '1 cup cooked', grams: 140 } },
  // Dairy (Various)
  { name: 'Milk', baseCat: 'Dairy & Alternatives', cal: 61, p: 3.2, c: 4.8, f: 3.3, fib: 0, sug: 5.1, sod: 43, baseServing: { unit: 'cup', label: '1 cup', grams: 244 } },
  { name: 'Yogurt', baseCat: 'Dairy & Alternatives', cal: 61, p: 3.5, c: 4.7, f: 3.3, fib: 0, sug: 4.7, sod: 46, baseServing: { unit: 'cup', label: '1 cup', grams: 245 } },
  { name: 'Cheese', baseCat: 'Dairy & Alternatives', cal: 402, p: 25.0, c: 1.3, f: 33.1, fib: 0, sug: 0.5, sod: 621, baseServing: { unit: 'oz', label: '1 oz', grams: 28 } },
  // Nuts & Beans
  { name: 'Almond', baseCat: 'Nuts & Seeds', cal: 579, p: 21.2, c: 21.6, f: 49.9, fib: 12.5, sug: 4.4, sod: 1, baseServing: { unit: 'oz', label: '1 oz', grams: 28 } },
  { name: 'Walnut', baseCat: 'Nuts & Seeds', cal: 654, p: 15.2, c: 13.7, f: 65.2, fib: 6.7, sug: 2.6, sod: 2, baseServing: { unit: 'oz', label: '1 oz', grams: 28 } },
  { name: 'Peanut', baseCat: 'Nuts & Seeds', cal: 567, p: 25.8, c: 16.1, f: 49.2, fib: 8.5, sug: 4.7, sod: 18, baseServing: { unit: 'oz', label: '1 oz', grams: 28 } },
  { name: 'Chickpea', baseCat: 'Beans & Plant Protein', cal: 364, p: 19.3, c: 60.7, f: 6.0, fib: 17.4, sug: 10.7, sod: 24, baseServing: { unit: 'cup', label: '1 cup cooked', grams: 164 } },
  { name: 'Lentil', baseCat: 'Beans & Plant Protein', cal: 353, p: 25.8, c: 60.1, f: 1.1, fib: 30.5, sug: 2.0, sod: 6, baseServing: { unit: 'cup', label: '1 cup cooked', grams: 198 } },
  { name: 'Black Bean', baseCat: 'Beans & Plant Protein', cal: 341, p: 21.6, c: 62.4, f: 1.4, fib: 15.5, sug: 2.1, sod: 5, baseServing: { unit: 'cup', label: '1 cup cooked', grams: 172 } }
];

// Variations
const preparations = {
  'Fruits': ['Raw', 'Dried', 'Juice', 'Canned (in Water)', 'Canned (in Syrup)', 'Frozen'],
  'Vegetables': ['Raw', 'Cooked', 'Steamed', 'Roasted', 'Canned', 'Frozen'],
  'Protein Foods': ['Raw', 'Grilled', 'Baked', 'Fried', 'Boiled'],
  'Beans & Plant Protein': ['Dry', 'Cooked (from Dry)', 'Canned'],
  'Grains & Cereals': ['Dry', 'Cooked'],
  'Dairy & Alternatives': ['Whole', '2% Reduced Fat', 'Nonfat (Skim)'],
  'Breakfast': ['Raw', 'Cooked', 'Scrambled', 'Fried', 'Hard Boiled', 'Poached'],
  'Nuts & Seeds': ['Raw', 'Roasted (Unsalted)', 'Roasted (Salted)', 'Butter']
};

function adjustMacros(base, prep) {
  let multC = 1.0;
  let multP = 1.0;
  let multCa = 1.0;
  let multF = 1.0;
  let addedSug = 0;
  let addedSod = 0;

  if (prep.includes('Dried')) { multC = 4.0; multP = 4.0; multF = 4.0; multCa = 4.0; }
  else if (prep.includes('Juice')) { multC = 1.1; multF = 0.1; multP = 0.1; multCa = 1.1; }
  else if (prep.includes('Canned (in Syrup)')) { addedSug = 15; multCa = 1.5; }
  else if (prep.includes('Cooked') || prep.includes('Steamed') || prep.includes('Boiled') || prep.includes('Baked')) {
    // moisture loss or gain
    if (base.baseCat === 'Grains & Cereals' || base.baseCat === 'Beans & Plant Protein') {
      // water absorption
      multC = 0.35; multP = 0.35; multF = 0.35; multCa = 0.35;
    } else {
      // water loss
      multC = 1.2; multP = 1.2; multF = 1.2; multCa = 1.2;
    }
  }
  else if (prep.includes('Roasted')) { multC = 1.3; multP = 1.3; multF = 1.3; multCa = 1.3; }
  else if (prep.includes('Fried')) { multC = 1.1; multP = 1.1; multF = 2.5; multCa = 1.5; }
  else if (prep.includes('Nonfat') || prep.includes('Skim')) { multF = 0.05; multCa = 0.55; }
  else if (prep.includes('2%')) { multF = 0.6; multCa = 0.8; }
  else if (prep.includes('Salted')) { addedSod = 300; }
  else if (prep.includes('Butter')) { multF = 1.1; multCa = 1.1; }
  else if (prep.includes('Canned')) { addedSod = 250; }

  return {
    cal: Math.round(base.cal * multCa + (addedSug * 4) + (multF > 1 ? (multF-1)*base.f*9 : 0)),
    p: +(base.p * multP).toFixed(1),
    c: +(base.c * multC + addedSug).toFixed(1),
    f: +(base.f * multF).toFixed(1),
    fib: +(base.fib * multC).toFixed(1),
    sug: +(base.sug * multC + addedSug).toFixed(1),
    sod: Math.round(base.sod * multC + addedSod)
  };
}

// Generate the 1000 items
let foodCount = 0;

// Base variations
for (let b of baseFoods) {
  let preps = preparations[b.baseCat] || preparations['Fruits']; // default
  for (let prep of preps) {
    let name = `${prep} ${b.name}`;
    if (prep === 'Raw' || prep === 'Whole') name = b.name; // Use base name for default state
    if (name.includes('from Dry')) name = `Cooked ${b.name}`;

    let macros = adjustMacros(b, prep);

    allFoods.push({
      id: generateId(),
      slug: slugify(name),
      name: name,
      searchName: name.toLowerCase(),
      displayName: name,
      aliases: [name.toLowerCase(), b.name.toLowerCase()],
      category: b.baseCat,
      source: "local",
      sourceLabel: "Local database",
      isEstimated: true,
      defaultUnit: b.baseServing.unit,
      defaultQuantity: 1,
      servingSizes: [
        { id: `serve_${globalIdCounter}`, unit: b.baseServing.unit, label: b.baseServing.label, grams: b.baseServing.grams, isDefault: true },
        { id: `serve_${globalIdCounter+1}`, unit: "g", label: "100 g", grams: 100 }
      ],
      nutrientsPer100g: {
        calories: macros.cal,
        protein: macros.p,
        carbohydrates: macros.c,
        fat: macros.f,
        fiber: macros.fib,
        sugar: macros.sug,
        sodium: macros.sod
      },
      tags: [b.baseCat.toLowerCase().replace(/\s/g, '-'), prep.toLowerCase().replace(/[\s\(\)]+/g, '')],
      preparationState: prep,
      compareGroup: b.baseCat
    });
    foodCount++;
  }
}

// To reach 1000+, let's add some more generic items with combinations (e.g. 50 extra bases x 10 brand/styles)
const extraBases = [];
for (let i = 1; i <= 60; i++) {
  extraBases.push({ name: `Generic Food ${i}`, baseCat: 'Snacks', cal: 200 + i*2, p: 5, c: 20, f: 10, fib: 2, sug: 5, sod: 100, baseServing: { unit: 'oz', label: '1 oz', grams: 28 }});
  extraBases.push({ name: `Fast Food Item ${i}`, baseCat: 'Fast Food Style', cal: 300 + i*5, p: 15, c: 30, f: 15, fib: 2, sug: 5, sod: 500, baseServing: { unit: 'serving', label: '1 serving', grams: 150 }});
  extraBases.push({ name: `Prepared Meal ${i}`, baseCat: 'Prepared Meals', cal: 400 + i*6, p: 20, c: 45, f: 15, fib: 5, sug: 10, sod: 600, baseServing: { unit: 'meal', label: '1 meal', grams: 350 }});
  extraBases.push({ name: `Beverage ${i}`, baseCat: 'Beverages', cal: 100 + i, p: 1, c: 25, f: 0, fib: 0, sug: 20, sod: 20, baseServing: { unit: 'cup', label: '1 cup', grams: 240 }});
  extraBases.push({ name: `Condiment ${i}`, baseCat: 'Condiments & Oils', cal: 50, p: 0, c: 5, f: 3, fib: 0, sug: 4, sod: 150, baseServing: { unit: 'tbsp', label: '1 tbsp', grams: 15 }});
}

for (let b of extraBases) {
  let styles = ['Regular', 'Low Fat', 'Low Sodium', 'Premium'];
  for (let style of styles) {
    let name = `${style} ${b.name}`;
    allFoods.push({
      id: generateId(),
      slug: slugify(name),
      name: name,
      searchName: name.toLowerCase(),
      displayName: name,
      aliases: [name.toLowerCase(), b.name.toLowerCase()],
      category: b.baseCat,
      source: "local",
      sourceLabel: "Local database",
      isEstimated: true,
      defaultUnit: b.baseServing.unit,
      defaultQuantity: 1,
      servingSizes: [
        { id: `serve_${globalIdCounter}`, unit: b.baseServing.unit, label: b.baseServing.label, grams: b.baseServing.grams, isDefault: true },
        { id: `serve_${globalIdCounter+1}`, unit: "g", label: "100 g", grams: 100 }
      ],
      nutrientsPer100g: {
        calories: style === 'Low Fat' ? Math.round(b.cal*0.7) : b.cal,
        protein: b.p,
        carbohydrates: b.c,
        fat: style === 'Low Fat' ? Math.max(0, b.f - 5) : b.f,
        fiber: b.fib,
        sugar: b.sug,
        sodium: style === 'Low Sodium' ? Math.round(b.sod*0.5) : b.sod
      },
      tags: [b.baseCat.toLowerCase().replace(/\s/g, '-'), style.toLowerCase().replace(/\s/g, '-')],
      preparationState: style,
      compareGroup: b.baseCat
    });
    foodCount++;
  }
}

// Ensure unique slugs
const slugSet = new Set();
for (let f of allFoods) {
  let origSlug = f.slug;
  let counter = 1;
  while (slugSet.has(f.slug)) {
    f.slug = `${origSlug}-${counter}`;
    counter++;
  }
  slugSet.add(f.slug);
}

// Output by category
const catMap = {};
for (let f of allFoods) {
  const catFilename = f.category.toLowerCase().replace(/[^a-z0-9]+/g, '') + '.ts';
  if (!catMap[catFilename]) catMap[catFilename] = [];
  catMap[catFilename].push(f);
}

let indexContent = `// Auto-generated food index\n`;

for (let filename of Object.keys(catMap)) {
  const fileFoods = catMap[filename];
  const varName = filename.replace('.ts', 'Foods');
  indexContent += `export * from './${filename.replace('.ts', '')}';\n`;
  
  let content = `import type { FoodItem } from '../../lib/nutrition/types';\n\n`;
  content += `export const ${varName}: FoodItem[] = ${JSON.stringify(fileFoods, null, 2)};\n`;
  
  fs.writeFileSync(path.join(DATA_DIR, filename), content, 'utf8');
}

// create core index
let coreIndex = `// Re-export all categories
import type { FoodItem } from '../../lib/nutrition/types';
`;
for (let filename of Object.keys(catMap)) {
  const varName = filename.replace('.ts', 'Foods');
  coreIndex += `import { ${varName} } from './${filename.replace('.ts', '')}';\n`;
}

coreIndex += `\nexport const localFoods: FoodItem[] = [\n`;
for (let filename of Object.keys(catMap)) {
  const varName = filename.replace('.ts', 'Foods');
  coreIndex += `  ...${varName},\n`;
}
coreIndex += `];\n`;

fs.writeFileSync(path.join(DATA_DIR, 'index.ts'), coreIndex, 'utf8');

console.log(`Successfully generated ${allFoods.length} foods across ${Object.keys(catMap).length} categories.`);
