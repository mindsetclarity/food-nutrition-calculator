/**
 * Adds new foods to src/data/foods from USDA FoodData Central.
 *
 *   node --experimental-strip-types scripts/add-foods-from-usda.mjs          dry run: resolve and report
 *   node --experimental-strip-types scripts/add-foods-from-usda.mjs --apply  write the data files
 *
 * Needs USDA_API_KEY in .env or the environment. Responses are cached in the OS temp
 * dir, so re-running after fixing a query only refetches what changed.
 *
 * Each entry is [display name, query, default serving?] where the default serving is a
 * regex over USDA portion labels or an explicit { unit, label, grams }. The query picks the
 * shortest USDA description containing every query word (Survey/FNDDS preferred,
 * since it carries household portions); prefix it with "=" to require that exact
 * description instead. Foods whose slug already exists are skipped, so this is
 * safe to re-run. Priority is tier-1 (US/UK) foods first, then Indian.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { registerHooks } from 'node:module';
import { fileURLToPath } from 'node:url';

// Astro/Vite resolve extensionless relative imports; plain node does not.
registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith('.') && !/\.[cm]?[jt]s$/.test(spec)) {
      try { return next(spec + '.ts', ctx); } catch {}
    }
    return next(spec, ctx);
  }
});
const { normalizeUsdaFoodDetails } = await import('../src/lib/usda/normalize.ts');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'src/data/foods');
const APPLY = process.argv.includes('--apply');
const CACHE_FILE = path.join(os.tmpdir(), 'fnc-usda-cache.json');

// file -> { exportName, category, foods: [display, query, servingRegex?][] }
const SPEC = {
  fruits: { exportName: 'fruitsFoods', category: 'Fruits', foods: [
    ['Avocado', 'avocado raw', /fruit|whole|medium/i], ['Kiwi', 'kiwi fruit raw', /fruit|medium/i], ['Pear', 'pear raw'],
    ['Cherries', 'cherries sweet raw'], ['Raspberries', 'raspberries raw'], ['Blackberries', 'blackberries raw'],
    ['Cantaloupe', 'cantaloupe raw'], ['Honeydew Melon', 'honeydew raw'], ['Plum', 'plum raw', /fruit|medium/i],
    ['Grapefruit', 'grapefruit raw'], ['Lemon', 'lemon raw'], ['Tangerine', 'tangerine raw'],
    ['Apricot', 'apricot raw', /apricot/i], ['Pomegranate', 'pomegranate raw'], ['Papaya', 'papaya raw'],
    ['Medjool Dates', 'dates medjool'], ['Dried Figs', 'figs dried'], ['Prunes', 'prunes dried'],
    ['Dried Cranberries', 'cranberries dried sweetened'], ['Fruit Salad', 'fruit salad fresh'],
  ]},
  vegetables: { exportName: 'vegetablesFoods', category: 'Vegetables', foods: [
    ['Romaine Lettuce', 'lettuce cos romaine raw'], ['Iceberg Lettuce', 'lettuce iceberg raw'], ['Kale', 'kale raw'],
    ['Cabbage', '=Cabbage, green, raw', /cup/i], ['Cauliflower', 'cauliflower raw'], ['Brussels Sprouts', 'brussels sprouts cooked'],
    ['Asparagus', 'asparagus cooked', /cup/i], ['Green Beans', '=Green beans, fresh, cooked, no added fat'], ['Green Peas', 'peas green cooked'],
    ['Sweet Corn', 'corn yellow cooked'], ['Mushrooms', 'mushrooms raw'], ['Celery', 'celery raw'],
    ['Eggplant', 'eggplant cooked'], ['Beets', 'beets cooked'], ['Garlic', 'garlic raw', /clove/i],
    ['Butternut Squash', 'squash winter butternut cooked'], ['Coleslaw', 'coleslaw'],
    ['Mashed Potatoes', 'potato mashed from fresh made with milk'], ['Baked Potato', 'potato baked peel eaten'],
    ['Hash Browns', 'potato hash brown from fresh'], ['Baked Beans', 'baked beans'], ['Garden Salad', 'lettuce salad with assorted vegetables'],
    ['Red Bell Pepper', 'peppers sweet red raw'], ['Spring Onions', 'onions spring raw'], ['Radish', 'radish raw'],
  ]},
  proteinfoods: { exportName: 'proteinfoodsFoods', category: 'Protein Foods', foods: [
    ['Bacon', 'pork bacon cooked', /slice/i], ['Deli Turkey', 'turkey deli'], ['Ham', 'ham sliced'],
    ['Pork Sausage', 'pork sausage'], ['Hot Dog (Frankfurter)', 'frankfurter beef', /frank|link|medium/i], ['Lamb Chop', '=Lamb, chop', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Baked Cod', 'cod baked'], ['Tilapia', 'tilapia cooked'],
    ['Canned Tuna in Water', 'tuna canned water'], ['Sardines', 'sardines canned'], ['Mackerel', '=Fish, mackerel, baked or broiled'],
    ['Crab', 'crab cooked'], ['Lobster', 'lobster cooked'], ['Scallops', '=Mollusks, scallop, (bay and sea), cooked, steamed'],
    ['Chicken Wings', 'chicken wing baked'], ['Roast Turkey', 'turkey light meat roasted'], ['Meatballs', '=Meatballs, frozen, Italian style'],
    ['Beef Jerky', 'beef jerky', /oz|piece|stick/i], ['Pepperoni', 'pepperoni', /slice/i], ['Salami', 'salami'],
    ['Fish Sticks', 'fish sticks'], ['Corned Beef', 'corned beef', /slice|oz/i], ['Rotisserie Chicken', '=Chicken breast, rotisserie, skin eaten'],
    ['Smoked Salmon', 'salmon smoked', { unit: 'oz', label: '1 oz', grams: 28.35 }], ['Chicken Drumstick', 'chicken drumstick baked'],
  ]},
  dairyalternatives: { exportName: 'dairyalternativesFoods', category: 'Dairy & Alternatives', foods: [
    ['Mozzarella Cheese', 'cheese mozzarella', /oz|slice/i], ['Parmesan Cheese', 'cheese parmesan'], ['Cottage Cheese', 'cottage cheese'],
    ['Cream Cheese', '=Cheese, cream', /tablespoon|tbsp/i], ['Feta Cheese', 'cheese feta'], ['Swiss Cheese', 'cheese swiss', /slice/i],
    ['American Cheese', 'cheese american', /slice/i], ['Brie Cheese', 'cheese brie', { unit: 'oz', label: '1 oz', grams: 28.35 }], ['Greek Yogurt (Plain Nonfat)', 'yogurt greek plain nonfat'],
    ['Butter', '=Butter, salted'], ['Heavy Cream', 'cream heavy'], ['Sour Cream', '=Sour cream, regular'],
    ['Almond Milk (Unsweetened)', 'almond milk unsweetened', /cup/i], ['Oat Milk', 'oat milk', /cup/i], ['Soy Milk', '=Soy milk, unsweetened'],
    ['Half and Half', 'half and half cream'], ['Whipped Cream', 'whipped cream'],
  ]},
  breakfast: { exportName: 'breakfastFoods', category: 'Breakfast', foods: [
    ['Pancakes', 'pancakes plain', /^1 (medium|regular|small)/i], ['Waffles', 'waffle plain'], ['French Toast', 'french toast plain'],
    ['Bagel', '=Bagel', /^1 (medium|regular)/i], ['English Muffin', 'english muffin plain'], ['Croissant', 'croissant'],
    ['Corn Flakes', 'corn flakes'], ['Frosted Corn Flakes', '=Cereal, corn flakes, flavored'], ['Granola', '=Cereal, granola'],
    ['Bran Flakes', 'bran flakes'], ['Breakfast Burrito', 'breakfast burrito egg'],
    ['Cheese Omelet', '=Egg omelet or scrambled egg, with cheese, made with butter'], 
    ['Breakfast Sandwich (Egg, Cheese, Ham)', '=Egg sandwich on English muffin, with ham'],
  ]},
  bakery: { exportName: 'bakeryFoods', category: 'Bread & Bakery', foods: [
    ['White Bread', 'bread white'], ['Whole Wheat Bread', 'bread whole wheat', /medium or regular slice/i], ['Sourdough Bread', 'bread sourdough'],
    ['Rye Bread', 'bread rye'], ['Multigrain Bread', 'bread multigrain'], ['Pita Bread', 'bread pita'],
    ['Flour Tortilla', 'tortilla flour'], ['Corn Tortilla', 'tortilla corn'], ['Hamburger Bun', 'roll hamburger'],
    ['Hot Dog Bun', 'roll hot dog', /^1 hot dog bun|regular/i], ['Dinner Roll', 'roll white soft'], ['Biscuit', '=Biscuit, NFS'],
    ['Garlic Bread', 'garlic bread'], ['Cornbread', '=Cornbread, made from home recipe'], ['Brioche', 'brioche'],
  ]},
  grainscereals: { exportName: 'grainscerealsFoods', category: 'Grains & Cereals', foods: [
    ['Couscous (Cooked)', 'couscous cooked', /cup/i], ['Bulgur (Cooked)', 'bulgur cooked'], ['Barley (Cooked)', 'barley pearled cooked'],
    ['Egg Noodles (Cooked)', 'noodles egg cooked'], ['Rice Noodles (Cooked)', 'rice noodles cooked', /cup/i], ['Grits (Cooked)', 'grits cooked'],
    ['Wild Rice (Cooked)', 'wild rice cooked'], ['Whole Wheat Pasta (Cooked)', 'pasta whole wheat cooked'],
  ]},
  beansplantprotein: { exportName: 'beansplantproteinFoods', category: 'Beans & Plant Protein', foods: [
    ['Kidney Beans (Canned)', 'kidney beans canned'], ['Pinto Beans (Cooked)', 'pinto beans cooked'], ['Navy Beans (Cooked)', 'navy beans cooked'],
    ['Edamame', 'edamame cooked'], ['Tempeh', 'tempeh'], ['Hummus', 'hummus'],
    ['Refried Beans', 'refried beans'], ['Black-Eyed Peas (Cooked)', '=Blackeyed peas, from dried'], ['Split Peas (Cooked)', 'split peas cooked'],
    ['Veggie Burger', 'veggie burger patty', /patty/i],
  ]},
  nutsseeds: { exportName: 'nutsseedsFoods', category: 'Nuts & Seeds', foods: [
    ['Cashews', 'cashew nuts'], ['Pistachios', 'pistachio nuts', /oz|cup/i], ['Pecans', 'pecans', /oz|cup/i],
    ['Macadamia Nuts', 'macadamia nuts'], ['Hazelnuts', 'hazelnuts'], ['Brazil Nuts', 'brazil nuts'],
    ['Chia Seeds', 'chia seeds'], ['Flaxseed', '=Seeds, flaxseed'], ['Sunflower Seeds', 'sunflower seeds'],
    ['Pumpkin Seeds', 'pumpkin seeds'], ['Sesame Seeds', 'sesame seeds'], ['Mixed Nuts', 'mixed nuts'],
    ['Trail Mix', 'trail mix'],
  ]},
  fastfood: { exportName: 'fastfoodFoods', category: 'Fast Food Style', foods: [
    ['Cheeseburger', 'cheeseburger fast food 1 medium patty'], ['Hamburger', 'hamburger fast food 1 medium patty'],
    ['Double Cheeseburger', 'double cheeseburger fast food'], ['Chicken Nuggets', 'chicken nuggets fast food'],
    ['French Fries', 'french fries fast food'], ['Onion Rings', 'onion rings'], ['Hot Dog on Bun', 'hot dog on bun'],
    ['Corn Dog', 'corn dog', /regular|corn dog/i], ['Fried Chicken Drumstick', 'fried chicken drumstick fast food', /drumstick/i],
    ['Fried Chicken Sandwich', 'chicken fillet sandwich fried fast food'], ['Grilled Chicken Sandwich', 'chicken fillet sandwich grilled', /regular/i],
    ['Fish Sandwich', 'fish sandwich fast food', /regular/i], ['Cheese Pizza', 'pizza cheese fast food medium crust', { unit: 'slice', label: '1 slice', grams: 86 }],
    ['Pepperoni Pizza', 'pizza pepperoni fast food medium crust', { unit: 'slice', label: '1 slice', grams: 88 }], ['Beef Taco', 'taco beef hard'],
    ['Beef and Bean Burrito', 'burrito beef beans'], ['Cheese Quesadilla', 'quesadilla cheese'], ['Nachos with Cheese', 'nachos cheese'],
    ['Turkey Sub Sandwich', 'submarine sandwich turkey', { unit: 'piece', label: '1 6-inch sub', grams: 184 }], ['BLT Sandwich', 'bacon lettuce tomato sandwich'],
    ['Grilled Cheese Sandwich', 'grilled cheese sandwich'], ['Philly Cheesesteak', '=Cheese steak sandwich or sub on white', /regular|6/i],
    ['Buffalo Wings', '=Chicken "wings" with hot sauce, from fast food / restaurant'], ['Mozzarella Sticks', 'mozzarella sticks'], ['Battered Fried Fish', 'fish battered fried'],
    ['Gyro', 'gyro'], ['Chicken Tenders', 'chicken tenders', /strip|tender/i],
  ]},
  preparedmeals: { exportName: 'preparedmealsFoods', category: 'Prepared Meals', foods: [
    ['Mac and Cheese', 'macaroni cheese'], ['Spaghetti with Meat Sauce', '=Restaurant, Italian, spaghetti with meat sauce'], ['Lasagna with Meat', 'lasagna meat'],
    ['Chili con Carne with Beans', 'chili con carne beans'], ['Beef Stew', 'beef stew'], ['Chicken Noodle Soup', 'chicken noodle soup'],
    ['Tomato Soup', 'tomato soup'], ['Clam Chowder', 'clam chowder new england'], ['Caesar Salad', 'caesar salad'],
    ['Chicken Caesar Salad', 'chicken caesar salad', /cup/i], ['Chicken Salad', 'chicken salad spread'], ['Tuna Salad', '=Tuna salad, made with mayonnaise'],
    ['Egg Salad', '=Egg salad, made with mayonnaise', /cup/i], ['Potato Salad', '=Potato salad, made with mayonnaise'], ["Shepherd's Pie", "=Shepherd's pie", /cup/i],
    ['Pot Roast', 'pot roast'], ['Meatloaf', 'meat loaf beef'], ['Chicken Pot Pie', 'chicken pot pie'],
    ['Fried Rice', 'fried rice meatless'], ['California Roll', 'sushi roll california'], ['Pad Thai with Chicken', 'pad thai chicken'],
    ['Chicken Fried Rice', '=Rice, fried, with chicken'], ['Orange Chicken', 'orange chicken', /cup/i], ['Vegetable Soup', 'vegetable soup'],
    ['Minestrone', 'minestrone'], ['Chicken Fajitas', 'chicken fajita'],
  ]},
  snacks: { exportName: 'snacksFoods', category: 'Snacks', foods: [
    ['Potato Chips', 'potato chips salted', /oz|bag/i], ['Tortilla Chips', 'tortilla chips plain', /oz|bag/i], ['Air-Popped Popcorn', 'popcorn air popped', /cup/i],
    ['Microwave Popcorn (Butter)', 'popcorn microwave butter', /cup/i], ['Pretzels', 'pretzels hard'], ['Saltine Crackers', 'crackers saltine', /cracker/i],
    ['Graham Crackers', 'graham crackers'], ['Rice Cakes', 'rice cake', /cake/i], ['Granola Bar', 'granola bar', /^1 bar/i],
    ['Cheese Puffs', '=Cheese flavored corn snacks', /oz|bag|cup/i], ['Guacamole', 'guacamole'],
    ['Salsa', 'salsa red'], ['Dill Pickles', 'pickles dill'], ['Cheese Crackers', 'crackers cheese', /oz|cup|cracker/i], ['Marie Biscuit', '=Marie biscuit'],
  ]},
  desserts: { exportName: 'dessertsFoods', category: 'Desserts', foods: [
    ['Vanilla Ice Cream', 'ice cream vanilla'], ['Chocolate Ice Cream', 'ice cream chocolate'], ['Frozen Yogurt', 'frozen yogurt', /cup|small/i],
    ['Chocolate Chip Cookie', 'cookie chocolate chip', /medium/i], ['Oatmeal Raisin Cookie', 'cookie oatmeal raisin'], ['Brownie', '=Cookie, brownie, without icing'],
    ['Chocolate Cake with Frosting', '=Cake or cupcake, chocolate with chocolate icing, bakery', /piece|slice/i], ['Cheesecake', 'cheesecake plain', /slice|piece/i], ['Apple Pie', 'pie apple'],
    ['Pumpkin Pie', 'pie pumpkin'], ['Glazed Doughnut', 'doughnut yeast glazed'], ['Blueberry Muffin', '=Muffins, blueberry, commercially prepared (Includes mini-muffins)'],
    ['Cupcake', 'cupcake', /cupcake|regular/i], ['Milk Chocolate', '=Candies, milk chocolate', /^1 bar|regular|oz/i], ['Dark Chocolate', 'chocolate dark'],
    ['Gummy Candy', 'gummy'], ['Chocolate Pudding', 'pudding chocolate'], ['Banana Bread', '=Bread, banana, prepared from recipe, made with margarine'],
    ['Cinnamon Roll', 'cinnamon roll', /regular|medium/i], ['Scone', 'scone', /medium|regular/i], ['Shortbread', 'shortbread'], ['Custard', 'custard'],
    ['Rice Pudding', 'rice pudding'],
  ]},
  beverages: { exportName: 'beveragesFoods', category: 'Beverages', foods: [
    ['Black Coffee', 'coffee brewed', /cup|mug/i], ['Latte (Nonfat Milk)', '=Coffee, Latte, nonfat'], ['Cappuccino', 'cappuccino'], ['Mocha', 'coffee mocha'],
    ['Black Tea', '=Tea, hot, leaf, black', /cup/i], ['Cola', 'soft drink cola', /can/i], ['Diet Cola', '=Soft drink, cola, diet', /can/i], ['Lemonade', '=Lemonade, fruit flavored drink', { unit: 'cup', label: '1 cup', grams: 248 }],
    ['Sports Drink', 'sports drink'], ['Energy Drink', 'energy drink'], ['Beer', 'beer', /can|bottle|12/i], ['Light Beer', 'beer light', /can|bottle|12/i],
    ['Red Wine', 'wine red', /glass/i], ['White Wine', 'wine white'], ['Vodka', 'vodka'], ['Hot Chocolate', 'hot chocolate', /cup|mug/i],
    ['Fruit Smoothie', 'smoothie fruit', /cup|small/i], ['Chocolate Milk', 'chocolate milk'], ['Vanilla Milkshake', '=Milk shakes, thick vanilla'],
    ['Coconut Water', '=Coconut water, unsweetened', { unit: 'cup', label: '1 cup', grams: 240 }], ['Tea with Milk', '=Tea, hot, with milk'], ['Sweet Iced Tea', '=Tea, iced, brewed, black, pre-sweetened with sugar'], ['Cranberry Juice', 'cranberry juice cocktail', /cup/i],
  ]},
  condiments: { exportName: 'condimentsFoods', category: 'Condiments & Oils', foods: [
    ['Olive Oil', 'oil olive', /tablespoon/i], ['Canola Oil', 'oil canola', /tablespoon/i], ['Coconut Oil', 'oil coconut', /tablespoon/i], ['Mayonnaise', '=Mayonnaise, regular', /tablespoon/i],
    ['Ketchup', 'ketchup'], ['Yellow Mustard', 'mustard yellow', /teaspoon|packet/i], ['Ranch Dressing', 'ranch dressing', /tablespoon/i], ['Italian Dressing', '=Italian dressing, made with vinegar and oil', /tablespoon/i],
    ['Caesar Dressing', 'caesar dressing'], ['BBQ Sauce', 'barbecue sauce'], ['Soy Sauce', 'soy sauce'], ['Hot Sauce', 'hot pepper sauce', /packet/i],
    ['Honey', 'honey'], ['Maple Syrup', 'maple syrup'], ['White Sugar', 'sugar white granulated'], ['Brown Sugar', 'sugar brown'],
    ['Jam', '=Jams and preserves'], ['Chocolate Hazelnut Spread', 'chocolate hazelnut spread'], ['Pesto', 'pesto'], ['Alfredo Sauce', '=Alfredo sauce'],
    ['Marinara Sauce', '=Sauce, pasta, spaghetti/marinara, ready-to-serve'], ['Brown Gravy', '=Gravy, beef'], ['Margarine', 'margarine'],
  ]},
  indian: { exportName: 'indianFoods', category: 'Indian Foods', foods: [
    ['Naan', 'bread naan'], ['Roti (Chapati)', 'chappatti roti', /medium/i], ['Paratha', 'paratha'], ['Puri', 'puri'],
    ['Samosa', 'samosa'], ['Pakora', 'pakora'], ['Dosa', 'dosa'], ['Idli', 'idli'],
    ['Chicken Curry', '=Chicken curry'], ['Chicken Curry with Rice', '=Chicken curry with rice'],
    ['Vegetable Curry', '=Vegetable curry'], ['Fish Curry', '=Fish curry'], ['Beef Curry', '=Beef curry'],
    ['Chicken Biryani', 'biryani chicken'], ['Vegetable Biryani', 'biryani vegetable'], ['Dal (Lentil Curry)', '=Lentil curry'],
    ['Palak Paneer', 'palak paneer'], ['Channa Saag', '=Channa Saag'], ['Paneer', 'cheese paneer'],
    ['Upma', 'upma'], ['Papadum', 'papad'],
    ['Firni (Indian Rice Pudding)', '=Firni, Indian pudding'], ['Barfi', '=Barfi or Burfi, Indian dessert'],
    ['Ghee', '=Butter, Clarified butter (ghee)'], ['Besan (Chickpea Flour)', '=Chickpea flour (besan)'],
  ]},
};

const key = (process.env.USDA_API_KEY || (fs.readFileSync(path.join(ROOT, '.env'), 'utf8').match(/^USDA_API_KEY=(.*)$/m)?.[1] ?? '')).trim();
if (!key) { console.error('USDA_API_KEY missing'); process.exit(1); }

const cache = fs.existsSync(CACHE_FILE) ? JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')) : {};
async function cached(id, fn) {
  if (!(id in cache)) { cache[id] = await fn(); fs.writeFileSync(CACHE_FILE, JSON.stringify(cache)); }
  return cache[id];
}
async function usda(url, body, attempt = 1) {
  const res = await fetch(`https://api.nal.usda.gov/fdc/v1/${url}${url.includes('?') ? '&' : '?'}api_key=${key}`,
    body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {});
  // FDC returns sporadic 5xx/429 under load; back off and retry.
  if ((res.status >= 500 || res.status === 429) && attempt < 5) {
    await new Promise((r) => setTimeout(r, 2000 * attempt));
    return usda(url, body, attempt + 1);
  }
  if (!res.ok) throw new Error(`USDA ${res.status} ${url}`);
  return res.json();
}

const norm = (t) => t.toLowerCase().replace(/[^a-z0-9%]+/g, ' ').trim();
const TYPE_RANK = { 'Survey (FNDDS)': 0, 'SR Legacy': 1, 'Foundation': 2 };

function pick(foods, query) {
  if (query.startsWith('=')) return foods.find((f) => norm(f.description) === norm(query.slice(1)));
  const tokens = norm(query).split(' ');
  return foods
    .filter((f) => { const words = norm(f.description).split(' '); return tokens.every((t) => words.some((w) => w.startsWith(t))); })
    .sort((a, b) => (TYPE_RANK[a.dataType] - TYPE_RANK[b.dataType]) || (a.description.length - b.description.length))[0];
}

const slugify = (t) => t.toLowerCase().replace(/['()]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const round = (v) => (v == null ? null : Math.round(v * 100) / 100);

const existingSlugs = new Set();
for (const f of fs.readdirSync(DATA_DIR)) {
  for (const m of fs.readFileSync(path.join(DATA_DIR, f), 'utf8').matchAll(/"slug": "([^"]+)"/g)) existingSlugs.add(m[1]);
}

const report = [], problems = [], byFile = {};
for (const [file, { category, foods }] of Object.entries(SPEC)) {
  byFile[file] = [];
  for (const [display, query, servingRe] of foods) {
    const slug = slugify(display);
    if (existingSlugs.has(slug)) { report.push(`  skip  ${display} (exists)`); continue; }
    const results = await cached(`s:${query}`, async () => (await usda('foods/search', {
      // FDC parses quotes/parens as search syntax (400), so search on plain words.
      query: norm(query), pageSize: 50, dataType: ['Survey (FNDDS)', 'SR Legacy', 'Foundation']
    })).foods.map(({ fdcId, description, dataType }) => ({ fdcId, description, dataType })));
    const hit = pick(results, query);
    if (!hit) { problems.push(`${display} [${query}]: no match; top: ${results.slice(0, 5).map((f) => f.description).join(' | ')}`); continue; }

    const details = await cached(`d:${hit.fdcId}`, () => usda(`food/${hit.fdcId}`));
    const n = normalizeUsdaFoodDetails(details);
    if (n.nutrientsPer100g.calories == null) { problems.push(`${display}: "${hit.description}" has no kcal`); continue; }

    const servings = n.servingSizes
      .map((s) => ({ ...s, label: s.label.replace(/\s*\([^)]*\)/g, '').replace(/,\s*(NFS|ns as to .*)$/i, '').trim() }))
      .filter((s) => s.grams > 0 && s.grams < 1500);
    // A plain object is an explicit serving (USDA portion the normalizer collapses, e.g. a pizza slice).
    const explicit = servingRe && !(servingRe instanceof RegExp) ? servingRe : null;
    if (explicit) servings.unshift(explicit);
    const wanted = explicit || (servingRe && servings.find((s) => servingRe.test(s.label)));
    if (servingRe && !wanted) problems.push(`${display}: no serving matches ${servingRe}; have: ${servings.map((s) => s.label).join(' | ')}`);
    const def = wanted || servings.find((s) => s.unit !== 'serving') || servings[0];
    const servingSizes = [
      ...(def ? [{ ...def, isDefault: true }] : []),
      ...servings.filter((s) => s !== def).slice(0, 3),
      { unit: 'g', label: '100 g', grams: 100, ...(def ? {} : { isDefault: true }) },
    ].map((s, i) => ({ id: `serve_${i + 1}`, ...s }));

    const lower = display.toLowerCase();
    byFile[file].push({
      id: `usda_${hit.fdcId}`,
      slug,
      name: display,
      searchName: lower,
      displayName: display,
      aliases: [...new Set([lower, hit.description.toLowerCase()])],
      category,
      source: 'local',
      sourceLabel: 'USDA FoodData Central',
      isEstimated: false,
      defaultUnit: servingSizes[0].unit,
      defaultQuantity: 1,
      servingSizes,
      nutrientsPer100g: Object.fromEntries(Object.entries(n.nutrientsPer100g).map(([k, v]) => [k, round(v)])),
      tags: [slugify(category)],
      compareGroup: category,
      usda: { fdcId: hit.fdcId, dataType: hit.dataType },
    });
    existingSlugs.add(slug);
    report.push(`  ${display.padEnd(34)} ${String(Math.round(n.nutrientsPer100g.calories)).padStart(4)} kcal  ${(servingSizes[0].label + ' ' + servingSizes[0].grams + 'g').padEnd(30)} [${hit.dataType.slice(0, 6)}] ${hit.description}`);
  }
}

if (APPLY) {
  for (const [file, added] of Object.entries(byFile)) {
    if (!added.length) continue;
    const full = path.join(DATA_DIR, `${file}.ts`);
    const { exportName } = SPEC[file];
    if (fs.existsSync(full)) {
      const src = fs.readFileSync(full, 'utf8');
      const start = src.indexOf('= [') + 2;
      const foods = JSON.parse(src.slice(start, src.lastIndexOf(']') + 1));
      fs.writeFileSync(full, `${src.slice(0, start)}${JSON.stringify([...foods, ...added], null, 2)};\n`, 'utf8');
    } else {
      fs.writeFileSync(full, `import type { FoodItem } from '../../lib/nutrition/types';\n\nexport const ${exportName}: FoodItem[] = ${JSON.stringify(added, null, 2)};\n`, 'utf8');
      console.log(`NEW FILE ${file}.ts — register ${exportName} in src/data/foods/index.ts`);
    }
  }
}

const total = Object.values(byFile).reduce((s, a) => s + a.length, 0);
console.log(report.join('\n'));
console.log(`\nadded ${total}, problems ${problems.length}`);
if (problems.length) console.log('PROBLEMS:\n' + problems.join('\n'));
console.log(APPLY ? '\nFiles written.' : '\nDry run - nothing written. Re-run with --apply.');
