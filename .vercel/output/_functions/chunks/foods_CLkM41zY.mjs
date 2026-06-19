const localFoods = [
  // BREAKFAST
  {
    id: "local_001",
    slug: "scrambled-eggs",
    name: "Scrambled eggs",
    displayName: "Scrambled Eggs",
    aliases: ["eggs scrambled", "scramble eggs", "egg scramble"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "large egg",
    defaultQuantity: 2,
    servingSizes: [
      { unit: "large egg", label: "1 large egg (yield)", grams: 61 },
      { unit: "cup", label: "1 cup", grams: 220 }
    ],
    nutrientsPer100g: { calories: 148, protein: 10, carbohydrates: 1.5, fat: 11, fiber: 0, sugar: 1.1, sodium: 171 }
  },
  {
    id: "local_002",
    slug: "fried-egg",
    name: "Fried egg",
    displayName: "Fried Egg",
    aliases: ["eggs fried", "sunny side up", "over easy"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "large egg",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "large egg", label: "1 large egg", grams: 46 }
    ],
    nutrientsPer100g: { calories: 196, protein: 13.6, carbohydrates: 0.8, fat: 14.8, fiber: 0, sugar: 0.4, sodium: 207 }
  },
  {
    id: "local_003",
    slug: "boiled-egg",
    name: "Boiled egg",
    displayName: "Hard Boiled Egg",
    aliases: ["hard boiled egg", "eggs boiled"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "large egg",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "large egg", label: "1 large egg", grams: 50 }
    ],
    nutrientsPer100g: { calories: 155, protein: 12.6, carbohydrates: 1.1, fat: 10.6, fiber: 0, sugar: 1.1, sodium: 124 }
  },
  {
    id: "local_004",
    slug: "bacon",
    name: "Bacon",
    displayName: "Pork Bacon, Cooked",
    aliases: ["pork bacon", "cooked bacon", "bacon strips"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "slice",
    defaultQuantity: 2,
    servingSizes: [
      { unit: "slice", label: "1 medium slice (cooked)", grams: 8 }
    ],
    nutrientsPer100g: { calories: 541, protein: 37, carbohydrates: 1.4, fat: 42, fiber: 0, sugar: 0, sodium: 1717 }
  },
  {
    id: "local_005",
    slug: "turkey-bacon",
    name: "Turkey bacon",
    displayName: "Turkey Bacon, Cooked",
    aliases: ["turkey strips"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "slice",
    defaultQuantity: 2,
    servingSizes: [
      { unit: "slice", label: "1 slice (cooked)", grams: 14 }
    ],
    nutrientsPer100g: { calories: 382, protein: 29.8, carbohydrates: 3.1, fat: 27.9, fiber: 0, sugar: 1, sodium: 1090 }
  },
  {
    id: "local_006",
    slug: "oatmeal-cooked",
    name: "Oatmeal cooked",
    displayName: "Oatmeal (Cooked in Water)",
    aliases: ["cooked oats", "porridge", "oatmeal"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 234 }
    ],
    nutrientsPer100g: { calories: 71, protein: 2.5, carbohydrates: 12, fat: 1.5, fiber: 1.7, sugar: 0.3, sodium: 49 }
  },
  {
    id: "local_007",
    slug: "rolled-oats-dry",
    name: "Rolled oats dry",
    displayName: "Rolled Oats (Dry)",
    aliases: ["dry oats", "old fashioned oats"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 0.5,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 81 }
    ],
    nutrientsPer100g: { calories: 379, protein: 13.1, carbohydrates: 67.7, fat: 6.5, fiber: 10.1, sugar: 0.9, sodium: 2 }
  },
  {
    id: "local_008",
    slug: "greek-yogurt-plain-nonfat",
    name: "Greek yogurt plain nonfat",
    displayName: "Plain Nonfat Greek Yogurt",
    aliases: ["greek yoghurt", "nonfat greek yogurt", "plain greek yogurt"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "container", label: "1 single-serve container (5.3 oz)", grams: 150 },
      { unit: "cup", label: "1 cup", grams: 245 }
    ],
    nutrientsPer100g: { calories: 59, protein: 10.3, carbohydrates: 3.6, fat: 0.4, fiber: 0, sugar: 3.2, sodium: 36 }
  },
  {
    id: "local_009",
    slug: "plain-yogurt",
    name: "Plain yogurt",
    displayName: "Plain Yogurt (Whole Milk)",
    aliases: ["regular yogurt", "whole milk yogurt"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 245 },
      { unit: "container", label: "1 container (8 oz)", grams: 227 }
    ],
    nutrientsPer100g: { calories: 61, protein: 3.5, carbohydrates: 4.7, fat: 3.3, fiber: 0, sugar: 4.7, sodium: 46 }
  },
  {
    id: "local_010",
    slug: "granola",
    name: "Granola",
    displayName: "Granola Cereal",
    aliases: ["crunchy granola"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 0.5,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 122 }
    ],
    nutrientsPer100g: { calories: 471, protein: 10, carbohydrates: 64, fat: 20, fiber: 5, sugar: 20, sodium: 290 }
  },
  {
    id: "local_011",
    slug: "corn-flakes-cereal",
    name: "Corn flakes cereal",
    displayName: "Corn Flakes",
    aliases: ["cornflakes"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 28 }
    ],
    nutrientsPer100g: { calories: 357, protein: 7.5, carbohydrates: 84, fat: 0.4, fiber: 3.3, sugar: 10, sodium: 729 }
  },
  {
    id: "local_012",
    slug: "oat-cereal",
    name: "Oat cereal",
    displayName: "Toasted Oat Cereal",
    aliases: ["cheerios", "oat cereal"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 28 }
    ],
    nutrientsPer100g: { calories: 371, protein: 12.1, carbohydrates: 74.4, fat: 6.3, fiber: 9.4, sugar: 4.2, sodium: 531 }
  },
  {
    id: "local_013",
    slug: "whole-milk",
    name: "Whole milk",
    displayName: "Whole Milk (3.25%)",
    aliases: ["milk", "regular milk", "full fat milk"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 244 }
    ],
    nutrientsPer100g: { calories: 61, protein: 3.2, carbohydrates: 4.8, fat: 3.3, fiber: 0, sugar: 5.1, sodium: 43 }
  },
  {
    id: "local_014",
    slug: "two-percent-milk",
    name: "2 percent milk",
    displayName: "2% Reduced Fat Milk",
    aliases: ["reduced fat milk"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 244 }
    ],
    nutrientsPer100g: { calories: 50, protein: 3.3, carbohydrates: 4.8, fat: 2, fiber: 0, sugar: 5.1, sodium: 43 }
  },
  {
    id: "local_015",
    slug: "skim-milk",
    name: "Skim milk",
    displayName: "Skim Milk (Nonfat)",
    aliases: ["nonfat milk", "fat free milk"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 245 }
    ],
    nutrientsPer100g: { calories: 34, protein: 3.4, carbohydrates: 5, fat: 0.1, fiber: 0, sugar: 5.1, sodium: 44 }
  },
  {
    id: "local_016",
    slug: "almond-milk-unsweetened",
    name: "Almond milk unsweetened",
    displayName: "Unsweetened Almond Milk",
    aliases: ["almond milk"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 240 }
    ],
    nutrientsPer100g: { calories: 15, protein: 0.4, carbohydrates: 0.3, fat: 1.2, fiber: 0, sugar: 0, sodium: 73 }
  },
  {
    id: "local_017",
    slug: "orange-juice",
    name: "Orange juice",
    displayName: "Orange Juice (100%)",
    aliases: ["oj"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 248 }
    ],
    nutrientsPer100g: { calories: 45, protein: 0.7, carbohydrates: 10.4, fat: 0.2, fiber: 0.2, sugar: 8.4, sodium: 1 }
  },
  {
    id: "local_018",
    slug: "black-coffee",
    name: "Black coffee",
    displayName: "Brewed Black Coffee",
    aliases: ["coffee", "brewed coffee"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup (8 fl oz)", grams: 237 }
    ],
    nutrientsPer100g: { calories: 1, protein: 0.1, carbohydrates: 0, fat: 0, fiber: 0, sugar: 0, sodium: 2 }
  },
  {
    id: "local_019",
    slug: "latte",
    name: "Latte",
    displayName: "Caffe Latte",
    aliases: ["coffee latte", "espresso with milk"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup (8 fl oz)", grams: 240 },
      { unit: "grande", label: "1 grande (16 fl oz)", grams: 473 }
    ],
    nutrientsPer100g: { calories: 40, protein: 2.3, carbohydrates: 4.1, fat: 1.5, fiber: 0, sugar: 4, sodium: 44 }
  },
  {
    id: "local_020",
    slug: "whole-wheat-toast",
    name: "Whole wheat toast",
    displayName: "Whole Wheat Toast",
    aliases: ["wheat toast", "whole grain toast"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "slice",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "slice", label: "1 slice", grams: 22 }
    ],
    nutrientsPer100g: { calories: 313, protein: 12.9, carbohydrates: 55.7, fat: 4.3, fiber: 7, sugar: 5.6, sodium: 601 }
  },
  {
    id: "local_021",
    slug: "white-toast",
    name: "White toast",
    displayName: "White Bread Toast",
    aliases: ["white bread", "toast"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "slice",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "slice", label: "1 slice", grams: 22 }
    ],
    nutrientsPer100g: { calories: 315, protein: 9.3, carbohydrates: 57, fat: 4.1, fiber: 2.5, sugar: 5, sodium: 555 }
  },
  {
    id: "local_022",
    slug: "bagel",
    name: "Bagel",
    displayName: "Plain Bagel",
    aliases: ["plain bagel"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "piece", label: "1 regular bagel", grams: 105 }
    ],
    nutrientsPer100g: { calories: 275, protein: 10.4, carbohydrates: 53, fat: 1.7, fiber: 2.2, sugar: 6.1, sodium: 439 }
  },
  {
    id: "local_023",
    slug: "cream-cheese",
    name: "Cream cheese",
    displayName: "Regular Cream Cheese",
    aliases: ["cream cheese spread"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "tbsp",
    defaultQuantity: 2,
    servingSizes: [
      { unit: "tbsp", label: "1 tbsp", grams: 14.5 }
    ],
    nutrientsPer100g: { calories: 350, protein: 6.1, carbohydrates: 5.5, fat: 34.4, fiber: 0, sugar: 3.8, sodium: 314 }
  },
  {
    id: "local_024",
    slug: "pancakes",
    name: "Pancakes",
    displayName: "Plain Pancakes",
    aliases: ["hotcakes", "flapjacks"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 2,
    servingSizes: [
      { unit: "piece", label: "1 pancake (5 inch)", grams: 40 }
    ],
    nutrientsPer100g: { calories: 227, protein: 6.4, carbohydrates: 28.3, fat: 9.8, fiber: 1, sugar: 5.1, sodium: 439 }
  },
  {
    id: "local_025",
    slug: "waffles",
    name: "Waffles",
    displayName: "Plain Waffle",
    aliases: ["frozen waffle", "waffle"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 2,
    servingSizes: [
      { unit: "piece", label: "1 round waffle", grams: 38 }
    ],
    nutrientsPer100g: { calories: 291, protein: 6.9, carbohydrates: 40.5, fat: 11.2, fiber: 1.8, sugar: 4.8, sodium: 494 }
  },
  {
    id: "local_026",
    slug: "peanut-butter",
    name: "Peanut butter",
    displayName: "Creamy Peanut Butter",
    aliases: ["creamy peanut butter", "pb"],
    category: "Breakfast",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "tbsp",
    defaultQuantity: 2,
    servingSizes: [
      { unit: "tbsp", label: "1 tbsp", grams: 16 }
    ],
    nutrientsPer100g: { calories: 588, protein: 25.1, carbohydrates: 20, fat: 50.4, fiber: 6, sugar: 9.2, sodium: 426 }
  },
  {
    id: "local_027",
    slug: "banana",
    name: "Banana",
    displayName: "Raw Banana",
    aliases: ["fresh banana"],
    category: "Fruits",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "piece", label: "1 medium banana", grams: 118 },
      { unit: "cup", label: "1 cup sliced", grams: 150 }
    ],
    nutrientsPer100g: { calories: 89, protein: 1.1, carbohydrates: 22.8, fat: 0.3, fiber: 2.6, sugar: 12.2, sodium: 1 }
  },
  {
    id: "local_028",
    slug: "apple",
    name: "Apple",
    displayName: "Raw Apple (with skin)",
    aliases: ["fresh apple", "red apple", "green apple"],
    category: "Fruits",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "piece", label: "1 medium apple", grams: 182 },
      { unit: "cup", label: "1 cup slices", grams: 109 }
    ],
    nutrientsPer100g: { calories: 52, protein: 0.3, carbohydrates: 13.8, fat: 0.2, fiber: 2.4, sugar: 10.4, sodium: 1 }
  },
  {
    id: "local_029",
    slug: "blueberries",
    name: "Blueberries",
    displayName: "Raw Blueberries",
    aliases: ["fresh blueberries"],
    category: "Fruits",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 148 }
    ],
    nutrientsPer100g: { calories: 57, protein: 0.7, carbohydrates: 14.5, fat: 0.3, fiber: 2.4, sugar: 10, sodium: 1 }
  },
  {
    id: "local_030",
    slug: "strawberries",
    name: "Strawberries",
    displayName: "Raw Strawberries",
    aliases: ["fresh strawberries"],
    category: "Fruits",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup whole", grams: 144 },
      { unit: "piece", label: "1 medium strawberry", grams: 12 }
    ],
    nutrientsPer100g: { calories: 32, protein: 0.7, carbohydrates: 7.7, fat: 0.3, fiber: 2, sugar: 4.9, sodium: 1 }
  },
  // LUNCH / DINNER
  {
    id: "local_031",
    slug: "grilled-chicken-breast",
    name: "Grilled chicken breast",
    displayName: "Grilled Chicken Breast",
    aliases: ["chicken breast", "grilled chicken", "boneless chicken breast"],
    category: "Meat & Poultry",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "oz",
    defaultQuantity: 4,
    servingSizes: [
      { unit: "oz", label: "1 oz", grams: 28.35 },
      { unit: "piece", label: "1 medium breast", grams: 120 }
    ],
    nutrientsPer100g: { calories: 165, protein: 31, carbohydrates: 0, fat: 3.6, fiber: 0, sugar: 0, sodium: 74 }
  },
  {
    id: "local_032",
    slug: "chicken-thigh-cooked",
    name: "Chicken thigh cooked",
    displayName: "Cooked Chicken Thigh (Meat Only)",
    aliases: ["chicken thigh", "dark meat chicken"],
    category: "Meat & Poultry",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "oz",
    defaultQuantity: 4,
    servingSizes: [
      { unit: "oz", label: "1 oz", grams: 28.35 },
      { unit: "piece", label: "1 thigh", grams: 70 }
    ],
    nutrientsPer100g: { calories: 177, protein: 24, carbohydrates: 0, fat: 8.3, fiber: 0, sugar: 0, sodium: 87 }
  },
  {
    id: "local_033",
    slug: "ground-beef-85-lean",
    name: "Ground beef 85 percent lean",
    displayName: "Ground Beef (85% Lean, Cooked)",
    aliases: ["hamburger meat", "beef mince", "85/15 beef"],
    category: "Meat & Poultry",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "oz",
    defaultQuantity: 4,
    servingSizes: [
      { unit: "oz", label: "1 oz", grams: 28.35 }
    ],
    nutrientsPer100g: { calories: 250, protein: 25.9, carbohydrates: 0, fat: 15.4, fiber: 0, sugar: 0, sodium: 72 }
  },
  {
    id: "local_034",
    slug: "turkey-breast",
    name: "Turkey breast",
    displayName: "Roasted Turkey Breast",
    aliases: ["turkey meat", "roasted turkey"],
    category: "Meat & Poultry",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "oz",
    defaultQuantity: 4,
    servingSizes: [
      { unit: "oz", label: "1 oz", grams: 28.35 }
    ],
    nutrientsPer100g: { calories: 135, protein: 30.1, carbohydrates: 0, fat: 0.7, fiber: 0, sugar: 0, sodium: 54 }
  },
  {
    id: "local_035",
    slug: "salmon-cooked",
    name: "Salmon cooked",
    displayName: "Cooked Salmon",
    aliases: ["baked salmon", "grilled salmon"],
    category: "Seafood",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "oz",
    defaultQuantity: 4,
    servingSizes: [
      { unit: "oz", label: "1 oz", grams: 28.35 },
      { unit: "piece", label: "1 fillet", grams: 170 }
    ],
    nutrientsPer100g: { calories: 206, protein: 22.1, carbohydrates: 0, fat: 12.3, fiber: 0, sugar: 0, sodium: 63 }
  },
  {
    id: "local_036",
    slug: "tuna-canned-water",
    name: "Tuna canned in water",
    displayName: "Canned Tuna in Water (Drained)",
    aliases: ["canned tuna", "tuna fish"],
    category: "Seafood",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "can",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "can", label: "1 can (5 oz)", grams: 130 },
      { unit: "oz", label: "1 oz", grams: 28.35 }
    ],
    nutrientsPer100g: { calories: 86, protein: 19.4, carbohydrates: 0, fat: 0.9, fiber: 0, sugar: 0, sodium: 164 }
  },
  {
    id: "local_037",
    slug: "shrimp-cooked",
    name: "Shrimp cooked",
    displayName: "Cooked Shrimp",
    aliases: ["prawns", "boiled shrimp"],
    category: "Seafood",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "oz",
    defaultQuantity: 4,
    servingSizes: [
      { unit: "oz", label: "1 oz", grams: 28.35 },
      { unit: "piece", label: "1 large shrimp", grams: 8 }
    ],
    nutrientsPer100g: { calories: 99, protein: 24, carbohydrates: 0.2, fat: 0.3, fiber: 0, sugar: 0, sodium: 111 }
  },
  {
    id: "local_038",
    slug: "white-rice-cooked",
    name: "White rice cooked",
    displayName: "Cooked White Rice",
    aliases: ["cooked white rice", "rice", "steamed rice"],
    category: "Grains & Cereals",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 158 }
    ],
    nutrientsPer100g: { calories: 130, protein: 2.7, carbohydrates: 28, fat: 0.3, fiber: 0.4, sugar: 0.1, sodium: 1 }
  },
  {
    id: "local_039",
    slug: "brown-rice-cooked",
    name: "Brown rice cooked",
    displayName: "Cooked Brown Rice",
    aliases: ["cooked brown rice"],
    category: "Grains & Cereals",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 195 }
    ],
    nutrientsPer100g: { calories: 123, protein: 2.7, carbohydrates: 25.6, fat: 1, fiber: 1.6, sugar: 0.2, sodium: 1 }
  },
  {
    id: "local_040",
    slug: "pasta-cooked",
    name: "Pasta cooked",
    displayName: "Cooked Pasta (Spaghetti/Macaroni)",
    aliases: ["cooked noodles", "spaghetti plain"],
    category: "Grains & Cereals",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 140 }
    ],
    nutrientsPer100g: { calories: 158, protein: 5.8, carbohydrates: 30.9, fat: 0.9, fiber: 1.8, sugar: 0.6, sodium: 1 }
  },
  {
    id: "local_041",
    slug: "spaghetti-tomato-sauce",
    name: "Spaghetti with tomato sauce",
    displayName: "Spaghetti with Marinara Sauce",
    aliases: ["pasta with sauce"],
    category: "Prepared Meals",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 248 }
    ],
    nutrientsPer100g: { calories: 104, protein: 3.3, carbohydrates: 20.3, fat: 1.2, fiber: 1.6, sugar: 2.7, sodium: 220 }
  },
  {
    id: "local_042",
    slug: "macaroni-and-cheese",
    name: "Macaroni and cheese",
    displayName: "Macaroni and Cheese",
    aliases: ["mac n cheese", "macaroni & cheese"],
    category: "Prepared Meals",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 189 }
    ],
    nutrientsPer100g: { calories: 164, protein: 6.3, carbohydrates: 18, fat: 7.5, fiber: 0.9, sugar: 2.2, sodium: 341 }
  },
  {
    id: "local_043",
    slug: "mashed-potatoes",
    name: "Mashed potatoes",
    displayName: "Mashed Potatoes (with milk and butter)",
    aliases: ["mashed potato"],
    category: "Vegetables",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 210 }
    ],
    nutrientsPer100g: { calories: 113, protein: 2, carbohydrates: 15, fat: 5, fiber: 1.5, sugar: 1.3, sodium: 310 }
  },
  {
    id: "local_044",
    slug: "baked-potato",
    name: "Baked potato",
    displayName: "Baked Potato (Plain, with skin)",
    aliases: ["plain baked potato"],
    category: "Vegetables",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "piece", label: "1 medium potato", grams: 173 }
    ],
    nutrientsPer100g: { calories: 93, protein: 2.5, carbohydrates: 21.2, fat: 0.1, fiber: 2.2, sugar: 1.2, sodium: 10 }
  },
  {
    id: "local_045",
    slug: "sweet-potato",
    name: "Sweet potato",
    displayName: "Baked Sweet Potato (Plain)",
    aliases: ["baked sweet potato", "yam"],
    category: "Vegetables",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "piece", label: "1 medium sweet potato", grams: 114 },
      { unit: "cup", label: "1 cup mashed", grams: 328 }
    ],
    nutrientsPer100g: { calories: 90, protein: 2, carbohydrates: 20.7, fat: 0.2, fiber: 3.3, sugar: 6.5, sodium: 36 }
  },
  {
    id: "local_046",
    slug: "broccoli-cooked",
    name: "Broccoli cooked",
    displayName: "Cooked Broccoli",
    aliases: ["steamed broccoli"],
    category: "Vegetables",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup chopped", grams: 156 }
    ],
    nutrientsPer100g: { calories: 35, protein: 2.4, carbohydrates: 7.2, fat: 0.4, fiber: 3.3, sugar: 1.4, sodium: 41 }
  },
  {
    id: "local_047",
    slug: "mixed-vegetables",
    name: "Mixed vegetables",
    displayName: "Cooked Mixed Vegetables",
    aliases: ["frozen veggies", "steamed vegetables"],
    category: "Vegetables",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 163 }
    ],
    nutrientsPer100g: { calories: 65, protein: 3.1, carbohydrates: 14.6, fat: 0.2, fiber: 4.8, sugar: 3.8, sodium: 39 }
  },
  {
    id: "local_048",
    slug: "caesar-salad",
    name: "Caesar salad",
    displayName: "Caesar Salad (with dressing)",
    aliases: ["salad with caesar"],
    category: "Prepared Meals",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 2,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 44 }
    ],
    nutrientsPer100g: { calories: 170, protein: 4.5, carbohydrates: 8.5, fat: 13.5, fiber: 1.5, sugar: 1.5, sodium: 350 }
  },
  {
    id: "local_049",
    slug: "garden-salad",
    name: "Garden salad",
    displayName: "Mixed Garden Salad (no dressing)",
    aliases: ["tossed salad", "lettuce salad"],
    category: "Vegetables",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 2,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 50 }
    ],
    nutrientsPer100g: { calories: 17, protein: 1, carbohydrates: 3.5, fat: 0.2, fiber: 1.4, sugar: 1.6, sodium: 12 }
  },
  {
    id: "local_050",
    slug: "ranch-dressing",
    name: "Ranch dressing",
    displayName: "Ranch Salad Dressing",
    aliases: ["ranch"],
    category: "Condiments & Oils",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "tbsp",
    defaultQuantity: 2,
    servingSizes: [
      { unit: "tbsp", label: "1 tbsp", grams: 15 }
    ],
    nutrientsPer100g: { calories: 433, protein: 1.3, carbohydrates: 5.3, fat: 46.7, fiber: 0, sugar: 3.3, sodium: 867 }
  },
  {
    id: "local_051",
    slug: "olive-oil",
    name: "Olive oil",
    displayName: "Extra Virgin Olive Oil",
    aliases: ["evoo", "oil"],
    category: "Condiments & Oils",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "tbsp",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "tbsp", label: "1 tbsp", grams: 14 },
      { unit: "tsp", label: "1 tsp", grams: 4.5 }
    ],
    nutrientsPer100g: { calories: 884, protein: 0, carbohydrates: 0, fat: 100, fiber: 0, sugar: 0, sodium: 2 }
  },
  {
    id: "local_052",
    slug: "avocado",
    name: "Avocado",
    displayName: "Raw Avocado",
    aliases: ["fresh avocado"],
    category: "Fruits",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 0.5,
    servingSizes: [
      { unit: "piece", label: "1 medium avocado", grams: 150 },
      { unit: "cup", label: "1 cup sliced", grams: 146 }
    ],
    nutrientsPer100g: { calories: 160, protein: 2, carbohydrates: 8.5, fat: 14.7, fiber: 6.7, sugar: 0.7, sodium: 7 }
  },
  {
    id: "local_053",
    slug: "black-beans-cooked",
    name: "Black beans cooked",
    displayName: "Cooked Black Beans",
    aliases: ["boiled black beans"],
    category: "Beans & Plant Protein",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 0.5,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 172 }
    ],
    nutrientsPer100g: { calories: 132, protein: 8.9, carbohydrates: 23.7, fat: 0.5, fiber: 8.7, sugar: 0.3, sodium: 1 }
  },
  {
    id: "local_054",
    slug: "pinto-beans-cooked",
    name: "Pinto beans cooked",
    displayName: "Cooked Pinto Beans",
    aliases: ["boiled pinto beans"],
    category: "Beans & Plant Protein",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 0.5,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 171 }
    ],
    nutrientsPer100g: { calories: 143, protein: 9, carbohydrates: 26.2, fat: 0.6, fiber: 9, sugar: 0.3, sodium: 1 }
  },
  {
    id: "local_055",
    slug: "lentils-cooked",
    name: "Lentils cooked",
    displayName: "Cooked Lentils",
    aliases: ["boiled lentils"],
    category: "Beans & Plant Protein",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 0.5,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 198 }
    ],
    nutrientsPer100g: { calories: 116, protein: 9, carbohydrates: 20.1, fat: 0.4, fiber: 7.9, sugar: 1.8, sodium: 2 }
  },
  {
    id: "local_056",
    slug: "tofu-firm",
    name: "Tofu firm",
    displayName: "Firm Tofu",
    aliases: ["soybean curd", "raw tofu"],
    category: "Beans & Plant Protein",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "oz",
    defaultQuantity: 3,
    servingSizes: [
      { unit: "oz", label: "1 oz", grams: 28.35 },
      { unit: "cup", label: "1 cup", grams: 248 }
    ],
    nutrientsPer100g: { calories: 144, protein: 15.8, carbohydrates: 2.8, fat: 8.7, fiber: 2.3, sugar: 0.7, sodium: 14 }
  },
  {
    id: "local_057",
    slug: "cheese-pizza",
    name: "Cheese pizza",
    displayName: "Cheese Pizza (Regular Crust)",
    aliases: ["pizza slice", "plain pizza"],
    category: "Fast Food Style",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "slice",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "slice", label: '1 slice (14" pizza)', grams: 107 }
    ],
    nutrientsPer100g: { calories: 266, protein: 11.4, carbohydrates: 33.3, fat: 9.8, fiber: 2.3, sugar: 3.6, sodium: 598 }
  },
  {
    id: "local_058",
    slug: "pepperoni-pizza",
    name: "Pepperoni pizza",
    displayName: "Pepperoni Pizza",
    aliases: ["pizza with pepperoni"],
    category: "Fast Food Style",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "slice",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "slice", label: '1 slice (14" pizza)', grams: 111 }
    ],
    nutrientsPer100g: { calories: 281, protein: 12.3, carbohydrates: 31.8, fat: 11.6, fiber: 2.1, sugar: 3.4, sodium: 673 }
  },
  {
    id: "local_059",
    slug: "cheeseburger",
    name: "Cheeseburger",
    displayName: "Cheeseburger (Single Patty)",
    aliases: ["burger with cheese", "hamburger with cheese"],
    category: "Fast Food Style",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "piece", label: "1 regular cheeseburger", grams: 115 }
    ],
    nutrientsPer100g: { calories: 261, protein: 13.9, carbohydrates: 30.3, fat: 10.9, fiber: 1.3, sugar: 5.4, sodium: 520 }
  },
  {
    id: "local_060",
    slug: "chicken-sandwich",
    name: "Chicken sandwich",
    displayName: "Fried Chicken Sandwich",
    aliases: ["crispy chicken sandwich"],
    category: "Fast Food Style",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "piece", label: "1 sandwich", grams: 170 }
    ],
    nutrientsPer100g: { calories: 284, protein: 13.5, carbohydrates: 30.6, fat: 12.4, fiber: 1.5, sugar: 4.1, sodium: 610 }
  },
  {
    id: "local_061",
    slug: "turkey-sandwich",
    name: "Turkey sandwich",
    displayName: "Turkey Deli Sandwich",
    aliases: ["turkey sub"],
    category: "Prepared Meals",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "piece", label: "1 sandwich", grams: 155 }
    ],
    nutrientsPer100g: { calories: 210, protein: 14.5, carbohydrates: 26.5, fat: 5.5, fiber: 2.5, sugar: 3.5, sodium: 750 }
  },
  {
    id: "local_062",
    slug: "peanut-butter-jelly-sandwich",
    name: "Peanut butter jelly sandwich",
    displayName: "Peanut Butter & Jelly Sandwich",
    aliases: ["pb&j", "pbj"],
    category: "Prepared Meals",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "piece", label: "1 sandwich", grams: 135 }
    ],
    nutrientsPer100g: { calories: 330, protein: 10.5, carbohydrates: 45, fat: 13.5, fiber: 4, sugar: 15, sodium: 380 }
  },
  {
    id: "local_063",
    slug: "french-fries",
    name: "French fries",
    displayName: "French Fries",
    aliases: ["fries", "potato fries"],
    category: "Fast Food Style",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "serving",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "serving", label: "1 medium order", grams: 117 },
      { unit: "oz", label: "1 oz", grams: 28.35 }
    ],
    nutrientsPer100g: { calories: 312, protein: 3.4, carbohydrates: 41.4, fat: 14.7, fiber: 3.8, sugar: 0.3, sodium: 210 }
  },
  {
    id: "local_064",
    slug: "chicken-nuggets",
    name: "Chicken nuggets",
    displayName: "Chicken Nuggets",
    aliases: ["nuggets", "chicken pieces"],
    category: "Fast Food Style",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 6,
    servingSizes: [
      { unit: "piece", label: "1 nugget", grams: 16 }
    ],
    nutrientsPer100g: { calories: 297, protein: 15, carbohydrates: 15, fat: 19.4, fiber: 1, sugar: 0.5, sodium: 550 }
  },
  {
    id: "local_065",
    slug: "burrito",
    name: "Burrito",
    displayName: "Bean and Cheese Burrito",
    aliases: ["bean burrito"],
    category: "Fast Food Style",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "piece", label: "1 burrito", grams: 185 }
    ],
    nutrientsPer100g: { calories: 220, protein: 8.5, carbohydrates: 32, fat: 6.5, fiber: 4.5, sugar: 1.5, sodium: 450 }
  },
  {
    id: "local_066",
    slug: "taco",
    name: "Taco",
    displayName: "Beef Taco (Hard Shell)",
    aliases: ["hard taco"],
    category: "Fast Food Style",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "piece", label: "1 taco", grams: 85 }
    ],
    nutrientsPer100g: { calories: 226, protein: 10.5, carbohydrates: 16.5, fat: 13.5, fiber: 2.5, sugar: 1, sodium: 390 }
  },
  {
    id: "local_067",
    slug: "quesadilla",
    name: "Quesadilla",
    displayName: "Cheese Quesadilla",
    aliases: ["cheese quesadilla"],
    category: "Fast Food Style",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "piece", label: "1 whole quesadilla", grams: 140 }
    ],
    nutrientsPer100g: { calories: 330, protein: 14.5, carbohydrates: 30, fat: 17.5, fiber: 2, sugar: 1.5, sodium: 650 }
  },
  // SNACKS / DESSERTS
  {
    id: "local_068",
    slug: "protein-bar",
    name: "Protein bar",
    displayName: "Protein Bar (Generic)",
    aliases: ["energy bar"],
    category: "Protein & Fitness Foods",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "piece", label: "1 bar", grams: 60 }
    ],
    nutrientsPer100g: { calories: 350, protein: 33.3, carbohydrates: 40, fat: 11.7, fiber: 6.7, sugar: 15, sodium: 330 }
  },
  {
    id: "local_069",
    slug: "potato-chips",
    name: "Potato chips",
    displayName: "Potato Chips (Plain)",
    aliases: ["crisps", "plain chips"],
    category: "Snacks",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "oz",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "oz", label: "1 oz (approx 15 chips)", grams: 28.35 }
    ],
    nutrientsPer100g: { calories: 536, protein: 7, carbohydrates: 52.9, fat: 34.6, fiber: 3.3, sugar: 0.3, sodium: 528 }
  },
  {
    id: "local_070",
    slug: "tortilla-chips",
    name: "Tortilla chips",
    displayName: "Tortilla Chips (Plain)",
    aliases: ["corn chips"],
    category: "Snacks",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "oz",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "oz", label: "1 oz", grams: 28.35 }
    ],
    nutrientsPer100g: { calories: 489, protein: 7.5, carbohydrates: 63.8, fat: 23.6, fiber: 5.3, sugar: 1.1, sodium: 320 }
  },
  {
    id: "local_071",
    slug: "pretzels",
    name: "Pretzels",
    displayName: "Hard Pretzels",
    aliases: ["pretzel twists"],
    category: "Snacks",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "oz",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "oz", label: "1 oz", grams: 28.35 }
    ],
    nutrientsPer100g: { calories: 380, protein: 10.3, carbohydrates: 80.4, fat: 2.6, fiber: 3.4, sugar: 2.5, sodium: 1220 }
  },
  {
    id: "local_072",
    slug: "popcorn-air-popped",
    name: "Popcorn air-popped",
    displayName: "Air-Popped Popcorn",
    aliases: ["plain popcorn"],
    category: "Snacks",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 3,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 8 }
    ],
    nutrientsPer100g: { calories: 387, protein: 12.9, carbohydrates: 77.8, fat: 4.5, fiber: 14.5, sugar: 0.9, sodium: 2 }
  },
  {
    id: "local_073",
    slug: "trail-mix",
    name: "Trail mix",
    displayName: "Trail Mix (Nuts, Seeds, Chocolate)",
    aliases: ["gorp", "snack mix"],
    category: "Snacks",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 0.25,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 145 },
      { unit: "oz", label: "1 oz", grams: 28.35 }
    ],
    nutrientsPer100g: { calories: 462, protein: 13.5, carbohydrates: 45.8, fat: 28.6, fiber: 6.8, sugar: 24.5, sodium: 236 }
  },
  {
    id: "local_074",
    slug: "almonds",
    name: "Almonds",
    displayName: "Raw Almonds",
    aliases: ["whole almonds"],
    category: "Nuts & Seeds",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "oz",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "oz", label: "1 oz (approx 23 nuts)", grams: 28.35 },
      { unit: "cup", label: "1 cup whole", grams: 143 }
    ],
    nutrientsPer100g: { calories: 579, protein: 21.2, carbohydrates: 21.6, fat: 49.9, fiber: 12.5, sugar: 4.4, sodium: 1 }
  },
  {
    id: "local_075",
    slug: "walnuts",
    name: "Walnuts",
    displayName: "Raw Walnuts",
    aliases: ["walnut halves"],
    category: "Nuts & Seeds",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "oz",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "oz", label: "1 oz (approx 14 halves)", grams: 28.35 },
      { unit: "cup", label: "1 cup chopped", grams: 117 }
    ],
    nutrientsPer100g: { calories: 654, protein: 15.2, carbohydrates: 13.7, fat: 65.2, fiber: 6.7, sugar: 2.6, sodium: 2 }
  },
  {
    id: "local_076",
    slug: "chocolate-chip-cookie",
    name: "Chocolate chip cookie",
    displayName: "Chocolate Chip Cookie",
    aliases: ["cookie"],
    category: "Desserts",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "piece", label: "1 medium cookie", grams: 16 }
    ],
    nutrientsPer100g: { calories: 488, protein: 4.5, carbohydrates: 66.8, fat: 24.3, fiber: 2.5, sugar: 34, sodium: 335 }
  },
  {
    id: "local_077",
    slug: "brownie",
    name: "Brownie",
    displayName: "Chocolate Brownie",
    aliases: ["fudge brownie"],
    category: "Desserts",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "piece",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "piece", label: '1 square (approx 2x2")', grams: 56 }
    ],
    nutrientsPer100g: { calories: 405, protein: 4.5, carbohydrates: 62, fat: 17.5, fiber: 3.5, sugar: 40, sodium: 220 }
  },
  {
    id: "local_078",
    slug: "vanilla-ice-cream",
    name: "Vanilla ice cream",
    displayName: "Vanilla Ice Cream",
    aliases: ["ice cream"],
    category: "Desserts",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 0.5,
    servingSizes: [
      { unit: "cup", label: "1 cup", grams: 134 }
    ],
    nutrientsPer100g: { calories: 207, protein: 3.5, carbohydrates: 23.6, fat: 11, fiber: 0.7, sugar: 21.2, sodium: 80 }
  },
  {
    id: "local_079",
    slug: "dark-chocolate",
    name: "Dark chocolate",
    displayName: "Dark Chocolate (70-85% Cacao)",
    aliases: ["bittersweet chocolate"],
    category: "Desserts",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "oz",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "oz", label: "1 oz", grams: 28.35 }
    ],
    nutrientsPer100g: { calories: 598, protein: 7.8, carbohydrates: 45.9, fat: 42.6, fiber: 10.9, sugar: 24, sodium: 20 }
  },
  // BEVERAGES
  {
    id: "local_080",
    slug: "water",
    name: "Water",
    displayName: "Tap or Bottled Water",
    aliases: ["h2o", "drinking water"],
    category: "Beverages",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup (8 fl oz)", grams: 237 },
      { unit: "bottle", label: "1 bottle (16.9 fl oz)", grams: 500 }
    ],
    nutrientsPer100g: { calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0, sugar: 0, sodium: 1 }
  },
  {
    id: "local_081",
    slug: "regular-soda",
    name: "Regular soda",
    displayName: "Regular Cola Soda",
    aliases: ["soda", "cola", "soft drink", "pop"],
    category: "Beverages",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "can",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "can", label: "1 can (12 fl oz)", grams: 368 }
    ],
    nutrientsPer100g: { calories: 38, protein: 0, carbohydrates: 9.8, fat: 0, fiber: 0, sugar: 9, sodium: 4 }
  },
  {
    id: "local_082",
    slug: "diet-soda",
    name: "Diet soda",
    displayName: "Diet Cola Soda",
    aliases: ["diet cola", "zero calorie soda"],
    category: "Beverages",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "can",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "can", label: "1 can (12 fl oz)", grams: 355 }
    ],
    nutrientsPer100g: { calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0, sugar: 0, sodium: 11 }
  },
  {
    id: "local_083",
    slug: "apple-juice",
    name: "Apple juice",
    displayName: "Apple Juice (100%)",
    aliases: ["juice"],
    category: "Beverages",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "cup",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "cup", label: "1 cup (8 fl oz)", grams: 248 }
    ],
    nutrientsPer100g: { calories: 46, protein: 0.1, carbohydrates: 11.3, fat: 0.1, fiber: 0.2, sugar: 9.6, sodium: 4 }
  },
  {
    id: "local_084",
    slug: "sports-drink",
    name: "Sports drink",
    displayName: "Sports Drink (Regular)",
    aliases: ["gatorade", "powerade"],
    category: "Beverages",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "bottle",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "bottle", label: "1 bottle (20 fl oz)", grams: 591 },
      { unit: "cup", label: "1 cup (8 fl oz)", grams: 240 }
    ],
    nutrientsPer100g: { calories: 24, protein: 0, carbohydrates: 6, fat: 0, fiber: 0, sugar: 5.6, sodium: 39 }
  },
  {
    id: "local_085",
    slug: "protein-shake",
    name: "Protein shake",
    displayName: "Whey Protein Shake (Ready to drink)",
    aliases: ["whey shake", "protein drink"],
    category: "Beverages",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "bottle",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "bottle", label: "1 bottle (11 fl oz)", grams: 325 }
    ],
    nutrientsPer100g: { calories: 49, protein: 9.2, carbohydrates: 1.5, fat: 0.9, fiber: 0.3, sugar: 0.3, sodium: 70 }
  },
  // CONDIMENTS / EXTRAS
  {
    id: "local_086",
    slug: "mayonnaise",
    name: "Mayonnaise",
    displayName: "Regular Mayonnaise",
    aliases: ["mayo"],
    category: "Condiments & Oils",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "tbsp",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "tbsp", label: "1 tbsp", grams: 14 }
    ],
    nutrientsPer100g: { calories: 680, protein: 0.9, carbohydrates: 0.5, fat: 74.9, fiber: 0, sugar: 0.3, sodium: 635 }
  },
  {
    id: "local_087",
    slug: "ketchup",
    name: "Ketchup",
    displayName: "Tomato Ketchup",
    aliases: ["catsup"],
    category: "Condiments & Oils",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "tbsp",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "tbsp", label: "1 tbsp", grams: 17 }
    ],
    nutrientsPer100g: { calories: 100, protein: 1, carbohydrates: 26.5, fat: 0.1, fiber: 0.3, sugar: 21, sodium: 900 }
  },
  {
    id: "local_088",
    slug: "mustard",
    name: "Mustard",
    displayName: "Yellow Mustard",
    aliases: ["prepared mustard"],
    category: "Condiments & Oils",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "tsp",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "tsp", label: "1 tsp", grams: 5 },
      { unit: "tbsp", label: "1 tbsp", grams: 15 }
    ],
    nutrientsPer100g: { calories: 60, protein: 3.7, carbohydrates: 5.8, fat: 3.3, fiber: 3.3, sugar: 0.9, sodium: 1100 }
  },
  {
    id: "local_089",
    slug: "butter",
    name: "Butter",
    displayName: "Butter (Salted)",
    aliases: ["salted butter"],
    category: "Condiments & Oils",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "tbsp",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "tbsp", label: "1 tbsp", grams: 14.2 },
      { unit: "piece", label: '1 pat (1" square)', grams: 5 }
    ],
    nutrientsPer100g: { calories: 717, protein: 0.8, carbohydrates: 0.1, fat: 81.1, fiber: 0, sugar: 0.1, sodium: 643 }
  },
  {
    id: "local_090",
    slug: "cheddar-cheese",
    name: "Cheddar cheese",
    displayName: "Cheddar Cheese",
    aliases: ["sharp cheddar", "cheese slice"],
    category: "Eggs & Dairy",
    source: "local",
    sourceLabel: "Local database",
    isEstimated: true,
    defaultUnit: "oz",
    defaultQuantity: 1,
    servingSizes: [
      { unit: "oz", label: "1 oz", grams: 28.35 },
      { unit: "slice", label: "1 slice (1 oz)", grams: 28 }
    ],
    nutrientsPer100g: { calories: 403, protein: 22.8, carbohydrates: 1.3, fat: 33.3, fiber: 0, sugar: 0.5, sodium: 621 }
  }
];

export { localFoods as l };
