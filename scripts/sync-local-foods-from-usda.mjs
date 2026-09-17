/**
 * Replaces the generated estimates in src/data/foods with USDA FoodData Central values.
 *
 *   node scripts/sync-local-foods-from-usda.mjs           dry run: resolve and report
 *   node scripts/sync-local-foods-from-usda.mjs --apply   rewrite the data files
 *
 * Needs USDA_API_KEY in .env or the environment.
 *
 * The local dataset was produced by generate-food-data.mjs multiplying base foods by
 * preparation words and scaling nutrients by guesswork. That yielded foods that do
 * not exist ("Scrambled Oats", "Canned Cucumber") and values that cannot exist
 * ("Roasted Almond" at 887 kcal/100 g, more than pure fat). Each entry below is a
 * hand-picked USDA record; `null` removes a food with no real counterpart.
 *
 * Slugs are never changed, so URLs of kept foods stay stable.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'src/data/foods');
const APPLY = process.argv.includes('--apply');

// name in dataset -> [display name, USDA search query, exact description regex] | null
const S = (name, query, find) => ({ name, query, find });
const SPEC = {
  // ---- Fruits
  'Apple': S('Apple', 'apples raw with skin', /^Apples, raw, with skin/),
  'Dried Apple': S('Dried Apple', 'apples dried sulfured uncooked', /^Apples, dried, sulfured, uncooked$/),
  'Juice Apple': S('Apple Juice', 'apple juice canned or bottled unsweetened', /^Apple juice, canned or bottled, unsweetened, without added ascorbic acid$/),
  'Canned (in Water) Apple': null, 'Canned (in Syrup) Apple': null, 'Frozen Apple': null,
  'Banana': S('Banana', 'bananas raw', /^Bananas, raw$/),
  'Dried Banana': S('Dried Banana', 'bananas dehydrated banana powder', /^Bananas, dehydrated, or banana powder$/),
  'Juice Banana': null, 'Canned (in Water) Banana': null, 'Canned (in Syrup) Banana': null, 'Frozen Banana': null,
  'Orange': S('Orange', 'oranges raw all commercial varieties', /^Oranges, raw, all commercial varieties$/),
  'Juice Orange': S('Orange Juice', 'orange juice 100% NFS', /^Orange juice, 100%, NFS$/),
  'Dried Orange': null, 'Canned (in Water) Orange': null, 'Canned (in Syrup) Orange': null, 'Frozen Orange': null,
  'Strawberry': S('Strawberries', 'strawberries raw', /^Strawberries, raw$/),
  'Canned (in Syrup) Strawberry': S('Strawberries, Canned in Heavy Syrup', 'strawberries canned heavy syrup pack', /^Strawberries, canned, heavy syrup pack, solids and liquids$/),
  'Frozen Strawberry': S('Frozen Strawberries', 'strawberries frozen', /^Strawberries, frozen(, unsweetened)?$/),
  'Dried Strawberry': null, 'Juice Strawberry': null, 'Canned (in Water) Strawberry': null,
  'Blueberry': S('Blueberries', 'blueberries raw', /^Blueberries, raw$/),
  'Dried Blueberry': S('Dried Blueberries (Sweetened)', 'blueberries dried sweetened', /^Blueberries, dried, sweetened$/),
  'Canned (in Syrup) Blueberry': S('Blueberries, Canned in Heavy Syrup', 'blueberries canned heavy syrup', /^Blueberries, canned, heavy syrup, solids and liquids$/),
  'Frozen Blueberry': S('Frozen Blueberries', 'blueberries frozen', /^Blueberries, frozen(, unsweetened)?$/),
  'Juice Blueberry': null, 'Canned (in Water) Blueberry': null,
  'Peach': S('Peach', 'peaches yellow raw', /^Peaches, yellow, raw$/),
  'Dried Peach': S('Dried Peaches', 'peaches dried sulfured uncooked', /^Peaches, dried, sulfured, uncooked$/),
  'Canned (in Water) Peach': S('Peaches, Canned in Water', 'peaches canned water pack', /^Peaches, canned, water pack, solids and liquids$/),
  'Canned (in Syrup) Peach': S('Peaches, Canned in Heavy Syrup', 'peaches canned heavy syrup pack', /^Peaches, canned, heavy syrup pack, solids and liquids$/),
  'Frozen Peach': S('Frozen Peaches (Sweetened)', 'peaches frozen sliced sweetened', /^Peaches, frozen, sliced, sweetened$/),
  'Juice Peach': null,
  'Mango': S('Mango', 'mangos raw', /^Mangos, raw$/),
  'Dried Mango': S('Dried Mango (Sweetened)', 'mango dried sweetened', /^Mango, dried, sweetened$/),
  'Frozen Mango': S('Frozen Mango', 'mango frozen', /^Mango, frozen$/),
  'Juice Mango': null, 'Canned (in Water) Mango': null, 'Canned (in Syrup) Mango': null,
  'Pineapple': S('Pineapple', 'pineapple raw all varieties', /^Pineapple, raw, all varieties$/),
  'Dried Pineapple': S('Dried Pineapple', 'pineapple dried', /^Pineapple, dried$/),
  'Juice Pineapple': S('Pineapple Juice', 'pineapple juice canned or bottled unsweetened', /^Pineapple juice, canned or bottled, unsweetened, without added ascorbic acid$/),
  'Canned (in Water) Pineapple': S('Pineapple, Canned in Water', 'pineapple canned water pack', /^Pineapple, canned, water pack, solids and liquids$/),
  'Canned (in Syrup) Pineapple': S('Pineapple, Canned in Heavy Syrup', 'pineapple canned heavy syrup pack', /^Pineapple, canned, heavy syrup pack, solids and liquids$/),
  'Frozen Pineapple': S('Frozen Pineapple (Sweetened)', 'pineapple frozen chunks sweetened', /^Pineapple, frozen, chunks, sweetened$/),
  'Grape': S('Grapes', 'grapes red or green european type raw', /^Grapes, red or green \(European type, such as Thompson seedless\), raw$/),
  'Dried Grape': S('Raisins', 'raisins dark seedless', /^Raisins, dark, seedless/),
  'Juice Grape': S('Grape Juice', 'grape juice canned or bottled unsweetened', /^Grape juice, canned or bottled, unsweetened, without added ascorbic acid$/),
  'Canned (in Water) Grape': S('Grapes, Canned in Water', 'grapes canned thompson seedless water pack', /^Grapes, canned, thompson seedless, water pack, solids and liquids$/),
  'Canned (in Syrup) Grape': S('Grapes, Canned in Heavy Syrup', 'grapes canned thompson seedless heavy syrup', /^Grapes, canned, thompson seedless, heavy syrup pack, solids and liquids$/),
  'Frozen Grape': null,
  'Watermelon': S('Watermelon', 'watermelon raw', /^Watermelon, raw$/),
  'Juice Watermelon': S('Watermelon Juice', 'watermelon juice 100%', /^Watermelon juice, 100%$/),
  'Dried Watermelon': null, 'Canned (in Water) Watermelon': null, 'Canned (in Syrup) Watermelon': null, 'Frozen Watermelon': null,

  // ---- Vegetables ("Steamed" duplicated "Cooked"; roasted/canned/frozen kept only where USDA has a record)
  'Broccoli': S('Broccoli', 'broccoli raw', /^Broccoli, raw$/),
  'Cooked Broccoli': S('Cooked Broccoli', 'broccoli cooked boiled drained without salt', /^Broccoli, cooked, boiled, drained, without salt$/),
  'Frozen Broccoli': S('Frozen Broccoli', 'broccoli frozen chopped unprepared', /^Broccoli, frozen, chopped, unprepared$/),
  'Steamed Broccoli': null, 'Roasted Broccoli': null, 'Canned Broccoli': null,
  'Spinach': S('Spinach', 'spinach raw', /^Spinach, raw$/),
  'Cooked Spinach': S('Cooked Spinach', 'spinach cooked boiled drained without salt', /^Spinach, cooked, boiled, drained, without salt$/),
  'Canned Spinach': S('Canned Spinach', 'spinach canned regular pack drained solids', /^Spinach, canned, regular pack, drained solids$/),
  'Frozen Spinach': S('Frozen Spinach', 'spinach frozen chopped or leaf unprepared', /^Spinach, frozen, chopped or leaf, unprepared/),
  'Steamed Spinach': null, 'Roasted Spinach': null,
  'Carrot': S('Carrot', 'carrots raw', /^Carrots, raw$/),
  'Cooked Carrot': S('Cooked Carrots', 'carrots cooked boiled drained without salt', /^Carrots, cooked, boiled, drained, without salt$/),
  'Canned Carrot': S('Canned Carrots', 'carrots canned regular pack drained solids', /^Carrots, canned, regular pack, drained solids$/),
  'Frozen Carrot': S('Frozen Carrots', 'carrots frozen unprepared', /^Carrots, frozen, unprepared$/),
  'Steamed Carrot': null, 'Roasted Carrot': null,
  'Tomato': S('Tomato', 'tomatoes red ripe raw year round average', /^Tomatoes, red, ripe, raw, year round average$/),
  'Cooked Tomato': S('Cooked Tomatoes', 'tomatoes red ripe cooked', /^Tomatoes, red, ripe, cooked$/),
  'Canned Tomato': S('Canned Tomatoes', 'tomatoes red ripe canned packed in tomato juice', /^Tomatoes, red, ripe, canned, packed in tomato juice$/),
  'Steamed Tomato': null, 'Roasted Tomato': null, 'Frozen Tomato': null,
  'Potato': S('Potato', 'potatoes flesh and skin raw', /^Potatoes, flesh and skin, raw$/),
  'Cooked Potato': S('Boiled Potato', 'potatoes boiled cooked in skin flesh without salt', /^Potatoes, boiled, cooked in skin, flesh, without salt$/),
  'Roasted Potato': S('Roasted Potato', 'potato roasted NFS', /^Potato, roasted, NFS$/),
  'Canned Potato': S('Canned Potatoes', 'potatoes canned drained solids', /^Potatoes, canned, drained solids$/),
  'Steamed Potato': null, 'Frozen Potato': null,
  'Sweet Potato': S('Sweet Potato', 'sweet potato raw unprepared', /^Sweet potato, raw, unprepared/),
  'Cooked Sweet Potato': S('Boiled Sweet Potato', 'sweet potato cooked boiled without skin', /^Sweet potato, cooked, boiled, without skin$/),
  'Roasted Sweet Potato': S('Baked Sweet Potato', 'sweet potato cooked baked in skin flesh without salt', /^Sweet potato, cooked, baked in skin, flesh, without salt$/),
  'Canned Sweet Potato': S('Canned Sweet Potato', 'sweet potato canned vacuum pack', /^Sweet potato, canned, vacuum pack$/),
  'Frozen Sweet Potato': null,
  'Steamed Sweet Potato': null,
  'Onion': S('Onion', 'onions raw', /^Onions, raw$/),
  'Cooked Onion': S('Cooked Onions', 'onions cooked boiled drained without salt', /^Onions, cooked, boiled, drained, without salt$/),
  'Canned Onion': S('Canned Onions', 'onions canned solids and liquids', /^Onions, canned, solids and liquids$/),
  'Frozen Onion': S('Frozen Onions', 'onions frozen chopped unprepared', /^Onions, frozen, chopped, unprepared$/),
  'Steamed Onion': null, 'Roasted Onion': null,
  'Bell Pepper': S('Green Bell Pepper', 'peppers sweet green raw', /^Peppers, sweet, green, raw$/),
  'Cooked Bell Pepper': S('Cooked Green Bell Pepper', 'peppers sweet green cooked boiled drained without salt', /^Peppers, sweet, green, cooked, boiled, drained, without salt$/),
  'Frozen Bell Pepper': S('Frozen Green Bell Pepper', 'peppers sweet green frozen chopped unprepared', /^Peppers, sweet, green, frozen, chopped, unprepared$/),
  'Steamed Bell Pepper': null, 'Roasted Bell Pepper': null, 'Canned Bell Pepper': null,
  'Cucumber': S('Cucumber', 'cucumber with peel raw', /^Cucumber, with peel, raw$/),
  'Cooked Cucumber': null, 'Steamed Cucumber': null, 'Roasted Cucumber': null, 'Canned Cucumber': null, 'Frozen Cucumber': null,
  'Zucchini': S('Zucchini', 'squash summer zucchini includes skin raw', /^Squash, summer, zucchini, includes skin, raw$/),
  'Cooked Zucchini': S('Cooked Zucchini', 'squash summer zucchini includes skin cooked boiled drained without salt', /^Squash, summer, zucchini, includes skin, cooked, boiled, drained, without salt$/),
  'Frozen Zucchini': S('Frozen Zucchini', 'squash summer zucchini includes skin frozen unprepared', /^Squash, summer, zucchini, includes skin, frozen, unprepared$/),
  'Steamed Zucchini': null, 'Roasted Zucchini': null, 'Canned Zucchini': null,

  // ---- Protein foods ("Boiled" steak/ground beef/pork chop are not real preparations)
  'Chicken Breast': S('Chicken Breast (Raw)', 'chicken broiler or fryers breast skinless boneless meat only raw', /^Chicken, broilers? or fryers, breast, skinless, boneless, meat only, raw$/),
  'Grilled Chicken Breast': S('Grilled Chicken Breast', 'chicken breast grilled without sauce skin not eaten', /^Chicken breast, grilled without sauce, skin not eaten$/),
  'Baked Chicken Breast': S('Roasted Chicken Breast', 'chicken broilers or fryers breast meat only cooked roasted', /^Chicken, broilers or fryers, breast, meat only, cooked, roasted$/),
  'Fried Chicken Breast': S('Fried Chicken Breast', 'chicken broilers or fryers breast meat only cooked fried', /^Chicken, broilers or fryers, breast, meat only, cooked, fried$/),
  'Boiled Chicken Breast': S('Stewed Chicken Breast', 'chicken broilers or fryers breast meat only cooked stewed', /^Chicken, broilers or fryers, breast, meat only, cooked, stewed$/),
  'Chicken Thigh': S('Chicken Thigh (Raw)', 'chicken broilers or fryers dark meat thigh meat only raw', /^Chicken, broilers or fryers, dark meat, thigh, meat only, raw$/),
  'Grilled Chicken Thigh': S('Grilled Chicken Thigh', 'chicken thigh grilled without sauce skin not eaten', /^Chicken thigh, grilled without sauce, skin not eaten$/),
  'Baked Chicken Thigh': S('Roasted Chicken Thigh', 'chicken broilers or fryers thigh meat only cooked roasted', /^Chicken, broilers or fryers, thigh, meat only, cooked, roasted$/),
  'Fried Chicken Thigh': S('Fried Chicken Thigh', 'chicken broilers or fryers thigh meat only cooked fried', /^Chicken, broilers or fryers, thigh, meat only, cooked, fried$/),
  'Boiled Chicken Thigh': S('Stewed Chicken Thigh', 'chicken broilers or fryers thigh meat only cooked stewed', /^Chicken, broilers or fryers, thigh, meat only, cooked, stewed$/),
  'Beef Steak': S('Beef Steak (Top Sirloin, Raw)', 'beef top sirloin steak separable lean and fat trimmed choice raw', /^Beef, top sirloin, steak, separable lean and fat, trimmed to 1\/8" fat, choice, raw$/),
  'Grilled Beef Steak': S('Broiled Beef Steak (Top Sirloin)', 'beef top sirloin steak separable lean and fat trimmed choice cooked broiled', /^Beef, top sirloin, steak, separable lean and fat, trimmed to 1\/8" fat, choice, cooked, broiled$/),
  'Fried Beef Steak': null,
  'Baked Beef Steak': null, 'Boiled Beef Steak': null,
  'Ground Beef': S('Ground Beef (80% Lean, Raw)', 'beef ground 80% lean meat 20% fat raw', /^Beef, ground, 80% lean meat \/ 20% fat, raw$/),
  'Grilled Ground Beef': S('Broiled Ground Beef Patty (80% Lean)', 'beef ground 80% lean meat 20% fat patty cooked broiled', /^Beef, ground, 80% lean meat \/ 20% fat, patty, cooked, broiled$/),
  'Baked Ground Beef': S('Baked Ground Beef (80% Lean)', 'beef ground 80% lean meat 20% fat loaf cooked baked', /^Beef, ground, 80% lean meat \/ 20% fat, loaf, cooked, baked$/),
  'Fried Ground Beef': S('Pan-Browned Ground Beef (80% Lean)', 'beef ground 80% lean meat 20% fat crumbles cooked pan-browned', /^Beef, ground, 80% lean meat \/ 20% fat, crumbles, cooked, pan-browned$/),
  'Boiled Ground Beef': null,
  'Pork Chop': S('Pork Chop (Raw)', 'pork fresh loin center loin chops bone-in separable lean and fat raw', /^Pork, fresh, loin, center loin \(chops\), bone-in, separable lean and fat, raw$/),
  'Grilled Pork Chop': S('Broiled Pork Chop', 'pork fresh loin center loin chops bone-in separable lean and fat cooked broiled', /^Pork, fresh, loin, center loin \(chops\), bone-in, separable lean and fat, cooked, broiled$/),
  'Fried Pork Chop': S('Pan-Fried Pork Chop', 'pork fresh loin center loin chops bone-in separable lean and fat cooked pan-fried', /^Pork, fresh, loin, center loin \(chops\), bone-in, separable lean and fat, cooked, pan-fried$/),
  'Baked Pork Chop': null, 'Boiled Pork Chop': null,
  'Salmon': S('Salmon (Atlantic, Farmed, Raw)', 'fish salmon atlantic farmed raw', /^Fish, salmon, Atlantic, farmed, raw$/),
  'Grilled Salmon': S('Grilled Salmon', 'fish salmon grilled', /^Fish, salmon, grilled$/),
  'Baked Salmon': S('Baked Salmon', 'fish salmon baked or broiled', /^Fish, salmon, baked or broiled$/),
  'Fried Salmon': S('Fried Salmon', 'fish salmon fried', /^Fish, salmon, fried$/),
  'Boiled Salmon': S('Steamed Salmon', 'fish salmon steamed', /^Fish, salmon, steamed$/),
  'Tuna': S('Tuna (Yellowfin, Raw)', 'fish tuna fresh yellowfin raw', /^Fish, tuna, fresh, yellowfin, raw$/),
  'Baked Tuna': null, 'Fried Tuna': null, 'Boiled Tuna': null,
  'Grilled Tuna': null,
  'Shrimp': S('Shrimp (Raw)', 'crustaceans shrimp raw', /^Crustaceans, shrimp, raw$/),
  'Grilled Shrimp': S('Grilled Shrimp', 'shrimp grilled', /^Shrimp, grilled$/),
  'Baked Shrimp': S('Baked Shrimp', 'shrimp baked or broiled', /^Shrimp, baked or broiled$/),
  'Fried Shrimp': S('Fried Shrimp', 'shrimp fried', /^Shrimp, fried$/),
  'Boiled Shrimp': S('Boiled Shrimp', 'shrimp steamed or boiled', /^Shrimp, steamed or boiled$/),

  // ---- Beans & plant protein
  'Dry Tofu': S('Firm Tofu', 'tofu raw firm prepared with calcium sulfate', /^Tofu, raw, firm, prepared with calcium sulfate$/),
  'Cooked Tofu': S('Fried Tofu', 'tofu fried', /^Tofu, fried$/),
  'Canned Tofu': null,
  'Dry Chickpea': S('Dry Chickpeas', 'chickpeas garbanzo beans bengal gram mature seeds raw', /^Chickpeas \(garbanzo beans, bengal gram\), mature seeds, raw$/),
  'Cooked Chickpea': S('Cooked Chickpeas', 'chickpeas garbanzo beans bengal gram mature seeds cooked boiled without salt', /^Chickpeas \(garbanzo beans, bengal gram\), mature seeds, cooked, boiled, without salt$/),
  'Canned Chickpea': S('Canned Chickpeas (Drained)', 'chickpeas garbanzo beans canned drained rinsed', /^Chickpeas \(garbanzo beans, bengal gram\), mature seeds, canned, drained, rinsed in tap water$/),
  'Dry Lentil': S('Dry Lentils', 'lentils raw', /^Lentils, raw$/),
  'Cooked Lentil': S('Cooked Lentils', 'lentils mature seeds cooked boiled without salt', /^Lentils, mature seeds, cooked, boiled, without salt$/),
  'Canned Lentil': S('Canned Lentils', 'lentils from canned', /^Lentils, from canned$/),
  'Dry Black Bean': S('Dry Black Beans', 'beans black mature seeds raw', /^Beans, black, mature seeds, raw$/),
  'Cooked Black Bean': S('Cooked Black Beans', 'beans black mature seeds cooked boiled without salt', /^Beans, black, mature seeds, cooked, boiled, without salt$/),
  'Canned Black Bean': S('Canned Black Beans', 'beans black turtle mature seeds canned', /^Beans, black turtle, mature seeds, canned$/),

  // ---- Breakfast (egg preparations had been applied to oats)
  'Egg': S('Egg (Raw)', 'egg whole raw fresh', /^Egg, whole, raw, fresh$/),
  'Scrambled Egg': S('Scrambled Egg', 'egg whole cooked scrambled', /^Egg, whole, cooked, scrambled$/),
  'Fried Egg': S('Fried Egg', 'egg whole cooked fried', /^Egg, whole, cooked, fried$/),
  'Hard Boiled Egg': S('Hard-Boiled Egg', 'egg whole cooked hard-boiled', /^Egg, whole, cooked, hard-boiled$/),
  'Poached Egg': S('Poached Egg', 'egg whole cooked poached', /^Egg, whole, cooked, poached$/),
  'Cooked Egg': null,
  'Oats': S('Rolled Oats (Dry)', 'cereals oats regular and quick not fortified dry', /^Cereals, oats, regular and quick, not fortified, dry$/),
  'Cooked Oats': S('Oatmeal (Cooked with Water)', 'cereals oats regular and quick unenriched cooked with water without salt', /^Cereals, oats, regular and quick, unenriched, cooked with water \(includes boiling and microwaving\), without salt$/),
  'Scrambled Oats': null, 'Fried Oats': null, 'Hard Boiled Oats': null, 'Poached Oats': null,

  // ---- Grains
  'Dry White Rice': S('White Rice (Dry)', 'rice white long-grain regular raw enriched', /^Rice, white, long-grain, regular, raw, enriched$/),
  'Cooked White Rice': S('White Rice (Cooked)', 'rice white long-grain regular enriched cooked', /^Rice, white, long-grain, regular, enriched, cooked$/),
  'Dry Brown Rice': S('Brown Rice (Dry)', 'rice brown long-grain raw', /^Rice, brown, long-grain, raw/),
  'Cooked Brown Rice': S('Brown Rice (Cooked)', 'rice brown long-grain cooked', /^Rice, brown, long-grain, cooked/),
  'Dry Quinoa': S('Quinoa (Dry)', 'quinoa uncooked', /^Quinoa, uncooked$/),
  'Cooked Quinoa': S('Quinoa (Cooked)', 'quinoa cooked', /^Quinoa, cooked$/),
  'Dry Pasta': S('Pasta (Dry)', 'pasta dry enriched', /^Pasta, dry, enriched$/),
  'Cooked Pasta': S('Pasta (Cooked)', 'pasta cooked enriched without added salt', /^Pasta, cooked, enriched, without added salt$/),

  // ---- Dairy
  'Milk': S('Whole Milk', 'milk whole 3.25% milkfat with added vitamin D', /^Milk, whole, 3\.25% milkfat, with added vitamin D$/),
  '2% Reduced Fat Milk': S('2% Reduced-Fat Milk', 'milk reduced fat fluid 2% milkfat with added vitamin A and vitamin D', /^Milk, reduced fat, fluid, 2% milkfat, with added vitamin A and vitamin D$/),
  'Nonfat (Skim) Milk': S('Skim Milk', 'milk nonfat fluid with added vitamin A and vitamin D fat free or skim', /^Milk, nonfat, fluid, with added vitamin A and vitamin D \(fat free or skim\)$/),
  'Yogurt': S('Plain Whole-Milk Yogurt', 'yogurt plain whole milk', /^Yogurt, plain, whole milk$/),
  '2% Reduced Fat Yogurt': S('Plain Low-Fat Yogurt', 'yogurt plain low fat', /^Yogurt, plain, low fat$/),
  'Nonfat (Skim) Yogurt': S('Plain Nonfat Yogurt', 'yogurt plain skim milk', /^Yogurt, plain, skim milk$/),
  'Cheese': S('Cheddar Cheese', 'cheese cheddar', /^Cheese, cheddar$/),
  '2% Reduced Fat Cheese': null, 'Nonfat (Skim) Cheese': null,

  // ---- Nuts & seeds (USDA has no unsalted dry-roasted walnut or plain walnut butter)
  'Almond': S('Almonds', 'nuts almonds', /^Nuts, almonds$/),
  'Roasted (Unsalted) Almond': S('Dry-Roasted Almonds (Unsalted)', 'nuts almonds dry roasted without salt added', /^Nuts, almonds, dry roasted, without salt added$/),
  'Roasted (Salted) Almond': S('Dry-Roasted Almonds (Salted)', 'nuts almonds dry roasted with salt added', /^Nuts, almonds, dry roasted, with salt added$/),
  'Butter Almond': S('Almond Butter', 'nuts almond butter plain without salt added', /^Nuts, almond butter, plain, without salt added$/),
  'Walnut': S('Walnuts', 'nuts walnuts english', /^Nuts, walnuts, english$/),
  'Roasted (Salted) Walnut': S('Dry-Roasted Walnuts (Salted)', 'nuts walnuts dry roasted with salt added', /^Nuts, walnuts, dry roasted, with salt added$/),
  'Roasted (Unsalted) Walnut': null, 'Butter Walnut': null,
  'Peanut': S('Peanuts', 'peanuts all types raw', /^Peanuts, all types, raw$/),
  'Roasted (Unsalted) Peanut': S('Dry-Roasted Peanuts (Unsalted)', 'peanuts all types dry-roasted without salt', /^Peanuts, all types, dry-roasted, without salt$/),
  'Roasted (Salted) Peanut': S('Dry-Roasted Peanuts (Salted)', 'peanuts all types dry-roasted with salt', /^Peanuts, all types, dry-roasted, with salt$/),
  'Butter Peanut': S('Peanut Butter', 'peanut butter smooth style without salt', /^Peanut butter, smooth style, without salt$/),
};

const NUTRIENTS = {
  calories: [/^Energy$/, 'kcal'], protein: [/^Protein$/], carbohydrates: [/^Carbohydrate, by difference$/],
  fat: [/^Total lipid \(fat\)$/], fiber: [/^Fiber, total dietary$/],
  sugar: [/^(Sugars, total including NLEA|Total Sugars|Sugars, total)$/], sodium: [/^Sodium, Na$/]
};

function readEnvKey() {
  if (process.env.USDA_API_KEY) return process.env.USDA_API_KEY.trim();
  const env = fs.existsSync(path.join(ROOT, '.env')) ? fs.readFileSync(path.join(ROOT, '.env'), 'utf8') : '';
  return (env.match(/^USDA_API_KEY=(.*)$/m)?.[1] || '').trim();
}

async function resolve(key, spec) {
  const res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${key}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: spec.query, pageSize: 100, dataType: ['Foundation', 'SR Legacy', 'Survey (FNDDS)'] })
  });
  if (!res.ok) throw new Error(`USDA ${res.status}`);
  const foods = (await res.json()).foods || [];
  const matches = foods.filter((f) => spec.find.test(f.description));
  const pick = matches.find((f) => f.dataType === 'SR Legacy') || matches.find((f) => f.dataType === 'Foundation') || matches[0];
  if (!pick) return { error: `no match; top: ${foods.slice(0, 4).map((f) => f.description).join(' | ')}` };

  const n = {};
  for (const [k, [re, unit]] of Object.entries(NUTRIENTS)) {
    const hit = (pick.foodNutrients || []).find((x) => re.test(x.nutrientName) && (!unit || x.unitName?.toLowerCase() === unit));
    n[k] = typeof hit?.value === 'number' ? hit.value : null;
  }
  if (n.calories === null) return { error: `matched "${pick.description}" but it has no kcal energy value` };
  return { pick, nutrients: n };
}

const key = readEnvKey();
if (!key) { console.error('USDA_API_KEY missing'); process.exit(1); }

const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.ts') && f !== 'index.ts');
let kept = 0, removed = 0;
const problems = [], report = [];

for (const file of files) {
  const full = path.join(DATA_DIR, file);
  const src = fs.readFileSync(full, 'utf8');
  const start = src.indexOf('= [') + 2;
  const header = src.slice(0, start);
  const foods = JSON.parse(src.slice(start, src.lastIndexOf(']') + 1));
  const next = [];

  for (const food of foods) {
    if (!(food.name in SPEC)) { problems.push(`${food.name}: not in SPEC`); next.push(food); continue; }
    const spec = SPEC[food.name];
    if (spec === null) { removed++; report.push(`- ${food.name}  (removed)`); continue; }

    const r = await resolve(key, spec);
    if (r.error) { problems.push(`${food.name}: ${r.error}`); next.push(food); continue; }

    kept++;
    const old = food.nutrientsPer100g.calories;
    report.push(`  ${food.name.padEnd(28)} -> ${spec.name.padEnd(38)} ${String(old).padStart(4)} -> ${String(Math.round(r.nutrients.calories)).padStart(4)} kcal  [${r.pick.dataType}] ${r.pick.description}`);
    const lower = spec.name.toLowerCase();
    Object.assign(food, {
      name: spec.name,
      displayName: spec.name,
      searchName: lower,
      aliases: [...new Set([lower, food.name.toLowerCase()])],
      sourceLabel: 'USDA FoodData Central',
      isEstimated: false,
      nutrientsPer100g: r.nutrients,
      usda: { fdcId: r.pick.fdcId, dataType: r.pick.dataType, publicationDate: r.pick.publicationDate }
    });
    next.push(food);
  }

  if (APPLY) fs.writeFileSync(full, `${header}${JSON.stringify(next, null, 2)};\n`, 'utf8');
}

console.log(report.join('\n'));
console.log(`\nkept ${kept} (USDA values), removed ${removed}, problems ${problems.length}`);
if (problems.length) console.log('PROBLEMS:\n' + problems.join('\n'));
console.log(APPLY ? '\nFiles rewritten.' : '\nDry run - nothing written. Re-run with --apply.');
if (problems.length) process.exit(1);
