import { execSync } from 'child_process';
import path from 'path';

console.log("======================================");
console.log("Food Data Validation");
console.log("======================================\n");

try {
  const result = execSync('npx tsx scripts/validate-food-data.mjs', { stdio: 'inherit' });
} catch (e) {
  process.exit(1);
}
