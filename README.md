# Food Nutrition Calculator

Premium US-focused nutrition calculator for foods, meals, recipes, comparisons, Nutrition Facts-style labels, and Learn guides.

## Core Principle

USDA/local deterministic nutrition data powers final calculations.
AI can assist parsing only.
Final nutrition totals are deterministic.

## Tech Stack

* Astro
* TypeScript
* Tailwind/CSS
* USDA FoodData Central API via server routes
* Provider-agnostic LLM parser layer

## Main Routes

* `/`
* `/calculator`
* `/recipe-nutrition-calculator`
* `/meal-calorie-calculator`
* `/compare-foods`
* `/foods`
* `/learn`
* `/about`
* `/privacy`
* `/terms`
* `/disclaimer`
* `/methodology`
* `/data-sources`

## API Routes

* `/api/foods/search`
* `/api/foods/details`
* `/api/parse-meal`

## Environment Variables

Copy `.env.example` to `.env.local` or `.env` and fill in the placeholders:

* `USDA_API_KEY=your_usda_api_key_here` (Needed for live USDA-first search)
* `LLM_PROVIDER=mock` (Optional, defaults to mock if not set)
* `LLM_TIMEOUT_MS=15000`
* `GEMINI_API_KEY=your_gemini_api_key_here` (Optional)
* `OPENAI_API_KEY=your_openai_api_key_here` (Optional)
* `DEEPSEEK_API_KEY=your_deepseek_api_key_here` (Optional)

Do not commit real keys to version control.

## Local Development Commands

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Deployment Notes

Ready for Vercel deployment:
* Set environment variables in Vercel project settings
* Connect domain
* Run build
* Verify sitemap and robots.txt
* Test API routes after deployment

## Safety Notes

* Nutrition values are estimates.
* This is not medical advice.
* AI parsing does not own nutrition totals.
* The Nutrition Facts-style label is for educational/informational purposes only and is not official commercial packaging compliance.

## Documentation Links

See the [docs](./docs) folder for detailed checklists, deployment guides, environment variables, manual testing plans, and phase progression details.
