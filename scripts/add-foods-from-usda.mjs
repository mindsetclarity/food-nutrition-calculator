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
 *
 * Paneer is deliberately absent: USDA's only record (FNDDS 2705740) lists 22.5 g
 * carbs and 23.3 g sugar per 100 g, far from real paneer.
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
    ['Nectarine', 'nectarine raw', /fruit|medium/i],
    ['Clementine', 'clementine raw', /fruit/i],
    ['Lime', 'lime raw'],
    ['Coconut Meat', 'coconut meat raw'],
    ['Guava', 'guava raw'],
    ['Passion Fruit', 'passion fruit raw'],
    ['Lychee', '=Lychee'],
    ['Persimmon', 'persimmon raw'],
    ['Fresh Figs', 'figs raw'],
    ['Gooseberries', 'gooseberries raw'],
    ['Fresh Cranberries', 'cranberries raw', /cup/i],
    ['Rhubarb', 'rhubarb raw'],
    ['Star Fruit', 'carambola raw'],
    ['Dragon Fruit', 'dragon fruit'],
    ['Jackfruit', 'jackfruit raw'],
    ['Plantain (Cooked)', 'plantain cooked', /cup/i],
    ['Applesauce (Unsweetened)', 'applesauce unsweetened'],
    ['Applesauce (Sweetened)', 'applesauce sweetened'],
    ['Fruit Cocktail (Canned)', 'fruit cocktail canned'],
    ['Mandarin Oranges (Canned)', 'mandarin oranges canned'],
    ['Grapefruit Juice', 'grapefruit juice', { unit: 'cup', label: '1 cup', grams: 248 }],
    ['Lemon Juice', 'lemon juice'],
    ['Lime Juice', 'lime juice'],
    ['Prune Juice', 'prune juice', { unit: 'cup', label: '1 cup', grams: 248 }],
    ['Tomato Juice', 'tomato juice', { unit: 'cup', label: '1 cup', grams: 248 }],
    ['Mango Nectar', 'mango nectar', { unit: 'cup', label: '1 cup', grams: 248 }],
    ['Dried Apricots', 'apricots dried'],
    ['Banana Chips', 'banana chips', /oz|cup/i],
    ['Sweetened Coconut Flakes', 'coconut shredded sweetened'],
    ['Goji Berries', 'goji berries dried'],
    ['Mulberries', 'mulberries raw', /cup/i],
    ['Kumquat', 'kumquat raw'],
    ['Canned Pears', 'pears canned juice'],
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
    ['Arugula', 'arugula raw', /cup/i],
    ['Bok Choy', 'cabbage chinese pak choi raw', /cup/i],
    ['Collard Greens (Cooked)', 'collards cooked'],
    ['Swiss Chard (Cooked)', 'swiss chard cooked'],
    ['Leeks', 'leeks raw'],
    ['Shallots', 'shallots raw'],
    ['Artichoke (Cooked)', 'artichoke cooked'],
    ['Okra (Cooked)', 'okra cooked'],
    ['Parsnips (Cooked)', 'parsnips cooked'],
    ['Turnips (Cooked)', 'turnip cooked'],
    ['Rutabaga (Swede)', 'rutabaga cooked'],
    ['Fennel', 'fennel bulb raw'],
    ['Jalapeno Pepper', 'jalapeno pepper raw'],
    ['Yellow Squash (Cooked)', 'squash summer yellow cooked', /cup/i],
    ['Spaghetti Squash (Cooked)', 'spaghetti squash cooked'],
    ['Acorn Squash (Cooked)', 'squash acorn cooked'],
    ['Pumpkin (Cooked)', 'pumpkin cooked'],
    ['Bean Sprouts', 'bean sprouts raw'],
    ['Watercress', 'watercress raw', /cup/i],
    ['Mixed Vegetables (Cooked)', 'mixed vegetables cooked'],
    ['Peas and Carrots', 'peas and carrots cooked'],
    ['Canned Corn', 'corn canned'],
    ['Creamed Corn', 'corn cream style'],
    ['Sauerkraut', 'sauerkraut'],
    ['Kimchi', 'kimchi'],
    ['Sun-Dried Tomatoes', 'tomatoes sun dried'],
    ['Tomato Paste', 'tomato paste', /tablespoon|tbsp/i],
    ['Black Olives', 'olives black'],
    ['Green Olives', 'olives green'],
    ['Potato Skins', 'potato skins'],
    ['Scalloped Potatoes', 'potato scalloped'],
    ['Potato Pancake (Latke)', 'potato pancake'],
    ['Home Fries', 'potato home fries'],
    ['Yellow Wax Beans', 'yellow string beans cooked'],
    ['Canned Mushrooms', 'mushrooms cooked', /cup/i],
    ['Portobello Mushroom', 'mushrooms portabella'],
    ['Shiitake Mushrooms', 'mushrooms shiitake cooked'],
    ['Fresh Ginger', 'ginger root raw'],
    ['Cilantro', 'coriander leaves raw'],
    ['Parsley', 'parsley raw'],
    ['Fresh Basil', 'basil fresh'],
    ['Dried Seaweed', '=Seaweed, dried'],
    ['Red Cabbage', 'cabbage red raw', /cup/i],
    ['Cherry Tomatoes', 'tomatoes grape raw', /cup/i],
    ['Candied Sweet Potatoes', 'sweet potato candied'],
    ['Pickled Beets', 'beets pickled', /cup/i],
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
    ['Ground Turkey (Cooked)', 'turkey ground cooked', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Ground Chicken (Cooked)', 'chicken ground cooked', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Ground Pork (Cooked)', 'pork ground cooked', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Lean Ground Beef (90%, Cooked)', 'ground beef 90% lean cooked', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Ribeye Steak', 'beef steak ribeye cooked'],
    ['Filet Mignon (Beef Tenderloin)', 'beef tenderloin cooked', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Flank Steak', 'beef flank steak cooked', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Beef Short Ribs', 'beef short ribs cooked', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Pork Tenderloin', 'pork tenderloin cooked', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Pork Spare Ribs', 'pork spareribs cooked'],
    ['Pulled Pork', 'pork pulled barbecue'],
    ['Pork Belly', 'pork belly'],
    ['Prosciutto', 'prosciutto'],
    ['Chorizo', 'chorizo'],
    ['Bratwurst', 'bratwurst', /link|bratwurst|piece/i],
    ['Italian Sausage', 'italian sausage'],
    ['Kielbasa', 'kielbasa'],
    ['Chicken Sausage', 'chicken sausage'],
    ['Turkey Bacon', 'turkey bacon'],
    ['Canadian Bacon', 'canadian bacon', /slice/i],
    ['Bologna', 'bologna'],
    ['Deli Roast Beef', '=Beef, prepackaged or deli, luncheon meat'],
    ['Pastrami', 'pastrami'],
    ['Beef Liver (Cooked)', 'beef liver cooked', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Chicken Liver (Cooked)', 'chicken liver cooked', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Roast Duck', 'duck roasted', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Roast Lamb', 'lamb roast'],
    ['Ground Lamb (Cooked)', 'lamb ground cooked', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Venison Steak', '=Venison, steak'],
    ['Trout', 'trout cooked'],
    ['Catfish', 'catfish cooked'],
    ['Haddock', 'haddock cooked', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Pollock', 'pollock cooked', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Swordfish', 'swordfish cooked'],
    ['Sea Bass', 'sea bass cooked'],
    ['Red Snapper', 'snapper cooked'],
    ['Anchovies', 'anchovies canned'],
    ['Canned Salmon', 'salmon canned'],
    ['Tuna Canned in Oil', 'tuna canned oil'],
    ['Crab Cakes', 'crab cake'],
    ['Clams', '=Mollusks, clam, mixed species, cooked, moist heat', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Mussels', '=Mollusks, mussel, blue, cooked, moist heat', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Oysters', 'oysters raw'],
    ['Fried Calamari', 'squid fried', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Octopus', 'octopus cooked', { unit: 'oz', label: '3 oz', grams: 85 }],
    ['Imitation Crab', 'imitation crab'],
    ['Kippers', 'herring kippered'],
    ['Pickled Herring', 'herring pickled'],
    ['Egg Whites (Cooked)', 'egg white cooked'],
    ['Chicken Breast (Skin On, Roasted)', 'chicken breast roasted skin eaten'],
    ['BBQ Chicken', 'chicken barbecue'],
    ['Fried Chicken Wing', 'chicken wing fried'],
    ['Roast Pork', 'pork roast'],
    ['Ham Steak', 'ham steak'],
  ]},
  dairyalternatives: { exportName: 'dairyalternativesFoods', category: 'Dairy & Alternatives', foods: [
    ['Mozzarella Cheese', 'cheese mozzarella', /oz|slice/i], ['Parmesan Cheese', 'cheese parmesan'], ['Cottage Cheese', 'cottage cheese'],
    ['Cream Cheese', '=Cheese, cream', /tablespoon|tbsp/i], ['Feta Cheese', 'cheese feta'], ['Swiss Cheese', 'cheese swiss', /slice/i],
    ['American Cheese', 'cheese american', /slice/i], ['Brie Cheese', 'cheese brie', { unit: 'oz', label: '1 oz', grams: 28.35 }], ['Greek Yogurt (Plain Nonfat)', 'yogurt greek plain nonfat'],
    ['Butter', '=Butter, salted'], ['Heavy Cream', 'cream heavy'], ['Sour Cream', '=Sour cream, regular'],
    ['Almond Milk (Unsweetened)', 'almond milk unsweetened', /cup/i], ['Oat Milk', 'oat milk', /cup/i], ['Soy Milk', '=Soy milk, unsweetened'],
    ['Half and Half', 'half and half cream'], ['Whipped Cream', 'whipped cream'],
    ['Goat Cheese', 'cheese goat', { unit: 'oz', label: '1 oz', grams: 28.35 }],
    ['Provolone Cheese', 'cheese provolone', /slice/i],
    ['Gouda Cheese', 'cheese gouda'],
    ['Monterey Jack Cheese', 'cheese monterey'],
    ['Colby Jack Cheese', 'cheese colby jack', /slice/i],
    ['Blue Cheese', 'cheese blue', { unit: 'oz', label: '1 oz', grams: 28.35 }],
    ['Ricotta Cheese', 'cheese ricotta'],
    ['Camembert', 'cheese camembert', { unit: 'oz', label: '1 oz', grams: 28.35 }],
    ['Gruyere Cheese', 'cheese gruyere', { unit: 'oz', label: '1 oz', grams: 28.35 }],
    ['Buttermilk', 'buttermilk'],
    ['Evaporated Milk', 'evaporated milk'],
    ['Sweetened Condensed Milk', 'milk condensed sweetened'],
    ['Goat Milk', 'goat milk', /cup/i],
    ['1% Low-Fat Milk', 'milk 1%'],
    ['Lactose-Free Milk', 'milk lactose free', /cup/i],
    ['Coconut Milk (Canned)', 'coconut milk canned'],
    ['Rice Milk', 'rice milk', /cup/i],
    ['Kefir', 'kefir'],
    ['Fruit Yogurt (Low-Fat)', 'yogurt fruit low fat'],
    ['Greek Yogurt with Fruit', 'yogurt greek fruit'],
    ['Soy Yogurt', 'yogurt soy'],
    ['Coffee Creamer', 'coffee creamer liquid', /tablespoon|individual/i],
    ['Light Cream', 'cream light'],
    ['Chocolate Almond Milk', 'almond milk chocolate'],
    ['Sweetened Almond Milk', 'almond milk sweetened'],
    ['Cheese Spread', 'cheese spread'],
  ]},
  breakfast: { exportName: 'breakfastFoods', category: 'Breakfast', foods: [
    ['Pancakes', 'pancakes plain', /^1 (medium|regular|small)/i], ['Waffles', 'waffle plain'], ['French Toast', 'french toast plain'],
    ['Bagel', '=Bagel', /^1 (medium|regular)/i], ['English Muffin', 'english muffin plain'], ['Croissant', 'croissant'],
    ['Corn Flakes', 'corn flakes'], ['Frosted Corn Flakes', '=Cereal, corn flakes, flavored'], ['Granola', '=Cereal, granola'],
    ['Bran Flakes', 'bran flakes'], ['Breakfast Burrito', 'breakfast burrito egg'],
    ['Cheese Omelet', '=Egg omelet or scrambled egg, with cheese, made with butter'], 
    ['Breakfast Sandwich (Egg, Cheese, Ham)', '=Egg sandwich on English muffin, with ham'],
    ['Oatmeal Made with Milk', '=Oatmeal, instant, plain, made with milk, no added fat'], ['Blueberry Pancakes', '=Pancakes, blueberry, prepared from recipe'],
    ['Cinnamon Raisin Bagel', '=Bagels, cinnamon-raisin'], ['Cheese Grits', '=Grits, with cheese, fat added', /cup/i],
    ['Cream of Wheat', 'cream of wheat'],
    ['Crispy Rice Cereal', 'cereal crispy rice'],
    ['Shredded Wheat', 'shredded wheat', /cup|biscuit/i],
    ['Honey Nut Oat Cereal', "=Cereal, O's, honey nut"],
    ['Fruit-Flavored Cereal', 'cereal fruit flavored'],
    ['Chocolate Cereal', 'cereal chocolate'],
    ['Toaster Pastry (Fruit)', '=Toaster pastries, fruit (includes apple, blueberry, cherry, strawberry)', /pastry|piece/i],
    ['Eggs Benedict', 'egg benedict'],
    ['Huevos Rancheros', 'huevos rancheros'],
    ['Quiche', 'quiche', /slice|piece/i],
    ['Sausage Egg English Muffin', 'egg sandwich english muffin sausage'],
    ['Bacon Egg and Cheese Bagel', 'egg sandwich bagel bacon', /regular/i],
    ['Bacon Egg Biscuit', 'egg sandwich biscuit bacon'],
    ['Cheese Danish', 'danish pastry cheese'],
    ['Oat Bran Muffin', 'muffin bran', /medium/i],
    ['Corn Muffin', 'muffin corn'],
    ['Crepe', 'crepe'],
    ['Yogurt Parfait', 'yogurt parfait'],
    ['Instant Oatmeal (Flavored)', 'oatmeal instant flavored', /packet/i],
    ['Steel-Cut Oats', 'oats steel cut'],
    ['Breakfast Bar', 'breakfast bar'],
    ['Strawberry Pancakes', 'pancakes fruit', /medium|pancake/i],
  ]},
  bakery: { exportName: 'bakeryFoods', category: 'Bread & Bakery', foods: [
    ['White Bread', 'bread white'], ['Whole Wheat Bread', 'bread whole wheat', /medium or regular slice/i], ['Sourdough Bread', 'bread sourdough'],
    ['Rye Bread', 'bread rye'], ['Multigrain Bread', 'bread multigrain'], ['Pita Bread', 'bread pita'],
    ['Flour Tortilla', 'tortilla flour'], ['Corn Tortilla', 'tortilla corn'], ['Hamburger Bun', 'roll hamburger'],
    ['Hot Dog Bun', 'roll hot dog', /^1 hot dog bun|regular/i], ['Dinner Roll', 'roll white soft'], ['Biscuit', '=Biscuit, NFS'],
    ['Garlic Bread', 'garlic bread'], ['Cornbread', '=Cornbread, made from home recipe'], ['Brioche', 'brioche'],
    ['Oat Bread', 'bread oatmeal', /medium or regular slice/i],
    ['Raisin Bread', 'bread raisin'],
    ['Pumpernickel Bread', 'bread pumpernickel', /medium or regular slice/i],
    ['Italian Bread', 'bread italian'],
    ['French Bread (Baguette)', 'bread french', /medium|regular/i],
    ['Potato Bread', 'bread potato'],
    ['Gluten-Free Bread', 'bread gluten free', /slice/i],
    ['Whole Wheat Tortilla', 'tortilla whole wheat'],
    ['Focaccia', 'focaccia'],
    ['Soft Pretzel', 'pretzel soft', /medium/i],
    ['Breadsticks', 'breadsticks'],
    ['Croutons', 'croutons'],
    ['Bread Crumbs', 'bread crumbs'],
    ['Kaiser Roll', 'roll kaiser'],
    ['Hoagie Roll', 'roll hoagie'],
    ['Hard Taco Shell', 'taco shell'],
    ['Tostada Shell', 'tostada shell'],
    ['Matzo', 'matzo'],
    ['Wheat Bagel', 'bagel wheat', /regular|medium/i],
    ['Multigrain Bagel', 'bagel multigrain', /regular|medium/i],
    ['Whole Wheat English Muffin', 'english muffin whole wheat'],
    ['Whole Wheat Pita', 'pita whole wheat'],
    ['Cheese Bread', 'bread cheese'],
    ['Challah', 'challah', /slice/i],
    ['Zucchini Bread', 'zucchini bread'],
  ]},
  grainscereals: { exportName: 'grainscerealsFoods', category: 'Grains & Cereals', foods: [
    ['Couscous (Cooked)', 'couscous cooked', /cup/i], ['Bulgur (Cooked)', 'bulgur cooked'], ['Barley (Cooked)', 'barley pearled cooked'],
    ['Egg Noodles (Cooked)', 'noodles egg cooked'], ['Rice Noodles (Cooked)', 'rice noodles cooked', /cup/i], ['Grits (Cooked)', 'grits cooked'],
    ['Wild Rice (Cooked)', 'wild rice cooked'], ['Whole Wheat Pasta (Cooked)', 'pasta whole wheat cooked'],
    ['Spanish Rice', 'rice spanish'],
    ['Rice Pilaf', 'rice pilaf'],
    ['Yellow Rice', 'rice yellow'],
    ['Sticky Rice', 'rice glutinous cooked'],
    ['Millet (Cooked)', 'millet cooked'],
    ['Buckwheat Groats (Cooked)', 'buckwheat groats cooked'],
    ['Polenta (Cornmeal Mush)', '=Cornmeal mush, NS as to fat'],
    ['Oat Bran (Cooked)', 'oat bran cooked'],
    ['Ramen Noodle Soup (Instant)', 'noodles ramen'],
    ['Soba Noodles (Cooked)', 'noodles soba cooked'],
    ['Amaranth (Cooked)', 'amaranth cooked'],
    ['Glass Noodles (Dry)', 'noodles cellophane'],
  ]},
  beansplantprotein: { exportName: 'beansplantproteinFoods', category: 'Beans & Plant Protein', foods: [
    ['Kidney Beans (Canned)', 'kidney beans canned'], ['Pinto Beans (Cooked)', 'pinto beans cooked'], ['Navy Beans (Cooked)', 'navy beans cooked'],
    ['Edamame', 'edamame cooked'], ['Tempeh', 'tempeh'], ['Hummus', 'hummus'],
    ['Refried Beans', 'refried beans'], ['Black-Eyed Peas (Cooked)', '=Blackeyed peas, from dried'], ['Split Peas (Cooked)', 'split peas cooked'],
    ['Veggie Burger', 'veggie burger patty', /patty/i],
    ['Great Northern Beans', 'great northern beans'],
    ['White Beans (Cooked)', 'white beans cooked'],
    ['Mung Beans (Cooked)', 'mung beans cooked', /cup/i],
    ['Adzuki Beans (Cooked)', 'adzuki beans cooked'],
    ['Soybeans (Cooked)', 'soybeans cooked'],
    ['Textured Vegetable Protein', 'textured vegetable protein'],
    ['Black Bean Salad', 'bean salad'],
    ['Pork and Beans', 'pork and beans'],
    ['Meatless Chicken (Breaded)', '=Chicken, meatless, breaded, fried'],
  ]},
  nutsseeds: { exportName: 'nutsseedsFoods', category: 'Nuts & Seeds', foods: [
    ['Cashews', 'cashew nuts'], ['Pistachios', 'pistachio nuts', /oz|cup/i], ['Pecans', 'pecans', /oz|cup/i],
    ['Macadamia Nuts', 'macadamia nuts'], ['Hazelnuts', 'hazelnuts'], ['Brazil Nuts', 'brazil nuts'],
    ['Chia Seeds', 'chia seeds'], ['Flaxseed', '=Seeds, flaxseed'], ['Sunflower Seeds', 'sunflower seeds'],
    ['Pumpkin Seeds', 'pumpkin seeds'], ['Sesame Seeds', 'sesame seeds'], ['Mixed Nuts', 'mixed nuts'],
    ['Trail Mix', 'trail mix'],
    ['Pine Nuts', 'pine nuts', { unit: 'oz', label: '1 oz', grams: 28.35 }],
    ['Hemp Seeds', 'hemp seeds'],
    ['Cashew Butter', 'cashew butter'],
    ['Sunflower Seed Butter', 'sunflower seed butter'],
    ['Tahini', 'tahini'],
    ['Honey Roasted Peanuts', 'peanuts honey roasted', /oz|cup/i],
    ['Chunky Peanut Butter', 'peanut butter chunky', /tablespoon|tbsp/i],
    ['Roasted Chestnuts', 'chestnuts roasted'],
    ['Chocolate-Covered Almonds', 'almonds chocolate covered'],
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
    ['Chicken Burrito Bowl', '=Burrito bowl, chicken'], ['Fried Chicken Wrap', '=Chicken fillet wrap sandwich, fried, from fast food'],
    ['Grilled Chicken Wrap', '=Chicken fillet wrap sandwich, grilled, from fast food'], ['Chicken Quesadilla', '=Quesadilla, chicken'],
    ['Sausage Biscuit', '=Sausage biscuit sandwich'], ['Fast Food Hash Brown', '=Potato, hash brown, from fast food'],
    ['Chicken Burrito', '=Burrito, chicken, cheese', /^1 (regular|small|medium|large)/i], ['Beef Burrito', '=Burrito, beef, cheese', /^1 (regular|small|medium|large)/i], ['Fish Taco', '=Taco, fish', /^1 (taco|small|regular|medium)/i],
    ['Chicken Taco', '=Taco, flour tortilla, chicken, cheese'], ['Cheese Enchilada', '=Restaurant, Mexican, cheese enchilada'],
    ['Beef Tamale', '=Tamale, beef'], ['Meatball Sub', '=Meatball sandwich or sub'], ['Reuben Sandwich', '=Reuben sandwich'],
    ['Club Sandwich', '=Club sandwich on white'], ['Peanut Butter and Jelly Sandwich', '=Peanut butter and jelly sandwich, with regular peanut butter, regular jelly, on white bread'],
    ['Tuna Salad Sandwich', '=Tuna salad sandwich on white'], ['Ham and Cheese Sandwich', '=Ham sandwich on white, with cheese'],
    ['Chicken Salad Sandwich', '=Chicken salad sandwich on white'], ['Falafel', '=Falafel'], ['Falafel Sandwich', '=Falafel sandwich'],
    ['Taco Salad', '=Taco or tostada salad with meat'], ['Fried Chicken Thigh', '=Fast Foods, Fried Chicken, Thigh, meat and skin and breading'],
    ['Mashed Potatoes with Gravy', '=Potato, mashed, from fast food, with gravy'], ['Sweet Potato Fries', '=Sweet potato fries, NFS', /cup|order/i],
    ['Tater Tots', '=Potato tots, NFS'], ['Churros', '=Churros'], ['Funnel Cake', '=Funnel cake with sugar'],
    ['Chili Dog (No Bun)', 'hot dog chili'],
    ['Cold Cut Sub', 'submarine sandwich cold cut', { unit: 'piece', label: '1 6-inch sub', grams: 196 }],
    ['Supreme Pizza', 'pizza meat vegetables fast food medium crust'],
    ['Thin Crust Cheese Pizza', 'pizza cheese fast food thin crust', /personal/i],
    ['Thick Crust Cheese Pizza', 'pizza cheese fast food thick crust', /personal/i],
    ['Veggie Pizza', 'pizza cheese vegetables fast food medium crust', /personal/i],
    ['Meat and Cheese Calzone', 'calzone', /calzone|item|regular/i],
    ['Chimichanga', 'chimichanga'],
    ['Cheese Fries', 'french fries cheese', /order|cup|medium/i],
    ['Chili Cheese Fries', 'french fries chili cheese', /order|cup|medium/i],
    ['Soft Serve Ice Cream', 'ice cream soft serve'],
    ['Hot Fudge Sundae', 'sundae hot fudge'],
    ['Beef Burrito Bowl', 'burrito bowl beef'],
    ['Sloppy Joe', 'sloppy joe'],
    ['French Dip Sandwich', 'french dip'],
    ['Cuban Sandwich', 'cuban sandwich'],
    ['Corned Beef Hash', 'corned beef hash', /cup/i],
    ['Pulled Pork Sandwich', 'barbecue pork sandwich white', /regular|bun|sandwich/i],
    ['Steak Sandwich', 'steak sandwich on white', /regular/i],
    ['Fish Fillet Sandwich (Grilled)', 'fish sandwich grilled', /regular/i],
    ['Turkey Sandwich', 'turkey sandwich on white', /regular|medium/i],
    ['Egg Salad Sandwich', 'egg salad sandwich on white', /regular/i],
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
    ['Vegetable Egg Roll', '=Egg roll, meatless'], ['Chicken Ramen', '=Ramen bowl with chicken'], ['Beef Pho', '=Soup, pho, with meat'],
    ['Teriyaki Chicken', '=Chicken or turkey with teriyaki'], ["General Tso's Chicken", '=General Tso chicken'], ['Kung Pao Chicken', '=Kung pao chicken'],
    ['Sweet and Sour Pork', '=Sweet and sour pork', /cup/i], ['Lo Mein', '=Lo mein, NFS'],
    ['Salmon Sushi Roll', '=Sushi roll, salmon'], ['Seafood Paella', '=Paella with seafood'], ['Potato Gnocchi', '=Gnocchi, potato', /cup/i],
    ['Cheese Ravioli', '=Ravioli, cheese-filled, no sauce'], ['Cheese Tortellini', '=Tortellini, cheese-filled, no sauce'],
    ['Chicken Parmesan', '=Restaurant, Italian, chicken parmesan without pasta'], ['Bread Stuffing', '=Bread stuffing'], ['Cranberry Sauce', '=Cranberry sauce'],
    ['Pumpkin Soup', '=Soup, pumpkin', /cup/i], ['French Onion Soup', '=Soup, French onion', /cup/i], ['Broccoli Cheese Soup', '=Soup, broccoli cheese', /cup/i],
    ['Tortilla Soup', '=Soup, tortilla', /cup/i], ['Lentil Soup', '=Soup, lentil'], ['Split Pea Soup', '=Soup, split pea', /cup/i],
    ['Cobb Salad', '=Cobb salad, no dressing'], ['Greek Salad', '=Greek Salad, no dressing'], ['Deviled Eggs', '=Egg, deviled'],
    ['Biscuits and Gravy', '=Biscuit with gravy'], ['Chicken and Dumplings', '=Chicken or turkey with dumplings'],
    ['Beef Stroganoff', 'beef stroganoff'],
    ['Spaghetti and Meatballs (Canned)', 'spaghetti meatballs tomato sauce'],
    ['Chicken Enchiladas', 'enchilada chicken'],
    ['Beef Enchiladas', 'enchilada beef'],
    ['Jambalaya', 'jambalaya'],
    ['Shrimp Gumbo', 'gumbo'],
    ['Chicken Cordon Bleu', 'chicken cordon bleu'],
    ['Stuffed Peppers', '=Stuffed pepper, with rice and meat'],
    ['Cabbage Rolls', 'cabbage rolls'],
    ['Pierogi', 'pierogi'],
    ['Beef Pot Pie', 'pot pie beef', /individual|cup/i],
    ['Beef and Broccoli', 'beef broccoli'],
    ['Sesame Chicken', 'sesame chicken', /cup/i],
    ['Wonton Soup', 'wonton soup'],
    ['Hot and Sour Soup', 'hot and sour soup'],
    ['Egg Drop Soup', 'egg drop soup'],
    ['Miso Soup', 'miso soup'],
    ['Tuna Sushi Roll', 'sushi roll tuna'],
    ['Vegetable Lasagna', 'lasagna meatless'],
    ['Eggplant Parmesan', 'eggplant parmesan', /cup|piece/i],
    ['Cream of Chicken Soup', 'cream of chicken soup', /cup/i],
    ['Cream of Mushroom Soup', 'cream of mushroom soup', /cup/i],
    ['Potato Soup', 'potato soup', /cup/i],
    ['Beef Barley Soup', 'beef barley soup'],
    ['Black Bean Soup', 'black bean soup'],
    ['Beef Fajitas', 'fajita beef'],
    ['Tuna Noodle Casserole', 'tuna noodle casserole'],
    ['Green Bean Casserole', 'green bean casserole'],
    ['Sweet Potato Casserole', 'sweet potato casserole'],
    ['Spinach Salad', 'spinach salad'],
    ['Macaroni Salad', 'macaroni salad'],
    ['Steak Teriyaki', '=Steak teriyaki'],
    ['Shrimp Fried Rice', 'rice fried shrimp'],
    ['Shrimp Scampi', 'shrimp scampi', /cup/i],
    ['Pork Fried Rice', 'rice fried pork'],
    ['Burrito Bowl with Beans', 'burrito bowl beans'],
  ]},
  snacks: { exportName: 'snacksFoods', category: 'Snacks', foods: [
    ['Potato Chips', 'potato chips salted', /oz|bag/i], ['Tortilla Chips', 'tortilla chips plain', /oz|bag/i], ['Air-Popped Popcorn', 'popcorn air popped', /cup/i],
    ['Microwave Popcorn (Butter)', 'popcorn microwave butter', /cup/i], ['Pretzels', 'pretzels hard'], ['Saltine Crackers', 'crackers saltine', /cracker/i],
    ['Graham Crackers', 'graham crackers'], ['Rice Cakes', 'rice cake', /cake/i], ['Granola Bar', 'granola bar', /^1 bar/i],
    ['Cheese Puffs', '=Cheese flavored corn snacks', /oz|bag|cup/i], ['Guacamole', 'guacamole'],
    ['Salsa', 'salsa red'], ['Dill Pickles', 'pickles dill'], ['Cheese Crackers', 'crackers cheese', /oz|cup|cracker/i], ['Marie Biscuit', '=Marie biscuit'],
    ['Pita Chips', 'pita chips', /oz|bag|cup/i],
    ['Bagel Chips', 'bagel chips'],
    ['Baked Potato Chips', 'potato chips baked'],
    ['Sour Cream and Onion Chips', 'potato chips sour cream onion', /medium single|oz/i],
    ['BBQ Potato Chips', 'potato chips barbecue', /medium single|oz/i],
    ['Corn Chips', 'corn chips'],
    ['Veggie Chips', 'vegetable chips'],
    ['Pork Rinds', 'pork skins'],
    ['Animal Crackers', 'animal crackers', /cup|cracker/i],
    ['Wheat Crackers', 'crackers wheat'],
    ['Rice Crackers', 'rice crackers'],
    ['Rye Crispbread', 'crispbread rye'],
    ['Fruit Snacks', 'fruit snacks', /pouch|regular|small/i],
    ['Fruit Leather', 'fruit leather', /regular|roll|bar/i],
    ['Gelatin Dessert', 'gelatin dessert'],
    ['Sugar-Free Gelatin', 'gelatin dessert sugar free'],
    ['Kettle Corn', '=Popcorn, ready-to-eat, kettle'],
    ['Caramel Popcorn', 'popcorn caramel'],
    ['Snack Mix', 'snack mix'],
    ['Peanut Butter Crackers', 'crackers sandwich peanut butter'],
    ['Butter Crackers', 'crackers butter', { unit: 'piece', label: '5 crackers', grams: 16 }],
    ['Wasabi Peas', 'wasabi peas', { unit: 'oz', label: '1 oz', grams: 28.35 }],
    ['Spinach Dip', 'spinach dip'],
    ['French Onion Dip', 'onion dip'],
    ['Queso Dip', 'cheese dip'],
    ['Bean Dip', 'bean dip'],
    ['Tzatziki', 'tzatziki'],
    ['Baba Ghanoush (Eggplant Dip)', '=Eggplant dip'],
    ['Rice Crispy Treat', '=Cookie, marshmallow, with rice cereal, no bake'],
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
    ['Trifle', '=Trifle', /cup/i], ['Bread Pudding', '=Pudding, bread'], ['Sponge Cake', '=Cake, sponge'], ['Mince Pie', '=Pie, mince, prepared from recipe', /piece|slice|pie/i],
    ['Fruit Cake', '=Cake, fruit cake'], ['Peach Cobbler', '=Cobbler, peach', /cup|piece/i], ['Key Lime Pie', '=Pie, key lime'], ['Pecan Pie', '=Pie, pecan', /slice|piece/i],
    ['Tiramisu', '=Tiramisu', /piece|slice|cup/i], ['Creme Brulee', '=Creme brulee'], ['Chocolate Glazed Doughnut', '=Doughnut, chocolate, with chocolate icing'],
    ['Eclair', '=Cream puff, eclair, custard or cream filled, iced'], ['Licorice', '=Candy, licorice'], ['Marshmallows', '=Candies, marshmallows', /regular|large|cup/i],
    ['Caramels', '=Candies, caramels'], ['Fudge', '=Chocolate candy, fudge', /piece/i], ['Toffee', '=Candies, toffee, prepared-from-recipe'],
    ['Lollipop', '=Candy, lollipop'], ['Sorbet', '=Sorbet', /cup/i], ['Vanilla Gelato', '=Gelato, vanilla', /cup|scoop|small/i], ['Popsicle', '=Popsicle', /regular|single|^1 popsicle/i],
    ['Chocolate Milkshake', '=Milk shakes, thick chocolate'],
    ['Strawberry Ice Cream', 'ice cream strawberry', /cup/i],
    ['Ice Cream Sandwich', 'ice cream sandwich'],
    ['Ice Cream Cone', 'ice cream cone'],
    ['Banana Split', 'banana split'],
    ['Sugar Wafer Cookie', 'cookie sugar'],
    ['Peanut Butter Cookie', 'cookie peanut butter'],
    ['Coconut Macaroon', 'cookie macaroon coconut'],
    ['Fig Bar', 'cookie fig bar'],
    ['Chocolate Sandwich Cookie', 'cookie chocolate sandwich', /^1 sandwich$/i],
    ['Vanilla Wafers', 'cookie vanilla wafer'],
    ['Gingersnaps', 'cookie gingersnaps'],
    ['Biscotti', 'biscotti'],
    ['Cherry Pie', 'pie cherry'],
    ['Blueberry Pie', 'pie blueberry', /slice|piece/i],
    ['Lemon Meringue Pie', 'pie lemon meringue', /slice|piece/i],
    ['Sweet Potato Pie', 'pie sweet potato'],
    ['Chocolate Cream Pie', 'pie chocolate cream'],
    ['Carrot Cake', 'cake carrot', /slice|piece/i],
    ['Red Velvet Cake', 'cake red velvet', /slice|piece/i],
    ['Angel Food Cake', 'cake angel food'],
    ['Pound Cake', 'cake pound', /slice|piece/i],
    ['Coffee Cake', 'coffee cake', /slice|piece/i],
    ['Strawberry Shortcake', 'strawberry shortcake'],
    ['Apple Cobbler', 'cobbler apple', /cup|piece/i],
    ['Apple Crisp', 'apple crisp', /cup/i],
    ['Cannoli', '=Pastry, Italian, with cheese'],
    ['Baklava', 'baklava'],
    ['Cream Puff', 'cream puff'],
    ['Fruit Turnover', 'turnover fruit'],
    ['Apple Strudel', 'strudel apple', /piece|slice/i],
    ['Jelly Doughnut', 'doughnut jelly'],
    ['Cake Doughnut', 'doughnut cake'],
    ['Doughnut Holes', 'doughnut holes'],
    ['Peanut Butter Cups', 'chocolate candy peanut butter', /regular|package/i],
    ['Hard Candy', 'candy hard', /piece/i],
    ['Cotton Candy', 'cotton candy'],
    ['Peanut Brittle', 'peanut brittle', /oz|piece/i],
    ['Vanilla Pudding', 'pudding vanilla'],
    ['Tapioca Pudding', 'pudding tapioca'],
    ['Flan', 'flan', /cup|serving|individual/i],
    ['Whipped Topping', 'whipped topping', { unit: 'tbsp', label: '2 tablespoons', grams: 9.4 }],
    ['Chocolate Syrup', 'chocolate syrup'],
    ['Pancake Syrup', 'pancake syrup'],
    ['Chocolate Chip Muffin', 'muffin chocolate chip', /medium|regular/i],
    ['Lemon Bar', 'lemon bar'],
    ['Chocolate-Covered Fruit', '=Fruit, chocolate covered'],
  ]},
  beverages: { exportName: 'beveragesFoods', category: 'Beverages', foods: [
    ['Black Coffee', 'coffee brewed', /cup|mug/i], ['Latte (Nonfat Milk)', '=Coffee, Latte, nonfat'], ['Cappuccino', 'cappuccino'], ['Mocha', 'coffee mocha'],
    ['Black Tea', '=Tea, hot, leaf, black', /cup/i], ['Cola', 'soft drink cola', /can/i], ['Diet Cola', '=Soft drink, cola, diet', /can/i], ['Lemonade', '=Lemonade, fruit flavored drink', { unit: 'cup', label: '1 cup', grams: 248 }],
    ['Sports Drink', 'sports drink'], ['Energy Drink', 'energy drink'], ['Beer', 'beer', /can|bottle|12/i], ['Light Beer', 'beer light', /can|bottle|12/i],
    ['Red Wine', 'wine red', /glass/i], ['White Wine', 'wine white'], ['Vodka', 'vodka'], ['Hot Chocolate', 'hot chocolate', /cup|mug/i],
    ['Fruit Smoothie', 'smoothie fruit', /cup|small/i], ['Chocolate Milk', 'chocolate milk'], ['Vanilla Milkshake', '=Milk shakes, thick vanilla'],
    ['Coconut Water', '=Coconut water, unsweetened', { unit: 'cup', label: '1 cup', grams: 240 }], ['Tea with Milk', '=Tea, hot, with milk'], ['Sweet Iced Tea', '=Tea, iced, brewed, black, pre-sweetened with sugar'], ['Cranberry Juice', 'cranberry juice cocktail', /cup/i],
    ['Iced Coffee', '=Iced Coffee, brewed'], ['Espresso', '=Coffee, espresso'], ['Green Tea', '=Tea, hot, leaf, green', /cup/i], ['Kombucha', '=Tea, kombucha', /bottle|cup/i],
    ['Root Beer', '=Soft drink, root beer', /can/i], ['Ginger Ale', '=Soft drink, ginger ale', /can/i], ['Tonic Water', '=Water, tonic', /cup|can/i],
    ['Gin', '=Gin'], ['Whiskey', '=Whiskey', /jigger|shot/i], ['Rum', '=Rum'], ['Tequila', '=Tequila', /jigger|shot/i], ['Margarita', '=Margarita', /drink|glass/i], ['Mojito', '=Mojito'],
    ['Pina Colada', '=Pina Colada', /drink|glass/i], ['Hard Cider', '=Hard cider'], ['Apple Cider', '=Apple cider', { unit: 'cup', label: '1 cup', grams: 248 }], ['Sparkling Wine (Prosecco, Champagne)', '=Wine, sparkling'],
    ['Gin and Tonic', '=Gin and tonic'], ['Rum and Cola', '=Rum and cola'], ['Protein Shake (Ready-to-Drink)', '=Nutritional drink or shake, high protein, ready-to-drink, NFS', /^1 cup|carton/i],
    ['Whey Protein Powder', '=Beverages, Protein powder whey based', { unit: 'serving', label: '1 scoop', grams: 30 }],
    ['Cream Soda', 'soft drink cream', /can/i],
    ['Club Soda', 'club soda'],
    ['Herbal Tea', 'tea herbal', /cup/i],
    ['Eggnog', 'eggnog'],
    ['Horchata', 'horchata', { unit: 'cup', label: '1 cup', grams: 248 }],
    ['Vegetable Juice', 'vegetable juice', { unit: 'cup', label: '1 cup', grams: 248 }],
    ['Carrot Juice', 'carrot juice', { unit: 'cup', label: '1 cup', grams: 248 }],
    ['Rosé Wine', 'wine rose', /glass/i],
    ['Sangria', 'sangria'],
    ['Mimosa', 'mimosa'],
    ['Bloody Mary', 'bloody mary', /drink|glass/i],
    ['Martini', 'martini'],
    ['Whiskey Sour', 'whiskey sour'],
    ['Long Island Iced Tea', 'long island iced tea', /drink|glass/i],
    ['Daiquiri', 'daiquiri', /drink|glass/i],
    ['White Russian', 'white russian'],
    ['Screwdriver', 'screwdriver', /drink|glass/i],
    ['Brandy', 'brandy'],
    ['Coffee Liqueur', 'liqueur coffee'],
    ['Sake', 'sake', { unit: 'fl oz', label: '6 fl oz', grams: 174.6 }],
    ['Hard Seltzer', 'hard seltzer', /can/i],
    ['Strong Beer (Higher Alcohol)', '=Beer, higher alcohol', /can|bottle/i],
    ['Nonalcoholic Beer', 'beer nonalcoholic', /can|bottle/i],
    ['Iced Tea (Unsweetened)', 'tea iced brewed black unsweetened', /cup|medium/i],
    ['Iced Tea Lemonade', 'tea iced lemon', { unit: 'cup', label: '1 cup', grams: 248 }],
    ['Flavored Water', 'water flavored'],
    ['Enhanced Water', '=Water, enhanced, regular'],
    ['Chocolate Soy Milk', 'soy milk chocolate'],
    ['Strawberry Milk', 'milk strawberry'],
    ['Frappe (Frozen Coffee Drink)', 'frozen coffee drink'],
    ['Flavored Iced Latte', 'coffee latte flavored'],
    ['Orange Juice (Fresh-Squeezed)', 'orange juice freshly squeezed'],
  ]},
  condiments: { exportName: 'condimentsFoods', category: 'Condiments & Oils', foods: [
    ['Olive Oil', 'oil olive', /tablespoon/i], ['Canola Oil', 'oil canola', /tablespoon/i], ['Coconut Oil', 'oil coconut', /tablespoon/i], ['Mayonnaise', '=Mayonnaise, regular', /tablespoon/i],
    ['Ketchup', 'ketchup'], ['Yellow Mustard', 'mustard yellow', /teaspoon|packet/i], ['Ranch Dressing', 'ranch dressing', /tablespoon/i], ['Italian Dressing', '=Italian dressing, made with vinegar and oil', /tablespoon/i],
    ['Caesar Dressing', 'caesar dressing'], ['BBQ Sauce', 'barbecue sauce'], ['Soy Sauce', 'soy sauce'], ['Hot Sauce', 'hot pepper sauce', /packet/i],
    ['Honey', 'honey'], ['Maple Syrup', 'maple syrup'], ['White Sugar', 'sugar white granulated'], ['Brown Sugar', 'sugar brown'],
    ['Jam', '=Jams and preserves'], ['Chocolate Hazelnut Spread', 'chocolate hazelnut spread'], ['Pesto', 'pesto'], ['Alfredo Sauce', '=Alfredo sauce'],
    ['Marinara Sauce', '=Sauce, pasta, spaghetti/marinara, ready-to-serve'], ['Brown Gravy', '=Gravy, beef'], ['Margarine', 'margarine'],
    ['Balsamic Vinegar', 'vinegar balsamic'],
    ['Apple Cider Vinegar', 'vinegar cider'],
    ['Thousand Island Dressing', 'thousand island dressing'],
    ['Blue Cheese Dressing', 'blue cheese dressing'],
    ['Honey Mustard Dressing', 'honey mustard dressing', /tablespoon/i],
    ['French Dressing', 'french dressing'],
    ['Tartar Sauce', 'tartar sauce'],
    ['Cocktail Sauce', 'cocktail sauce'],
    ['Teriyaki Sauce', 'teriyaki sauce'],
    ['Hoisin Sauce', 'hoisin sauce'],
    ['Sriracha', 'sriracha'],
    ['Worcestershire Sauce', 'worcestershire sauce'],
    ['Fish Sauce', 'fish sauce'],
    ['Oyster Sauce', 'oyster sauce'],
    ['Sweet and Sour Sauce', 'sweet and sour sauce', /tablespoon|packet/i],
    ['Buffalo Sauce', 'buffalo sauce'],
    ['Hollandaise Sauce', 'hollandaise'],
    ['Cheese Sauce', 'cheese sauce'],
    ['Horseradish', 'horseradish'],
    ['Sweet Pickle Relish', 'pickle relish sweet'],
    ['Lard', 'lard'],
    ['Vegetable Shortening', 'shortening', /tablespoon/i],
    ['Vegetable Oil', 'oil vegetable'],
    ['Sesame Oil', 'oil sesame', /tablespoon/i],
    ['Avocado Oil', 'oil avocado', /tablespoon|tbsp/i],
    ['Peanut Oil', 'oil peanut', /tablespoon/i],
    ['Sunflower Oil', 'oil sunflower', /tablespoon/i],
    ['Agave Syrup', 'agave'],
    ['Molasses', 'molasses'],
    ['Corn Syrup', 'corn syrup'],
    ['Orange Marmalade', 'marmalade'],
    ['Apple Butter', 'apple butter', /tablespoon|tbsp/i],
    ['Table Salt', 'salt table', /teaspoon|tsp/i],
    ['Black Pepper', 'pepper black'],
    ['Ground Cinnamon', 'cinnamon ground'],
    ['Curry Powder', 'curry powder'],
    ['Ground Cumin', 'cumin'],
    ['Garlic Powder', 'garlic powder'],
    ['Paprika', 'paprika'],
    ['Chili Powder', 'chili powder'],
    ['Vanilla Extract', 'vanilla extract'],
    ['Steak Sauce', 'steak sauce'],
    ['Enchilada Sauce', 'enchilada sauce'],
    ['Light Mayonnaise', 'mayonnaise light', /tablespoon/i],
  ]},
  baking: { exportName: 'bakingFoods', category: 'Baking & Cooking Ingredients', foods: [
    ['All-Purpose Flour', 'flour wheat all purpose'],
    ['Whole Wheat Flour', 'flour whole wheat'],
    ['Almond Flour', 'almond flour'],
    ['Coconut Flour', 'coconut flour'],
    ['Cornstarch', 'cornstarch', { unit: 'tbsp', label: '1 tablespoon', grams: 8 }],
    ['Unsweetened Cocoa Powder', 'cocoa powder unsweetened'],
    ['Semisweet Chocolate Chips', '=Candies, semisweet chocolate'],
    ['Unsweetened Baking Chocolate (Liquid)', 'chocolate baking unsweetened'],
    ["Baker's Yeast", 'yeast baker'],
    ['Puff Pastry', 'puff pastry'],
    ['Phyllo Dough', 'phyllo dough'],
    ['Baking Powder', 'baking powder'],
    ['Baking Soda', 'baking soda'],
    ['Graham Cracker Crust', 'graham cracker crust'],
    ['Oat Flour', 'oat flour'],
  ]},
  indian: { exportName: 'indianFoods', category: 'Indian Foods', foods: [
    ['Naan', 'bread naan'], ['Roti (Chapati)', 'chappatti roti', /medium/i], ['Paratha', 'paratha'], ['Puri', 'puri'],
    ['Samosa', 'samosa'], ['Pakora', 'pakora'], ['Dosa', 'dosa'], ['Idli', 'idli'],
    ['Chicken Curry', '=Chicken curry'], ['Chicken Curry with Rice', '=Chicken curry with rice'],
    ['Vegetable Curry', '=Vegetable curry'], ['Fish Curry', '=Fish curry'], ['Beef Curry', '=Beef curry'],
    ['Chicken Biryani', 'biryani chicken'], ['Vegetable Biryani', 'biryani vegetable'], ['Dal (Lentil Curry)', '=Lentil curry'],
    ['Palak Paneer', 'palak paneer'], ['Channa Saag', '=Channa Saag'],
    ['Upma', 'upma'], ['Papadum', 'papad'],
    ['Firni (Indian Rice Pudding)', '=Firni, Indian pudding'], ['Barfi', '=Barfi or Burfi, Indian dessert'],
    ['Ghee', '=Butter, Clarified butter (ghee)'], ['Besan (Chickpea Flour)', '=Chickpea flour (besan)'],
    ['Vada', 'vada'],
    ['Sambar', 'sambar'],
    ['Masala Dosa', 'dosa with filling'],
    ['Lamb Biryani', 'biryani with meat'],
    ['Ladoo', 'ladoo'],
    ['Chutney', '=Chutney'],
    ['Vegetable Curry with Rice', 'vegetable curry with rice'],
    ['Beef Curry with Rice', 'beef curry with rice'],
    ['Lentil Curry with Rice', 'lentil curry with rice'],
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

// Dedupe by slug and by USDA record, so the same food can't arrive under a second name.
const existingSlugs = new Set(), existingFdc = new Map();
for (const f of fs.readdirSync(DATA_DIR)) {
  const src = fs.readFileSync(path.join(DATA_DIR, f), 'utf8');
  for (const m of src.matchAll(/"slug": "([^"]+)"/g)) existingSlugs.add(m[1]);
  for (const m of src.matchAll(/"displayName": "([^"]+)"[\s\S]*?"fdcId": (\d+)/g)) existingFdc.set(Number(m[2]), m[1]);
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
    if (existingFdc.has(hit.fdcId)) { problems.push(`${display}: same USDA record as existing "${existingFdc.get(hit.fdcId)}"`); continue; }

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
    existingFdc.set(hit.fdcId, display);
    report.push(`  ${display.padEnd(34)} ${String(Math.round(n.nutrientsPer100g.calories)).padStart(4)} kcal  ${(servingSizes[0].label + ' ' + servingSizes[0].grams + 'g').padEnd(30)} [${hit.dataType.slice(0, 6)}] ${hit.description}`);
  }
}

if (APPLY) {
  // New foods change which foods are "nearest", which would drop live compare pages.
  // Freeze every pair the current data builds before adding anything.
  const { getAllComparePairs } = await import('../src/lib/compare/comparePairs.ts');
  const pubFile = path.join(ROOT, 'src/data/publishedComparePairs.ts');
  const pub = fs.readFileSync(pubFile, 'utf8');
  const known = new Set([...pub.matchAll(/\['([^']+)', '([^']+)'\]/g)].map((m) => `${m[1]}|${m[2]}`));
  const fresh = getAllComparePairs().filter((p) => !known.has(`${p.a.slug}|${p.b.slug}`));
  if (fresh.length) {
    const end = pub.lastIndexOf('];');
    fs.writeFileSync(pubFile, pub.slice(0, end) + fresh.map((p) => `  ['${p.a.slug}', '${p.b.slug}'],\n`).join('') + pub.slice(end), 'utf8');
    console.log(`froze ${fresh.length} compare pairs in publishedComparePairs.ts`);
  }

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
