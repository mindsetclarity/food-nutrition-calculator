import type { FoodItem } from '../../lib/nutrition/types';

// Traditional UK foods from the UK government's CoFID 2021 (McCance and Widdowson's Composition of
// Foods Integrated Dataset, gov.uk). Values are per 100 g; CoFID publishes no portion weights.
export const britishFoods: FoodItem[] = [
  {
    "id": "cofid_12-496",
    "slug": "halloumi",
    "name": "Halloumi",
    "searchName": "halloumi",
    "displayName": "Halloumi",
    "aliases": [
      "halloumi",
      "cheese, halloumi"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 313,
      "protein": 23.9,
      "carbohydrates": 1.7,
      "fat": 23.5,
      "fiber": 0,
      "sugar": 1.7,
      "sodium": 1200,
      "saturatedFat": 16.58,
      "cholesterol": 63
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 12-496: Cheese, Halloumi"
  },
  {
    "id": "cofid_11-989",
    "slug": "crumpet-toasted",
    "name": "Crumpet (Toasted)",
    "searchName": "crumpet (toasted)",
    "displayName": "Crumpet (Toasted)",
    "aliases": [
      "crumpet (toasted)",
      "crumpets, toasted",
      "crumpets"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 207,
      "protein": 6.9,
      "carbohydrates": 45.4,
      "fat": 1,
      "fiber": 3.1,
      "sugar": 3.1,
      "sodium": 1029,
      "saturatedFat": 0.1,
      "cholesterol": 0
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-989: Crumpets, toasted"
  },
  {
    "id": "cofid_11-799",
    "slug": "digestive-biscuit",
    "name": "Digestive Biscuit",
    "searchName": "digestive biscuit",
    "displayName": "Digestive Biscuit",
    "aliases": [
      "digestive biscuit",
      "biscuits, digestive, plain",
      "digestives"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 463,
      "protein": 6.2,
      "carbohydrates": 65.6,
      "fat": 21.3,
      "fiber": 3.8,
      "sugar": 17.5,
      "sodium": 561,
      "saturatedFat": 7.71,
      "cholesterol": 2.4
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-799: Biscuits, digestive, plain"
  },
  {
    "id": "cofid_11-807",
    "slug": "chocolate-digestive-biscuit",
    "name": "Chocolate Digestive Biscuit",
    "searchName": "chocolate digestive biscuit",
    "displayName": "Chocolate Digestive Biscuit",
    "aliases": [
      "chocolate digestive biscuit",
      "biscuits, digestive, half coated in chocolate",
      "chocolate digestives"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 488,
      "protein": 6.3,
      "carbohydrates": 61.8,
      "fat": 25.7,
      "fiber": 2.1,
      "sugar": 24.3,
      "sodium": 351,
      "saturatedFat": 12.68,
      "cholesterol": 6.1
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-807: Biscuits, digestive, half coated in chocolate"
  },
  {
    "id": "cofid_11-739",
    "slug": "jaffa-cakes",
    "name": "Jaffa Cakes",
    "searchName": "jaffa cakes",
    "displayName": "Jaffa Cakes",
    "aliases": [
      "jaffa cakes",
      "jaffa cake"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 354,
      "protein": 4.4,
      "carbohydrates": 69.3,
      "fat": 8.5,
      "fiber": 1.5,
      "sugar": 51.6,
      "sodium": 85,
      "saturatedFat": 4.33,
      "cholesterol": 9.4
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-739: Jaffa cakes"
  },
  {
    "id": "cofid_11-813",
    "slug": "cream-sandwich-biscuit-custard-cream",
    "name": "Cream Sandwich Biscuit (Custard Cream)",
    "searchName": "cream sandwich biscuit (custard cream)",
    "displayName": "Cream Sandwich Biscuit (Custard Cream)",
    "aliases": [
      "cream sandwich biscuit (custard cream)",
      "biscuits, sandwich, cream",
      "custard cream",
      "custard creams",
      "bourbon biscuit"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 477,
      "protein": 5,
      "carbohydrates": 65.8,
      "fat": 23.3,
      "fiber": 3.1,
      "sugar": 29.9,
      "sodium": 188,
      "saturatedFat": 13.31,
      "cholesterol": 2.7
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-813: Biscuits, sandwich, cream"
  },
  {
    "id": "cofid_11-797",
    "slug": "semi-sweet-biscuit-rich-tea",
    "name": "Semi-Sweet Biscuit (Rich Tea)",
    "searchName": "semi-sweet biscuit (rich tea)",
    "displayName": "Semi-Sweet Biscuit (Rich Tea)",
    "aliases": [
      "semi-sweet biscuit (rich tea)",
      "biscuits, semi-sweet",
      "rich tea",
      "rich tea biscuit",
      "marie biscuit"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 444,
      "protein": 6.4,
      "carbohydrates": 75.4,
      "fat": 15.1,
      "fiber": 2.7,
      "sugar": 20.3,
      "sodium": 358,
      "saturatedFat": 5.08,
      "cholesterol": 4.9
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-797: Biscuits, semi-sweet"
  },
  {
    "id": "cofid_11-814",
    "slug": "flapjack",
    "name": "Flapjack",
    "searchName": "flapjack",
    "displayName": "Flapjack",
    "aliases": [
      "flapjack",
      "flapjacks, retail",
      "flapjacks"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 434,
      "protein": 5.1,
      "carbohydrates": 55.7,
      "fat": 22.8,
      "fiber": 5.2,
      "sugar": 29.2,
      "sodium": 194,
      "saturatedFat": 10.25,
      "cholesterol": 25
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-814: Flapjacks, retail"
  },
  {
    "id": "cofid_11-827",
    "slug": "plain-scone",
    "name": "Plain Scone",
    "searchName": "plain scone",
    "displayName": "Plain Scone",
    "aliases": [
      "plain scone",
      "scones, plain, retail",
      "scone",
      "scones"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 346,
      "protein": 7.2,
      "carbohydrates": 55.2,
      "fat": 12.3,
      "fiber": 2.2,
      "sugar": 12.7,
      "sodium": 592,
      "saturatedFat": 6.37,
      "cholesterol": 35.4
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-827: Scones, plain, retail"
  },
  {
    "id": "cofid_11-993",
    "slug": "fruit-scone",
    "name": "Fruit Scone",
    "searchName": "fruit scone",
    "displayName": "Fruit Scone",
    "aliases": [
      "fruit scone",
      "scones, fruit, retail",
      "fruit scones"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 338,
      "protein": 6.5,
      "carbohydrates": 56.2,
      "fat": 11.2,
      "fiber": 2.9,
      "sugar": 18.9,
      "sodium": 400,
      "saturatedFat": 6.3,
      "cholesterol": 5.8
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-993: Scones, fruit, retail"
  },
  {
    "id": "cofid_11-1084",
    "slug": "hot-cross-bun",
    "name": "Hot Cross Bun",
    "searchName": "hot cross bun",
    "displayName": "Hot Cross Bun",
    "aliases": [
      "hot cross bun",
      "hot cross buns, homemade",
      "hot cross buns"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 312,
      "protein": 7.3,
      "carbohydrates": 58.3,
      "fat": 5.8,
      "fiber": 1.9,
      "sugar": 23.4,
      "sodium": 77,
      "saturatedFat": 1.95,
      "cholesterol": 20.1
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-1084: Hot cross buns, homemade"
  },
  {
    "id": "cofid_11-848",
    "slug": "mince-pie-uk-retail",
    "name": "Mince Pie (UK Retail)",
    "searchName": "mince pie (uk retail)",
    "displayName": "Mince Pie (UK Retail)",
    "aliases": [
      "mince pie (uk retail)",
      "mince pies, retail",
      "mince pies uk"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 377,
      "protein": 3.8,
      "carbohydrates": 60.7,
      "fat": 14.9,
      "fiber": 2.6,
      "sugar": 35.5,
      "sodium": 101,
      "saturatedFat": 5.97,
      "cholesterol": 11.9
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-848: Mince pies, retail"
  },
  {
    "id": "cofid_11-1022",
    "slug": "christmas-pudding",
    "name": "Christmas Pudding",
    "searchName": "christmas pudding",
    "displayName": "Christmas Pudding",
    "aliases": [
      "christmas pudding",
      "pudding, christmas, retail",
      "christmas pud",
      "plum pudding"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 285,
      "protein": 3,
      "carbohydrates": 56.3,
      "fat": 6.9,
      "fiber": 4,
      "sugar": 46.2,
      "sodium": 100,
      "saturatedFat": 3.57,
      "cholesterol": 36
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-1022: Pudding, Christmas, retail"
  },
  {
    "id": "cofid_11-835",
    "slug": "battenberg-cake",
    "name": "Battenberg Cake",
    "searchName": "battenberg cake",
    "displayName": "Battenberg Cake",
    "aliases": [
      "battenberg cake",
      "cake, battenberg, retail",
      "battenberg"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 354,
      "protein": 4.4,
      "carbohydrates": 65.9,
      "fat": 9.9,
      "fiber": 1.5,
      "sugar": 56.8,
      "sodium": 137,
      "saturatedFat": 3.08,
      "cholesterol": 5.9
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-835: Cake, battenberg, retail"
  },
  {
    "id": "cofid_11-838",
    "slug": "eccles-cake",
    "name": "Eccles Cake",
    "searchName": "eccles cake",
    "displayName": "Eccles Cake",
    "aliases": [
      "eccles cake",
      "eccles cakes, retail",
      "eccles cakes"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 365,
      "protein": 4.4,
      "carbohydrates": 48.8,
      "fat": 18.3,
      "fiber": 3.6,
      "sugar": 34,
      "sodium": 221,
      "saturatedFat": 9.4,
      "cholesterol": 22.9
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-838: Eccles cakes, retail"
  },
  {
    "id": "cofid_11-845",
    "slug": "bakewell-tart",
    "name": "Bakewell Tart",
    "searchName": "bakewell tart",
    "displayName": "Bakewell Tart",
    "aliases": [
      "bakewell tart",
      "tarts, bakewell, iced, retail",
      "iced bakewell tart",
      "cherry bakewell"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 411,
      "protein": 3.1,
      "carbohydrates": 65.9,
      "fat": 16.8,
      "fiber": 1.1,
      "sugar": 45.2,
      "sodium": 132,
      "saturatedFat": 6.94,
      "cholesterol": 3.6
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-845: Tarts, bakewell, iced, retail"
  },
  {
    "id": "cofid_11-1055",
    "slug": "apple-crumble",
    "name": "Apple Crumble",
    "searchName": "apple crumble",
    "displayName": "Apple Crumble",
    "aliases": [
      "apple crumble",
      "crumble, apple, homemade",
      "crumble"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 201,
      "protein": 1.7,
      "carbohydrates": 35,
      "fat": 6.4,
      "fiber": 0.8,
      "sugar": 23.4,
      "sodium": 64,
      "saturatedFat": 2.09,
      "cholesterol": 0.9
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-1055: Crumble, apple, homemade"
  },
  {
    "id": "cofid_11-960",
    "slug": "yorkshire-pudding",
    "name": "Yorkshire Pudding",
    "searchName": "yorkshire pudding",
    "displayName": "Yorkshire Pudding",
    "aliases": [
      "yorkshire pudding",
      "yorkshire pudding, made with semi-skimmed milk, homemade",
      "yorkshire puddings",
      "yorkies"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 197,
      "protein": 6.7,
      "carbohydrates": 25.6,
      "fat": 8.3,
      "fiber": 1.1,
      "sugar": 3.5,
      "sodium": 52,
      "saturatedFat": 1.89,
      "cholesterol": 52.3
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-960: Yorkshire pudding, made with semi-skimmed milk, homemade"
  },
  {
    "id": "cofid_13-491",
    "slug": "jacket-potato",
    "name": "Jacket Potato",
    "searchName": "jacket potato",
    "displayName": "Jacket Potato",
    "aliases": [
      "jacket potato",
      "potatoes, old, baked, flesh and skin",
      "baked potato with skin",
      "jacket potatoes"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 97,
      "protein": 2.5,
      "carbohydrates": 22.6,
      "fat": 0.2,
      "fiber": 2.6,
      "sugar": 1.4,
      "sodium": 2,
      "saturatedFat": 0.1,
      "cholesterol": 0
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 13-491: Potatoes, old, baked, flesh and skin"
  },
  {
    "id": "cofid_13-485",
    "slug": "chip-shop-chips",
    "name": "Chip Shop Chips",
    "searchName": "chip shop chips",
    "displayName": "Chip Shop Chips",
    "aliases": [
      "chip shop chips",
      "potato chips, fried in commercial oil, from takeaway fish and chip shops",
      "chips",
      "fish and chip shop chips",
      "takeaway chips"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 214,
      "protein": 3.5,
      "carbohydrates": 33.2,
      "fat": 8.4,
      "fiber": 3.2,
      "sugar": 0.6,
      "sodium": 16,
      "saturatedFat": 4.29,
      "cholesterol": 0.9
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 13-485: Potato chips, fried in commercial oil, from takeaway fish and chip shops"
  },
  {
    "id": "cofid_16-368",
    "slug": "battered-cod-chip-shop",
    "name": "Battered Cod (Chip Shop)",
    "searchName": "battered cod (chip shop)",
    "displayName": "Battered Cod (Chip Shop)",
    "aliases": [
      "battered cod (chip shop)",
      "cod, in batter, fried, takeaway",
      "cod in batter",
      "fish and chips cod",
      "battered fish"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 240,
      "protein": 16.8,
      "carbohydrates": 10.7,
      "fat": 14.7,
      "fiber": 0.5,
      "sugar": 1,
      "sodium": 175,
      "saturatedFat": 7.58,
      "cholesterol": 60.4
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 16-368: Cod, in batter, fried, takeaway"
  },
  {
    "id": "cofid_16-495",
    "slug": "battered-haddock",
    "name": "Battered Haddock",
    "searchName": "battered haddock",
    "displayName": "Battered Haddock",
    "aliases": [
      "battered haddock",
      "haddock, in batter, fried in retail blend oil",
      "haddock in batter"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 232,
      "protein": 17.1,
      "carbohydrates": 10,
      "fat": 14,
      "fiber": 0.4,
      "sugar": 0,
      "sodium": 180,
      "saturatedFat": 7.22,
      "cholesterol": 58
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 16-495: Haddock, in batter, fried in retail blend oil"
  },
  {
    "id": "cofid_13-563",
    "slug": "mushy-peas",
    "name": "Mushy Peas",
    "searchName": "mushy peas",
    "displayName": "Mushy Peas",
    "aliases": [
      "mushy peas",
      "peas, mushy, canned, re-heated"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 81,
      "protein": 5.8,
      "carbohydrates": 13.8,
      "fat": 0.7,
      "fiber": 3.1,
      "sugar": 1.7,
      "sodium": 220,
      "saturatedFat": 0.1,
      "cholesterol": 0
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 13-563: Peas, mushy, canned, re-heated"
  },
  {
    "id": "cofid_16-405",
    "slug": "fish-fingers-grilled",
    "name": "Fish Fingers (Grilled)",
    "searchName": "fish fingers (grilled)",
    "displayName": "Fish Fingers (Grilled)",
    "aliases": [
      "fish fingers (grilled)",
      "fish fingers, cod, grilled/baked",
      "fish fingers",
      "fish sticks"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 223,
      "protein": 14.3,
      "carbohydrates": 22,
      "fat": 9.2,
      "fiber": 2,
      "sugar": 1.5,
      "sodium": 317,
      "saturatedFat": 1.19,
      "cholesterol": 36
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 16-405: Fish fingers, cod, grilled/baked"
  },
  {
    "id": "cofid_16-397",
    "slug": "kippers-grilled",
    "name": "Kippers (Grilled)",
    "searchName": "kippers (grilled)",
    "displayName": "Kippers (Grilled)",
    "aliases": [
      "kippers (grilled)",
      "kippers, flesh only, grilled",
      "kipper",
      "kippers"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 245,
      "protein": 21.7,
      "carbohydrates": 0,
      "fat": 17.6,
      "fiber": 0,
      "sugar": 0,
      "sodium": 947,
      "saturatedFat": 3.74,
      "cholesterol": 65
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 16-397: Kippers, flesh only, grilled"
  },
  {
    "id": "cofid_19-466",
    "slug": "cornish-pasty",
    "name": "Cornish Pasty",
    "searchName": "cornish pasty",
    "displayName": "Cornish Pasty",
    "aliases": [
      "cornish pasty",
      "cornish pasty, retail",
      "pasty",
      "cornish pasties"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 278,
      "protein": 7,
      "carbohydrates": 24,
      "fat": 17.8,
      "fiber": 2.9,
      "sugar": 2.1,
      "sodium": 470,
      "saturatedFat": 8.53,
      "cholesterol": 13
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-466: Cornish pasty, retail"
  },
  {
    "id": "cofid_19-518",
    "slug": "scotch-egg",
    "name": "Scotch Egg",
    "searchName": "scotch egg",
    "displayName": "Scotch Egg",
    "aliases": [
      "scotch egg",
      "scotch eggs, retail",
      "scotch eggs"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 241,
      "protein": 12,
      "carbohydrates": 13.1,
      "fat": 16,
      "fiber": 1.7,
      "sugar": 0,
      "sodium": 330,
      "saturatedFat": 4.3,
      "cholesterol": 165
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-518: Scotch eggs, retail"
  },
  {
    "id": "cofid_19-468",
    "slug": "sausage-roll-uk-retail",
    "name": "Sausage Roll (UK Retail)",
    "searchName": "sausage roll (uk retail)",
    "displayName": "Sausage Roll (UK Retail)",
    "aliases": [
      "sausage roll (uk retail)",
      "sausage roll, flaky pastry, ready-to-eat, retail",
      "sausage rolls uk"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 352,
      "protein": 8.4,
      "carbohydrates": 27,
      "fat": 24.1,
      "fiber": 3.4,
      "sugar": 1.3,
      "sodium": 577,
      "saturatedFat": 10.36,
      "cholesterol": null
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-468: Sausage roll, flaky pastry, ready-to-eat, retail"
  },
  {
    "id": "cofid_19-467",
    "slug": "pork-pie",
    "name": "Pork Pie",
    "searchName": "pork pie",
    "displayName": "Pork Pie",
    "aliases": [
      "pork pie",
      "pork pie, individual",
      "pork pies"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 370,
      "protein": 9.9,
      "carbohydrates": 25.7,
      "fat": 26,
      "fiber": 2.9,
      "sugar": 1.5,
      "sodium": 542,
      "saturatedFat": 10.12,
      "cholesterol": 34.7
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-467: Pork pie, individual"
  },
  {
    "id": "cofid_19-515",
    "slug": "chicken-pie",
    "name": "Chicken Pie",
    "searchName": "chicken pie",
    "displayName": "Chicken Pie",
    "aliases": [
      "chicken pie",
      "pie, chicken, individual, baked",
      "chicken pie individual"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 288,
      "protein": 9,
      "carbohydrates": 24.6,
      "fat": 17.7,
      "fiber": 1.7,
      "sugar": 1.6,
      "sodium": 270,
      "saturatedFat": 7,
      "cholesterol": 32
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-515: Pie, chicken, individual, baked"
  },
  {
    "id": "cofid_19-629",
    "slug": "steak-and-kidney-pie",
    "name": "Steak and Kidney Pie",
    "searchName": "steak and kidney pie",
    "displayName": "Steak and Kidney Pie",
    "aliases": [
      "steak and kidney pie",
      "pie, steak and kidney, double crust, homemade",
      "steak & kidney pie"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 305,
      "protein": 14.6,
      "carbohydrates": 22.2,
      "fat": 18.1,
      "fiber": 1.8,
      "sugar": 0.9,
      "sodium": 263,
      "saturatedFat": 8.53,
      "cholesterol": 81.6
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-629: Pie, steak and kidney, double crust, homemade"
  },
  {
    "id": "cofid_19-575",
    "slug": "cottage-pie",
    "name": "Cottage Pie",
    "searchName": "cottage pie",
    "displayName": "Cottage Pie",
    "aliases": [
      "cottage pie",
      "pie, cottage, homemade"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 126,
      "protein": 6.3,
      "carbohydrates": 10.4,
      "fat": 6.3,
      "fiber": 1.3,
      "sugar": 1.6,
      "sodium": 155,
      "saturatedFat": 2.36,
      "cholesterol": 15.6
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-575: Pie, Cottage, homemade"
  },
  {
    "id": "cofid_19-635",
    "slug": "toad-in-the-hole",
    "name": "Toad in the Hole",
    "searchName": "toad in the hole",
    "displayName": "Toad in the Hole",
    "aliases": [
      "toad in the hole",
      "toad in the hole, homemade"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 285,
      "protein": 12,
      "carbohydrates": 20.2,
      "fat": 17.9,
      "fiber": 2.4,
      "sugar": 3.3,
      "sodium": 334,
      "saturatedFat": 6.56,
      "cholesterol": 94.6
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-635: Toad in the hole, homemade"
  },
  {
    "id": "cofid_19-601",
    "slug": "lancashire-hotpot",
    "name": "Lancashire Hotpot",
    "searchName": "lancashire hotpot",
    "displayName": "Lancashire Hotpot",
    "aliases": [
      "lancashire hotpot",
      "lancashire hotpot, homemade",
      "hotpot"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 119,
      "protein": 7.3,
      "carbohydrates": 7.4,
      "fat": 6.9,
      "fiber": 1.1,
      "sugar": 1.4,
      "sodium": 115,
      "saturatedFat": 2.96,
      "cholesterol": 27.4
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-601: Lancashire hotpot, homemade"
  },
  {
    "id": "cofid_19-114",
    "slug": "black-pudding-fried",
    "name": "Black Pudding (Fried)",
    "searchName": "black pudding (fried)",
    "displayName": "Black Pudding (Fried)",
    "aliases": [
      "black pudding (fried)",
      "black pudding, dry-fried",
      "black pudding"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 297,
      "protein": 10.3,
      "carbohydrates": 16.6,
      "fat": 21.5,
      "fiber": 0.2,
      "sugar": 0.2,
      "sodium": 940,
      "saturatedFat": 8.5,
      "cholesterol": 68
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-114: Black pudding, dry-fried"
  },
  {
    "id": "cofid_19-132",
    "slug": "haggis",
    "name": "Haggis",
    "searchName": "haggis",
    "displayName": "Haggis",
    "aliases": [
      "haggis",
      "haggis, boiled",
      "haggis boiled"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 310,
      "protein": 10.7,
      "carbohydrates": 19.2,
      "fat": 21.7,
      "fiber": 0.2,
      "sugar": 0,
      "sodium": 770,
      "saturatedFat": 7.6,
      "cholesterol": 91
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-132: Haggis, boiled"
  },
  {
    "id": "cofid_19-509",
    "slug": "british-pork-sausage-grilled",
    "name": "British Pork Sausage (Grilled)",
    "searchName": "british pork sausage (grilled)",
    "displayName": "British Pork Sausage (Grilled)",
    "aliases": [
      "british pork sausage (grilled)",
      "sausages, pork, chilled, grilled",
      "bangers",
      "pork sausages uk"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 294,
      "protein": 14.5,
      "carbohydrates": 9.8,
      "fat": 22.1,
      "fiber": 2.3,
      "sugar": 1.5,
      "sodium": 640,
      "saturatedFat": 8,
      "cholesterol": 53
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-509: Sausages, pork, chilled, grilled"
  },
  {
    "id": "cofid_19-500",
    "slug": "back-bacon-grilled",
    "name": "Back Bacon (Grilled)",
    "searchName": "back bacon (grilled)",
    "displayName": "Back Bacon (Grilled)",
    "aliases": [
      "back bacon (grilled)",
      "bacon rashers, back, grilled",
      "back bacon",
      "bacon rasher",
      "bacon rashers"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 287,
      "protein": 23.2,
      "carbohydrates": 0,
      "fat": 21.6,
      "fiber": 0,
      "sugar": 0,
      "sodium": 1390,
      "saturatedFat": 8.1,
      "cholesterol": 75
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-500: Bacon rashers, back, grilled"
  },
  {
    "id": "cofid_19-296",
    "slug": "chicken-tikka-masala",
    "name": "Chicken Tikka Masala",
    "searchName": "chicken tikka masala",
    "displayName": "Chicken Tikka Masala",
    "aliases": [
      "chicken tikka masala",
      "curry, chicken tikka masala, retail, reheated",
      "tikka masala",
      "ctm"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 156,
      "protein": 12.4,
      "carbohydrates": 4.9,
      "fat": 9.8,
      "fiber": 1.4,
      "sugar": 3.6,
      "sodium": 220,
      "saturatedFat": 3.3,
      "cholesterol": 46.2
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-296: Curry, chicken tikka masala, retail, reheated"
  },
  {
    "id": "cofid_19-565",
    "slug": "chicken-korma",
    "name": "Chicken Korma",
    "searchName": "chicken korma",
    "displayName": "Chicken Korma",
    "aliases": [
      "chicken korma",
      "curry, chicken korma, homemade",
      "korma"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 127,
      "protein": 14.6,
      "carbohydrates": 4.6,
      "fat": 5.1,
      "fiber": 0.7,
      "sugar": 2.8,
      "sodium": 68,
      "saturatedFat": 1.15,
      "cholesterol": 53.1
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-565: Curry, chicken korma, homemade"
  },
  {
    "id": "cofid_15-828",
    "slug": "onion-bhaji",
    "name": "Onion Bhaji",
    "searchName": "onion bhaji",
    "displayName": "Onion Bhaji",
    "aliases": [
      "onion bhaji",
      "pakora/bhajia, onion, fried in vegetable oil, homemade",
      "onion bhajis",
      "onion pakora"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 270,
      "protein": 11.2,
      "carbohydrates": 24.6,
      "fat": 14.7,
      "fiber": 5.7,
      "sugar": 3.4,
      "sodium": 15,
      "saturatedFat": 1.09,
      "cholesterol": 0
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 15-828: Pakora/bhajia, onion, fried in vegetable oil, homemade"
  },
  {
    "id": "cofid_19-526",
    "slug": "doner-kebab-in-pitta",
    "name": "Doner Kebab in Pitta",
    "searchName": "doner kebab in pitta",
    "displayName": "Doner Kebab in Pitta",
    "aliases": [
      "doner kebab in pitta",
      "doner kebab in pitta bread with salad",
      "doner kebab",
      "kebab"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 248,
      "protein": 14.1,
      "carbohydrates": 12.5,
      "fat": 16,
      "fiber": 0.9,
      "sugar": 1.1,
      "sodium": null,
      "saturatedFat": 7.54,
      "cholesterol": 47
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-526: Doner kebab in pitta bread with salad"
  },
  {
    "id": "cofid_19-324",
    "slug": "sweet-and-sour-chicken-takeaway",
    "name": "Sweet and Sour Chicken (Takeaway)",
    "searchName": "sweet and sour chicken (takeaway)",
    "displayName": "Sweet and Sour Chicken (Takeaway)",
    "aliases": [
      "sweet and sour chicken (takeaway)",
      "sweet and sour chicken, takeaway",
      "sweet and sour chicken"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 194,
      "protein": 7.6,
      "carbohydrates": 19.7,
      "fat": 10,
      "fiber": null,
      "sugar": 10.7,
      "sodium": 259,
      "saturatedFat": 1.29,
      "cholesterol": 23.5
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-324: Sweet and sour chicken, takeaway"
  },
  {
    "id": "cofid_19-321",
    "slug": "chicken-chow-mein-takeaway",
    "name": "Chicken Chow Mein (Takeaway)",
    "searchName": "chicken chow mein (takeaway)",
    "displayName": "Chicken Chow Mein (Takeaway)",
    "aliases": [
      "chicken chow mein (takeaway)",
      "chow mein, chicken, takeaway",
      "chicken chow mein",
      "chow mein"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 147,
      "protein": 8.5,
      "carbohydrates": 12.7,
      "fat": 7.2,
      "fiber": 1.5,
      "sugar": 0.3,
      "sodium": 466,
      "saturatedFat": 1.17,
      "cholesterol": 13.4
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-321: Chow mein, chicken, takeaway"
  },
  {
    "id": "cofid_11-1023",
    "slug": "prawn-crackers",
    "name": "Prawn Crackers",
    "searchName": "prawn crackers",
    "displayName": "Prawn Crackers",
    "aliases": [
      "prawn crackers",
      "prawn crackers, takeaway",
      "prawn crackers takeaway"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 570,
      "protein": 0.3,
      "carbohydrates": 58.2,
      "fat": 39,
      "fiber": 0.9,
      "sugar": 2.2,
      "sodium": 767,
      "saturatedFat": 3.64,
      "cholesterol": 0.3
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-1023: Prawn crackers, takeaway"
  },
  {
    "id": "cofid_19-327",
    "slug": "spring-rolls-takeaway",
    "name": "Spring Rolls (Takeaway)",
    "searchName": "spring rolls (takeaway)",
    "displayName": "Spring Rolls (Takeaway)",
    "aliases": [
      "spring rolls (takeaway)",
      "spring rolls, meat, takeaway",
      "spring roll",
      "meat spring rolls"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 242,
      "protein": 6.5,
      "carbohydrates": 18.2,
      "fat": 16.4,
      "fiber": 2,
      "sugar": 1.8,
      "sodium": 485,
      "saturatedFat": 3.81,
      "cholesterol": 7.4
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 19-327: Spring rolls, meat, takeaway"
  },
  {
    "id": "cofid_12-602",
    "slug": "welsh-rarebit",
    "name": "Welsh Rarebit",
    "searchName": "welsh rarebit",
    "displayName": "Welsh Rarebit",
    "aliases": [
      "welsh rarebit",
      "welsh rarebit, homemade"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 398,
      "protein": 13.9,
      "carbohydrates": 23.1,
      "fat": 28.4,
      "fiber": 1.2,
      "sugar": 2.4,
      "sodium": 592,
      "saturatedFat": 17.38,
      "cholesterol": 73.8
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 12-602: Welsh rarebit, homemade"
  },
  {
    "id": "cofid_15-703",
    "slug": "bubble-and-squeak",
    "name": "Bubble and Squeak",
    "searchName": "bubble and squeak",
    "displayName": "Bubble and Squeak",
    "aliases": [
      "bubble and squeak",
      "bubble and squeak, fried in sunflower oil, homemade"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 128,
      "protein": 1.7,
      "carbohydrates": 10.2,
      "fat": 9.1,
      "fiber": 1.9,
      "sugar": 1.6,
      "sodium": 3,
      "saturatedFat": 1.11,
      "cholesterol": 0
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 15-703: Bubble and squeak, fried in sunflower oil, homemade"
  },
  {
    "id": "cofid_11-823",
    "slug": "oatcakes",
    "name": "Oatcakes",
    "searchName": "oatcakes",
    "displayName": "Oatcakes",
    "aliases": [
      "oatcakes",
      "oatcakes, plain, retail",
      "oatcake",
      "scottish oatcakes"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 453,
      "protein": 9.3,
      "carbohydrates": 62.8,
      "fat": 20,
      "fiber": 9.4,
      "sugar": 3.2,
      "sodium": 796,
      "saturatedFat": 5.67,
      "cholesterol": 4.9
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 11-823: Oatcakes, plain, retail"
  },
  {
    "id": "cofid_12-936",
    "slug": "quiche-lorraine",
    "name": "Quiche Lorraine",
    "searchName": "quiche lorraine",
    "displayName": "Quiche Lorraine",
    "aliases": [
      "quiche lorraine",
      "quiche, lorraine, shortcrust pastry, retail",
      "quiche"
    ],
    "category": "British Foods",
    "source": "local",
    "sourceLabel": "UK CoFID 2021 (McCance and Widdowson's)",
    "isEstimated": false,
    "defaultUnit": "g",
    "defaultQuantity": 100,
    "servingSizes": [
      {
        "id": "serve_1",
        "unit": "g",
        "label": "100 g",
        "grams": 100,
        "isDefault": true
      }
    ],
    "nutrientsPer100g": {
      "calories": 269,
      "protein": 9.1,
      "carbohydrates": 19.7,
      "fat": 17.6,
      "fiber": 1.3,
      "sugar": 3.2,
      "sodium": 339,
      "saturatedFat": 8.31,
      "cholesterol": 79.6
    },
    "tags": [
      "british-foods",
      "uk"
    ],
    "compareGroup": "British Foods",
    "notes": "CoFID 2021 food code 12-936: Quiche, Lorraine, shortcrust pastry, retail"
  }
];
