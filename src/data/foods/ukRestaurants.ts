import type { FoodItem } from '../../lib/nutrition/types';

// UK chains, from each chain's own published nutrition (not USDA):
// Greggs Nutritional Information PDF (November 2026) and pret.co.uk product pages (read 2026-11-21).
export const ukRestaurantsFoods: FoodItem[] = [
  {
    "id": "greggs_greggs-sausage-roll",
    "slug": "greggs-sausage-roll",
    "name": "Greggs Sausage Roll",
    "searchName": "greggs sausage roll",
    "displayName": "Greggs Sausage Roll",
    "aliases": [
      "greggs sausage roll",
      "greggs sausage roll(s)"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 sausage roll",
        "grams": 103,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 337,
      "protein": 1.5,
      "carbohydrates": 23,
      "fat": 23,
      "fiber": 0,
      "sugar": 0,
      "sodium": 7200,
      "saturatedFat": 11
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-vegan-sausage-roll",
    "slug": "greggs-vegan-sausage-roll",
    "name": "Greggs Vegan Sausage Roll",
    "searchName": "greggs vegan sausage roll",
    "displayName": "Greggs Vegan Sausage Roll",
    "aliases": [
      "greggs vegan sausage roll",
      "greggs vegan roll",
      "vegan roll pork-free",
      "greggs vegan roll pork-free"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 roll",
        "grams": 101,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 305,
      "protein": 2.9,
      "carbohydrates": 21,
      "fat": 19,
      "fiber": 1,
      "sugar": 0.7,
      "sodium": 8800,
      "saturatedFat": 9.2
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-steak-bake",
    "slug": "greggs-steak-bake",
    "name": "Greggs Steak Bake",
    "searchName": "greggs steak bake",
    "displayName": "Greggs Steak Bake",
    "aliases": [
      "greggs steak bake"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 bake",
        "grams": 136.4,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 301,
      "protein": 1.5,
      "carbohydrates": 21,
      "fat": 19,
      "fiber": 0,
      "sugar": 0,
      "sodium": 12000,
      "saturatedFat": 9.5
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-chicken-bake",
    "slug": "greggs-chicken-bake",
    "name": "Greggs Chicken Bake",
    "searchName": "greggs chicken bake",
    "displayName": "Greggs Chicken Bake",
    "aliases": [
      "greggs chicken bake"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 bake",
        "grams": 150.4,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 279,
      "protein": 1.5,
      "carbohydrates": 20,
      "fat": 18,
      "fiber": 1,
      "sugar": 0.8,
      "sodium": 10400,
      "saturatedFat": 9.2
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-cheese-onion-bake",
    "slug": "greggs-cheese-onion-bake",
    "name": "Greggs Cheese & Onion Bake",
    "searchName": "greggs cheese & onion bake",
    "displayName": "Greggs Cheese & Onion Bake",
    "aliases": [
      "greggs cheese & onion bake"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 bake",
        "grams": 141.4,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 308,
      "protein": 2,
      "carbohydrates": 23,
      "fat": 21,
      "fiber": 2,
      "sugar": 1,
      "sodium": 6800,
      "saturatedFat": 11
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-vegetable-bake",
    "slug": "greggs-vegetable-bake",
    "name": "Greggs Vegetable Bake",
    "searchName": "greggs vegetable bake",
    "displayName": "Greggs Vegetable Bake",
    "aliases": [
      "greggs vegetable bake"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 bake",
        "grams": 150.4,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 286,
      "protein": 2.4,
      "carbohydrates": 22,
      "fat": 19,
      "fiber": 3,
      "sugar": 1.7,
      "sodium": 7200,
      "saturatedFat": 9.9
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-corned-beef-bake",
    "slug": "greggs-corned-beef-bake",
    "name": "Greggs Corned Beef Bake",
    "searchName": "greggs corned beef bake",
    "displayName": "Greggs Corned Beef Bake",
    "aliases": [
      "greggs corned beef bake"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 bake",
        "grams": 143.37,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 291,
      "protein": 1.7,
      "carbohydrates": 22,
      "fat": 19,
      "fiber": 1,
      "sugar": 0.8,
      "sodium": 8800,
      "saturatedFat": 9.2
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-festive-bake",
    "slug": "greggs-festive-bake",
    "name": "Greggs Festive Bake",
    "searchName": "greggs festive bake",
    "displayName": "Greggs Festive Bake",
    "aliases": [
      "greggs festive bake"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 bake",
        "grams": 152,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 296,
      "protein": 2.3,
      "carbohydrates": 23,
      "fat": 18,
      "fiber": 4,
      "sugar": 2.5,
      "sodium": 12000,
      "saturatedFat": 9.2
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-sausage-bean-cheese-melt",
    "slug": "greggs-sausage-bean-cheese-melt",
    "name": "Greggs Sausage, Bean & Cheese Melt",
    "searchName": "greggs sausage, bean & cheese melt",
    "displayName": "Greggs Sausage, Bean & Cheese Melt",
    "aliases": [
      "greggs sausage, bean & cheese melt"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 melt",
        "grams": 149.4,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 305,
      "protein": 3.9,
      "carbohydrates": 25,
      "fat": 19,
      "fiber": 3,
      "sugar": 2,
      "sodium": 8800,
      "saturatedFat": 9.7
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-pigs-in-blankets",
    "slug": "greggs-pigs-in-blankets",
    "name": "Greggs Pigs in Blankets",
    "searchName": "greggs pigs in blankets",
    "displayName": "Greggs Pigs in Blankets",
    "aliases": [
      "greggs pigs in blankets"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "serving",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "serving",
        "label": "1 portion",
        "grams": 96,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 243,
      "protein": 0.7,
      "carbohydrates": 8.7,
      "fat": 15,
      "fiber": 1,
      "sugar": 0.7,
      "sodium": 13600,
      "saturatedFat": 5.7
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-mince-pie",
    "slug": "greggs-mince-pie",
    "name": "Greggs Mince Pie",
    "searchName": "greggs mince pie",
    "displayName": "Greggs Mince Pie",
    "aliases": [
      "greggs mince pie",
      "greggs sweet mince pies"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 mince pie",
        "grams": 70,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 402,
      "protein": 1.3,
      "carbohydrates": 60,
      "fat": 16,
      "fiber": 24,
      "sugar": 32,
      "sodium": 2000,
      "saturatedFat": 5.4
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-bacon-breakfast-roll",
    "slug": "greggs-bacon-breakfast-roll",
    "name": "Greggs Bacon Breakfast Roll",
    "searchName": "greggs bacon breakfast roll",
    "displayName": "Greggs Bacon Breakfast Roll",
    "aliases": [
      "greggs bacon breakfast roll"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 roll",
        "grams": 119.5,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 269,
      "protein": 1.7,
      "carbohydrates": 28,
      "fat": 10,
      "fiber": 6,
      "sugar": 4.4,
      "sodium": 15200,
      "saturatedFat": 3.6
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-sausage-breakfast-roll",
    "slug": "greggs-sausage-breakfast-roll",
    "name": "Greggs Sausage Breakfast Roll",
    "searchName": "greggs sausage breakfast roll",
    "displayName": "Greggs Sausage Breakfast Roll",
    "aliases": [
      "greggs sausage breakfast roll"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 roll",
        "grams": 154,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 245,
      "protein": 2.5,
      "carbohydrates": 27,
      "fat": 10,
      "fiber": 7,
      "sugar": 3.8,
      "sodium": 13600,
      "saturatedFat": 3.3
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-bacon-breakfast-baguette",
    "slug": "greggs-bacon-breakfast-baguette",
    "name": "Greggs Bacon Breakfast Baguette",
    "searchName": "greggs bacon breakfast baguette",
    "displayName": "Greggs Bacon Breakfast Baguette",
    "aliases": [
      "greggs bacon breakfast baguette"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 baguette",
        "grams": 171,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 270,
      "protein": 2.7,
      "carbohydrates": 33,
      "fat": 8.3,
      "fiber": 3,
      "sugar": 1.7,
      "sodium": 20800,
      "saturatedFat": 3.3
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-sausage-breakfast-baguette",
    "slug": "greggs-sausage-breakfast-baguette",
    "name": "Greggs Sausage Breakfast Baguette",
    "searchName": "greggs sausage breakfast baguette",
    "displayName": "Greggs Sausage Breakfast Baguette",
    "aliases": [
      "greggs sausage breakfast baguette"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 baguette",
        "grams": 217,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 250,
      "protein": 3.9,
      "carbohydrates": 31,
      "fat": 8.7,
      "fiber": 4,
      "sugar": 1.7,
      "sodium": 19200,
      "saturatedFat": 3
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-hash-browns",
    "slug": "greggs-hash-browns",
    "name": "Greggs Hash Browns",
    "searchName": "greggs hash browns",
    "displayName": "Greggs Hash Browns",
    "aliases": [
      "greggs hash browns"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "serving",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "serving",
        "label": "1 portion",
        "grams": 76.4,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 202,
      "protein": 1.7,
      "carbohydrates": 28,
      "fat": 8.6,
      "fiber": 0,
      "sugar": 0,
      "sodium": 1200,
      "saturatedFat": 0.6
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-simply-creamy-porridge",
    "slug": "greggs-simply-creamy-porridge",
    "name": "Greggs Simply Creamy Porridge",
    "searchName": "greggs simply creamy porridge",
    "displayName": "Greggs Simply Creamy Porridge",
    "aliases": [
      "greggs simply creamy porridge"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "serving",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "serving",
        "label": "1 pot",
        "grams": 228,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 109,
      "protein": 4.1,
      "carbohydrates": 19,
      "fat": 1.8,
      "fiber": 7,
      "sugar": 2.9,
      "sodium": 6000,
      "saturatedFat": 0.8
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-pepperoni-pizza-slice",
    "slug": "greggs-pepperoni-pizza-slice",
    "name": "Greggs Pepperoni Pizza Slice",
    "searchName": "greggs pepperoni pizza slice",
    "displayName": "Greggs Pepperoni Pizza Slice",
    "aliases": [
      "greggs pepperoni pizza slice",
      "greggs pepperoni pizza"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "slice",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "slice",
        "label": "1 slice",
        "grams": 172,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 372,
      "protein": 3.6,
      "carbohydrates": 37,
      "fat": 19,
      "fiber": 5,
      "sugar": 2.6,
      "sodium": 16800,
      "saturatedFat": 7.4
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-margherita-pizza-slice",
    "slug": "greggs-margherita-pizza-slice",
    "name": "Greggs Margherita Pizza Slice",
    "searchName": "greggs margherita pizza slice",
    "displayName": "Greggs Margherita Pizza Slice",
    "aliases": [
      "greggs margherita pizza slice",
      "greggs margherita pizza"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "slice",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "slice",
        "label": "1 slice",
        "grams": 160,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 366,
      "protein": 3.5,
      "carbohydrates": 40,
      "fat": 17,
      "fiber": 5,
      "sugar": 2.8,
      "sodium": 15200,
      "saturatedFat": 6.4
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-spicy-chicken-pizza-slice",
    "slug": "greggs-spicy-chicken-pizza-slice",
    "name": "Greggs Spicy Chicken Pizza Slice",
    "searchName": "greggs spicy chicken pizza slice",
    "displayName": "Greggs Spicy Chicken Pizza Slice",
    "aliases": [
      "greggs spicy chicken pizza slice",
      "greggs spicy chicken pizza"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "slice",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "slice",
        "label": "1 slice",
        "grams": 195,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 311,
      "protein": 4.1,
      "carbohydrates": 33,
      "fat": 14,
      "fiber": 6,
      "sugar": 2.9,
      "sodium": 18400,
      "saturatedFat": 5.3
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-southern-fried-chicken-goujons",
    "slug": "greggs-southern-fried-chicken-goujons",
    "name": "Greggs Southern Fried Chicken Goujons",
    "searchName": "greggs southern fried chicken goujons",
    "displayName": "Greggs Southern Fried Chicken Goujons",
    "aliases": [
      "greggs southern fried chicken goujons"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "serving",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "serving",
        "label": "1 portion",
        "grams": 160,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 250,
      "protein": 2.1,
      "carbohydrates": 20,
      "fat": 11,
      "fiber": 0,
      "sugar": 0,
      "sodium": 21600,
      "saturatedFat": 4.4
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-southern-fried-potato-wedges",
    "slug": "greggs-southern-fried-potato-wedges",
    "name": "Greggs Southern Fried Potato Wedges",
    "searchName": "greggs southern fried potato wedges",
    "displayName": "Greggs Southern Fried Potato Wedges",
    "aliases": [
      "greggs southern fried potato wedges"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "serving",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "serving",
        "label": "1 portion",
        "grams": 150,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 160,
      "protein": 3.6,
      "carbohydrates": 25,
      "fat": 5.1,
      "fiber": 1,
      "sugar": 0.8,
      "sodium": 2800,
      "saturatedFat": 0.5
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-spicy-bbq-chicken-bites",
    "slug": "greggs-spicy-bbq-chicken-bites",
    "name": "Greggs Spicy BBQ Chicken Bites",
    "searchName": "greggs spicy bbq chicken bites",
    "displayName": "Greggs Spicy BBQ Chicken Bites",
    "aliases": [
      "greggs spicy bbq chicken bites"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "serving",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "serving",
        "label": "1 portion",
        "grams": 104,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 275,
      "protein": 1,
      "carbohydrates": 21,
      "fat": 13,
      "fiber": 3,
      "sugar": 2.3,
      "sodium": 15200,
      "saturatedFat": 5.5
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-ham-cheese-baguette",
    "slug": "greggs-ham-cheese-baguette",
    "name": "Greggs Ham & Cheese Baguette",
    "searchName": "greggs ham & cheese baguette",
    "displayName": "Greggs Ham & Cheese Baguette",
    "aliases": [
      "greggs ham & cheese baguette"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 baguette",
        "grams": 196,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 246,
      "protein": 2.7,
      "carbohydrates": 29,
      "fat": 7.9,
      "fiber": 3,
      "sugar": 1.5,
      "sodium": 21600,
      "saturatedFat": 4.1
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-tuna-crunch-baguette",
    "slug": "greggs-tuna-crunch-baguette",
    "name": "Greggs Tuna Crunch Baguette",
    "searchName": "greggs tuna crunch baguette",
    "displayName": "Greggs Tuna Crunch Baguette",
    "aliases": [
      "greggs tuna crunch baguette"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 baguette",
        "grams": 236,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 175,
      "protein": 3.8,
      "carbohydrates": 27,
      "fat": 2.2,
      "fiber": 8,
      "sugar": 3.2,
      "sodium": 20800,
      "saturatedFat": 0.3
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-roast-chicken-mayonnaise-baguette",
    "slug": "greggs-roast-chicken-mayonnaise-baguette",
    "name": "Greggs Roast Chicken Mayonnaise Baguette",
    "searchName": "greggs roast chicken mayonnaise baguette",
    "displayName": "Greggs Roast Chicken Mayonnaise Baguette",
    "aliases": [
      "greggs roast chicken mayonnaise baguette"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 baguette",
        "grams": 222.4,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 206,
      "protein": 3.3,
      "carbohydrates": 28,
      "fat": 5.2,
      "fiber": 5,
      "sugar": 2,
      "sodium": 19200,
      "saturatedFat": 0.6
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-mexican-chicken-baguette",
    "slug": "greggs-mexican-chicken-baguette",
    "name": "Greggs Mexican Chicken Baguette",
    "searchName": "greggs mexican chicken baguette",
    "displayName": "Greggs Mexican Chicken Baguette",
    "aliases": [
      "greggs mexican chicken baguette"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 baguette",
        "grams": 235.5,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 209,
      "protein": 4,
      "carbohydrates": 31,
      "fat": 3.7,
      "fiber": 19,
      "sugar": 7.3,
      "sodium": 22400,
      "saturatedFat": 1.7
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-southern-fried-chicken-baguette",
    "slug": "greggs-southern-fried-chicken-baguette",
    "name": "Greggs Southern Fried Chicken Baguette",
    "searchName": "greggs southern fried chicken baguette",
    "displayName": "Greggs Southern Fried Chicken Baguette",
    "aliases": [
      "greggs southern fried chicken baguette"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 baguette",
        "grams": 223.68,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 249,
      "protein": 4.2,
      "carbohydrates": 37,
      "fat": 5.9,
      "fiber": 18,
      "sugar": 7.1,
      "sodium": 20000,
      "saturatedFat": 2.9
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-free-range-egg-mayonnaise-sandwich",
    "slug": "greggs-free-range-egg-mayonnaise-sandwich",
    "name": "Greggs Free Range Egg Mayonnaise Sandwich",
    "searchName": "greggs free range egg mayonnaise sandwich",
    "displayName": "Greggs Free Range Egg Mayonnaise Sandwich",
    "aliases": [
      "greggs free range egg mayonnaise sandwich",
      "greggs free range egg mayonnaise"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 sandwich",
        "grams": 161.3,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 222,
      "protein": 4,
      "carbohydrates": 27,
      "fat": 7.7,
      "fiber": 7,
      "sugar": 3.7,
      "sodium": 12800,
      "saturatedFat": 1.3
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-cheese-tomato-sandwich",
    "slug": "greggs-cheese-tomato-sandwich",
    "name": "Greggs Cheese & Tomato Sandwich",
    "searchName": "greggs cheese & tomato sandwich",
    "displayName": "Greggs Cheese & Tomato Sandwich",
    "aliases": [
      "greggs cheese & tomato sandwich",
      "greggs cheese & tomato"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 sandwich",
        "grams": 177,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 217,
      "protein": 4.1,
      "carbohydrates": 24,
      "fat": 8.9,
      "fiber": 7,
      "sugar": 3.6,
      "sodium": 12800,
      "saturatedFat": 4.2
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-tomato-soup",
    "slug": "greggs-tomato-soup",
    "name": "Greggs Tomato Soup",
    "searchName": "greggs tomato soup",
    "displayName": "Greggs Tomato Soup",
    "aliases": [
      "greggs tomato soup"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "serving",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "serving",
        "label": "1 pot",
        "grams": 300,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 65,
      "protein": 1.8,
      "carbohydrates": 8.2,
      "fat": 2.7,
      "fiber": 24,
      "sugar": 7.3,
      "sodium": 4000,
      "saturatedFat": 0.5
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-glazed-ring-doughnut",
    "slug": "greggs-glazed-ring-doughnut",
    "name": "Greggs Glazed Ring Doughnut",
    "searchName": "greggs glazed ring doughnut",
    "displayName": "Greggs Glazed Ring Doughnut",
    "aliases": [
      "greggs glazed ring doughnut",
      "greggs glazed ring doughnuts"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 doughnut",
        "grams": 58,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 346,
      "protein": 0.8,
      "carbohydrates": 60,
      "fat": 10,
      "fiber": 23,
      "sugar": 36,
      "sodium": 1600,
      "saturatedFat": 3.9
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-pink-jammie-doughnut",
    "slug": "greggs-pink-jammie-doughnut",
    "name": "Greggs Pink Jammie Doughnut",
    "searchName": "greggs pink jammie doughnut",
    "displayName": "Greggs Pink Jammie Doughnut",
    "aliases": [
      "greggs pink jammie doughnut"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 doughnut",
        "grams": 90,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 343,
      "protein": 1.5,
      "carbohydrates": 51,
      "fat": 13,
      "fiber": 26,
      "sugar": 26,
      "sodium": 3200,
      "saturatedFat": 6.2
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-jam-doughnut",
    "slug": "greggs-jam-doughnut",
    "name": "Greggs Jam Doughnut",
    "searchName": "greggs jam doughnut",
    "displayName": "Greggs Jam Doughnut",
    "aliases": [
      "greggs jam doughnut",
      "greggs jam doughnut(s)"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 doughnut",
        "grams": 76,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 311,
      "protein": 1.6,
      "carbohydrates": 49,
      "fat": 10,
      "fiber": 17,
      "sugar": 20,
      "sodium": 3200,
      "saturatedFat": 4.6
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-yum-yum",
    "slug": "greggs-yum-yum",
    "name": "Greggs Yum Yum",
    "searchName": "greggs yum yum",
    "displayName": "Greggs Yum Yum",
    "aliases": [
      "greggs yum yum"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 yum yum",
        "grams": 78.2,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 396,
      "protein": 1.1,
      "carbohydrates": 44,
      "fat": 22,
      "fiber": 18,
      "sugar": 21,
      "sodium": 2800,
      "saturatedFat": 11
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-triple-chocolate-muffin",
    "slug": "greggs-triple-chocolate-muffin",
    "name": "Greggs Triple Chocolate Muffin",
    "searchName": "greggs triple chocolate muffin",
    "displayName": "Greggs Triple Chocolate Muffin",
    "aliases": [
      "greggs triple chocolate muffin"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 muffin",
        "grams": 129.4,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 348,
      "protein": 4.4,
      "carbohydrates": 45,
      "fat": 16,
      "fiber": 43,
      "sugar": 30,
      "sodium": 5600,
      "saturatedFat": 4
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-triple-chocolate-cookie",
    "slug": "greggs-triple-chocolate-cookie",
    "name": "Greggs Triple Chocolate Cookie",
    "searchName": "greggs triple chocolate cookie",
    "displayName": "Greggs Triple Chocolate Cookie",
    "aliases": [
      "greggs triple chocolate cookie",
      "greggs triple chocolate cookies"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 cookie",
        "grams": 70,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 476,
      "protein": 6.9,
      "carbohydrates": 52,
      "fat": 25,
      "fiber": 23,
      "sugar": 30,
      "sodium": 3200,
      "saturatedFat": 10
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-milk-chocolate-cookie",
    "slug": "greggs-milk-chocolate-cookie",
    "name": "Greggs Milk Chocolate Cookie",
    "searchName": "greggs milk chocolate cookie",
    "displayName": "Greggs Milk Chocolate Cookie",
    "aliases": [
      "greggs milk chocolate cookie",
      "greggs milk chocolate cookies"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 cookie",
        "grams": 70,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 490,
      "protein": 5.6,
      "carbohydrates": 54,
      "fat": 26,
      "fiber": 22,
      "sugar": 29,
      "sodium": 3200,
      "saturatedFat": 10
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-caramel-shortbread",
    "slug": "greggs-caramel-shortbread",
    "name": "Greggs Caramel Shortbread",
    "searchName": "greggs caramel shortbread",
    "displayName": "Greggs Caramel Shortbread",
    "aliases": [
      "greggs caramel shortbread",
      "greggs millionaire shortbread",
      "greggs milk chocolate caramel shortbreads"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 shortbread",
        "grams": 62,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 464,
      "protein": 0.7,
      "carbohydrates": 58,
      "fat": 23,
      "fiber": 30,
      "sugar": 43,
      "sodium": 2800,
      "saturatedFat": 12
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-vanilla-custard-slice",
    "slug": "greggs-vanilla-custard-slice",
    "name": "Greggs Vanilla Custard Slice",
    "searchName": "greggs vanilla custard slice",
    "displayName": "Greggs Vanilla Custard Slice",
    "aliases": [
      "greggs vanilla custard slice"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 slice",
        "grams": 129,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 246,
      "protein": 0.6,
      "carbohydrates": 38,
      "fat": 9,
      "fiber": 34,
      "sugar": 24,
      "sodium": 3200,
      "saturatedFat": 5.4
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-gingerbread-man",
    "slug": "greggs-gingerbread-man",
    "name": "Greggs Gingerbread Man",
    "searchName": "greggs gingerbread man",
    "displayName": "Greggs Gingerbread Man",
    "aliases": [
      "greggs gingerbread man",
      "greggs gingerbread men"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 gingerbread man",
        "grams": 42,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 420,
      "protein": 2.9,
      "carbohydrates": 71,
      "fat": 11,
      "fiber": 14,
      "sugar": 31,
      "sodium": 2000,
      "saturatedFat": 3.9
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-all-butter-croissant",
    "slug": "greggs-all-butter-croissant",
    "name": "Greggs All Butter Croissant",
    "searchName": "greggs all butter croissant",
    "displayName": "Greggs All Butter Croissant",
    "aliases": [
      "greggs all butter croissant"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 croissant",
        "grams": 79,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 370,
      "protein": 2.1,
      "carbohydrates": 44,
      "fat": 17,
      "fiber": 5,
      "sugar": 5.6,
      "sodium": 5600,
      "saturatedFat": 11
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-pain-au-chocolat",
    "slug": "greggs-pain-au-chocolat",
    "name": "Greggs Pain au Chocolat",
    "searchName": "greggs pain au chocolat",
    "displayName": "Greggs Pain au Chocolat",
    "aliases": [
      "greggs pain au chocolat"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 pain au chocolat",
        "grams": 79,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 378,
      "protein": 2.4,
      "carbohydrates": 44,
      "fat": 18,
      "fiber": 9,
      "sugar": 10,
      "sodium": 5200,
      "saturatedFat": 12
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-latte-regular",
    "slug": "greggs-latte-regular",
    "name": "Greggs Latte (Regular)",
    "searchName": "greggs latte (regular)",
    "displayName": "Greggs Latte (Regular)",
    "aliases": [
      "greggs latte (regular)",
      "greggs latte regular"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "cup",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "cup",
        "label": "1 regular",
        "grams": 326,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 35,
      "protein": 0,
      "carbohydrates": 4.1,
      "fat": 1,
      "fiber": 12,
      "sugar": 3.4,
      "sodium": 6400,
      "saturatedFat": 0.6
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-cappuccino-regular",
    "slug": "greggs-cappuccino-regular",
    "name": "Greggs Cappuccino (Regular)",
    "searchName": "greggs cappuccino (regular)",
    "displayName": "Greggs Cappuccino (Regular)",
    "aliases": [
      "greggs cappuccino (regular)",
      "greggs cappuccino regular"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "cup",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "cup",
        "label": "1 regular",
        "grams": 275,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 34,
      "protein": 0,
      "carbohydrates": 4.2,
      "fat": 0.8,
      "fiber": 9,
      "sugar": 3.1,
      "sodium": 5200,
      "saturatedFat": 0.5
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-flat-white",
    "slug": "greggs-flat-white",
    "name": "Greggs Flat White",
    "searchName": "greggs flat white",
    "displayName": "Greggs Flat White",
    "aliases": [
      "greggs flat white",
      "greggs flat white regular"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "cup",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "cup",
        "label": "1 regular",
        "grams": 222.6,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 32,
      "protein": 0,
      "carbohydrates": 3.9,
      "fat": 0.8,
      "fiber": 7,
      "sugar": 2.7,
      "sodium": 4400,
      "saturatedFat": 0.5
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-mocha-regular",
    "slug": "greggs-mocha-regular",
    "name": "Greggs Mocha (Regular)",
    "searchName": "greggs mocha (regular)",
    "displayName": "Greggs Mocha (Regular)",
    "aliases": [
      "greggs mocha (regular)",
      "greggs mocha regular"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "cup",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "cup",
        "label": "1 regular",
        "grams": 353,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 66,
      "protein": 0,
      "carbohydrates": 11,
      "fat": 1.5,
      "fiber": 33,
      "sugar": 8.4,
      "sodium": 5600,
      "saturatedFat": 1.2
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-hot-chocolate-regular",
    "slug": "greggs-hot-chocolate-regular",
    "name": "Greggs Hot Chocolate (Regular)",
    "searchName": "greggs hot chocolate (regular)",
    "displayName": "Greggs Hot Chocolate (Regular)",
    "aliases": [
      "greggs hot chocolate (regular)",
      "greggs hot chocolate regular"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "cup",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "cup",
        "label": "1 regular",
        "grams": 372,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 59,
      "protein": 0,
      "carbohydrates": 9.8,
      "fat": 1.4,
      "fiber": 33,
      "sugar": 8,
      "sodium": 5200,
      "saturatedFat": 1.1
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "greggs_greggs-iced-latte-regular",
    "slug": "greggs-iced-latte-regular",
    "name": "Greggs Iced Latte (Regular)",
    "searchName": "greggs iced latte (regular)",
    "displayName": "Greggs Iced Latte (Regular)",
    "aliases": [
      "greggs iced latte (regular)",
      "greggs iced latte regular"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Greggs Nutritional Information (November 2026)",
    "isEstimated": false,
    "defaultUnit": "cup",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "cup",
        "label": "1 regular",
        "grams": 460.9,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 27,
      "protein": 0,
      "carbohydrates": 2.8,
      "fat": 0.9,
      "fiber": 12,
      "sugar": 2.4,
      "sodium": 7200,
      "saturatedFat": 0.5
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-classic-super-club",
    "slug": "pret-classic-super-club",
    "name": "Pret Classic Super Club",
    "searchName": "pret classic super club",
    "displayName": "Pret Classic Super Club",
    "aliases": [
      "pret classic super club"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 sandwich",
        "grams": 227.3,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 227,
      "protein": 12.3,
      "carbohydrates": 15.8,
      "fat": 12.2,
      "fiber": 2.4,
      "sugar": 1.6,
      "sodium": 472,
      "saturatedFat": 2.1
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-free-range-egg-mayo-sandwich",
    "slug": "pret-free-range-egg-mayo-sandwich",
    "name": "Pret Free-Range Egg Mayo Sandwich",
    "searchName": "pret free-range egg mayo sandwich",
    "displayName": "Pret Free-Range Egg Mayo Sandwich",
    "aliases": [
      "pret free-range egg mayo sandwich"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 sandwich",
        "grams": 169.1,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 217,
      "protein": 10.9,
      "carbohydrates": 21.1,
      "fat": 9.2,
      "fiber": 3,
      "sugar": 1.1,
      "sodium": 344,
      "saturatedFat": 1.9
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-chicken-caesar-bacon-baguette",
    "slug": "pret-chicken-caesar-bacon-baguette",
    "name": "Pret Chicken Caesar & Bacon Baguette",
    "searchName": "pret chicken caesar & bacon baguette",
    "displayName": "Pret Chicken Caesar & Bacon Baguette",
    "aliases": [
      "pret chicken caesar & bacon baguette"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 baguette",
        "grams": 218.3,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 273,
      "protein": 13.9,
      "carbohydrates": 24.9,
      "fat": 12.7,
      "fiber": 2,
      "sugar": 1.5,
      "sodium": 480,
      "saturatedFat": 2.3
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-ham-cheese-sandwich",
    "slug": "pret-ham-cheese-sandwich",
    "name": "Pret Ham & Cheese Sandwich",
    "searchName": "pret ham & cheese sandwich",
    "displayName": "Pret Ham & Cheese Sandwich",
    "aliases": [
      "pret ham & cheese sandwich"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 sandwich",
        "grams": 188.7,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 275,
      "protein": 16.5,
      "carbohydrates": 18.6,
      "fat": 14.4,
      "fiber": 2.7,
      "sugar": 1.2,
      "sodium": 752,
      "saturatedFat": 8.6
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-tuna-cucumber-sandwich",
    "slug": "pret-tuna-cucumber-sandwich",
    "name": "Pret Tuna & Cucumber Sandwich",
    "searchName": "pret tuna & cucumber sandwich",
    "displayName": "Pret Tuna & Cucumber Sandwich",
    "aliases": [
      "pret tuna & cucumber sandwich"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 sandwich",
        "grams": 173.9,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 211,
      "protein": 11.3,
      "carbohydrates": 20.5,
      "fat": 8.7,
      "fiber": 2.7,
      "sugar": 1.8,
      "sodium": 312,
      "saturatedFat": 1.1
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-falafel-halloumi-hot-wrap",
    "slug": "pret-falafel-halloumi-hot-wrap",
    "name": "Pret Falafel & Halloumi Hot Wrap",
    "searchName": "pret falafel & halloumi hot wrap",
    "displayName": "Pret Falafel & Halloumi Hot Wrap",
    "aliases": [
      "pret falafel & halloumi hot wrap"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 wrap",
        "grams": 265.1,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 235,
      "protein": 8.4,
      "carbohydrates": 23.8,
      "fat": 11.1,
      "fiber": 3.1,
      "sugar": 5.7,
      "sodium": 544,
      "saturatedFat": 4.1
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-chicken-avocado-basil-sandwich",
    "slug": "pret-chicken-avocado-basil-sandwich",
    "name": "Pret Chicken, Avocado & Basil Sandwich",
    "searchName": "pret chicken, avocado & basil sandwich",
    "displayName": "Pret Chicken, Avocado & Basil Sandwich",
    "aliases": [
      "pret chicken, avocado & basil sandwich"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 sandwich",
        "grams": 233.3,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 204,
      "protein": 10.4,
      "carbohydrates": 15.4,
      "fat": 10.5,
      "fiber": 3.1,
      "sugar": 1.4,
      "sodium": 344,
      "saturatedFat": 2.2
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-all-butter-croissant",
    "slug": "pret-all-butter-croissant",
    "name": "Pret All Butter Croissant",
    "searchName": "pret all butter croissant",
    "displayName": "Pret All Butter Croissant",
    "aliases": [
      "pret all butter croissant"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 croissant",
        "grams": 71.2,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 409,
      "protein": 9.1,
      "carbohydrates": 38.8,
      "fat": 23.7,
      "fiber": 2.2,
      "sugar": 6.3,
      "sodium": 380,
      "saturatedFat": 16.2
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-almond-croissant",
    "slug": "pret-almond-croissant",
    "name": "Pret Almond Croissant",
    "searchName": "pret almond croissant",
    "displayName": "Pret Almond Croissant",
    "aliases": [
      "pret almond croissant"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 croissant",
        "grams": 90.1,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 424,
      "protein": 8.7,
      "carbohydrates": 43.2,
      "fat": 23.5,
      "fiber": 2.8,
      "sugar": 15.9,
      "sodium": 236,
      "saturatedFat": 11.9
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-chocolate-croissant",
    "slug": "pret-chocolate-croissant",
    "name": "Pret Chocolate Croissant",
    "searchName": "pret chocolate croissant",
    "displayName": "Pret Chocolate Croissant",
    "aliases": [
      "pret chocolate croissant"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 croissant",
        "grams": 86,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 407,
      "protein": 6.9,
      "carbohydrates": 38.8,
      "fat": 24,
      "fiber": 4.3,
      "sugar": 18.1,
      "sodium": 188,
      "saturatedFat": 14.3
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_prets-proper-porridge",
    "slug": "prets-proper-porridge",
    "name": "Pret's Proper Porridge",
    "searchName": "pret's proper porridge",
    "displayName": "Pret's Proper Porridge",
    "aliases": [
      "pret's proper porridge"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "serving",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "serving",
        "label": "1 pot",
        "grams": 300,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 72,
      "protein": 2.9,
      "carbohydrates": 7.9,
      "fat": 2.9,
      "fiber": 1.4,
      "sugar": 2.3,
      "sodium": 24,
      "saturatedFat": 1.6
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-kale-cauli-macaroni-cheese",
    "slug": "pret-kale-cauli-macaroni-cheese",
    "name": "Pret Kale & Cauli Macaroni Cheese",
    "searchName": "pret kale & cauli macaroni cheese",
    "displayName": "Pret Kale & Cauli Macaroni Cheese",
    "aliases": [
      "pret kale & cauli macaroni cheese"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "serving",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "serving",
        "label": "1 pot",
        "grams": 359.1,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 149,
      "protein": 7.1,
      "carbohydrates": 12.6,
      "fat": 7.4,
      "fiber": 1.4,
      "sugar": 1.7,
      "sodium": 192,
      "saturatedFat": 4.7
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-souper-tomato-soup",
    "slug": "pret-souper-tomato-soup",
    "name": "Pret Souper Tomato Soup",
    "searchName": "pret souper tomato soup",
    "displayName": "Pret Souper Tomato Soup",
    "aliases": [
      "pret souper tomato soup"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "serving",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "serving",
        "label": "1 pot",
        "grams": 361.5,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 39,
      "protein": 1.6,
      "carbohydrates": 4.1,
      "fat": 1.4,
      "fiber": 1.4,
      "sugar": 4,
      "sodium": 176,
      "saturatedFat": 0.1
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-chefs-italian-chicken-salad",
    "slug": "pret-chefs-italian-chicken-salad",
    "name": "Pret Chef's Italian Chicken Salad",
    "searchName": "pret chef's italian chicken salad",
    "displayName": "Pret Chef's Italian Chicken Salad",
    "aliases": [
      "pret chef's italian chicken salad"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 salad",
        "grams": 313.1,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 168,
      "protein": 8.1,
      "carbohydrates": 3.8,
      "fat": 13.2,
      "fiber": 1,
      "sugar": 3.3,
      "sodium": 292,
      "saturatedFat": 1.9
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-ultimate-breakfast-ciabatta",
    "slug": "pret-ultimate-breakfast-ciabatta",
    "name": "Pret Ultimate Breakfast Ciabatta",
    "searchName": "pret ultimate breakfast ciabatta",
    "displayName": "Pret Ultimate Breakfast Ciabatta",
    "aliases": [
      "pret ultimate breakfast ciabatta"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 ciabatta",
        "grams": 216.8,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 232,
      "protein": 11.9,
      "carbohydrates": 18.9,
      "fat": 11.7,
      "fiber": 1.8,
      "sugar": 3.3,
      "sodium": 472,
      "saturatedFat": 3.6
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-bacon-egg-mayo-breakfast-baguette",
    "slug": "pret-bacon-egg-mayo-breakfast-baguette",
    "name": "Pret Bacon & Egg Mayo Breakfast Baguette",
    "searchName": "pret bacon & egg mayo breakfast baguette",
    "displayName": "Pret Bacon & Egg Mayo Breakfast Baguette",
    "aliases": [
      "pret bacon & egg mayo breakfast baguette"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 baguette",
        "grams": 138.7,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 251,
      "protein": 11.9,
      "carbohydrates": 27.8,
      "fat": 9.9,
      "fiber": 1.4,
      "sugar": 1.1,
      "sodium": 544,
      "saturatedFat": 2.5
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-flat-white",
    "slug": "pret-flat-white",
    "name": "Pret Flat White",
    "searchName": "pret flat white",
    "displayName": "Pret Flat White",
    "aliases": [
      "pret flat white"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "cup",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "cup",
        "label": "1 cup",
        "grams": 264.9,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 37,
      "protein": 2.6,
      "carbohydrates": 3.8,
      "fat": 1.3,
      "fiber": 0,
      "sugar": 3.8,
      "sodium": 24,
      "saturatedFat": 0.8
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-latte",
    "slug": "pret-latte",
    "name": "Pret Latte",
    "searchName": "pret latte",
    "displayName": "Pret Latte",
    "aliases": [
      "pret latte"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "cup",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "cup",
        "label": "1 cup",
        "grams": 340,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 40,
      "protein": 2.8,
      "carbohydrates": 4.1,
      "fat": 1.3,
      "fiber": 0,
      "sugar": 4.1,
      "sodium": 16,
      "saturatedFat": 0.8
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-hot-chocolate",
    "slug": "pret-hot-chocolate",
    "name": "Pret Hot Chocolate",
    "searchName": "pret hot chocolate",
    "displayName": "Pret Hot Chocolate",
    "aliases": [
      "pret hot chocolate"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "cup",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "cup",
        "label": "1 cup",
        "grams": 320.8,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 77,
      "protein": 3.6,
      "carbohydrates": 11.1,
      "fat": 1.7,
      "fiber": 1.7,
      "sugar": 10.6,
      "sodium": 4,
      "saturatedFat": 1.1
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  },
  {
    "id": "pret_pret-chocolate-chunk-cookie",
    "slug": "pret-chocolate-chunk-cookie",
    "name": "Pret Chocolate Chunk Cookie",
    "searchName": "pret chocolate chunk cookie",
    "displayName": "Pret Chocolate Chunk Cookie",
    "aliases": [
      "pret chocolate chunk cookie"
    ],
    "category": "Restaurant Chains",
    "source": "local",
    "sourceLabel": "Pret A Manger UK product nutrition (November 2026)",
    "isEstimated": false,
    "defaultUnit": "piece",
    "defaultQuantity": 1,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "piece",
        "label": "1 cookie",
        "grams": 90,
        "isDefault": true
      },
      {
        "id": "serve_2",
        "unit": "g",
        "label": "100 g",
        "grams": 100
      }
    ],
    "nutrientsPer100g": {
      "calories": 471,
      "protein": 5.5,
      "carbohydrates": 59.1,
      "fat": 23,
      "fiber": 2.4,
      "sugar": 34.1,
      "sodium": 108,
      "saturatedFat": 14.1
    },
    "tags": [
      "restaurant-chains",
      "uk"
    ],
    "compareGroup": "Restaurant Chains"
  }
];
