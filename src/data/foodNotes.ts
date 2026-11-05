// Hand-written notes for food pages. A food is indexed only when it has a note here
// (see isIndexedFood). Numbers quoted must match the page's own data.
export interface FoodNote {
  body: string[];
}

export const FOOD_NOTES: Record<string, FoodNote> = {
  almond: {
    body: [
      "Almonds are the most popular snack nut in the US, eaten raw, roasted, sliced over oatmeal and yogurt, or ground into almond flour and almond butter. A standard one-ounce serving is about 23 almonds, roughly 160 calories.",
      "They stand out among nuts for fiber and protein: about 3.5 g of fiber and 6 g of protein per ounce, which makes them filling for their size. Most of their fat is the unsaturated kind, and they are a good source of vitamin E and magnesium. The catch is how easy they are to keep eating. Counting out a portion into a small bag or bowl, rather than eating from the packet, is the simplest way to enjoy them without overdoing the calories.",
    ],
  },
  'almond-milk-unsweetened': {
    body: [
      "Unsweetened almond milk is one of the lightest milks you can buy, at around 37 calories a cup. It is made by blending almonds with water and straining the result, so most of what is in the carton is water, with only a small share of almonds.",
      "That makes it a good fit for coffee, cereal and smoothies if you want to cut calories or avoid dairy, but it is not a like-for-like swap for cow's milk. It has only about 1 g of protein per cup, so if you rely on milk for protein, soy milk or dairy milk will do more for you. Pick a carton labeled unsweetened, since sweetened and vanilla versions add sugar, and look for calcium and vitamin D fortification.",
    ],
  },
  avocado: {
    body: [
      "Avocado is a fruit that eats like a healthy fat. It is mashed onto toast, sliced into salads and burritos, and is the base of guacamole. A whole medium avocado is about 240 calories, so half an avocado, around 120 calories, is a more typical serving.",
      "Most of its fat is monounsaturated, the same kind found in olive oil, and it is unusually high in fiber for a fruit, about 10 g per whole avocado. That combination is why avocado is so filling. It is also a good source of potassium and folate. The thing to watch is quantity: guacamole and avocado toast at cafés often use a whole fruit or more, plus chips or thick bread, so the dish can add up quickly.",
    ],
  },
  bagel: {
    body: [
      "Bagels are a breakfast staple in the US and increasingly in the UK, usually toasted with cream cheese, butter, or eggs and smoked salmon. A regular 105 g bagel has about 277 calories, but bakery and coffee-shop bagels are often bigger, at 120 to 150 g and 350 calories or more.",
      "Bagels are dense and low in fat, which makes them filling, but plain and white-flour versions are low in fiber. They are also fairly salty. To make one a better breakfast, pick whole wheat or multigrain, consider a thin or mini bagel, and add protein such as eggs, smoked salmon or a light spread of cream cheese. Two tablespoons of regular cream cheese add about 100 calories.",
    ],
  },
  banana: {
    body: [
      "Bananas are the most bought fruit in both the US and the UK, eaten on their own, sliced on cereal, blended into smoothies or mashed into banana bread. A medium banana weighs about 118 g without the peel and has around 105 calories.",
      "Almost all of those calories are carbohydrate, which is why bananas are a go-to snack before exercise: they digest easily and come in their own wrapper. They are a good source of potassium and vitamin B6. As a banana ripens, more of its starch turns to sugar, so a spotty banana tastes sweeter than a green-tipped one. Very ripe bananas are perfect for baking, where they can replace some of the added sugar.",
    ],
  },
  beer: {
    body: [
      "Beer here means a regular-strength lager of about 4 to 5% alcohol. A standard 12 oz US can or bottle has about 155 calories, and a UK pint, at 568 ml, is closer to 245. Craft beers, IPAs and stouts are often stronger and can be 200 to 300 calories per serving.",
      "Most of beer's calories come from the alcohol itself, with the rest from carbohydrate left over after brewing. Beer has almost no protein, fat or vitamins worth counting. If you are tracking calories, log the size you actually drank, and remember that drinking often leads to extra snacking. Both US and UK health guidance say that drinking less is better for health, and light beer is an easy way to save around a third of the calories.",
    ],
  },
  'black-coffee': {
    body: [
      "Plain black coffee, whether brewed, filter, Americano or espresso, has only about 2 calories a cup. That makes it one of the few drinks you can have freely while counting calories, as long as you count what you add to it.",
      "Milk, cream, sugar and syrups are where coffee calories come from. A tablespoon of half-and-half adds about 20 calories, each teaspoon of sugar about 17, and a pump of flavored syrup about 20 to 25. An 8 oz cup of brewed coffee has roughly 80 to 100 mg of caffeine. The FDA considers up to 400 mg a day generally safe for healthy adults; people who are pregnant are advised to keep to lower limits, around 200 mg a day in UK guidance.",
    ],
  },
  blueberry: {
    body: [
      "Blueberries are eaten fresh by the handful, stirred into oatmeal and yogurt, baked into muffins and pancakes, or blended into smoothies. A cup of fresh blueberries is about 148 g and 84 calories.",
      "They are a good source of fiber and vitamin C, and their deep blue color comes from anthocyanins, plant compounds that are widely studied for their health effects. Frozen blueberries are just as nutritious as fresh, often cheaper, and available all year, which makes them an easy daily habit. Blueberry muffins and pastries are a different matter: a large coffee-shop muffin can be 400 to 500 calories, with only a few berries in it, so the fruit does not make the bake a healthy choice.",
    ],
  },
  broccoli: {
    body: [
      "Broccoli is one of the most nutrient-dense vegetables you can eat. A cup of chopped broccoli is about 91 g and only 31 calories, yet it provides a good amount of fiber, vitamin C, vitamin K and folate, and more protein than most vegetables.",
      "It is eaten steamed, roasted, stir-fried or raw with dips. Steaming or roasting keeps more of its vitamin C than long boiling, and roasting with a little olive oil and garlic is one of the easiest ways to make it taste good. Because it is so low in calories, broccoli is a great way to bulk up pasta, rice dishes and stir-fries so the plate is just as full with fewer calories. Cheese sauce is the main thing that turns it into a heavy side.",
    ],
  },
  butter: {
    body: [
      "Butter is used for spreading on bread and toast, cooking, and above all baking, where its flavor and texture are hard to replace. It is about 81% fat and 717 calories per 100 g. A pat of butter, about 5 g, is 36 calories, and a tablespoon is about 100.",
      "Butter is high in saturated fat, which US and UK guidelines both recommend limiting, so it works best as a flavor ingredient rather than an everyday cooking fat. Salted butter also adds noticeable sodium. Practical swaps include olive oil for cooking, a soft vegetable-oil spread for toast, and simply spreading thinner: a scraped layer of butter on toast is far less than most people think they use. For calorie tracking, a measured teaspoon or tablespoon helps.",
    ],
  },
  'butter-almond': {
    body: [
      "Almond butter is ground almonds and nothing else in the best versions, sometimes with a little salt. It is spread on toast and rice cakes, stirred into oatmeal, drizzled over fruit, or blended into smoothies. A one-ounce serving, about two level tablespoons, has around 172 calories.",
      "It brings protein, fiber and unsaturated fat, plus vitamin E and magnesium. Like all nut butters, it is very calorie-dense, and the usual heaped spoonful is often closer to two servings than one. Check the ingredients list: some brands add sugar, palm oil or other oils. Oil separating on top of a natural jar is normal. Stir it back in, and store it in the fridge after opening if you will not finish it within a few weeks.",
    ],
  },
  'butter-peanut': {
    body: [
      "Peanut butter is a pantry staple in the US and increasingly in the UK, used in sandwiches, on toast and apples, in sauces and in baking. A one-ounce serving, about two level tablespoons, has about 167 calories and 6 g of protein.",
      "It is one of the cheapest ways to add protein and healthy fats to a meal. The differences between brands matter: many popular peanut butters include added sugar, salt and palm oil or hydrogenated oils, while natural versions are just peanuts and maybe salt. Reduced-fat peanut butter often replaces fat with sugar and is not lighter in calories. Peanut allergy is serious and common, so take care when serving it to guests or packing it for school, where it may not be allowed.",
    ],
  },
  cashews: {
    body: [
      "Cashews are a soft, slightly sweet nut eaten as a snack, tossed into stir-fries and curries, and soaked and blended into creamy dairy-free sauces, cheeses and desserts. A one-ounce serving is about 18 cashews and 157 calories.",
      "They are a good source of copper, magnesium and iron, and have a little more carbohydrate and less fiber than almonds or walnuts. Their buttery texture makes them easy to eat by the handful, so portioning matters. In cooking, cashew cream is a popular swap for heavy cream in pasta sauces and soups, and it gives a rich texture with less saturated fat. Choose unsalted or lightly salted cashews for snacking; honey-roasted and chili versions add sugar and salt.",
    ],
  },
  cauliflower: {
    body: [
      "Cauliflower has become one of the most versatile vegetables in low-carb cooking. Beyond being roasted or steamed, it is riced as a swap for rice, mashed instead of potatoes, and turned into pizza bases, wings and steaks. A cup of chopped cauliflower is about 110 g and 28 calories.",
      "It is a good source of vitamin C and provides some fiber. Its mild flavor means it soaks up spices, which is why it works so well in curries such as aloo gobi and in roasted dishes with cumin or paprika. Watch the extras: cauliflower cheese, a British favorite, gets most of its calories from the cheese sauce, and shop-bought cauliflower pizza bases often contain cheese and starches that bring them close to regular dough.",
    ],
  },
  'cheese-pizza': {
    body: [
      "Cheese pizza, with tomato sauce and mozzarella, is the baseline for every other pizza. A typical slice of about 86 g has around 229 calories, but slice sizes vary a lot: a slice from a large takeout pizza can be 120 to 150 g, and deep-dish or stuffed crust adds much more.",
      "Pizza provides a fair amount of protein from the cheese, but it is also high in salt, at about 540 mg of sodium per 100 g. The easiest ways to lighten a pizza meal are to choose thin crust, add vegetable toppings rather than extra cheese or meat, pair it with a salad, and decide on the number of slices before you start. Two slices with a side salad is a reasonable meal for most adults.",
    ],
  },
  cheeseburger: {
    body: [
      "A cheeseburger here means a typical fast-food single patty burger with a slice of cheese and a bun, at about 165 g and 488 calories. Restaurant and gourmet burgers can be twice that size, with double patties, bacon and sauces pushing them past 1,000 calories.",
      "A cheeseburger is a good source of protein, about 30 g, which helps keep you full. The usual issue is what comes with it: a medium order of fries adds about 450 calories and a regular soda another 150 to 250. Ordering a single patty, skipping the extra sauce, and choosing a side salad or small fries makes a burger meal much easier to fit into your day. Lettuce-wrap burgers save the bun's 150 or so calories.",
    ],
  },
  apple: {
    body: [
      "Apples are one of the most eaten fruits in both the US and the UK, usually raw as a snack, sliced into lunch boxes, or baked into crumbles and pies. A medium apple weighs about 180 g and comes to roughly 95 calories, almost all of it from natural sugar and fiber.",
      "Their main strength is volume: an apple is around 85% water and takes time to chew, so it is filling for very few calories. Eat the skin, because a good share of the fiber is in the peel. Apple juice is a different food: it keeps the sugar but loses most of the fiber, so a glass is far less filling than the whole fruit. Pairing apple slices with a little peanut butter or cheese adds protein and keeps you full for longer.",
    ],
  },
  'chicken-biryani': {
    body: [
      "Chicken biryani is a layered rice dish cooked with marinated chicken, spices, fried onions and often saffron, popular across India and Pakistan and a takeaway favorite in the UK and US. A one-cup serving is about 196 g and 204 calories.",
      "Because rice and chicken are cooked together, biryani is a complete meal in one dish, with about 14 g of protein per cup. Home-cooked biryani is fairly moderate in fat, but restaurant versions often use more ghee and oil, and a takeaway portion can hold three or four cups, which can push it past 800 calories. Pairing a smaller portion with raita and a salad, rather than adding a curry on the side, keeps the meal balanced.",
    ],
  },
  'chicken-breast': {
    body: [
      "Chicken breast is the most popular lean protein in the US and UK, used in everything from grilled dinners to salads, wraps, stir-fries and meal prep. The values here are for raw, skinless breast: 4 oz raw is about 136 calories and 25 g of protein.",
      "Raw and cooked weights differ, which trips up a lot of calorie counters. Chicken loses roughly a quarter of its weight as water when cooked, so 100 g of cooked breast has more calories and protein than 100 g raw. Weigh it raw where possible, or use a cooked entry for cooked meat. Breast dries out easily, so brining, marinating, or cooking to 165°F (74°C) and no further keeps it juicy. Breaded, fried or skin-on versions are much higher in calories.",
    ],
  },
  'chicken-curry': {
    body: [
      "Chicken curry covers a huge range of dishes, from home-style tomato and onion curries to creamy restaurant favorites like tikka masala and korma. The values here are for a typical home-style curry, about 257 calories per cup with around 16 g of protein.",
      "The sauce decides the calories. Tomato-based curries such as jalfrezi or a simple home curry are on the lighter side, while cream, butter, ground nuts or coconut milk can double the calories of a portion. Restaurant and takeaway curries are often richer than home cooking and come in large portions. What you serve with it matters too: a cup of rice adds about 205 calories and a restaurant naan another 300 or so. Curry is also fairly salty, at 376 mg of sodium per 100 g.",
    ],
  },
  'chicken-thigh': {
    body: [
      "Chicken thigh is the juicier, more forgiving cut, ideal for grilling, roasting, curries and slow cooking. The values here are for raw, skinless thigh: 4 oz is about 137 calories and 22 g of protein, very close to breast.",
      "Thighs have a little more fat than breast, which keeps them moist and full of flavor even if slightly overcooked. They are also usually cheaper. The skin makes the biggest difference: skin-on thighs can have roughly twice the calories of skinless ones, so buy skinless or remove the skin before eating if you are watching calories. Like all poultry, chicken thighs lose water when cooked, so log raw weight where you can, and cook to an internal temperature of 165°F (74°C).",
    ],
  },
  cola: {
    body: [
      "Regular cola is one of the biggest sources of added sugar in the American and British diet. A 12 oz US can has about 156 calories and 37 g of sugar, and a 330 ml UK can is slightly smaller. Larger bottles and fountain cups can easily hold two or three times that.",
      "Sugary drinks do not fill you up the way food does, so their calories tend to come on top of what you eat rather than instead of it. Cola also contains caffeine, around 30 to 40 mg per can, and is acidic, which is hard on teeth. If you drink cola daily, switching to diet or zero-sugar versions, sparkling water with fruit, or simply a smaller size is one of the easiest ways to cut sugar and calories.",
    ],
  },
  'cooked-pasta': {
    body: [
      "These values are for plain pasta cooked in water, at 158 calories per 100 g. A cup of cooked pasta is about 140 g and 221 calories. Dry pasta is much more calorie-dense, around 350 to 370 calories per 100 g, because it roughly doubles in weight when it absorbs water.",
      "Pasta itself is low in fat, and its calories come mainly from starch. A typical restaurant main can hold two to three cups of pasta, which is where portions get away from people, before counting cream, cheese or oil in the sauce. Tomato and vegetable sauces are the lighter choice. Whole wheat pasta has about twice the fiber of white, and cooking pasta al dente gives a firmer texture that many people find more filling.",
    ],
  },
  'cooked-quinoa': {
    body: [
      "Quinoa is a seed that is cooked and eaten like a grain, used in salads, grain bowls, as a side, and in breakfast porridge. A cup of cooked quinoa is about 185 g and 222 calories, with 8 g of protein and 5 g of fiber.",
      "Its protein is complete, containing all the essential amino acids, which makes it valuable in vegetarian and vegan diets. It is also naturally gluten-free. Rinse quinoa before cooking to remove saponins, a natural coating that tastes bitter, and cook it in a 1 to 2 ratio with water or stock for about 15 minutes. Dry quinoa is around 370 calories per 100 g, so check whether a recipe or label means dry or cooked weight before logging it.",
    ],
  },
  'cooked-white-rice': {
    body: [
      "Cooked white rice is a staple side for curries, stir-fries, chili and burritos. These values are for plain rice cooked in water: about 130 calories per 100 g and 205 calories per cup. Dry rice is around 360 calories per 100 g, roughly three times as much, because rice soaks up water as it cooks.",
      "White rice is low in fat and easy to digest, which is why it is a common choice when your stomach is unsettled. It is low in fiber, though, so it is less filling than brown rice, quinoa or whole grains. Takeout portions are often two cups or more, and fried rice adds oil. Measuring a cup of cooked rice once helps you see what a portion looks like on your plate. Cool leftover rice quickly and keep it in the fridge.",
    ],
  },
  'cottage-cheese': {
    body: [
      "Cottage cheese is a fresh, mild cheese made of soft curds, eaten on its own, with fruit, on toast, or blended into pancakes, dips and pasta sauces. A cup is about 210 g and 172 calories, with 23 g of protein.",
      "That protein level is why it is so popular with people who lift weights and those trying to lose weight. Most of its protein is casein, which digests slowly, so it keeps you full for a long time. The main drawback is salt: a cup has about 670 mg of sodium. Low-sodium varieties exist, and pairing it with fruit rather than crackers helps. Blended cottage cheese has become a popular high-protein swap for ricotta, cream cheese and even ice cream bases.",
    ],
  },
  croissant: {
    body: [
      "The croissant is a French pastry made by folding butter into dough many times, which creates its flaky layers. A medium croissant of about 57 g has around 231 calories, and nearly half of those come from fat. Large café croissants are often 80 to 100 g and 350 calories or more.",
      "Because it is light and airy, a croissant does not fill you up much for its calories, and much of its fat is saturated fat from butter. Filled versions, such as almond, chocolate or ham and cheese, can be considerably heavier. A croissant is best treated as an occasional treat. If you want one for breakfast, pairing it with fruit and a yogurt or a latte adds protein and makes the meal more satisfying.",
    ],
  },
  'dark-chocolate': {
    body: [
      "Dark chocolate is made with more cocoa solids and less milk than milk chocolate. The values here are for a sweeter, lower-cocoa dark chocolate, around 550 calories per 100 g. Bars labeled 70%, 85% or higher contain much less sugar, and the cocoa percentage on the wrapper is the best guide.",
      "Cocoa is rich in plant compounds called flavanols, as well as iron, magnesium and fiber. That has given dark chocolate a healthy reputation, but it is still calorie-dense, and a full bar can be 250 calories or more. The strong, slightly bitter taste of higher-cocoa chocolate means a couple of squares is often enough, which makes it a practical treat for people managing their weight. It also contains a small amount of caffeine.",
    ],
  },
  'diet-cola': {
    body: [
      "Diet cola is sweetened with low-calorie sweeteners such as aspartame or acesulfame potassium instead of sugar, so a can has almost no calories, around 7. Zero-sugar colas are similar, often with a slightly different sweetener blend to taste closer to the original.",
      "For people trying to cut sugar, switching from regular to diet cola removes about 37 g of sugar per can. The sweeteners used are approved as safe by the FDA and the UK Food Standards Agency, within acceptable daily intake levels. The WHO has advised against relying on sweeteners for long-term weight control, though, so water, sparkling water and unsweetened tea remain the best everyday drinks. Diet cola still contains caffeine and is acidic, which can affect tooth enamel.",
    ],
  },
  dosa: {
    body: [
      "Dosa is a thin, crisp South Indian pancake made from a fermented batter of rice and urad dal (black lentils). A medium plain dosa of about 80 g has around 168 calories. It is served with sambar, a lentil and vegetable stew, and coconut chutney.",
      "Fermentation makes the batter light and slightly tangy, and gives the dosa its crisp texture when cooked thin on a hot griddle with a little oil. The filled masala dosa, with spiced potato inside, is the most popular restaurant version and is considerably more filling and higher in calories. Restaurant dosas are often large and brushed with ghee. Sambar is the healthiest partner: it adds protein and fiber from lentils and vegetables for relatively few calories.",
    ],
  },
  'dry-tofu': {
    body: [
      "Firm tofu is made by curdling soy milk and pressing the curds into blocks. It is a staple protein in Asian cooking and for vegetarians and vegans, used in stir-fries, curries, scrambles and baked dishes. Half a cup, about 124 g, has around 179 calories and 21.5 g of protein.",
      "Tofu provides complete protein, meaning all the essential amino acids, and tofu set with calcium sulfate is a good source of calcium; check the label. Its mild taste means it takes on any marinade. For crisp tofu, press out the water for 15 to 30 minutes, cut it into cubes, toss with a little cornstarch, and bake, air-fry or pan-fry. Deep-fried tofu in restaurants soaks up oil and can carry far more calories than plain tofu.",
    ],
  },
  egg: {
    body: [
      "Eggs are one of the most versatile and affordable protein foods. A large egg is about 50 g and has around 72 calories and 6 g of complete protein. They are scrambled, boiled, poached and fried, and are a key ingredient in baking.",
      "Eggs are a good source of vitamin B12, vitamin D and choline, most of which is in the yolk. Current US and UK guidance no longer sets a specific limit on eggs for most healthy people, as dietary cholesterol has less effect on blood cholesterol than once thought. How you cook them matters for calories: frying in butter or oil can add 40 to 100 calories, while boiling or poaching adds none. Two eggs on whole grain toast make a filling breakfast with over 15 g of protein.",
    ],
  },
  'english-muffin': {
    body: [
      "The English muffin is a flat, round yeasted bread, split and toasted, best known as the base of eggs Benedict and breakfast sandwiches. A whole English muffin weighs about 57 g and has around 130 calories, much less than a bagel. (The per-serving figure on this page is for one ounce, about half a muffin.)",
      "It is one of the lighter breakfast breads, and whole wheat versions have a useful amount of fiber. The nooks and crannies hold butter well, which is where the calories can creep up. Topping one with an egg and a slice of cheese, or with peanut butter and banana, makes a balanced breakfast with protein. English muffins are fairly salty, with about 425 mg of sodium per 100 g.",
    ],
  },
  'french-fries': {
    body: [
      "French fries, called chips in the UK, are deep-fried strips of potato. A medium fast-food order of about 145 g has around 450 calories and 21 g of fat. Restaurant and pub portions are often larger, and chip-shop chips can be thicker and more generous still.",
      "Most of the calories come from the frying oil the potato absorbs. Fries are also often heavily salted. Portion size is the easiest lever: a small serving can be half the calories of a large. At home, oven or air-fried fries made with a light spray of oil can cut the fat by more than half. Thick-cut chips absorb a little less oil per gram than thin fries, because they have less surface area for their size.",
    ],
  },
  'frozen-yogurt': {
    body: [
      "Frozen yogurt is a soft-serve dessert made with cultured milk and sugar. At around 127 calories per 100 g, it is lighter than regular ice cream and much lower in fat, though it has nearly as much sugar.",
      "Many self-serve frozen yogurt shops sell by weight, and a medium cup can easily hold 300 g or more, roughly 400 calories before any toppings. That is more than a typical scoop of ice cream. Candy, cookie crumbs and sauces can double the total. To keep it light, choose the smallest cup, fill it halfway, and top with fresh fruit or a few nuts. Some frozen yogurts contain live cultures, but the amounts vary, and it should be treated as a dessert.",
    ],
  },
  'greek-yogurt-plain-nonfat': {
    body: [
      "Plain nonfat Greek yogurt is regular yogurt strained to remove much of the liquid whey, making it thick, tangy and high in protein. A 150 g pot has about 89 calories and 15.5 g of protein.",
      "That ratio makes it one of the best foods for protein on a budget, whether at breakfast with fruit and oats, as a snack, or in cooking. It works as a lighter swap for sour cream on tacos, mayonnaise in dressings, and cream in sauces. Plain is the version to buy: flavored and fruit Greek yogurts often add 10 to 20 g of sugar. If the nonfat version tastes too sharp, try 2% fat, add cinnamon or a little honey, or mix in berries for natural sweetness.",
    ],
  },
  'grilled-chicken-breast': {
    body: [
      "Grilled chicken breast is the go-to lean protein for salads, wraps, rice bowls and meal prep. A 4 oz cooked portion has about 199 calories and 33.5 g of protein, one of the best protein-to-calorie ratios of any food.",
      "These values are for cooked meat, which is more concentrated than raw because chicken loses water on the grill. Seasoning and marinades add flavor but can add salt; the version here has about 353 mg of sodium per 100 g. Sugary glazes, such as barbecue or teriyaki, can add 50 to 100 calories per portion. For juicy grilled chicken, pound the breast to an even thickness, marinate it, and take it off the heat as soon as it reaches 165°F (74°C), then let it rest for a few minutes.",
    ],
  },
  'grilled-salmon': {
    body: [
      "Grilled salmon is one of the most popular fish dishes in both the US and UK, served with vegetables, on salads or in rice bowls. A 4 oz cooked portion has about 293 calories and 29 g of protein.",
      "Salmon is an oily fish, rich in long-chain omega-3 fats, which are linked with heart and brain health and are hard to get from other foods. The NHS recommends two portions of fish a week, one of them oily, and the US Dietary Guidelines suggest about 8 oz of seafood a week. Salmon is also a good source of vitamin D and B12. Restaurant salmon often comes with butter sauces or sweet glazes, which add calories, so ask for sauces on the side.",
    ],
  },
  honey: {
    body: [
      "Honey is used to sweeten tea, yogurt, oatmeal, dressings and marinades. A tablespoon is about 21 g and 64 calories, and a teaspoon about 21 calories. It is mostly sugar, a mix of fructose and glucose, with a little water.",
      "Despite its natural image, honey counts as a free or added sugar in US and UK guidelines, the same as table sugar. It does contain small amounts of antioxidants, enzymes and minerals, but not enough to matter at normal servings. Because it is sweeter than sugar, some people find a smaller amount does the job. Raw and local honey taste different but are nutritionally similar. Never give honey to babies under 12 months old, because of the risk of infant botulism.",
    ],
  },
  idli: {
    body: [
      "Idli is a soft, steamed cake from South India, made from the same fermented rice and lentil batter as dosa. Each idli weighs about 38 g and has around 49 calories, and a typical serving is two to four, eaten with sambar and chutney.",
      "Because it is steamed rather than fried, idli is almost fat-free, and the fermentation makes it light and easy to digest. That is why it is a common breakfast and a popular food when someone is unwell. On its own idli is mostly carbohydrate, so the sides make the meal: sambar adds protein and fiber from lentils and vegetables. Coconut chutney is delicious but higher in fat, while tomato or mint chutneys are lighter. Instant idli mixes are convenient, but check them for added salt.",
    ],
  },
  kale: {
    body: [
      "Kale is a sturdy, dark leafy green used in salads, soups, smoothies, stir-fries and baked kale chips. A cup of raw chopped kale weighs only about 25 g and has around 11 calories, so it adds bulk and nutrients to a meal for almost nothing.",
      "It is rich in vitamins K, C and A, and its calcium is relatively well absorbed. Raw kale can be tough and bitter: removing the stems and massaging the leaves with a little olive oil, lemon and salt for a minute softens them for salads. Cooking shrinks kale a lot, so a pan full of leaves becomes a small serving. Because kale is high in vitamin K, people taking warfarin should keep their intake consistent and check with their doctor.",
    ],
  },
  'latte-nonfat-milk': {
    body: [
      "A latte is espresso topped with steamed milk and a thin layer of foam. Made with nonfat milk, a medium 16 oz latte has about 144 calories and nearly 14 g of protein, which makes it closer to a light snack than just a coffee.",
      "Its sugar, around 20 g, is lactose naturally present in the milk, not added sugar. That changes quickly with flavored syrups: each pump adds about 20 to 25 calories, and seasonal lattes with syrups, sauces and whipped cream can reach 300 to 400 calories. Switching from whole milk to nonfat saves about 90 to 100 calories in a medium latte. Plant-milk lattes vary: oat milk is usually higher in calories, unsweetened almond milk lower, and soy milk closest to dairy for protein.",
    ],
  },
  'light-beer': {
    body: [
      "Light beer is brewed to have fewer calories and carbohydrates than regular beer, usually with slightly less alcohol. A 12 oz can or bottle has around 104 calories, compared with about 155 for regular beer. Larger 16 oz cans are closer to 140.",
      "The saving comes from lower carbohydrate and alcohol content, which is why light beers taste thinner. They can be useful if you are tracking calories and plan to have more than one drink. Light beer is still alcohol, though, and the health effects of drinking depend mainly on how much alcohol you have, not the calories. US and UK guidance both say drinking less is better. Alcohol-free beers are lower again, often 50 to 70 calories per can.",
    ],
  },
  'maple-syrup': {
    body: [
      "Pure maple syrup is made by boiling down the sap of maple trees, and is used on pancakes, waffles and porridge, and in baking and glazes. A tablespoon is about 20 g and 52 calories, mostly from sucrose.",
      "Pure maple syrup contains small amounts of manganese, zinc and antioxidants, but it is still an added sugar and should be used sparingly. Check the label: many pancake syrups are made from corn syrup with maple flavoring, and contain no maple at all. Grades describe color and flavor rather than quality, with darker syrups having a stronger taste, which can mean you need less. Maple syrup is a common vegan alternative to honey. Measuring a tablespoon rather than pouring freely makes a big difference.",
    ],
  },
  margarine: {
    body: [
      "Margarine and vegetable-oil spreads were developed as an alternative to butter, and are used on toast and in cooking and baking. The values here are for a spread-style margarine at 579 calories per 100 g; a 5 g portion is about 29 calories. Light and tub spreads can be much lower, so check the label of the product you buy.",
      "Most modern spreads are made from vegetable oils and contain less saturated fat than butter, which fits US and UK advice to replace saturated fats with unsaturated ones. Older margarines contained trans fats from partially hydrogenated oils, but those were removed from the US food supply in 2018 and are now rare in UK spreads too. Margarine is fairly salty. For baking, use a block margarine designed for baking, since light spreads contain too much water.",
    ],
  },
  milk: {
    body: [
      "Whole milk is cow's milk with its natural fat left in, about 3.3%. A cup is about 244 g and 149 calories, with nearly 8 g of complete protein, plus calcium, vitamin B12 and iodine; US milk is also fortified with vitamin D.",
      "Its sugar, about 12 g per cup, is lactose, a natural milk sugar that is not counted as added or free sugar. If you want the protein and calcium with fewer calories, 2% (semi-skimmed in the UK) and skim milk have the same protein for about 120 and 85 calories per cup. Whole milk is recommended for children aged one to two. People with lactose intolerance can choose lactose-free milk, which has the same nutrition, or a fortified soy milk.",
    ],
  },
  'milk-chocolate': {
    body: [
      "Milk chocolate is the sweeter, creamier style made with cocoa, sugar and milk solids. It has about 535 calories per 100 g. A standard 1.5 oz US bar, around 43 g, comes to about 230 calories, and a UK 45 g bar is similar. The figures on this page use a 7 g miniature bar as the serving.",
      "Milk chocolate has less cocoa than dark chocolate and more sugar, about 51 g per 100 g, so it gives less of the cocoa's fiber and plant compounds. It does provide a little calcium and protein from the milk. As a treat, the key is the amount: snack-size pieces and fun-size bars make it easier to enjoy a small portion. Sharing-size bags and large bars make it easy to eat several hundred calories without noticing.",
    ],
  },
  mocha: {
    body: [
      "A mocha is a latte with chocolate sauce mixed in, often topped with whipped cream. A medium 16 oz mocha made with regular milk has about 317 calories and around 46 g of sugar, much of it added sugar from the chocolate sauce.",
      "That sugar is more than the American Heart Association's suggested daily added-sugar limit for women, which is about 25 g, so a mocha is closer to a dessert than an everyday coffee. Whipped cream adds another 70 to 100 calories. To keep the taste with less sugar, order a small, ask for fewer pumps of chocolate, use nonfat milk and skip the cream. A latte with a sprinkle of cocoa powder gives a hint of chocolate for almost no extra calories.",
    ],
  },
  naan: {
    body: [
      "Naan is a soft, leavened flatbread from South Asia, traditionally baked in a tandoor oven and served with curries. It is often made with yogurt and milk, which gives it a tender texture. A small 44 g piece has about 137 calories.",
      "Restaurant and takeaway naan is usually much bigger, 90 to 120 g, which puts a single naan at roughly 280 to 370 calories before any butter. Garlic, butter, cheese and Peshwari (sweet coconut) naans add more again. Naan is also fairly salty. If you are having a curry, choose either rice or naan rather than both, share a naan between two people, or pick a plain roti, which is usually lighter. Whole wheat naan adds a little fiber.",
    ],
  },
  'nonfat-skim-yogurt': {
    body: [
      "Plain nonfat yogurt is regular, unstrained yogurt made from skim milk. It is thinner and milder than Greek yogurt, which makes it good for smoothies, marinades, overnight oats and sauces. A cup is about 245 g and 137 calories, with 14 g of protein.",
      "It is a good source of calcium and protein, and many brands contain live cultures. Its sugar, about 19 g per cup, is mostly lactose from the milk, rather than added sugar. Fruit and flavored nonfat yogurts are a different matter, often adding 10 to 20 g of sugar per pot. Buying plain and adding your own fruit, cinnamon or a small drizzle of honey gives you control. Nonfat yogurt is also a good marinade for chicken, as in tandoori dishes.",
    ],
  },
  'oat-milk': {
    body: [
      "Oat milk is made by blending oats with water and straining the mixture. It has become the most popular plant milk in coffee shops thanks to its creamy texture and natural sweetness. A cup has about 110 calories, more than unsweetened almond milk but less than whole dairy milk.",
      "Oat milk is low in protein, under 2 g per cup, so it does not replace the protein in dairy or soy milk. Many brands add oil for creaminess, and barista editions are often richer. It is naturally free of dairy, soy and nuts, which makes it a good choice for people with allergies. Choose an unsweetened version fortified with calcium and vitamin D. People with coeliac disease should look for oat milk labeled gluten-free.",
    ],
  },
  'olive-oil': {
    body: [
      "Olive oil is the main fat of the Mediterranean diet, used for cooking, roasting, dressings and drizzling. Like all oils, it is pure fat: a tablespoon is about 14 g and 120 to 126 calories, making it one of the most calorie-dense foods in the kitchen.",
      "Most of its fat is monounsaturated, and extra virgin olive oil contains polyphenols, plant compounds linked with heart health. Swapping butter and other saturated fats for olive oil is in line with US and UK advice. The catch is quantity: pouring straight from the bottle can easily add 200 to 300 calories to a dish. Measuring with a spoon or using a spray helps if you are counting. Extra virgin works well for most home cooking, including sautéing and roasting.",
    ],
  },
  'onion-rings': {
    body: [
      "Onion rings are sliced onions dipped in batter or breadcrumbs and deep-fried. A cup of about 50 g, roughly a small side, has around 176 calories. Restaurant portions vary widely, and a large order can easily reach 400 to 500 calories.",
      "Most of the calories come from the batter and the oil it absorbs, at nearly 20 g of fat per 100 g, rather than from the onion itself. Onion rings are also high in salt, at 575 mg of sodium per 100 g, more than fries. Dipping sauces such as ranch or mayonnaise can add 100 calories or more per serving. If you are ordering them as a side, a small portion shared with others is the easiest way to enjoy them. Air-fried homemade rings use much less oil.",
    ],
  },
  orange: {
    body: [
      "Oranges are eaten peeled as a snack, segmented into salads, or juiced. A medium orange of about 131 g has around 62 calories and provides about 70 mg of vitamin C, most of the US daily value and well over the UK's 40 mg reference, along with about 3 g of fiber.",
      "Whole oranges are far more filling than orange juice. A glass of juice contains the sugar of two or three oranges but little of the fiber, and it is easy to drink quickly. That is why the NHS counts fruit juice as only one of your five a day, however much you drink, and recommends limiting it to 150 ml a day. Easy-peel varieties such as clementines and mandarins are smaller, about 35 to 45 calories each, and make a handy lunch-box fruit.",
    ],
  },
  pakora: {
    body: [
      "Pakoras are Indian fritters made by dipping vegetables such as onion, potato, spinach or cauliflower in a spiced chickpea-flour (besan) batter and frying them. Each small pakora of about 12 g has around 15 calories in this data, which reflects a lighter, vegetable-heavy recipe.",
      "Restaurant and takeaway pakoras are often fried in more oil and made larger, so they can be considerably higher in calories. Because they are small, they are easy to eat in large numbers, so it is worth counting them, especially larger restaurant ones. Chickpea flour is naturally gluten-free and adds some protein and fiber. Baked or air-fried pakoras are a good lighter option at home, and a mint-yogurt raita makes a lighter dip than sweet chutneys.",
    ],
  },
  paratha: {
    body: [
      "Paratha is a flaky Indian flatbread made from whole wheat dough that is folded with ghee or oil and cooked on a griddle. A plain paratha of about 70 g has around 228 calories. It is often eaten for breakfast with yogurt, pickle or a curry.",
      "Because it is made from whole wheat flour, paratha has a good amount of fiber, but the layers of fat make it roughly twice as calorie-heavy per piece as a plain roti. Stuffed parathas, such as aloo (potato), gobi (cauliflower) or paneer, are larger and often reach 300 calories or more, especially with butter on top. Frozen parathas from the supermarket vary widely, so check the pack. Using a light brush of oil instead of generous ghee makes a big difference at home.",
    ],
  },
  'pepperoni-pizza': {
    body: [
      "Pepperoni pizza is the most popular pizza topping in the US and a takeaway favorite in the UK. A typical slice of about 88 g has around 248 calories, but slices from large takeout pizzas, deep-dish and stuffed crusts can be much bigger and heavier.",
      "Pepperoni adds fat and salt more than protein. At 620 mg of sodium per 100 g, two large slices can provide around half of the 2,300 mg daily sodium limit used on US labels. Pepperoni is a processed meat, which health guidance in both countries suggests eating in moderation. To lighten a pizza meal, choose thin crust, ask for light cheese, add vegetable toppings alongside the pepperoni, and decide how many slices you will have before the box is open.",
    ],
  },
  'pita-bread': {
    body: [
      "Pita is a round Middle Eastern flatbread that puffs up during baking to form a pocket. It is used for falafel, gyros, shawarma and sandwiches, or cut into triangles and served with hummus. A medium pita of about 57 g has around 157 calories.",
      "Pita is very low in fat, since it is usually made with just flour, water, yeast and salt. Whole wheat pita adds fiber and is the better everyday choice. It is fairly salty, with about 536 mg of sodium per 100 g. Pita's pocket makes it easy to fill with vegetables and lean protein, such as grilled chicken, falafel or eggs, which turns it into a balanced meal. Pita chips are a different food: baked or fried, they are much higher in calories per handful.",
    ],
  },
  potato: {
    body: [
      "Potatoes are one of the most eaten foods in both the US and UK, baked, boiled, mashed, roasted and fried. A medium raw potato of about 173 g has around 133 calories, and a plain baked or boiled potato is a filling, low-fat food.",
      "They are a good source of potassium and vitamin C, and leaving the skin on adds fiber. The cooking method is what decides the calories. A baked potato with butter, cheese and sour cream can triple its calories, and fries, chips and roast potatoes absorb a lot of oil. Cooled boiled potatoes, as in potato salad, contain more resistant starch, which acts somewhat like fiber. Note that the NHS does not count potatoes towards your five a day, as they are classed as a starchy food.",
    ],
  },
  'red-wine': {
    body: [
      "Red wine typically has 12 to 15% alcohol. A 6 oz (180 ml) glass has about 153 calories. In the UK, a small 125 ml glass is around 105 calories, a medium 175 ml glass about 150, and a large 250 ml glass, a third of a bottle, about 210. A full bottle comes to roughly 640.",
      "Almost all of those calories come from alcohol. Red wine contains plant compounds such as resveratrol, but current US and UK health guidance does not recommend drinking for any health benefit, and the risks rise with the amount you drink. The UK advises adults not to regularly drink more than 14 units a week, and a bottle of red wine is about 10 units. If you are tracking calories, pour a measured glass rather than topping up, and alternate with water.",
    ],
  },
  'roti-chapati': {
    body: [
      "Roti, also called chapati, is the everyday flatbread of much of India, Pakistan and East Africa, made from whole wheat atta flour and water and cooked on a dry griddle. A medium roti of about 40 g has around 120 calories.",
      "Because it is made from whole wheat, roti is a good source of fiber, about 4 g per piece. Plain roti is low in fat, and the figure here allows for the light brush of ghee or oil that is common at home. Restaurant rotis are often larger and more heavily buttered. Two rotis with dal and a vegetable sabzi is a balanced, filling meal. If you are watching calories, roti is generally the lighter choice compared with naan or paratha, and skipping the ghee on top saves a little more.",
    ],
  },
  salmon: {
    body: [
      "These values are for raw farmed Atlantic salmon, which is what most supermarkets in the US and UK sell. A 4 oz raw portion has about 235 calories and 23 g of protein, along with plenty of omega-3 fats.",
      "Salmon is one of the best food sources of the long-chain omega-3 fats EPA and DHA, as well as vitamin D and B12. Both the NHS and US guidelines recommend eating fish regularly, including oily fish like salmon, and salmon is low in mercury, so it is a good choice during pregnancy, within the NHS advice of up to two portions of oily fish a week. Wild salmon is usually leaner than farmed. Cooking methods matter for the final calories: baking, grilling or poaching adds little, while pan-frying in butter or using sweet glazes adds more. Weigh raw where you can.",
    ],
  },
  samosa: {
    body: [
      "Samosas are fried pastry triangles filled with spiced potato and peas, or minced meat, and are a favorite snack in India and at takeaways in the UK and US. A small 25 g samosa has about 78 calories, but a standard takeaway or bakery samosa is often 80 to 100 g, around 250 to 310 calories.",
      "Most of the calories come from the pastry and the oil it absorbs during frying, at 17.5 g of fat per 100 g. Samosas are also fairly salty. They are best treated as an occasional snack. Baked or air-fried samosas, especially with filo pastry, cut the fat a lot at home. Serving them with a mint-yogurt chutney rather than sweet tamarind sauce saves a few calories, and one samosa with a salad makes a lighter lunch than two.",
    ],
  },
  'sourdough-bread': {
    body: [
      "Sourdough is bread made with a natural starter of wild yeast and bacteria instead of commercial yeast, and fermented for many hours. That gives it its tangy flavor, chewy crumb and thick crust. An ounce, about 28 g, has around 77 calories.",
      "Bakery sourdough is often sliced thick, and a single slice can weigh 50 to 70 g, around 135 to 190 calories, so weighing one slice is worth doing if you count calories. Nutritionally, white sourdough is similar to other white breads, although some people find it easier to digest thanks to the long fermentation. Whole grain sourdough has more fiber. Note that supermarket loaves labeled sourdough are sometimes made with added yeast and flavorings, so check the ingredients for a real starter.",
    ],
  },
  'soy-milk': {
    body: [
      "Soy milk is made from soaked, ground soybeans and water. A cup has about 93 calories and nearly 9 g of complete protein, which makes it the plant milk closest to cow's milk in nutrition.",
      "That is why dietitians often suggest fortified soy milk for vegans and for people who cannot have dairy. It is also low in saturated fat and naturally lactose-free. Look for an unsweetened version fortified with calcium and vitamin D, since sweetened and flavored soy milks can add 6 to 10 g of sugar per cup. Soy milk can curdle in very hot, acidic coffee; letting the coffee cool slightly or using a barista version helps. People with a soy allergy should choose oat or another plant milk instead.",
    ],
  },
  spinach: {
    body: [
      "Spinach is one of the easiest vegetables to add to a meal. A cup of raw leaves is only about 30 g and 7 calories, and a whole bag wilts down to a couple of portions in a hot pan. It goes into salads, smoothies, omelets, pasta, curries such as saag and palak paneer, and soups.",
      "It is rich in vitamin K, folate and vitamin A. Spinach also contains iron and calcium, but much of the calcium is bound up by oxalates, so less is absorbed than the label suggests. Pairing spinach with vitamin C, such as a squeeze of lemon, helps your body absorb its iron. Frozen spinach is cheap, keeps for months and is just as nutritious. People taking warfarin should keep their intake of leafy greens consistent.",
    ],
  },
  strawberry: {
    body: [
      "Strawberries are eaten fresh, sliced over cereal and yogurt, blended into smoothies, and as a classic summer dessert with cream. A cup of halves, about 152 g, has only around 49 calories, making them one of the lowest-calorie fruits.",
      "They are an excellent source of vitamin C, with a cup providing about a full day's worth by the US daily value, plus a few grams of fiber. Their low sugar content, about 5 g per 100 g, makes them a good fruit choice if you are watching sugar. The calories in a strawberry dessert usually come from what goes with it: a portion of cream, ice cream, chocolate dip or shortcake can add hundreds of calories. Frozen strawberries are great for smoothies.",
    ],
  },
  'sweet-potato': {
    body: [
      "Sweet potatoes are baked, mashed, roasted into wedges, or cut into fries. A medium sweet potato of about 114 g has around 98 calories. They are naturally sweet, which makes them popular in both savory meals and desserts like sweet potato pie.",
      "Their bright orange flesh comes from beta-carotene, which the body converts into vitamin A, and they provide fiber, vitamin C and potassium. Eating the skin adds extra fiber. Unlike white potatoes, the NHS counts sweet potatoes as one of your five a day. The usual traps are toppings and frying: marshmallow-topped casseroles and sweet potato fries can carry far more calories than the potato itself. Roasted sweet potato with a little olive oil and spices is a simple, filling side.",
    ],
  },
  tuna: {
    body: [
      "These values are for raw yellowfin tuna, at about 109 calories and 24 g of protein per 100 g, with almost no fat. It is eaten as steaks, seared, or raw in sushi and poke bowls. Canned tuna in water has similar figures, while tuna canned in oil is higher in calories.",
      "Tuna is one of the leanest, cheapest protein sources available, which makes it a favorite for high-protein meals. Unlike salmon, tuna does not count as an oily fish in UK guidance. Larger tuna species, including yellowfin and albacore, contain more mercury than smaller fish. The FDA and NHS both advise limiting tuna during pregnancy, and the FDA also gives limits for young children. Mayonnaise in tuna salad adds around 90 calories per tablespoon, so Greek yogurt is a popular lighter swap.",
    ],
  },
  'vanilla-ice-cream': {
    body: [
      "Vanilla ice cream is the best-selling ice cream flavor in the US. A small 75 g individual pot has about 155 calories, and a half-cup scoop is roughly 135 to 140. Premium and super-premium ice creams contain more cream and less air, so the same scoop can have 250 calories or more.",
      "Ice cream provides a little calcium and protein, but it is mainly a source of sugar and saturated fat, around 21 g of sugar per 100 g. Measuring a scoop into a small bowl, rather than eating from the tub, is the simplest way to keep portions in check. Light ice creams, frozen yogurt and frozen banana nice-cream are lower in calories. Toppings such as hot fudge, sprinkles and cookies can double the calories of a sundae.",
    ],
  },
  walnut: {
    body: [
      "Walnuts are eaten as a snack, sprinkled on oatmeal, yogurt and salads, and used in baking such as banana bread and brownies. A one-ounce serving is about 14 walnut halves and 183 calories, slightly more than most other nuts.",
      "They are the richest common nut in alpha-linolenic acid (ALA), the plant form of omega-3 fat, which makes them a useful addition for people who do not eat fish. Walnuts also provide fiber, protein and antioxidants. Because they are so calorie-dense, portion control matters: a small handful is a serving, and eating them by the bag adds up fast. Walnuts can turn rancid because of their delicate fats, so store them in an airtight container, ideally in the fridge or freezer.",
    ],
  },
  'white-bread': {
    body: [
      "White bread is made from refined wheat flour, which has the bran and germ removed, giving it a soft texture and mild taste. A regular slice of about 28 g has around 75 calories, but slice size varies a lot between brands and thick-sliced loaves.",
      "Removing the bran takes away most of the fiber, so white bread has only about 0.6 g per slice and is less filling than whole wheat. In both the US and UK, white flour is fortified with some B vitamins and iron, and in the UK with calcium too. White bread is fairly salty at around 450 mg of sodium per 100 g. Swapping to whole wheat or wholemeal for everyday sandwiches and toast is one of the simplest ways to eat more fiber.",
    ],
  },
  'white-sugar': {
    body: [
      "White sugar, or granulated table sugar, is pure sucrose refined from sugar cane or sugar beet. A level teaspoon is about 4.2 g and 17 calories. It is added to tea and coffee, baking, sauces and countless processed foods.",
      "Sugar provides energy but no fiber, vitamins or minerals. The American Heart Association suggests limiting added sugar to about 25 g a day for women and 36 g for men, and the NHS recommends no more than 30 g of free sugars a day for adults, about 7 teaspoons. Much of the sugar people eat is hidden in drinks, cereals, sauces and snacks, so reading labels helps. Cutting the sugar in hot drinks gradually, by half a teaspoon at a time, is an easy place to start.",
    ],
  },
  'whole-wheat-bread': {
    body: [
      "Whole wheat bread, called wholemeal in the UK, is made from flour that keeps the whole grain, including the bran and germ. A regular slice of about 36 g has around 91 calories and 2.2 g of fiber, nearly four times the fiber of a slice of white bread.",
      "That fiber, along with more protein, makes it more filling and better for digestion. Most adults fall well short of the recommended 25 to 30 g of fiber a day, and switching your everyday bread is one of the simplest ways to close the gap. Check labels carefully: in the US, look for 100% whole wheat listed as the first ingredient, since wheat or brown bread may be mostly refined flour with coloring. Seeded whole grain loaves add healthy fats and extra fiber.",
    ],
  },
};
