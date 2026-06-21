export function createRequestToken(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export class StaleRequestGuard {
  private latestToken: string | null = null;

  public markRequestStarted(): string {
    const token = createRequestToken();
    this.latestToken = token;
    return token;
  }

  public isLatestRequest(token: string): boolean {
    return this.latestToken === token;
  }

  public shouldIgnoreStaleResponse(token: string): boolean {
    return !this.isLatestRequest(token);
  }
}

export function createStaleGuard(): StaleRequestGuard {
  return new StaleRequestGuard();
}
