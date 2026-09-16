# Launch Readiness Checklist

## Build
- [x] `npm run build` succeeds without errors
- [x] Static pages prerender correctly

## Environment variables
- [x] `.env.example` is complete
- [x] No secrets are hardcoded in the codebase

## Domain
- [ ] Domain is registered
- [ ] DNS settings point to Vercel

## Vercel deployment
- [ ] Vercel project created
- [ ] Environment variables configured in Vercel settings
- [ ] Deployment succeeded

## API routes
- [x] Endpoints respond correctly under load
- [x] No server-side errors exposed to client

## Tools
- [x] Calculator logic is stable
- [x] Recipe parsing is accurate
- [x] Meal builder computes totals accurately
- [x] Compare tool works for 2 foods

## SEO
- [x] Metadata tags are present
- [x] `sitemap.xml` generated
- [x] `robots.txt` generated and configured

## Mobile
- [x] No horizontal scrolling on mobile
- [x] Touch targets are adequately sized

## Accessibility
- [x] Keyboard navigation works
- [x] Focus states are visible
- [x] Screen reader labels exist for icon buttons

## Legal/trust
- [x] Privacy Policy is accurate
- [x] Terms of Service exist
- [x] Disclaimer clearly states "Not Medical Advice"

## Post-launch checks
- [ ] Run Lighthouse on live URL
- [ ] Check Google Search Console
