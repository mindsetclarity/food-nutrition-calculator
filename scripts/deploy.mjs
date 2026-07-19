import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const serverDir = path.join(rootDir, 'dist', 'server');

console.log('🚀 Building Astro project...');
execSync('npm run build', { stdio: 'inherit', cwd: rootDir });

console.log('☁️ Deploying to Cloudflare Workers...');
try {
  // Astro 5+ Cloudflare adapter natively outputs a Worker with Static Assets
  // The correct way to deploy is using `wrangler deploy` pointing to the generated config.
  execSync('npx wrangler deploy --config dist/server/wrangler.json', { stdio: 'inherit', cwd: rootDir });
  console.log('✅ Deployment successful!');
  console.log('\n⚠️ IMPORTANT: Astro SSR is now officially supported via Cloudflare Workers instead of Pages.');
  console.log('To use your custom domain (foodnutritioncalculator.com), go to the Cloudflare Dashboard:');
  console.log('1. Navigate to Workers & Pages -> foodnutritioncalculator-com');
  console.log('2. Go to Settings -> Triggers -> Custom Domains');
  console.log('3. Add your domains (foodnutritioncalculator.com and www.foodnutritioncalculator.com)');
} catch (error) {
  console.error('❌ Deployment failed.');
  process.exit(1);
}
