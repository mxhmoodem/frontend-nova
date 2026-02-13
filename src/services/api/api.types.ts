export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiResponseType = 'json' | 'text' | 'blob';

export interface ApiRequestOptions<TBody = unknown> {
  method?: HttpMethod;
  baseUrl?: string;
  headers?: HeadersInit;
  body?: TBody;
  query?: Record<string, string | number | boolean | null | undefined>;
  signal?: AbortSignal;
  responseType?: ApiResponseType;
}

export interface ApiErrorDetails {
  status: number;
  message: string;
  url: string;
  details?: unknown;
}
