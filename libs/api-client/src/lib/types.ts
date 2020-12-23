export interface IApiClientConfig {
  baseUrl: string;
}

export interface IApiResponse<T> {
  data: T;
}
