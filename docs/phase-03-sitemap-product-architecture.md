# Phase 3: Sitemap, Product Architecture & Route Strategy

## 1. Executive Summary
This document defines the comprehensive multipage architecture for the Food Nutrition Calculator. It organizes the platform into distinct, SEO-optimized clusters: Tools, Food Database, Education, and Legal. This architecture is designed to outperform single-page competitors by distributing user intent across highly specific landing pages while maintaining a unified, premium SaaS design language.

## 2. Product Architecture Principles
* **Luxurious & Trustworthy**: Every page utilizes high-end UI components, clear spacing, micro-animations, and explicit USDA/Local source badges.
* **Separation of Concerns**: Specific URLs for specific intents (e.g., `/recipe-nutrition-calculator` vs `/food-calorie-counter`).
* **SEO-Driven**: Intent-matched H1s, keyword targets, and internal linking to dominate US search traffic.
* **Deterministic Nutrition**: USDA is the primary truth; Local data is fallback; LLM is parsing-only.
* **Component Reusability**: Utilizing Astro components for headers, footers, and generic UI shells to keep the footprint small and performant.

## 3. Full Sitemap Table

| URL Path | Cluster | Page Type | Priority |
|---|---|---|---|
| `/` | Core | Landing / Gateway | Phase 4-10 |
| `/calculator` | Tools | Interactive Tool | Phase 4-10 |
| `/recipe-nutrition-calculator` | Tools | Interactive Tool | Phase 4-10 |
| `/food-calorie-counter` | Tools | Tool / SEO | Phase 11-20 |
| `/meal-calorie-calculator` | Tools | Tool / SEO | Phase 11-20 |
| `/compare-foods` | Tools | Interactive Tool | Phase 21-30 |
| `/foods` | Database | Index | Phase 11-20 |
| `/foods/[slug]` | Database | Dynamic Detail | Phase 11-20 |
| `/learn` | Education | Index | Phase 21-30 |
| `/learn/[slug]` | Education | Article Template | Phase 21-30 |
| `/about` | Trust | Content | Phase 11-20 |
| `/privacy` | Legal | Legal | Phase 11-20 |
| `/terms` | Legal | Legal | Phase 11-20 |
| `/disclaimer` | Legal | Legal | Phase 11-20 |
| `/macro-calculator` | Tools | Tool (Future) | V2 |
| `/protein-calculator` | Tools | Tool (Future) | V2 |
| `/calorie-deficit-calculator` | Tools | Tool (Future) | V2 |
| `/nutrition-facts-label-maker` | Tools | Tool (Future) | V2 |
| `/api-docs` | Info | Info (Future) | V2 |
| `/contact` | Contact | Contact | V2 |

## 4. Route-by-Route Strategy

### 1. `/` (Homepage)
* **Type**: Landing/Tool
* **Intent**: Gateway to tools; general calculation
* **SEO Target**: food nutrition calculator
* **Suggested H1**: Free & Accurate Food Nutrition Calculator
* **Sections**: Hero, Tool Preview, USPs, Top Foods, Learn Teaser
* **Data Needs**: Static content, quick search UI
* **Priority**: Phase 4-10

### 2. `/calculator`
* **Type**: Tool
* **Intent**: Core multi-item calculation
* **SEO Target**: food nutrition calculator, nutrition calculator
* **Suggested H1**: Food Nutrition Calculator
* **Sections**: Search box, Added List, Sticky Totals, Source Badges
* **Data Needs**: USDA search/details, Local fallback
* **Priority**: Phase 4-10

### 3. `/recipe-nutrition-calculator`
* **Type**: Tool
* **Intent**: Bulk ingredient parsing & recipe totals
* **SEO Target**: recipe nutrition calculator, recipe calorie calculator
* **Suggested H1**: Recipe Nutrition Calculator
* **Sections**: Paste Input, Servings Setter, Review Table, Nutrition Facts Label
* **Data Needs**: LLM (Parsing), USDA/Local (Math)
* **Priority**: Phase 4-10

### 4. `/food-calorie-counter`
* **Type**: Tool/Landing
* **Intent**: Simple single-food calorie check
* **SEO Target**: food calorie counter, calorie counter
* **Suggested H1**: Food Calorie Counter
* **Sections**: Focused search, quick result card
* **Data Needs**: USDA search/details
* **Priority**: Phase 11-20

### 5. `/meal-calorie-calculator`
* **Type**: Tool/Landing
* **Intent**: Build a full meal, macro tracking
* **SEO Target**: meal calorie calculator, meal nutrition calculator
* **Suggested H1**: Meal Calorie Calculator
* **Sections**: Meal builder, Pie charts for macros
* **Data Needs**: USDA search/details
* **Priority**: Phase 11-20

### 6. `/foods`
* **Type**: Database Landing
* **Intent**: Browse popular/US seed foods
* **SEO Target**: food nutrition facts, food calorie database
* **Suggested H1**: Food Nutrition Database
* **Sections**: Categories, A-Z Index, Search
* **Data Needs**: Local Dataset Index
* **Priority**: Phase 11-20

### 7. `/foods/[slug]`
* **Type**: Database Detail
* **Intent**: Deep dive into specific food stats
* **SEO Target**: [Food Name] nutrition facts, [Food Name] calories
* **Suggested H1**: Nutrition Facts for [Food Name]
* **Sections**: Overview, Macros, Micros, Related Foods, CTA to Calculator
* **Data Needs**: Local Dataset/USDA Cache
* **Priority**: Phase 11-20

### 8. `/compare-foods`
* **Type**: Interactive Tool
* **Intent**: Side-by-side macro comparison
* **SEO Target**: compare food nutrition, compare calories
* **Suggested H1**: Compare Food Nutrition
* **Sections**: Two search boxes, visual diff charts
* **Data Needs**: USDA search/details
* **Priority**: Phase 21-30

### 9. `/learn`
* **Type**: Content Index
* **Intent**: Read guides on macros/calories
* **SEO Target**: nutrition guides, calorie and macro guides
* **Suggested H1**: Nutrition & Diet Guides
* **Sections**: Featured articles, Categories
* **Data Needs**: Local MDX/Markdown
* **Priority**: Phase 21-30

### 10. `/learn/[slug]`
* **Type**: Content Article
* **Intent**: Education
* **SEO Target**: specific long-tail topic
* **Suggested H1**: [Article Title]
* **Sections**: Article body, FAQ, Tools CTA
* **Data Needs**: Local MDX
* **Priority**: Phase 21-30

### 11-14. Trust/Legal Pages (`/about`, `/privacy`, `/terms`, `/disclaimer`)
* **Type**: Legal/Trust
* **Intent**: Compliance, Trust building
* **Suggested H1s**: About Us, Privacy Policy, Terms of Service, Medical Disclaimer
* **Data Needs**: Static Text
* **Priority**: Phase 11-20

### 15-20. Future Pages (V2)
* Includes advanced tools (`/macro-calculator`, `/protein-calculator`, etc.) slated for future iterations.

## 5. Navigation Architecture
**Desktop Header**:
* Calculator | Recipe Analyzer | Foods | Compare | Learn
* Primary CTA: "Start Calculating"
* Secondary CTA: "Analyze Recipe"

**Mobile Header**:
* Clean Hamburger Menu Trigger -> Sliding Drawer
* Primary CTA "Calculate" visible on navbar

**Footer Structure**:
* **Tools**: Calculator, Recipe Analyzer, Compare, Calorie Counter
* **Database**: Browse Foods, Popular Foods
* **Learn**: Nutrition Guides, FAQ
* **Company**: About, Contact (V2)
* **Legal**: Privacy, Terms, Disclaimer

## 6. User Journeys
* **Journey 1 (Single Food)**: Home -> Calculator -> Search -> Quantity -> View Card
* **Journey 2 (Meal)**: Home -> Meal Calc -> Search/Add multiple -> View Dashboard
* **Journey 3 (Recipe)**: Home -> Recipe Calc -> Paste bulk -> Review mapping -> View Nutrition Label
* **Journey 4 (SEO Food Lookup)**: Google -> `/foods/apple` -> Read stats -> Click "Add to Calculator"
* **Journey 5 (Compare)**: Home -> Compare Foods -> Select Food A & B -> View Bar Charts
* **Journey 6 (Learn)**: Google -> `/learn/macros` -> Read -> Click "Calculate my macros"
* **Journey 7 (Trust)**: Tool -> Click USDA Badge -> Opens Tooltip/About page explaining data.

## 7. Component Architecture Plan (To be built in Astro/Tailwind)
* **Layouts**: `SiteLayout` (global wrapper)
* **Global**: `Header`, `Footer`, `MobileNav`
* **Shells**: `HeroSection`, `PageHeader`, `SectionShell`
* **Cards**: `ToolCard`, `FeatureCard`, `MacroCard`, `NutritionSummaryCard`
* **Inputs**: `FoodSearchBox`, `QuantityUnitInput`, `RecipeIngredientInput`
* **Data Vis**: `NutritionFactsLabel`, `AddedFoodList`, `IngredientReviewTable`, `FoodComparisonTable`
* **Trust UI**: `SourceBadge`, `TrustBadge`, `DisclaimerNote`
* **Utility**: `FAQSection`, `Breadcrumbs`, `SEOHead`, `LoadingState`, `ErrorMessage`, `EmptyState`

## 8. Data/API Architecture Plan
* **Local Data (`src/data/foods.ts`)**: Seed DB of top US foods, serving sizes, baseline nutrients, source flags.
* **Nutrition Engine (`src/lib/nutrition/`)**: Pure functions for math, unit conversion, deterministic rounding.
* **USDA Integration (`src/pages/api/foods/`)**: `search.ts` and `details.ts`. Reads server-side `USDA_API_KEY`. Fails over to Local Data.
* **LLM Integration (`src/pages/api/parse-meal.ts`)**: Accepts natural language. Returns JSON ingredient list. *Never overrides math.*

## 9. SEO Strategy
* **Keywords**: Intent-mapped globally as per route strategy.
* **Schemas**: 
  * `WebApplication` on tools.
  * `BreadcrumbList` on all subpages.
  * `FAQPage` on tools/learn pages.
  * `Article` on `/learn/[slug]`.

## 10. Internal Linking Strategy
* Contextual links from `/learn` articles directly to related calculators.
* `/foods/[slug]` pages always feature an "Add to Meal" or "Compare" CTA.
* Footer links distribute PageRank across the 5 core clusters.

## 11. Trust/Transparency Strategy
* **Source Badges**: Every row features a visual icon/tag (USDA, Local, LLM).
* **Estimates**: LLM-derived quantities are asterisked with a tooltip explaining AI estimation.
* **Disclaimer**: Persistent, tasteful footer medical disclaimer.

## 12. Mobile UX Strategy
* Bottom-sticky summary bar in calculators so totals remain visible while scrolling through search results.
* Large tap targets (min 44px) for unit selectors and buttons.
* Drawer-style mobile menus instead of clunky dropdowns.

## 13. Animation Strategy
* **Micro-interactions**: Hover lifts on cards, smooth scale-ins for modals.
* **Transitions**: Number counters animating upwards as foods are added.
* **Loading**: Elegant skeleton loaders instead of jarring spinners.

## 14. Accessibility Strategy
* ARIA labels on all search inputs and dynamic totals.
* Minimum 4.5:1 color contrast for text.
* Semantic HTML (Header > Nav > Main > Section).
* Keyboard navigable tables and ingredient review flows.

## 15. Performance Strategy
* **Static-First**: Marketing pages, `/foods`, and `/learn` rendered at build time.
* **Islands**: Calculators are interactive Astro Islands (`client:load` or `client:idle`).
* **Debouncing**: Search inputs debounced to prevent API spam.

## 16. Build Priority Roadmap
1. **Phase 4-10**: Core UI Shell, Tokens, Homepage, Basic Calculator, Recipe Interface.
2. **Phase 11-20**: USDA API, Local DB, Specific Tool pages (Meal, Single Food), Legal pages.
3. **Phase 21-30**: Compare Tool, Learn Hub, Animations, SEO Polish.

## 17. Phase 4 Implementation Recommendations
* Start by implementing `SiteLayout`, `Header`, and `Footer` in Astro using Tailwind v4.
* Define global design tokens (colors, typography) in CSS based on the luxury health-tech aesthetic.
* Scaffold the empty route files defined in Phase 4-10 to establish the router baseline.

## 18. Risks and Assumptions
* **USDA API Latency**: API may be slow; skeleton loaders will be critical.
* **Astro Islands State**: Sharing state between search components and total dashboards will require a lightweight client store (e.g., NanoStores).
* **LLM Consistency**: The natural language parser must be strictly typed to output consistent JSON, avoiding breaking the downstream deterministic nutrition engine.
