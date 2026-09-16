export class UsdaApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UsdaApiError';
  }
}
