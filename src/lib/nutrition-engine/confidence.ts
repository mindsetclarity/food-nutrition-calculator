export interface EngineConfidence {
  level: "high" | "medium" | "low";
  score?: number;
  reasons: string[];
  needsReview: boolean;
}

export function highConfidence(reasons?: string[]): EngineConfidence {
  return {
    level: "high",
    reasons: reasons || [],
    needsReview: false,
  };
}

export function mediumConfidence(reasons?: string[]): EngineConfidence {
  return {
    level: "medium",
    reasons: reasons || [],
    needsReview: true,
  };
}

export function lowConfidence(reasons?: string[]): EngineConfidence {
  return {
    level: "low",
    reasons: reasons || [],
    needsReview: true,
  };
}

export function mergeConfidence(confidences: EngineConfidence[]): EngineConfidence {
  let hasLow = false;
  let hasMedium = false;
  let needsReview = false;
  const reasons: string[] = [];

  for (const conf of confidences) {
    if (conf.level === "low") hasLow = true;
    if (conf.level === "medium") hasMedium = true;
    if (conf.needsReview) needsReview = true;
    reasons.push(...conf.reasons);
  }

  const uniqueReasons = Array.from(new Set(reasons));

  if (hasLow) {
    return { level: "low", reasons: uniqueReasons, needsReview };
  } else if (hasMedium) {
    return { level: "medium", reasons: uniqueReasons, needsReview };
  } else {
    return { level: "high", reasons: uniqueReasons, needsReview };
  }
}

export function confidenceNeedsReview(confidence: EngineConfidence): boolean {
  return confidence.needsReview || confidence.level === "low";
}
