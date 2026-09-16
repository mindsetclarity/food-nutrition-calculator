import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://foodnutritioncalculator.com',
  output: 'server',
  adapter: cloudflare(),
  // Sitemap is generated at runtime by src/pages/sitemap.xml.ts — @astrojs/sitemap
  // only sees prerendered routes under output: 'server', so it emitted a near-empty
  // sitemap-index.xml that competed with the real one.
  vite: {
    plugins: [tailwindcss()],
  },
});
