import { ApiErrorDetails, ApiRequestOptions } from './api.types';

const DEFAULT_BASE_URL =
  (import.meta as ImportMeta).env?.VITE_API_BASE_URL ??
  'http://localhost:8000/api/v1';

export class ApiError extends Error {
  public readonly status: number;
  public readonly url: string;
  public readonly details?: unknown;

  constructor({ status, message, url, details }: ApiErrorDetails) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.url = url;
    this.details = details;
  }
}

const normalizeBaseUrl = (baseUrl: string) =>
  baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

const isFormData = (body: unknown): body is FormData =>
  typeof FormData !== 'undefined' && body instanceof FormData;

const isBlob = (body: unknown): body is Blob =>
  typeof Blob !== 'undefined' && body instanceof Blob;

const isArrayBuffer = (body: unknown): body is ArrayBuffer =>
  typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer;

const buildUrl = (
  path: string,
  baseUrl: string,
  query?: ApiRequestOptions['query']
) => {
  const sanitizedPath = path.replace(/^\/+/, '');
  const url = new URL(sanitizedPath, normalizeBaseUrl(baseUrl));

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
};

const resolveBody = (body: unknown) => {
  if (body === undefined || body === null) {
    return { body: undefined, contentType: undefined };
  }

  if (isFormData(body) || isBlob(body) || isArrayBuffer(body)) {
    return { body: body as BodyInit, contentType: undefined };
  }

  if (typeof body === 'string') {
    return { body, contentType: 'text/plain' };
  }

  if (body instanceof URLSearchParams) {
    return { body, contentType: 'application/x-www-form-urlencoded' };
  }

  return { body: JSON.stringify(body), contentType: 'application/json' };
};

const parseResponse = async (
  response: Response,
  responseType: ApiRequestOptions['responseType']
) => {
  if (response.status === 204) {
    return undefined;
  }

  if (responseType === 'blob') {
    return response.blob();
  }

  const rawText = await response.text();
  if (!rawText) return undefined;

  if (responseType === 'text') {
    return rawText;
  }

  try {
    return JSON.parse(rawText);
  } catch {
    return rawText;
  }
};

const resolveResponseType = (
  response: Response,
  explicitType?: ApiRequestOptions['responseType']
) => {
  if (explicitType) return explicitType;
  const contentType = response.headers.get('content-type') ?? '';
  return contentType.includes('application/json') ? 'json' : 'text';
};

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const url = buildUrl(path, options.baseUrl ?? DEFAULT_BASE_URL, options.query);
  const { body, contentType } = resolveBody(options.body);
  const headers = new Headers(options.headers);

  if (contentType && !headers.has('Content-Type')) {
    headers.set('Content-Type', contentType);
  }

  const response = await fetch(url, {
    method: options.method ?? 'GET',
    headers,
    body,
    signal: options.signal,
  });

  const responseType = resolveResponseType(response, options.responseType);
  const payload = await parseResponse(response, responseType);

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'detail' in payload
        ? String((payload as { detail?: unknown }).detail)
        : `Request failed with status ${response.status}`;

    throw new ApiError({
      status: response.status,
      message,
      url,
      details: payload,
    });
  }

  return payload as T;
}

export const api = {
  get: <T>(path: string, options?: ApiRequestOptions) =>
    apiRequest<T>(path, { ...options, method: 'GET' }),
  post: <T, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: ApiRequestOptions<TBody>
  ) => apiRequest<T>(path, { ...options, method: 'POST', body }),
  put: <T, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: ApiRequestOptions<TBody>
  ) => apiRequest<T>(path, { ...options, method: 'PUT', body }),
  patch: <T, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: ApiRequestOptions<TBody>
  ) => apiRequest<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options?: ApiRequestOptions) =>
    apiRequest<T>(path, { ...options, method: 'DELETE' }),
};
