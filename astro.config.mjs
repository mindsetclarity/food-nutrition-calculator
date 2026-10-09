import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://foodnutritioncalculator.com',
  output: 'server',
  adapter: cloudflare(),
  // URLs have no trailing slash everywhere (sitemap, canonicals, internal links).
  // The default directory format wrote foods/x/index.html, which Cloudflare's asset
  // server 307-redirected from /foods/x to /foods/x/, so every sitemap URL redirected
  // away from its own canonical. 'file' writes foods/x.html, served at /foods/x.
  trailingSlash: 'never',
  build: { format: 'file' },
  // Removed foods keep their old URLs alive. Paneer was dropped because USDA's only
  // record for it (22.5 g carbs/100 g) is far from real paneer.
  redirects: {
    '/foods/paneer': '/foods/palak-paneer',
    '/compare/naan-vs-paneer': '/foods/naan',
    '/compare/paneer-vs-roti-chapati': '/foods/roti-chapati',
    '/compare/paneer-vs-samosa': '/foods/samosa',
    '/compare/barfi-vs-paneer': '/foods/barfi',
  },
  // Sitemap is generated at runtime by src/pages/sitemap.xml.ts — @astrojs/sitemap
  // only sees prerendered routes under output: 'server', so it emitted a near-empty
  // sitemap-index.xml that competed with the real one.
  vite: {
    plugins: [tailwindcss()],
  },
});
