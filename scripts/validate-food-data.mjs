import { localFoods } from '../src/data/foods';
import { createFoodDataValidationReport } from '../src/lib/nutrition-engine/data/foodValidation';

console.log("Starting food data validation...");

try {
  const report = createFoodDataValidationReport(localFoods);
  
  console.log(`\n--- Validation Report ---`);
  console.log(`Total Foods: ${report.totalFoods}`);
  
  if (report.passed) {
    console.log("✅ All foods passed validation!");
  } else {
    console.log("❌ Validation failed.");
    console.log(`Total Errors: ${report.totalErrors}`);
    
    if (report.duplicatesIds.length > 0) {
      console.log(`Duplicate IDs (${report.duplicatesIds.length}):`, report.duplicatesIds);
    }
    
    if (report.duplicatesSlugs.length > 0) {
      console.log(`Duplicate Slugs (${report.duplicatesSlugs.length}):`, report.duplicatesSlugs);
    }
    
    if (report.errors.length > 0) {
      console.log(`\nDetailed Errors:`);
      report.errors.forEach(err => console.log(` - ${err}`));
    }
    
    process.exit(1);
  }
} catch (error) {
  console.error("Failed to run validation:", error);
  process.exit(1);
}
