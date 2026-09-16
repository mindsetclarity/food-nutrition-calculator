# Fix Learn Footer and Learn Page Structure

## 1. Problem summary
The footer "Learn" section was overcrowded with specific article links (Calories, Macros, Food Labels, Serving Sizes), making it look like a messy blog menu rather than a clean site footer. These hardcoded links were also a source of page-not-found errors in the past. Additionally, the `/learn` page itself felt like an unstructured, unorganized list of articles rather than a professional educational hub, lacking clear guidance on where beginners should start or how the topics connect to the calculator tools.

## 2. Footer links removed
The following links were removed from the footer "Learn" section:
- Calories (`/learn/how-to-calculate-calories-in-food`)
- Macros (`/learn/calories-vs-macros`)
- Food Labels (`/learn/how-to-read-a-nutrition-facts-label`)
- Serving Sizes (`/learn/serving-size-vs-portion-size`)

The Learn column in the footer now only contains a single link: **Learn Hub** (`/learn`).

## 3. New Learn page structure
The `/learn` page (`LearnHubShell.astro`) was completely rebuilt with a premium, dashboard-like architecture:
- **Hero Section**: Eye-catching title with direct CTAs to start learning about calories or jump straight into the calculator.
- **Sticky Jump Links (Desktop)**: Easy navigation across the page sections.
- **Start Here Section**: 3 core beginner guides highlighted explicitly (Calories, Macros, Serving Sizes).
- **Learning Path Section**: A numbered, 5-step roadmap showing users exactly how to progress through the concepts.
- **Topic Categories Section**: Clean grid of topic cards showing counts and descriptions instead of messy chips.
- **Featured Guides Section**: High-contrast, premium cards for the most critical articles.
- **All Guides Section**: A clean grid displaying all available articles.
- **Tool-connected Learning Section**: Direct bridges from theoretical concepts (e.g., "Learn calories") to practical tools (e.g., "Use Food Calculator").
- **Trust/Safety Section**: A clear disclaimer emphasizing that the content is not medical advice.
- **Final CTA**: High-impact footer CTA to start using the tools.

## 4. Navigation improvements
- Removed confusing JavaScript-based filtering and messy chips in favor of a clean, scrollable structure.
- Added a sticky navigation bar on desktop with jump links to "Start Here", "Learning Path", "Categories", "Featured", and "All Guides".
- Integrated contextual tool links into every major section to bridge the gap between learning and calculating.

## 5. Article link validation
All article links were verified against `src/data/learnArticles.ts`. 
- Calories correctly maps to `/learn/how-to-calculate-calories-in-food`.
- Macros correctly maps to `/learn/calories-vs-macros`.
- Serving Sizes correctly maps to `/learn/serving-size-vs-portion-size`.
- Recipe calculators correctly map to `/learn/how-recipe-nutrition-calculators-work`.
No fake or 404 links were introduced.

## 6. Mobile checks
- The hero section uses `sm:flex-row` and `w-full` for CTAs to stack gracefully on mobile.
- Grids adapt from `grid-cols-1` on mobile to `md:grid-cols-2` or `lg:grid-cols-3/4` on wider screens.
- The sticky desktop nav is hidden on mobile (`hidden md:block`) to prevent vertical screen crowding.
- Start Here cards, Category cards, and Tool cards stack vertically on small screens.

## 7. Accessibility checks
- Page maintains a single semantic `<h1>`.
- Hierarchical `<h2>`, `<h3>`, and `<h4>` tags are used logically down the page.
- Focus states and color contrasts remain high (`text-ink-navy`, `bg-warm-ivory`).
- Removed JS logic means navigation is fully reliant on standard native HTML anchors and links, improving screen reader compatibility.

## 8. Build result
Validation build succeeded without errors. Route prerendering confirmed that all expected pages compile successfully.

## 9. Remaining TODOs
None. The UX fix meets all requirements.
