import { parseQuantityText } from '../src/lib/nutrition-engine/quantity/parseQuantity';
import { resolveServingToGrams } from '../src/lib/nutrition-engine/quantity/servingResolver';

const mockBanana = {
  id: "fruit-banana",
  displayName: "Banana",
  source: "curated_us",
  servingSizes: [
    { id: "100g", label: "100 g", grams: 100, unit: "g", quantity: 100 },
    { id: "medium", label: "1 medium, 118 g", grams: 118, unit: "medium", quantity: 1, isDefault: true }
  ]
};

const mockOats = {
  id: "grain-oats",
  displayName: "Rolled Oats",
  source: "curated_us",
  servingSizes: [
    { id: "100g", label: "100 g", grams: 100, unit: "g", quantity: 100 },
    { id: "cup", label: "1/2 cup dry, 40g", grams: 40, unit: "cup", quantity: 0.5, isDefault: true }
  ]
};

const mockMilk = {
  id: "dairy-milk",
  displayName: "Whole Milk",
  source: "curated_us",
  density: 1.03, // g/ml
  servingSizes: [
    { id: "100g", label: "100 g", grams: 100, unit: "g", quantity: 100 }
  ]
};

const testCases = [
  { text: "100 g oats", food: mockOats },
  { text: "1 medium banana", food: mockBanana },
  { text: "1 cup cooked rice", food: mockOats }, // Using oats just for structure
  { text: "1/2 cup rolled oats", food: mockOats },
  { text: "1 oz almonds", food: mockOats },
  { text: "banana", food: mockBanana },
  { text: "-1 cup rice", food: mockOats },
  { text: "1 1/2 cups milk", food: mockMilk }
];

console.log("--- Testing Quantity Engine ---\n");

for (const tc of testCases) {
  console.log(`Input: "${tc.text}"`);
  
  const parseResult = parseQuantityText(tc.text);
  const { amount, unit } = parseResult.parsed;
  console.log(` Parsed: ${amount} '${unit}'`);
  
  const resolved = resolveServingToGrams({
    food: tc.food,
    amount,
    unit
  });
  
  console.log(` Resolved Grams: ${resolved.grams}g (${resolved.servingLabel || "no label"})`);
  console.log(` Confidence: ${resolved.confidence.level}`);
  if (resolved.warnings.length > 0) {
    console.log(` Warnings: ${resolved.warnings.map(w => w.message).join(' | ')}`);
  }
  console.log("------------------------------");
}
