interface PerfNote {
  label: string;
  durationMs: number;
  timestamp: number;
}

let metricsEnabled = false;
const internalNotes: PerfNote[] = [];

export function enablePerformanceMetrics() {
  metricsEnabled = true;
}

export function disablePerformanceMetrics() {
  metricsEnabled = false;
}

export function startTimer(label: string): number {
  if (!metricsEnabled) return 0;
  return performance.now();
}

export function endTimer(label: string, start: number): void {
  if (!metricsEnabled || start === 0) return;
  const durationMs = performance.now() - start;
  createPerformanceNote(label, durationMs);
}

export async function measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
  const start = startTimer(label);
  try {
    return await fn();
  } finally {
    endTimer(label, start);
  }
}

export function createPerformanceNote(label: string, durationMs: number): void {
  if (!metricsEnabled) return;
  internalNotes.push({
    label,
    durationMs,
    timestamp: Date.now()
  });
  
  // Keep only last 100
  if (internalNotes.length > 100) {
    internalNotes.shift();
  }
}

export function getPerformanceNotes(): PerfNote[] {
  return [...internalNotes];
}
