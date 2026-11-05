// Hand-written notes for compare pages. A pair is indexed only when it has a note here
// (see isIndexedComparePair). Keys are pair slugs with food slugs in alphabetical order;
// chooseA is about the first food in the slug, chooseB the second.
// Numbers quoted must match the page's own data (per 100 g / default serving).
export interface CompareNote {
  summary: string;
  body: string[];
  chooseA: string;
  chooseB: string;
}

export const COMPARE_NOTES: Record<string, CompareNote> = {
  'apple-vs-banana': {
    summary: 'An apple is the lighter snack and a banana is the better fuel: a medium apple has about 95 calories and a medium banana about 105, but the banana packs more carbs into a smaller, softer fruit.',
    body: [
      "Per 100 g the gap is bigger than it looks per fruit: 52 kcal for apple against 89 kcal for banana. Apples are mostly water and take a while to chew, so they fill you up for very few calories. That makes them the easier pick if you are snacking between meals while trying to lose weight.",
      "Bananas earn their place around exercise. About 27 g of quick, easy-to-digest carbohydrate in a medium banana is why runners and cyclists eat them before a session, and they are gentle on the stomach. Riper bananas taste sweeter because more of their starch has turned to sugar.",
      "Both give you roughly 3 to 4 g of fiber per fruit. Keep the apple skin on, since much of an apple's fiber sits in and just under the peel.",
    ],
    chooseA: 'you want a crunchy, filling snack with the fewest calories, or something to keep in a bag for days without bruising.',
    chooseB: 'you need fast energy before a workout, want something soft and easy to eat, or are adding sweetness to oats or a smoothie.',
  },
  'banana-vs-orange': {
    summary: 'An orange is the lighter, juicier choice at about 62 calories for a medium fruit, while a medium banana has about 105 calories and more carbohydrate for energy.',
    body: [
      "Per 100 g, orange comes in at 47 kcal and banana at 89 kcal. The difference is mostly water: an orange is very juicy, so you get a lot of fruit for few calories. Fiber is similar per fruit, about 3 g each, so both help you feel full.",
      "Bananas are the more practical fuel. They need no peeling skill, travel well for a day, and their 27 g or so of carbohydrate per fruit is easy to digest before exercise. Oranges take a little more effort but give you a large dose of vitamin C, and eating the segments rather than drinking the juice keeps the fiber and makes the sugar slower to hit.",
      "If you are tracking sugar, note that a medium banana has a little more than a medium orange (about 14 g against 12 g), and the gap grows as bananas ripen.",
    ],
    chooseA: 'you want a quick, portable carb source before training or a soft fruit to mash into oats or baking.',
    chooseB: 'you want the most fruit for the fewest calories, or a refreshing snack that also covers your vitamin C for the day.',
  },
  'blueberry-vs-strawberry': {
    summary: 'Strawberries are the lower-calorie berry, with about 49 calories per cup against about 84 for blueberries, but both are among the best fruit picks if you are watching sugar.',
    body: [
      "Per 100 g, strawberries have 32 kcal and 4.9 g of sugar, while blueberries have 57 kcal and 10 g of sugar. Strawberries hold more water, so a big bowl costs very little. Fiber per cup is similar, about 3 to 3.6 g, which is good for such small portions.",
      "Blueberries are easier to use day to day: they need no hulling, they freeze and thaw well, and they go straight into porridge, yogurt or pancakes. Frozen blueberries are usually cheaper than fresh and just as nutritious, which matters in winter in both the US and UK.",
      "Strawberries shine when you want volume: a full cup of halves is under 50 calories. Watch the extras, though. Cream, sugar or chocolate dip will easily add more calories than the berries themselves.",
    ],
    chooseA: 'you want a no-prep berry to stir into breakfast every day, or a cheap frozen option that keeps for months.',
    chooseB: 'you want the biggest bowl of fruit for the fewest calories and the least sugar.',
  },
  'avocado-vs-banana': {
    summary: 'These two fruits do different jobs: a banana is a carb snack at about 105 calories, while a whole avocado is a fat-rich food at about 240 calories.',
    body: [
      "Per 100 g, avocado has 160 kcal and 14.7 g of fat, while banana has 89 kcal and just 0.3 g of fat. Most of the fat in avocado is the unsaturated kind, the same type found in olive oil, so it fits well in a balanced diet. It just needs portion control: half an avocado is a sensible serving.",
      "Avocado is also one of the most fiber-rich fruits, with around 10 g in a whole fruit, against about 3 g in a banana. Fat and fiber together make it very filling, which is why avocado toast keeps people going until lunch.",
      "Banana is the better pick when you need quick energy. Its carbs digest fast, it needs no knife, and it suits pre-workout snacking. Avocado, with almost no sugar, is the better pick if you are cutting carbs.",
    ],
    chooseA: 'you want a filling, low-sugar addition to toast, salads or eggs, and you keep the portion to about half a fruit.',
    chooseB: 'you want a quick, low-fat snack or fast fuel before exercise.',
  },
  'cheese-pizza-vs-pepperoni-pizza': {
    summary: 'Pepperoni pizza has slightly more calories, fat and salt than cheese pizza: about 248 calories a slice against about 229, a gap of roughly 20 calories per slice.',
    body: [
      "Per 100 g, cheese pizza has 266 kcal and pepperoni pizza 282 kcal. Pepperoni adds fat (11.9 g against 9.7 g per 100 g) and sodium (620 mg against 540 mg). Protein barely changes, so the extra meat adds calories and salt more than protein.",
      "In practice the topping matters less than how many slices you eat and how big they are. A slice from a large takeout pizza can be far bigger than the typical slice used here, and stuffed or deep-dish crusts add a lot more. Counting slices, and choosing thin crust, will make a bigger difference than skipping pepperoni.",
      "If salt is a concern, two slices of pepperoni pizza come close to half of the 2,300 mg daily limit used on US labels, before any sides or dips.",
    ],
    chooseA: 'you want the slightly lighter option with less salt, or plan to add vegetable toppings.',
    chooseB: 'pepperoni is what you actually enjoy; the difference is small, so just keep an eye on the slice count.',
  },
  'cheese-pizza-vs-cheeseburger': {
    summary: 'One slice of cheese pizza (about 229 calories) is much lighter than a cheeseburger (about 488), but two slices of pizza land in the same range as the burger.',
    body: [
      "Per 100 g they are fairly close: cheese pizza has 266 kcal and a cheeseburger 296 kcal. The cheeseburger offers far more protein, 17.9 g per 100 g against 11.4 g, so it keeps you full longer for the calories. Pizza is mostly carbohydrate from the crust.",
      "The real comparison is portion against portion. Few people stop at one slice, and a burger usually comes with fries and a drink, which can double the meal. Ordering the burger without the large side, or capping pizza at two slices with a salad, is how either becomes a reasonable meal.",
      "Both are high in salt. A cheeseburger has about 720 mg of sodium and two slices of pizza about 930 mg, so it is worth going easy on salty sides with either.",
    ],
    chooseA: 'you want a smaller, carb-based meal and can stop at one or two slices.',
    chooseB: 'you want a single, high-protein meal that keeps you full, and you skip or share the fries.',
  },
  'french-fries-vs-onion-rings': {
    summary: 'Onion rings have more calories per bite (352 kcal per 100 g) than French fries (312 kcal), but a typical side of fries is much bigger, so the fries usually cost more calories in total.',
    body: [
      "Weight for weight, onion rings carry more fat because the batter soaks up frying oil: 19.8 g per 100 g against 14.7 g for fries. They also have nearly three times the sodium, 575 mg against 210 mg. Fries have a little more fiber, since they are made from potato rather than mostly batter.",
      "Portion size flips the result. A medium fast-food order of fries weighs around 145 g and comes to about 450 calories, while a cup of onion rings is about 50 g and 176 calories. Whatever you order, the size you pick matters far more than the type. In the UK, a portion of chip-shop chips is often larger again.",
      "For a lighter side, share one portion, order the smallest size, or swap for a side salad or baked potato.",
    ],
    chooseA: 'you are watching salt, or want a side you can share; just order the small size.',
    chooseB: 'you only want a few pieces as a treat: a small portion of onion rings is lower in total calories than a medium fries.',
  },
  'white-bread-vs-whole-wheat-bread': {
    summary: 'Whole wheat bread is the better everyday choice: calories are similar, but it has about 2.6 times the fiber and more protein than white bread.',
    body: [
      "Per 100 g, white bread has 267 kcal and whole wheat 254 kcal, so switching will not save many calories. The difference is fiber, 6 g against 2.3 g per 100 g, and protein, 12.3 g against 9.4 g. A slice of whole wheat has about 2.2 g of fiber, against 0.6 g for white.",
      "That fiber helps you feel full and is linked with better digestive health. Most adults in both the US and UK eat well below the recommended 25 to 30 g of fiber a day, and bread is one of the easiest places to make up the gap.",
      "Read the label when buying. In the US, look for 100% whole wheat as the first ingredient; brown or wheat bread may be mostly white flour with coloring. In the UK, look for wholemeal. Slice size also varies a lot between brands, so check the per-slice calories.",
    ],
    chooseA: 'you prefer the softer texture for occasional use, such as a special sandwich or toast for someone who will not eat brown bread.',
    chooseB: 'it is your everyday loaf and you want more fiber and protein for the same calories.',
  },
  'sourdough-bread-vs-white-bread': {
    summary: 'Sourdough and white bread are very close in calories (272 and 267 kcal per 100 g); sourdough has a little more protein but more salt, so the choice is mostly about taste and slice size.',
    body: [
      "The numbers are similar on almost every line: sourdough has 10.8 g of protein per 100 g against 9.4 g, about the same fiber, and more sodium, 602 mg against 450 mg. Unless it is made with whole grain flour, sourdough is not a high-fiber bread.",
      "Sourdough is made with a natural starter culture and a long fermentation. Some people find it easier to digest, and the tangy, chewy loaf is satisfying in smaller amounts. Be careful with portions, though: bakery sourdough is often cut in thick slices that can be two or three times the 28 g slice used here.",
      "If you want a real nutritional upgrade over white, choose whole grain sourdough, or whole wheat or wholemeal bread, for the extra fiber.",
    ],
    chooseA: 'you enjoy the flavor and texture and keep the slices moderate; choose whole grain sourdough if you can.',
    chooseB: 'you want a cheaper, milder loaf with a little less salt and calories are your only concern.',
  },
  'bagel-vs-english-muffin': {
    summary: 'A whole English muffin (about 130 calories) has less than half the calories of a regular bagel (about 277), making it the lighter breakfast bread by a wide margin.',
    body: [
      "Per 100 g they are not that different: bagel 264 kcal, English muffin 227 kcal. The gap comes from size. A regular bagel weighs about 105 g, while a whole English muffin is about 57 g. Many bakery bagels are bigger again, often 350 calories or more before any topping.",
      "The English muffin also has twice the fiber per 100 g (3.5 g against 1.6 g), especially in whole wheat versions. Both are high in salt for their size.",
      "Toppings decide the final number. Two tablespoons of cream cheese add about 100 calories, and butter adds about 36 per pat. An English muffin with an egg makes a well-balanced breakfast with real protein for under 250 calories.",
    ],
    chooseA: 'you want a dense, filling breakfast and can share it or eat half; choose a smaller or whole grain bagel where possible.',
    chooseB: 'you want a lighter breakfast bread that leaves room for eggs or other protein.',
  },
  'bagel-vs-croissant': {
    summary: 'A regular bagel (about 277 calories) and a medium croissant (about 231) are closer than most people expect, but they are very different foods: the bagel is almost fat-free, while the croissant gets about half its calories from butter.',
    body: [
      "Per 100 g, croissant has 406 kcal and 21 g of fat against the bagel's 264 kcal and 1.3 g of fat. The croissant only comes out lighter per item because it is small and airy, about 57 g against 105 g for the bagel.",
      "The bagel gives you more than twice the protein per item, about 11 g against 5 g, and is more filling. The croissant is richer and less satisfying for its calories, and a lot of its fat is saturated fat from butter.",
      "Toppings change the picture. Croissants are often eaten plain or with jam, while bagels tend to get cream cheese, which adds about 100 calories. Large café croissants can also be much bigger than the medium size used here.",
    ],
    chooseA: 'you want a filling, low-fat breakfast and keep the spread light.',
    chooseB: 'it is an occasional treat and you would rather enjoy one plain croissant than a loaded bagel.',
  },
  'cooked-quinoa-vs-cooked-white-rice': {
    summary: 'Cooked quinoa and white rice have almost the same calories per cup (about 222 and 205), but quinoa has nearly twice the protein and about nine times the fiber.',
    body: [
      "Per 100 g cooked, quinoa has 120 kcal, 4.4 g of protein and 2.8 g of fiber. White rice has 130 kcal, 2.7 g of protein and 0.4 g of fiber. Swapping rice for quinoa will not cut calories much, but it makes the same plate more filling.",
      "Quinoa's protein is also complete, which means it contains all the essential amino acids. That makes it especially useful in vegetarian and vegan meals. White rice is cheaper, milder and easier to digest, which is why it is often recommended when your stomach is upset.",
      "Always compare cooked weights. Both grains roughly triple in weight when cooked, so 100 g of dry rice is about 360 kcal, not 130. Rinse quinoa before cooking to remove its slightly bitter coating.",
    ],
    chooseA: 'you want more protein and fiber from the same portion, especially in a meat-free meal.',
    chooseB: 'you want a cheap, mild side that goes with almost anything, or a gentle food when your stomach is unsettled.',
  },
  'cooked-pasta-vs-cooked-white-rice': {
    summary: 'A cup of cooked pasta (about 221 calories) and a cup of cooked white rice (about 205) are very close, but pasta gives you about twice the protein and more fiber.',
    body: [
      "Per 100 g cooked, pasta has 158 kcal, 5.8 g of protein and 1.8 g of fiber, while white rice has 130 kcal, 2.7 g of protein and 0.4 g of fiber. Neither is a fattening food on its own. What turns them into heavy meals is the portion and what goes on top.",
      "Portions are the main trap. A restaurant pasta dish can hold two to three cups of pasta before the sauce, and cream or cheese sauces can add several hundred calories more. Rice is easier to keep in check as a side, but takeout portions are often generous too.",
      "Always log the cooked weight if you are counting. Dry pasta and rice are around 350 to 370 kcal per 100 g, because they absorb water as they cook. Whole wheat pasta and brown rice add more fiber if you want a more filling plate.",
    ],
    chooseA: 'you want a bit more protein and fiber per bowl, paired with a tomato or vegetable sauce.',
    chooseB: 'you want a plain, slightly lighter side for curries, stir-fries or chili.',
  },
  'naan-vs-pita-bread': {
    summary: 'Naan is the richer bread at 311 kcal per 100 g against 275 for pita, because it is made with yogurt, milk or butter, while pita is almost fat-free.',
    body: [
      "Naan has 7.3 g of fat per 100 g against 1.2 g in pita. It also has more protein (11.1 g against 9.1 g) and more fiber in this data. A small 44 g piece of naan is about 137 calories, and a medium 57 g pita about 157.",
      "Restaurant portions change everything. A single naan from an Indian restaurant or takeaway is often 90 to 120 g, which puts it at roughly 280 to 370 calories, and garlic or butter naan is brushed with extra fat. Pita servings are more predictable, and a whole wheat pita adds fiber.",
      "Both breads are fairly salty, at more than 500 mg of sodium per 100 g, so they add up quickly alongside salty dips and curries.",
    ],
    chooseA: 'you are having a curry and want the traditional pairing; share one between two, or choose plain over butter naan.',
    chooseB: 'you want a lighter, low-fat bread for wraps, falafel or hummus, or a sandwich you can portion easily.',
  },
  'beer-vs-red-wine': {
    summary: 'A 12 oz can of beer (about 155 calories) and a 6 oz glass of red wine (about 153) are almost identical, so the size and number of drinks matter far more than the type.',
    body: [
      "Per 100 g, red wine is denser in calories, 85 kcal against 43 for beer, because it has more alcohol by volume. Most of the calories in both come from alcohol itself, which has about 7 calories per gram, rather than from sugar or carbs.",
      "Pour sizes are the hidden variable. A UK pint of regular beer is about 245 calories, and large wine glasses in bars can hold 250 ml, which is a third of a bottle and over 200 calories. Craft and strong beers above 6% can run much higher.",
      "Alcohol also lowers inhibitions, so snacks eaten while drinking often add more calories than the drinks. The US and UK guidance is the same in spirit: drinking less is better for health, and no amount should be seen as a health benefit.",
    ],
    chooseA: 'you prefer it and stick to regular-strength beer in standard 12 oz servings.',
    chooseB: 'you prefer it and keep to a measured 5 to 6 oz pour rather than a large glass.',
  },
  'beer-vs-light-beer': {
    summary: 'Light beer saves about a third of the calories: about 104 calories per 12 oz against about 155 for regular beer.',
    body: [
      "Per 100 g, light beer has 29 kcal and regular beer 43 kcal. Light beers are usually a little lower in alcohol and much lower in carbohydrate, 1.6 g against 3.6 g per 100 g, which is where most of the saving comes from.",
      "The saving adds up across a night out. Four regular beers come to about 620 calories; four light beers to about 415. Check the container size, though: a 16 oz can or a pint of light beer is roughly 140 to 165 calories, about the same as a smaller regular beer.",
      "Light beer is not a health drink. The alcohol is still there, and the risks from drinking depend mainly on how much alcohol you have. Craft beers, IPAs and stouts can be much higher in calories than the regular lager figures used here.",
    ],
    chooseA: 'you only have one or two, and you would rather enjoy the fuller flavor.',
    chooseB: 'you are tracking calories or carbs and plan to have more than one drink.',
  },
  'cola-vs-diet-cola': {
    summary: 'Diet cola is effectively calorie-free (about 7 calories a can) while regular cola has about 156 calories and 37 g of sugar per can, more than the daily added-sugar limit for many adults.',
    body: [
      "The difference is all sugar. Regular cola has 9.9 g of sugar per 100 g, so a single can goes past the American Heart Association's suggested limit of 36 g a day for men and 25 g for women. The UK recommends no more than 30 g of free sugars a day for adults, and a 330 ml can comes close on its own.",
      "Liquid sugar is easy to overdo because it does not fill you up. Swapping one daily can of regular cola for diet saves around 1,000 calories a week.",
      "Sweeteners in diet cola are approved as safe by US and UK regulators. The WHO advises against relying on sweeteners for long-term weight control, though, so the best long-term swap is water, sparkling water or unsweetened tea. Both colas contain caffeine and are acidic, which is hard on teeth.",
    ],
    chooseA: 'you are cutting sugar and calories but still want a cola taste.',
    chooseB: 'it is an occasional treat, ideally a small can or glass rather than a daily habit.',
  },
  'black-coffee-vs-latte-nonfat-milk': {
    summary: 'Black coffee is practically calorie-free (about 2 calories a cup), while a medium nonfat latte has about 144 calories, almost all from milk.',
    body: [
      "Those latte calories are not empty, though. A 16 oz nonfat latte provides about 14 g of protein and a good share of your daily calcium, so it works as a light breakfast or snack, not just a drink. Its sugar, about 20 g, is lactose from the milk rather than added sugar, as long as you skip the syrup.",
      "Where coffee drinks go wrong is in the extras. Each pump of flavored syrup adds around 20 to 25 calories, and switching to whole milk adds about 70 calories to a medium latte. Black coffee leaves room for whatever else you want to eat.",
      "Both have about the same caffeine for the same number of espresso shots. The FDA suggests up to 400 mg of caffeine a day is generally fine for healthy adults, which is roughly four cups of brewed coffee.",
    ],
    chooseA: 'you want caffeine with no calories, or you drink several cups a day.',
    chooseB: 'you want a drink that doubles as a small protein snack, made with nonfat milk and no syrup.',
  },
  'latte-nonfat-milk-vs-mocha': {
    summary: 'A medium mocha has more than twice the calories of a medium nonfat latte, about 317 against 144, and roughly 46 g of sugar compared with 20 g.',
    body: [
      "Per 100 g, the mocha has 64 kcal against 30 for the nonfat latte. The extra comes from chocolate sauce and usually whole or 2% milk. Much of the mocha's sugar is added sugar from the sauce, while the latte's is mostly lactose from milk.",
      "A medium mocha alone uses up more than the American Heart Association's daily added-sugar limit for women of 25 g, and whipped cream on top adds another 70 to 100 calories. That makes it closer to a dessert than a coffee.",
      "If you love the taste, there are easy middle grounds: order a small, ask for half the chocolate pumps, use nonfat milk and skip the cream. That can bring a mocha down to around 150 to 200 calories.",
    ],
    chooseA: 'it is your everyday coffee and you want protein and calcium without much added sugar.',
    chooseB: 'it is an occasional treat; a small size with fewer pumps keeps it reasonable.',
  },
  'almond-milk-unsweetened-vs-milk': {
    summary: 'Unsweetened almond milk has a quarter of the calories of whole milk (about 37 against 149 per cup), but whole milk has about six times the protein.',
    body: [
      "Per 100 g, unsweetened almond milk has 15 kcal and 0.6 g of protein; whole milk has 61 kcal and 3.2 g of protein. Almond milk is mostly water with a small amount of ground almonds, so it is light but not very nourishing on its own.",
      "Whole milk gives you about 8 g of complete protein per cup, plus natural calcium, and its sugar is lactose, not added sugar. If calories are your concern, skim or semi-skimmed milk keeps the protein with much less fat.",
      "Almond milk is a good choice if you are lactose intolerant, vegan, or just want a light splash for coffee and cereal. Choose a brand fortified with calcium and vitamin D, and check that it says unsweetened, since sweetened versions can have several times the calories.",
    ],
    chooseA: 'you want the lowest-calorie option for coffee, cereal or smoothies, or you avoid dairy.',
    chooseB: 'you want real protein and calcium in your glass, especially for growing kids or after training.',
  },
  'almond-milk-unsweetened-vs-oat-milk': {
    summary: 'Unsweetened almond milk is the lighter plant milk, at about 37 calories per cup against about 110 for oat milk, but oat milk is creamier and froths better.',
    body: [
      "Per 100 g, oat milk has 45 kcal and 5.4 g of carbohydrate, while unsweetened almond milk has 15 kcal and only 0.3 g. Oat milk's carbs come from the oats themselves; many brands also add oil for creaminess. Neither has much protein, under 2 g per cup.",
      "Oat milk's body is why baristas prefer it for lattes and why it tastes closer to dairy in tea. Almond milk can split in hot drinks and tastes thinner, but if you drink a lot of it, the calorie saving is real.",
      "Read the carton. Barista blends of oat milk are often richer, and some plant milks are sweetened. Look for calcium and vitamin D fortification in both, since they are not naturally rich in either.",
    ],
    chooseA: 'you want the fewest calories and carbs, for cereal, smoothies or large glasses.',
    chooseB: 'you want a creamy plant milk for coffee and tea, and the extra 70 calories per cup fit your day.',
  },
  'oat-milk-vs-soy-milk': {
    summary: 'Soy milk is the stronger nutritional choice, with about 9 g of protein per cup against under 2 g in oat milk, and fewer calories too (about 93 against 110).',
    body: [
      "Per 100 g, soy milk has 38 kcal and 3.6 g of protein, close to dairy milk, while oat milk has 45 kcal and 0.7 g of protein. Soy milk is also much lower in carbohydrate, 1.3 g against 5.4 g per 100 g, which helps if you track carbs.",
      "Soy is the only common plant milk that comes close to cow's milk in protein, which is why dietitians often suggest it for vegans and for children who cannot have dairy. Oat milk wins on taste and texture for many people: it is naturally slightly sweet and foams well for coffee.",
      "Oat milk is a good option for people with a soy or nut allergy. As with any plant milk, choose an unsweetened version that is fortified with calcium and vitamin D.",
    ],
    chooseA: 'you want the creamiest taste in coffee, or need to avoid soy.',
    chooseB: 'you want a dairy-free milk that still gives you real protein.',
  },
  'greek-yogurt-plain-nonfat-vs-nonfat-skim-yogurt': {
    summary: 'Plain nonfat Greek yogurt has almost twice the protein of regular nonfat yogurt per 100 g (10.3 g against 5.7 g) and less than half the sugar, for about the same calories.',
    body: [
      "Greek yogurt is strained to remove much of the liquid whey. That concentrates the protein and removes some of the milk sugar, which is why it is thicker and tangier. Per 100 g, Greek has 59 kcal and 3.3 g of sugar; regular nonfat has 56 kcal and 7.7 g of sugar.",
      "A 150 g pot of Greek yogurt gives about 15 g of protein for under 90 calories, which makes it one of the best high-protein breakfasts or snacks around. It also works as a sour cream or mayo swap in dips and dressings.",
      "Regular yogurt is runnier, milder and often cheaper, and it is good for smoothies and marinades. Check labels on both: flavored and fruit-on-the-bottom versions can add 10 to 20 g of sugar per pot.",
    ],
    chooseA: 'you want the most protein per spoonful, a thick texture, or a lighter swap for sour cream.',
    chooseB: 'you prefer a milder, pourable yogurt for smoothies and cooking, or want the cheaper option.',
  },
  'cottage-cheese-vs-greek-yogurt-plain-nonfat': {
    summary: 'Both are high-protein staples with almost the same protein per 100 g (11 g and 10.3 g), but nonfat Greek yogurt is lighter at 59 kcal against 82, and has about a ninth of the salt.',
    body: [
      "Cottage cheese has 321 mg of sodium per 100 g against just 36 mg in Greek yogurt, so a full cup of cottage cheese gives you about 670 mg of sodium. If you are watching salt, that is the biggest difference between them. Low-sodium cottage cheese exists but can be hard to find.",
      "A cup of cottage cheese has about 23 g of protein for 172 calories, which is why it is popular with people who lift weights, and its protein is mostly casein, which digests slowly. That makes it a common choice for an evening snack.",
      "Greek yogurt is more flexible in cooking. It stands in for sour cream, mayo or cream in dips, dressings and sauces, and pairs naturally with fruit at breakfast. Cottage cheese works well on toast, in savory bowls, or blended smooth into pancakes and pasta sauces.",
    ],
    chooseA: 'you want a slow-digesting, high-protein snack and salt is not a concern, or you enjoy it on toast or with fruit.',
    chooseB: 'you want high protein with fewer calories and very little salt, or a swap for sour cream.',
  },
  'butter-vs-margarine': {
    summary: 'Margarine is a little lower in calories than butter (579 against 717 kcal per 100 g), but both are dense fats, so a pat of either is about 30 to 36 calories and portion size matters most.',
    body: [
      "Margarine in this data has 65 g of fat per 100 g against 81 g for butter, because many spreads contain more water. Tub spreads and light spreads can be much lower again, so the label of the product you buy matters more than the general category.",
      "The more important difference is the kind of fat. Butter is high in saturated fat, which US and UK guidelines both advise limiting. Most modern soft margarines and spreads are made from vegetable oils with less saturated fat. Older stick margarines contained trans fats, but partially hydrogenated oils were removed from the US food supply in 2018 and are rare in UK spreads.",
      "Both are salty, so unsalted versions are worth considering. For flavor in baking, butter is hard to beat; for spreading on toast every day, a soft vegetable-oil spread is the better habit.",
    ],
    chooseA: 'flavor matters, as in baking or an occasional treat, and you use it sparingly.',
    chooseB: 'you want an everyday spread with less saturated fat; pick a soft tub made from vegetable oils.',
  },
  'butter-vs-olive-oil': {
    summary: 'Tablespoon for tablespoon, olive oil actually has more calories than butter (about 126 against 100), but its fat is mostly the unsaturated kind that guidelines encourage.',
    body: [
      "Olive oil is pure fat, 100 g per 100 g, while butter is about 81% fat with the rest mostly water. That is why a tablespoon of oil carries more calories. A drizzle of olive oil is still fattening if you are free with the bottle, so measuring matters if you are tracking calories.",
      "The health difference is in the type of fat. Butter is rich in saturated fat, which US and UK guidelines recommend limiting. Olive oil is mostly monounsaturated fat and is a cornerstone of the Mediterranean diet, which is linked with better heart health.",
      "For everyday cooking, salad dressings and roasting vegetables, olive oil is the better default. Butter still has a place for flavor in baking and sauces. You can also use a mix: a little butter for taste with olive oil for the bulk.",
    ],
    chooseA: 'you are baking or want its particular flavor, and you use a small amount.',
    chooseB: 'it is your everyday cooking fat or dressing; just measure it, since it is the more calorie-dense of the two.',
  },
  'grilled-chicken-breast-vs-grilled-salmon': {
    summary: 'Grilled chicken breast is the leaner protein, at about 199 calories and 33.5 g of protein per 4 oz, while grilled salmon has about 293 calories and 29 g of protein, plus valuable omega-3 fats.',
    body: [
      "Per 100 g, salmon has 16.5 g of fat against 5.5 g for chicken breast. Most of salmon's fat is unsaturated, including the long-chain omega-3s that are hard to get from other foods. The US Dietary Guidelines suggest about 8 oz of seafood a week, and the NHS recommends two portions of fish a week, one of them oily, such as salmon.",
      "Chicken breast wins on protein per calorie, which is why it is a staple for people cutting weight or building muscle. It is also cheaper and milder, so it takes any seasoning.",
      "The best answer for most people is to eat both across the week. Restaurant versions vary a lot, so watch glazes, butter and oil: a teriyaki or honey glaze can add 100 calories or more.",
    ],
    chooseA: 'you want the most protein for the fewest calories, or a cheap, versatile everyday option.',
    chooseB: 'you want omega-3 fats in your diet, and it is one of your oily-fish meals for the week.',
  },
  'chicken-breast-vs-chicken-thigh': {
    summary: 'Skinless chicken breast and thigh are surprisingly close raw (120 and 121 kcal per 100 g), but breast has more protein, 22.5 g against 19.7 g, and less fat.',
    body: [
      "These figures are for raw, skinless meat. Thigh has 4.1 g of fat per 100 g against 2.6 g for breast, which is why it stays juicier when cooked and is harder to dry out. Per 4 oz raw, both come to about 136 to 137 calories.",
      "The skin is what really changes the numbers. Skin-on thighs, and fried or roasted pieces with skin, can carry roughly twice the calories of skinless meat. If you buy bone-in, skin-on thighs, removing the skin after cooking keeps most of the flavor and saves a lot of fat.",
      "Thighs are usually cheaper and suit slow cooking, curries, stews and the grill. Breasts are better for quick, lean meals and are easier to portion. Remember to log raw or cooked weight consistently, since meat loses about a quarter of its weight when cooked.",
    ],
    chooseA: 'you want the leanest cut and the most protein per calorie.',
    chooseB: 'you want juicier, cheaper meat for slow cooking, and you remove the skin.',
  },
  'salmon-vs-tuna': {
    summary: 'Tuna is the leaner fish, at 109 kcal and 0.5 g of fat per 100 g raw, while farmed salmon has 208 kcal and 13.4 g of fat, most of it heart-healthy omega-3 and other unsaturated fats.',
    body: [
      "Tuna also has a little more protein, 24.4 g against 20.4 g per 100 g, so it is a favorite for high-protein, low-calorie meals. Canned tuna in water is one of the cheapest protein sources in any supermarket.",
      "Salmon's extra calories come with something tuna mostly lacks: long-chain omega-3 fats. That is why salmon counts as an oily fish in UK guidance, while canned tuna does not.",
      "Mercury is the other consideration. Large tuna species like yellowfin and albacore build up more mercury than salmon. The FDA and NHS both give limits on tuna for pregnant people and young children, while salmon sits in the lowest-mercury group. For most adults, mixing both across the week works well.",
    ],
    chooseA: 'you want omega-3 fats, or are choosing fish for pregnancy or young children.',
    chooseB: 'you want the most protein for the fewest calories, such as in salads, sandwiches or meal prep.',
  },
  'dry-tofu-vs-grilled-chicken-breast': {
    summary: 'Grilled chicken breast has more protein per calorie (29.6 g per 100 g at 176 kcal), but firm tofu still gives a solid 17.3 g of protein at 144 kcal, plus fiber, which chicken lacks.',
    body: [
      "Per 100 calories, chicken breast gives about 17 g of protein and firm tofu about 12 g. Tofu has more fat, 8.7 g against 5.5 g per 100 g, but it is mostly unsaturated, and tofu has no cholesterol.",
      "Tofu is one of the best protein sources for vegetarians and vegans. Its soy protein is complete, and tofu set with calcium sulfate is a useful calcium source, so check the label. Pressing firm tofu before cooking helps it crisp up and soak up marinades.",
      "Swapping some meat meals for tofu each week is an easy way to eat more plants without losing much protein. If you need maximum protein with the fewest calories, chicken still comes out ahead.",
    ],
    chooseA: 'you want a plant-based protein, or a cheaper, versatile option for stir-fries and curries.',
    chooseB: 'you want the most protein for the fewest calories, especially when cutting weight.',
  },
  'almond-vs-walnut': {
    summary: 'Almonds are a little lower in calories than walnuts (about 162 against 183 per ounce), with more protein and nearly twice the fiber, while walnuts are the richest common nut in plant omega-3.',
    body: [
      "Per 100 g, almonds have 21.2 g of protein and 12.5 g of fiber, against 15.2 g and 6.7 g for walnuts. Walnuts are higher in fat, 65.2 g against 49.9 g, and much of that is ALA, a plant omega-3 fat that almonds lack.",
      "Both are healthy choices, and the real issue with nuts is portion size. A one-ounce serving is only about 23 almonds or 14 walnut halves. Eating from the bag can easily turn a 160-calorie snack into 500 calories, so pre-portioning helps.",
      "Almonds are crunchier and more filling as a snack. Walnuts are softer and suit porridge, salads and baking. Choose raw or dry-roasted nuts, since salted or honey-roasted ones add sodium or sugar.",
    ],
    chooseA: 'you want the most protein and fiber per handful, or a filling snack to carry with you.',
    chooseB: 'you want plant omega-3 fats, or a nut for oatmeal, salads or baking.',
  },
  'almond-vs-cashews': {
    summary: 'Ounce for ounce, almonds and cashews are close in calories (about 162 and 157), but almonds have nearly four times the fiber and a little more protein.',
    body: [
      "Per 100 g, almonds have 12.5 g of fiber against 3.3 g for cashews, and 21.2 g of protein against 18.2 g. Cashews are higher in carbohydrate, 30.2 g against 21.6 g, which is why they taste softer and slightly sweet.",
      "That fiber gap makes almonds the more filling snack for the calories. Cashews are easier to overeat because they are soft and buttery, so measure the portion: an ounce is roughly 18 cashews.",
      "Cashews have a big role in cooking, though. Blended soaked cashews make creamy dairy-free sauces and desserts, and they suit stir-fries and curries. As with any nut, unsalted versions are best for everyday eating.",
    ],
    chooseA: 'you want a filling, high-fiber snack that keeps hunger away between meals.',
    chooseB: 'you want a creamy nut for cooking, curries or dairy-free sauces, and you keep an eye on the portion.',
  },
  'butter-almond-vs-butter-peanut': {
    summary: 'Almond butter and peanut butter are almost identical in calories (about 172 and 167 per ounce) and protein, but almond butter has twice the fiber and less sugar, while peanut butter costs much less.',
    body: [
      "Per 100 g, almond butter has 10.3 g of fiber and 4.4 g of sugar; peanut butter has 5 g of fiber and 10.5 g of sugar. Some of that sugar is added in many popular peanut butter brands, along with salt and palm oil, so the ingredients list matters more than the type of nut.",
      "The best jar of either contains just nuts, maybe with a little salt. Oil separation on top is normal and a sign it has not been blended with extra fats. Stir it back in.",
      "The biggest risk with both is portion size. A level tablespoon is about 95 calories, but a heaped spoon can be twice that. If you are tracking, weigh it once to see what your usual spoonful actually is.",
    ],
    chooseA: 'you want a bit more fiber and less sugar, and the higher price does not bother you.',
    chooseB: 'you want the same protein for a fraction of the cost; pick a jar that is just peanuts and salt.',
  },
  'egg-vs-greek-yogurt-plain-nonfat': {
    summary: 'For breakfast protein, a 150 g pot of nonfat Greek yogurt (about 89 calories, 15.5 g of protein) beats two large eggs (about 144 calories, 12.6 g of protein) on protein per calorie.',
    body: [
      "Per 100 g, egg has 143 kcal and 12.6 g of protein; nonfat Greek yogurt has 59 kcal and 10.3 g. Eggs have 9.5 g of fat per 100 g, which makes them more satisfying for some people. Eggs also bring vitamin D, vitamin B12 and choline, while Greek yogurt brings calcium.",
      "Eggs get cooked in butter or oil more often than not, which can add 50 to 100 calories, while yogurt is ready to eat. For most healthy people, an egg a day fits within current heart-health guidance.",
      "You do not have to choose. A pot of Greek yogurt with fruit, or two eggs on whole grain toast, are both strong breakfasts with more than 15 g of protein. The yogurt is quicker on busy mornings; eggs make a warmer, more savory meal.",
    ],
    chooseA: 'you want a warm, savory breakfast with vitamin D and choline, cooked with little added fat.',
    chooseB: 'you want the most protein for the fewest calories in a no-cook breakfast or snack.',
  },
  'potato-vs-sweet-potato': {
    summary: 'Potatoes and sweet potatoes are close in calories (77 and 86 kcal per 100 g); sweet potatoes have a little more fiber and lots of vitamin A, while white potatoes have less sugar.',
    body: [
      "Per 100 g, sweet potato has 3 g of fiber and 4.2 g of sugar; white potato has 2.1 g of fiber and 0.8 g of sugar. Sweet potatoes are one of the richest sources of beta-carotene, which the body turns into vitamin A. White potatoes are a good source of potassium and vitamin C, especially with the skin on.",
      "The cooking method matters far more than the type. A plain baked potato of either kind is a filling, low-fat food. Fries, chips, roast potatoes in oil, or a baked potato loaded with butter, cheese and sour cream can triple the calories.",
      "One quirk of UK guidance: the NHS counts sweet potatoes towards your five a day, but not regular potatoes, which are treated as a starchy food like bread or rice.",
    ],
    chooseA: 'you want a cheap, filling, low-sugar side, baked or boiled with the skin on.',
    chooseB: 'you want more fiber and vitamin A, or a naturally sweet side that roasts well.',
  },
  'broccoli-vs-cauliflower': {
    summary: 'Both are very low in calories, but broccoli is the more nutrient-dense of the two, with more protein and fiber per 100 g, while cauliflower is milder and lower in calories (25 against 34 kcal).',
    body: [
      "Per 100 g, broccoli has 2.8 g of protein and 2.6 g of fiber, against 1.9 g and 2 g for cauliflower. Broccoli is also much richer in vitamin C and vitamin K. A cup of either comes to about 30 calories, so you can eat as much as you like.",
      "Cauliflower's strength is versatility. Riced cauliflower is a popular low-carb swap for rice: a cup is under 30 calories, compared with about 205 for cooked white rice. It also makes mash, pizza bases and roasted 'steaks', and takes on the flavor of spices well.",
      "Both are best steamed or roasted rather than boiled for a long time, which loses some vitamins into the water. Cheese sauce is the classic trap: cauliflower cheese can carry far more calories from the sauce than from the vegetable.",
    ],
    chooseA: 'you want the most vitamins, fiber and protein from your vegetable portion.',
    chooseB: 'you want a mild vegetable to replace rice, potatoes or pizza dough in low-carb meals.',
  },
  'kale-vs-spinach': {
    summary: 'Both are excellent leafy greens with almost no calories per serving; kale has nearly twice the fiber per 100 g (4.1 g against 2.2 g), while spinach is lighter (23 against 43 kcal) and easier to eat in large amounts.',
    body: [
      "A cup of raw kale is about 11 calories and a cup of raw spinach about 7, so the calorie difference does not matter in practice. Both shrink a lot when cooked, so a cooked cup holds many times more leaves than a raw one.",
      "Spinach is famous for iron and calcium, but it also contains oxalates, which reduce how much of those minerals your body absorbs. The calcium in kale is better absorbed. Spinach wilts in seconds and has a mild taste, so it disappears into pasta, curries, eggs and smoothies.",
      "Kale is tougher. Massaging raw kale with a little oil and lemon softens it for salads, and it makes good crisps in the oven. Both are rich in vitamin K. If you take a blood thinner such as warfarin, keep your intake of leafy greens steady and talk to your doctor before big changes.",
    ],
    chooseA: 'you want sturdy leaves for salads or crisps, with more fiber and better-absorbed calcium.',
    chooseB: 'you want a mild green to add to almost any cooked dish or smoothie without changing the taste.',
  },
  'dark-chocolate-vs-milk-chocolate': {
    summary: 'Dark and milk chocolate are close in calories (550 and 535 kcal per 100 g), but dark chocolate has twice the fiber and less sugar, especially at higher cocoa percentages.',
    body: [
      "The dark chocolate in this data is a sweeter, lower-cocoa type, with 46.1 g of sugar per 100 g against 51.5 g for milk chocolate. Dark chocolate with 70% cocoa or more usually has much less sugar again, so the percentage on the wrapper matters. Milk chocolate has a little more protein and calcium, from the milk.",
      "Dark chocolate's cocoa solids contain flavanols, plant compounds being studied for heart health. That does not make chocolate a health food: either kind is calorie-dense, and a whole 45 g bar is about 250 calories.",
      "Many people find that darker chocolate is easier to stop eating, because the strong, bitter flavor satisfies in smaller amounts. Two squares, about 20 g, is around 110 calories, which fits comfortably into most days.",
    ],
    chooseA: 'you want more cocoa and fiber and less sugar; choose 70% cocoa or higher if you enjoy it.',
    chooseB: 'it is a small treat and you prefer the sweeter, creamier taste.',
  },
  'frozen-yogurt-vs-vanilla-ice-cream': {
    summary: 'Frozen yogurt is lighter than vanilla ice cream weight for weight (127 against 207 kcal per 100 g) with about a third of the fat, but it has almost as much sugar.',
    body: [
      "Per 100 g, frozen yogurt has 3.6 g of fat and 19.9 g of sugar; vanilla ice cream has 11 g of fat and 21.2 g of sugar. So frozen yogurt saves fat and calories, but not much sugar, and it is still a dessert.",
      "The bigger trap is portion size. Self-serve frozen yogurt shops sell by weight, and a medium cup can easily hold 300 g or more, about 400 calories before toppings. A small 75 g pot of ice cream, at about 155 calories, can end up lighter than a large frozen yogurt.",
      "Toppings add up fast. Candy, cookie pieces and sauces can double the calories. Fresh fruit and a few nuts are the lighter choice.",
    ],
    chooseA: 'you want a lighter, tangier dessert, served in a small cup with fruit on top.',
    chooseB: 'you want the richer taste and stick to a single scoop or small pot.',
  },
  'honey-vs-maple-syrup': {
    summary: 'Maple syrup is slightly lower in calories and sugar than honey: about 52 calories per tablespoon against about 64, and 60.5 g of sugar per 100 g against 82.1 g.',
    body: [
      "Honey is denser, so a tablespoon weighs more and carries more calories. Both count as free or added sugars under US and UK guidance, in the same way as table sugar, so neither is a health food despite the natural image.",
      "Pure maple syrup contains small amounts of minerals such as manganese, and honey contains traces of antioxidants, but the amounts are too small to matter at normal servings. Check that maple syrup says 100% pure: pancake syrups are often flavored corn syrup.",
      "Honey should never be given to babies under 12 months, because of the risk of infant botulism. Maple syrup is a good vegan alternative, since honey is an animal product.",
    ],
    chooseA: 'you like its flavor in tea, yogurt or dressings, and use a measured teaspoon or two.',
    chooseB: 'you want the slightly lighter option for pancakes, porridge or baking, or need a vegan sweetener.',
  },
  'honey-vs-white-sugar': {
    summary: 'Honey has fewer calories per gram than sugar (304 against 401 kcal per 100 g) because it contains water, but it is denser, so a teaspoon of honey (about 21 calories) has more than a teaspoon of sugar (about 17).',
    body: [
      "Honey is about 82% sugar and 17% water, while white sugar is almost pure sugar. The sugars in honey are mainly fructose and glucose, the same building blocks as table sugar. US and UK guidance treats both as added or free sugars that most people should cut back on.",
      "Honey is sweeter than sugar because of its fructose, so some people find they use less of it. Its trace antioxidants and minerals are real but too small to make a nutritional difference at normal servings.",
      "If you are cutting sugar, the useful move is reducing the total amount, not switching between the two. Halving the sugar in tea or coffee over a few weeks is easier than most people expect. Honey should not be given to babies under one year old.",
    ],
    chooseA: 'you prefer the flavor, and its extra sweetness helps you use a little less.',
    chooseB: 'you need precise measuring for baking, or want the cheapest neutral sweetener; just use as little as you can.',
  },
  'chicken-biryani-vs-chicken-curry': {
    summary: 'Per 100 g, chicken biryani (104 kcal) and chicken curry (107 kcal) are nearly the same, but biryani already includes rice, while curry usually comes with rice or naan on the side.',
    body: [
      "A cup of biryani is about 204 calories. A cup of chicken curry is about 257 calories, and adding a cup of cooked rice brings it to around 460, or more with naan. So for a full plate, biryani is often the lighter meal.",
      "Curry has more fat (6.5 g against 2.4 g per 100 g) because of the oil, ghee, cream or coconut in the sauce, and more than twice the salt. Creamy curries like korma and tikka masala are heavier than tomato-based ones like a homemade chicken curry or jalfrezi.",
      "Restaurant and takeaway versions can be much richer than home cooking, often with extra ghee on top. Ordering one curry and rice to share plus a vegetable side is an easy way to enjoy an Indian meal without overdoing it.",
    ],
    chooseA: 'you want a single dish with the rice included and a lighter overall plate.',
    chooseB: 'you want more sauce and flexibility; pick a tomato-based curry and control the rice portion.',
  },
  'paratha-vs-roti-chapati': {
    summary: 'A plain roti (chapati) is the lighter everyday bread at about 120 calories, while a paratha is about 228 calories because it is layered and cooked with ghee or oil.',
    body: [
      "Per 100 g, paratha has 326 kcal and 13.2 g of fat; roti has 299 kcal and 9.2 g of fat. The per-piece difference is larger because a paratha is also heavier, about 70 g against 40 g for a medium roti. Both are made from whole wheat flour and are good sources of fiber, at around 9.5 g per 100 g.",
      "A roti made without ghee brushed on top is lighter still. Stuffed parathas, such as aloo or paneer paratha, add filling and often more fat, and can reach 300 calories or more each.",
      "If you are watching calories, rotis are the better daily bread with dal, sabzi and curries, and parathas work well as a weekend breakfast with yogurt.",
    ],
    chooseA: 'it is an occasional breakfast treat; a plain paratha with yogurt keeps it balanced.',
    chooseB: 'it is your everyday bread with curries and dal, ideally without extra ghee.',
  },
  'dosa-vs-idli': {
    summary: 'Idli is the lighter South Indian breakfast: steamed and almost fat-free at about 49 calories per piece, while a medium plain dosa is about 168 calories because it is cooked with oil.',
    body: [
      "Both are made from the same fermented rice and lentil batter, so they share a similar base. The difference is cooking: idlis are steamed, with 0.4 g of fat per 100 g, while dosas are spread thin and crisped on a griddle with oil, giving 4.1 g of fat per 100 g.",
      "A typical serving of three idlis comes to about 150 calories. A masala dosa, filled with spiced potato, can easily reach 300 to 400 calories, and restaurant dosas are often brushed with extra ghee.",
      "The sides matter as much as the main. Sambar, a lentil and vegetable stew, adds protein and fiber for few calories. Coconut chutney is tasty but rich, so a spoonful goes a long way.",
    ],
    chooseA: 'you want a crisp, satisfying breakfast; plain dosa with sambar is lighter than masala dosa.',
    chooseB: 'you want a light, low-fat breakfast that is easy on the stomach.',
  },
  'pakora-vs-samosa': {
    summary: 'In this data, samosa is far more calorie-dense than pakora (310 against 125 kcal per 100 g), because its pastry shell soaks up oil when fried.',
    body: [
      "Samosas have 17.5 g of fat per 100 g against 4.8 g for pakoras. The pakora figures here reflect a lighter, vegetable-heavy recipe, and restaurant pakoras fried in a lot of oil can be much higher, so treat them as the lower end.",
      "Size is the other big factor. A small 25 g samosa is about 78 calories, but a standard takeaway or bakery samosa is often 80 to 100 g, roughly 250 to 310 calories each. Pakoras are small, so the count adds up quietly: a plate of eight to ten is a meal in itself.",
      "Both are fried snacks to enjoy now and then. Baked or air-fried versions cut the fat a lot, and a mint-yogurt chutney is lighter than sweet tamarind sauce.",
    ],
    chooseA: 'you want a lighter fried snack and keep track of how many you eat.',
    chooseB: 'you want one satisfying snack; choose a small one and share if it is a big takeaway samosa.',
  },
};
