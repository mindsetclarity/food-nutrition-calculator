export class RequestDeduper<T> {
  private inFlight: Map<string, Promise<T>> = new Map();

  /**
   * Deduplicate identical async requests happening concurrently.
   * If a request with the given key is already in flight, it returns the same promise.
   * Otherwise, it executes the factory, stores the promise, and clears it when done.
   */
  public async dedupeRequest(key: string, asyncFactory: () => Promise<T>): Promise<T> {
    if (this.inFlight.has(key)) {
      return this.inFlight.get(key)!;
    }

    const promise = asyncFactory().finally(() => {
      this.inFlight.delete(key);
    });

    this.inFlight.set(key, promise);
    return promise;
  }

  public clearInFlight(key?: string): void {
    if (key) {
      this.inFlight.delete(key);
    } else {
      this.inFlight.clear();
    }
  }

  public getInFlightCount(): number {
    return this.inFlight.size;
  }
}

export function createRequestDeduper<T>(): RequestDeduper<T> {
  return new RequestDeduper<T>();
}
