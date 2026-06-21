import type { EngineWarning } from './warnings';
import type { SourceSummary } from './sourceTypes';
import type { EngineConfidence } from './confidence';
import type { EngineError } from './errors';

export interface EngineSuccess<T> {
  ok: true;
  data: T;
  warnings: EngineWarning[];
  sourceSummary: SourceSummary;
  confidence: EngineConfidence;
  meta?: any;
}

export interface EngineFailure {
  ok: false;
  error: EngineError;
  warnings: EngineWarning[];
  fallbackAvailable?: boolean;
  meta?: any;
}

export type EngineResult<T> = EngineSuccess<T> | EngineFailure;
