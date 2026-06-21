import type { EngineWarningCode, EngineWarning } from '../warnings';

// Extra warning codes for recipe
export type RecipeWarningCode = 
  | "RECIPE_EMPTY_INPUT"
  | "RECIPE_TOO_MANY_LINES"
  | "RECIPE_INVALID_SERVINGS"
  | "INGREDIENT_UNRESOLVED"
  | "INGREDIENT_NEEDS_REVIEW"
  | "INGREDIENT_QUANTITY_MISSING"
  | "INGREDIENT_UNIT_UNSUPPORTED"
  | "INGREDIENT_SOURCE_FALLBACK"
  | "RECIPE_PARTIAL_RESULT"
  | "RECIPE_LOW_CONFIDENCE"
  | "RECIPE_NO_RESOLVED_INGREDIENTS"
  | "RECIPE_NUTRIENT_DATA_PARTIAL";

export function createRecipeWarning(code: RecipeWarningCode, message: string): EngineWarning {
  let severity: "warning" | "info" | "critical" = "warning";
  if (code === "INGREDIENT_QUANTITY_MISSING" || code === "INGREDIENT_SOURCE_FALLBACK") {
    severity = "info";
  }
  if (code === "RECIPE_NO_RESOLVED_INGREDIENTS") {
    severity = "critical";
  }
  
  return {
    code: code as any, // type overlap
    message,
    severity,
    userVisible: true
  };
}
