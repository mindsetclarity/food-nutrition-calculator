# Deployment Guide

## 1. Prerequisites
- GitHub account with the project repository
- Vercel account
- USDA FoodData Central API key
- (Optional) LLM Provider API keys

## 2. Local build check
Run `npm run build` locally to verify the build process. Fix any errors before pushing to the repository.

## 3. Required env variables
Ensure you have values for the following (do not commit these!):
- `USDA_API_KEY`
- Relevant LLM keys if using an active LLM provider (e.g. `GEMINI_API_KEY`)

## 4. Vercel project setup
1. Log in to Vercel.
2. Click "Add New..." -> "Project".
3. Import the GitHub repository.
4. Expand "Environment Variables" and paste your production keys.
5. Click "Deploy".

## 5. Domain setup
1. In the Vercel project dashboard, go to "Settings" -> "Domains".
2. Add `foodnutritioncalculator.com`.
3. Configure your DNS provider to point the domain to Vercel as instructed.

## 6. Post-deploy route checks
Verify the following routes on the live domain:
- `/`
- `/calculator`
- `/recipe-nutrition-calculator`
- `/compare-foods`
- `/sitemap.xml`

## 7. Post-deploy API checks
Test a food search to ensure the USDA API is returning data via your Vercel serverless functions.

## 8. Common deployment issues
- **API routes returning 500:** Check if `USDA_API_KEY` is missing in Vercel settings.
- **Missing images or styles:** Ensure `base` config in `astro.config.mjs` is correct if applicable (usually `/` by default).

## 9. Rollback note
If the deployment breaks, you can easily roll back to a previous working deployment in Vercel's "Deployments" tab.
