// Hand-written intros for category charts, keyed by category slug. A category page is
// indexed only when it has one (see isIndexedCategory). scripts/test-categories.mjs checks
// every category has an intro. Numbers quoted must match the chart below it.
export interface CategoryIntro {
  heading: string;
  metaDescription: string;
  body: string[];
}

export const CATEGORY_INTROS: Record<string, CategoryIntro> = {
  fruits: {
    heading: 'Fruit Calorie Chart',
    metaDescription: 'Calories, carbs and more for 88 fruits per 100 g, from rhubarb to banana chips. See how fresh, canned and dried fruit really compare.',
    body: [
      "Most fresh fruit sits between about 30 and 90 calories per 100 g, because it is mostly water. The chart becomes more interesting at either end. Rhubarb and lemon juice are at the very bottom, while dried and processed fruit climbs fast: Medjool dates have 277 calories per 100 g and banana chips have 519.",
      "That jump is why dried fruit is easy to overeat. Drying removes the water but keeps the sugar, so a small handful carries as many calories as a large bowl of fresh fruit. Canned fruit depends on what it is packed in. Peaches canned in water have just 24 calories per 100 g, while strawberries in heavy syrup have 92, about three times as many as fresh.",
      "Use the chart to compare like with like, and remember that a medium apple weighs about 180 g, so a whole piece of fruit is often well over 100 g.",
    ],
  },
  vegetables: {
    heading: 'Vegetable Calorie Chart',
    metaDescription: 'Calories, protein, carbs and fat for 104 vegetables per 100 g, from watercress to potato skins. See which ones are lowest and what cooking changes.',
    body: [
      "Vegetables are the easiest way to add volume to a meal for very few calories. Leafy greens and salad vegetables, including watercress, bok choy, iceberg lettuce and cucumber, all come in at about 15 calories per 100 g or less, so you can eat them almost freely.",
      "The higher end of this chart shows what changes the numbers. Starchy vegetables such as sweet potato have more energy, at 86 calories per 100 g. Removing water concentrates calories, which is why sun-dried tomatoes reach 258 and dried seaweed 298. Added oil has a similar effect: home fries and potato skins are close to 200 calories per 100 g, far more than a plain potato.",
      "Check whether an entry is raw or cooked before you log it, since cooking can change the weight. Olive oil, butter and cheese sauces also add calories that are not part of the vegetable, so count them separately.",
    ],
  },
  'protein-foods': {
    heading: 'Protein Foods Calorie Chart',
    metaDescription: 'Calories, protein and fat for 109 meats, fish and seafood per 100 g, from oysters to pepperoni. Find the leanest protein for your calories.',
    body: [
      "This chart covers meat, poultry, fish and seafood, and the most useful way to read it is protein against calories. Seafood tends to be the leanest: oysters, crab, shrimp and pollock are all under 90 calories per 100 g. Skinless chicken and white fish follow closely.",
      "At the other end, the calories mostly come from fat rather than extra protein. Pork belly has 404 calories per 100 g, bacon 468 and pepperoni 504. Beef jerky is a special case at 410: it is high in calories because it has been dried, but it also has a lot of protein. Tuna shows how much the preparation matters, since tuna canned in oil has 198 calories per 100 g, far more than tuna in water.",
      "Select the Protein column to sort by protein. Check whether an entry is raw or cooked, because meat loses water as it cooks and the numbers per 100 g rise.",
    ],
  },
  'beans-plant-protein': {
    heading: 'Beans and Plant Protein Calorie Chart',
    metaDescription: 'Calories, protein, carbs and fat for 30 beans, lentils and plant proteins per 100 g. See how dry and cooked weights differ.',
    body: [
      "Beans, lentils, chickpeas and soy foods give you protein and fiber together, which is why they are such a filling, low-cost base for a meal. Canned and cooked beans mostly sit between about 90 and 190 calories per 100 g.",
      "The most common mistake here is confusing dry and cooked weights. Dry chickpeas have 378 calories per 100 g and dry lentils 352, but they soak up water as they cook, so the same weight once cooked has far fewer calories. Cooked chickpeas have 164 per 100 g. If you weigh beans before cooking, use a dry entry; if you weigh them on your plate, use a cooked one.",
      "Prepared products vary too. Hummus has 243 calories per 100 g because of its tahini and oil, and textured vegetable protein has 366 as a dry product. Canned beans can also be salty, and rinsing them under the tap removes some of the sodium.",
    ],
  },
  breakfast: {
    heading: 'Breakfast Foods Calorie Chart',
    metaDescription: 'Calories, protein, carbs and fat for 46 breakfast foods per 100 g, from oatmeal to granola. Compare cereals, eggs and pastries side by side.',
    body: [
      "Breakfast foods cover a wide range, and the same 100 g can mean very different things. Foods cooked in water are the lowest: cream of wheat has 65 calories per 100 g and oatmeal made with water has 71. Dry cereals and pastries are several times higher, with granola at 420 and croissants at 406.",
      "That comparison needs care, because you do not eat the same amount of each. A bowl of oatmeal might weigh 250 g, while a serving of cereal is often 30 to 40 g before the milk. Many people pour more than the serving on the box, so weighing your usual bowl once is worthwhile.",
      "Granola surprises a lot of people. It has a healthy image, but with its added oil and sugar it is one of the most calorie-dense items here. Sort by protein as well as calories: egg dishes and yogurt-based breakfasts tend to keep you full for longer than sweet cereals.",
    ],
  },
  'grains-cereals': {
    heading: 'Grains and Cereals Calorie Chart',
    metaDescription: 'Calories and macros for 28 grains per 100 g, cooked and dry: rice, pasta, quinoa, bulgur and more. See why dry and cooked numbers are so different.',
    body: [
      "Rice, pasta and other grains appear in this chart both dry and cooked, and the gap between them is the single biggest source of calorie-counting errors. Dry white rice has 365 calories per 100 g and dry pasta 371. Once cooked, they absorb water and the same weight has far less: cooked brown rice is 123 calories per 100 g, and cooked bulgur is 83.",
      "So the rule is simple: weigh your grains either dry or cooked, and pick the matching entry. If you weigh 75 g of dry pasta, use the dry figure, and do not apply it to the much heavier cooked portion on your plate.",
      "Once you compare like with like, most cooked grains are fairly similar in calories. The differences are more about fiber and protein, so sort by protein to see how they stack up. Prepared dishes such as Spanish rice include added fat and seasoning, which is worth bearing in mind.",
    ],
  },
  'dairy-alternatives': {
    heading: 'Dairy and Dairy Alternatives Calorie Chart',
    metaDescription: 'Calories, protein and fat for 50 milks, yogurts, cheeses and plant milks per 100 g, from almond milk to butter. Compare dairy and non-dairy options.',
    body: [
      "This chart runs from some of the lightest foods in the site to one of the heaviest. Unsweetened almond milk has 15 calories per 100 g and skim milk 34, while hard cheeses such as cheddar and parmesan are above 400 and butter reaches 717.",
      "Removing water and adding fat explains most of that range. It takes a lot of milk to make a small piece of cheese, so cheese is rich in both protein and calories. A small 30 g piece of cheddar comes to about 120 calories, which is a more realistic portion to think about than 100 g.",
      "Among drinks, sort by protein to see the real difference between milks. Dairy milk and soy milk have far more protein than almond or oat milk. Yogurts vary as well: flavored and fruit versions add sugar, so plain yogurt with your own fruit gives you more control over what you are eating.",
    ],
  },
  'nuts-seeds': {
    heading: 'Nuts and Seeds Calorie Chart',
    metaDescription: 'Calories, protein and fat for 32 nuts, seeds and nut products per 100 g, from chestnuts to macadamias. Why small portions matter here.',
    body: [
      "Nuts and seeds are among the most calorie-dense whole foods you can eat, and nearly everything in this chart is above 450 calories per 100 g. Roasted chestnuts are the clear exception at 239, because they are mostly starch and water rather than fat.",
      "Those high numbers do not mean you should avoid them. Most of the fat is unsaturated, and nuts also bring protein, fiber and minerals. What matters is the portion. Nobody needs 100 g of nuts in one sitting, and a typical serving is about 28 g, or one ounce, which comes to around 150 to 200 calories for most of them.",
      "Because they are so easy to keep eating, it helps to weigh a portion once to see what it looks like. Sort by protein or carbs to compare them. Trail mix and flavored nuts can include added sugar, oil and salt, so check the label when buying them.",
    ],
  },
  'bread-bakery': {
    heading: 'Bread and Bakery Calorie Chart',
    metaDescription: 'Calories, protein, carbs and fat for 40 breads and bakery items per 100 g, from corn tortillas to taco shells. Compare breads by weight, not by slice.',
    body: [
      "Most ordinary breads are surprisingly close per 100 g, roughly 220 to 300 calories. Corn tortillas are near the low end at 218, and pita bread is 275. What really separates one bread from another is how much you eat, since a thin slice, a large bagel and a thick slice of bakery bread can differ several times over.",
      "The high end of this chart is about fat and low moisture. Brioche, with its butter and eggs, reaches 427 calories per 100 g, and dried or fried items are higher still: croutons have 465 and hard taco shells 476.",
      "To compare fairly, check the weight of a single slice or roll on the package and work from there. Slice sizes vary a lot between brands. Sort by protein, and look at the food pages for fiber, since whole grain breads usually have much more of it for a similar number of calories.",
    ],
  },
  'fast-food-style': {
    heading: 'Fast Food Calorie Chart',
    metaDescription: 'Calories, protein, carbs and fat per 100 g for 76 fast-food-style items, from burritos and sandwiches to burgers and fries. Typical values, not brands.',
    body: [
      "These are typical values for common takeout items, not figures from a particular restaurant, so use them as a guide and check the chain's own numbers when you can. Most items fall between about 150 and 350 calories per 100 g. Bowls and sandwiches with plenty of lean filling sit lower, such as a chicken burrito bowl at 161 or a turkey sub at 147.",
      "Deep-fried foods and items built around fat or sugar are at the top. Onion rings have 352 calories per 100 g, a sausage biscuit 372 and churros 419. Remember, though, that portion size matters more than the number per 100 g. A cheeseburger at 296 is lower per 100 g than onion rings, but it weighs far more, so the whole item comes to more calories.",
      "Sides and drinks often add as much as the main item, and sauces can quietly add 100 calories or more. Multiply by the weight you actually eat for a realistic total.",
    ],
  },
  'prepared-meals': {
    heading: 'Prepared Meals Calorie Chart',
    metaDescription: 'Calories and macros per 100 g for 89 prepared meals, from soups and salads to pot pies and Chinese takeout dishes. Typical values for common dishes.',
    body: [
      "This chart covers common homemade and restaurant dishes, and the range is wide. Broth-based soups are the lowest, with tomato soup at 19 calories per 100 g and miso soup at 24, which is why soup is such a filling start to a meal. Mixed dishes such as spaghetti with meat sauce are near 120.",
      "The top of the chart holds fried dishes and pies. Sesame chicken has 293 calories per 100 g and General Tso's chicken 295, because the battered chicken and sweet sauce both add energy. Beef pot pie, at 271, gets much of its total from pastry.",
      "These figures are averages, and real dishes vary with the recipe, so treat them as starting points. Portions matter too: a restaurant main can easily weigh 400 to 500 g, so multiply rather than reading the 100 g figure as a meal. For your own recipes, the recipe calculator gives a closer number.",
    ],
  },
  snacks: {
    heading: 'Snack Foods Calorie Chart',
    metaDescription: 'Calories, protein, carbs and fat for 44 snacks per 100 g, from pickles and salsa to chips and cheese puffs. Find lighter snacks that still satisfy.',
    body: [
      "Snacks show some of the biggest gaps of any category, and the reason is mainly water and fat. Dill pickles have 14 calories per 100 g and salsa 34, while fried crunchy snacks are above 500: corn chips have 535, potato chips 559 and cheese puffs 567.",
      "Those crunchy snacks weigh very little, so a small-looking bag can hold a lot of energy. A standard 1 oz serving of chips is only about 28 g, or 150 to 160 calories, but many people eat two or three times that without noticing. Serving a portion into a bowl, instead of eating from the bag, is one of the simplest habits for keeping track.",
      "If you want something lighter, look for snacks with more water, protein or fiber. Sort the chart by protein to find options that will keep you full for longer. Guacamole, at 155 calories per 100 g, is a more moderate choice, though the chips you dip into it still count.",
    ],
  },
  desserts: {
    heading: 'Desserts Calorie Chart',
    metaDescription: 'Calories, protein, carbs and fat for 91 desserts per 100 g, from popsicles and sorbet to chocolate and toffee. Compare sweet treats by weight.',
    body: [
      "Desserts range from light, watery treats to some of the most energy-dense foods around. Popsicles have 79 calories per 100 g, custard 97 and sorbet 110. At the other end are chocolate and toffee, with milk chocolate at 535 and toffee at 560, along with shortbread at 514.",
      "As a rule, the more water a dessert contains, the lighter it is per bite. Fruit-based and frozen desserts tend to be lower, while baked goods with butter, and sweets with very little moisture, are higher. Blueberry pie at 300 and cupcakes at 352 sit in between.",
      "This is one chart where the 100 g figure can mislead, because a square of chocolate might weigh just 10 g while a slice of cake can weigh 100 g or more. Think about the amount you will really eat. Weighing a typical slice or scoop once will give you a much better sense of its calories.",
    ],
  },
  beverages: {
    heading: 'Drinks Calorie Chart',
    metaDescription: 'Calories, carbs and more for 76 drinks per 100 g, from water and coffee to soda, beer, wine, spirits and milkshakes. See what you are really drinking.',
    body: [
      "Drinks are easy to forget when counting calories, and because liquids do not fill you up much, those calories tend to come on top of what you eat. This chart runs from club soda, flavored water, black coffee and tea at almost nothing, to milkshakes at 112 calories per 100 g and spirits at 231.",
      "Because drinks are measured per 100 g, remember how much you actually pour. A 12 oz can or a glass of beer weighs about 350 g, so beer at 43 calories per 100 g comes to around 150 calories per can. A medium coffee-shop drink can weigh close to 500 g, so a mocha at 64 per 100 g comes to more than 300 calories.",
      "Spirits look high but are served in small measures, and mixers can add far more than the alcohol itself. Whey protein powder is included here as a dry product, so its figure of 352 is not comparable with drinks that are ready to consume.",
    ],
  },
  'condiments-oils': {
    heading: 'Condiments and Oils Calorie Chart',
    metaDescription: 'Calories and fat for 67 sauces, oils, spreads and sweeteners per 100 g, from hot sauce to lard. Find the hidden calories on your plate.',
    body: [
      "Condiments are where hidden calories tend to live. Cooking oils and lard are at the very top of this chart, at around 900 calories per 100 g, which makes them the most energy-dense foods on the site. Just one tablespoon of oil, about 14 g, adds roughly 120 calories to whatever you are cooking.",
      "The low end shows how much flavor you can add for very little. Hot sauce has 12 calories per 100 g, buffalo sauce 11 and apple cider vinegar 21. In the middle, soy sauce has 53 and cocktail sauce 128, while light mayonnaise has 238 and margarine 579.",
      "Sugars and syrups are here as well, including brown sugar at 380. Because you only use a small amount, it is best to measure these with a spoon, at least at first. A free pour of oil or dressing is one of the most common reasons calorie estimates end up too low. Sauces can also be high in salt.",
    ],
  },
  'baking-cooking-ingredients': {
    heading: 'Baking Ingredients Calorie Chart',
    metaDescription: 'Calories, protein, carbs and fat for 15 baking ingredients per 100 g, including flours, chocolate and pastry. Useful for working out homemade recipes.',
    body: [
      "This is the shortest chart on the site, and it is mainly useful when you are working out the nutrition of something homemade. Flours and pastry make up the base of most baking: all-purpose flour has 364 calories per 100 g, oat flour 404, and almond flour about 578 because of the fat in the nuts.",
      "The numbers are for the ingredients as they come, so they do not describe the finished bake. Flour absorbs water and much of that moisture stays in the cake or loaf, so the final food usually has fewer calories per 100 g than its dry ingredients, once eggs, milk or water are added.",
      "Baking soda has no calories and baking powder and yeast are used in such small amounts that they barely count. Puff pastry, at 558, and chocolate chips, at 480, make a much bigger difference. To work out a whole recipe, add every ingredient to the recipe calculator and divide by the number of servings.",
    ],
  },
  'indian-foods': {
    heading: 'Indian Food Calorie Chart',
    metaDescription: 'Calories, protein, carbs and fat for 33 Indian foods per 100 g: curries, dal, breads, snacks and sweets. Typical values for home and takeaway dishes.',
    body: [
      "Indian food is often thought of as heavy, but this chart shows a wide range. Many everyday dishes are fairly light per 100 g, including vegetable curry and sambar at 86 calories, upma at 87, palak paneer at 101 and dal at 111. Lentils and vegetables give a lot of bulk and fiber for the calories.",
      "Fried items and sweets are at the other end. Samosas have 310 calories per 100 g, puri 409 and ladoo 411. Ghee, at 900, is pure fat, so even a small amount stirred into a curry or brushed on a roti adds up.",
      "Recipes vary a lot between home cooking and restaurants, where curries often contain more oil, cream or ghee, and portions are larger. A takeaway curry can easily weigh 300 to 400 g before the rice and naan, so multiply the figure for the amount you actually eat. Choosing either rice or bread, and adding a vegetable dish or dal, keeps a meal more balanced.",
    ],
  },
};
