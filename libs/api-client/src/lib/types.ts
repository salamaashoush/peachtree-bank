export interface IApiClientConfig {
  baseUrl: string;
}

export interface IApiResponse<T> {
  data: T;
}

export type CurrencyCode = 'EUR' | 'USD';
