// Final Launch Check Script

import { execSync } from 'child_process';

async function finalLaunchCheck() {
  console.log("======================================");
  console.log("🚀 FINAL LAUNCH READINESS CHECK");
  console.log("======================================\n");
  
  try {
    console.log("Running Validation...");
    execSync('node scripts/test-food-data-validation.mjs', { stdio: 'inherit' });
    console.log("");
    
    console.log("Running Security Boundaries...");
    execSync('node scripts/test-security-boundaries.mjs', { stdio: 'inherit' });
    console.log("");
    
    console.log("Running Golden Tests...");
    execSync('node scripts/test-nutrition-engine-golden.mjs', { stdio: 'inherit' });
    console.log("");
    
    console.log("======================================");
    console.log("✅ ALL AUTOMATED CHECKS PASSED");
    console.log("Please ensure final manual UI checks are done on the dev server.");
    console.log("Nutrition Engine V2 is ready for launch!");
    console.log("======================================");
  } catch (err) {
    console.error("❌ LAUNCH CHECK FAILED", err.message);
  }
}

finalLaunchCheck().catch(console.error);
