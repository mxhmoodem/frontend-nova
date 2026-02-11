/**
 * API Client
 * ==========
 * Core HTTP client for making API requests.
 * Built on top of fetch with error handling and type safety.
 */

import { API_BASE_URL, API_TIMEOUT, DEFAULT_HEADERS } from './config';
import type { ApiError } from './types';

// ============================================================================
// ERROR CLASSES
// ============================================================================

export class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

// ============================================================================
// REQUEST OPTIONS
// ============================================================================

export interface RequestOptions {
  headers?: HeadersInit;
  timeout?: number;
  signal?: AbortSignal;
  params?: Record<string, string | number | boolean | undefined>;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function buildUrl(endpoint: string, params?: RequestOptions['params']): string {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

function createTimeoutController(timeout: number): AbortController {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  return controller;
}

async function parseErrorResponse(response: Response): Promise<ApiError> {
  try {
    const errorData = await response.json();
    return {
      detail: errorData.detail || 'An unexpected error occurred',
      status: response.status,
      code: errorData.code,
    };
  } catch {
    return {
      detail: `HTTP Error: ${response.status} ${response.statusText}`,
      status: response.status,
    };
  }
}

// ============================================================================
// API CLIENT
// ============================================================================

export const apiClient = {
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { headers, timeout = API_TIMEOUT, signal, params } = options;
    const timeoutController = createTimeoutController(timeout);
    const url = buildUrl(endpoint, params);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { ...DEFAULT_HEADERS, ...headers },
        signal: signal || timeoutController.signal,
      });

      if (!response.ok) {
        const error = await parseErrorResponse(response);
        throw new ApiClientError(error.detail, response.status, error.code);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      if (error instanceof ApiClientError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiClientError('Request timed out', 408, 'TIMEOUT');
      }
      throw new ApiClientError(
        'Network error occurred',
        0,
        'NETWORK_ERROR',
        error
      );
    }
  },

  async post<T>(
    endpoint: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const { headers, timeout = API_TIMEOUT, signal, params } = options;
    const timeoutController = createTimeoutController(timeout);
    const url = buildUrl(endpoint, params);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { ...DEFAULT_HEADERS, ...headers },
        body: body ? JSON.stringify(body) : undefined,
        signal: signal || timeoutController.signal,
      });

      if (!response.ok) {
        const error = await parseErrorResponse(response);
        throw new ApiClientError(error.detail, response.status, error.code);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      if (error instanceof ApiClientError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiClientError('Request timed out', 408, 'TIMEOUT');
      }
      throw new ApiClientError(
        'Network error occurred',
        0,
        'NETWORK_ERROR',
        error
      );
    }
  },

  async patch<T>(
    endpoint: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const { headers, timeout = API_TIMEOUT, signal, params } = options;
    const timeoutController = createTimeoutController(timeout);
    const url = buildUrl(endpoint, params);

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { ...DEFAULT_HEADERS, ...headers },
        body: body ? JSON.stringify(body) : undefined,
        signal: signal || timeoutController.signal,
      });

      if (!response.ok) {
        const error = await parseErrorResponse(response);
        throw new ApiClientError(error.detail, response.status, error.code);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      if (error instanceof ApiClientError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiClientError('Request timed out', 408, 'TIMEOUT');
      }
      throw new ApiClientError(
        'Network error occurred',
        0,
        'NETWORK_ERROR',
        error
      );
    }
  },

  async put<T>(
    endpoint: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const { headers, timeout = API_TIMEOUT, signal, params } = options;
    const timeoutController = createTimeoutController(timeout);
    const url = buildUrl(endpoint, params);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { ...DEFAULT_HEADERS, ...headers },
        body: body ? JSON.stringify(body) : undefined,
        signal: signal || timeoutController.signal,
      });

      if (!response.ok) {
        const error = await parseErrorResponse(response);
        throw new ApiClientError(error.detail, response.status, error.code);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      if (error instanceof ApiClientError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiClientError('Request timed out', 408, 'TIMEOUT');
      }
      throw new ApiClientError(
        'Network error occurred',
        0,
        'NETWORK_ERROR',
        error
      );
    }
  },

  async delete<T = void>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { headers, timeout = API_TIMEOUT, signal, params } = options;
    const timeoutController = createTimeoutController(timeout);
    const url = buildUrl(endpoint, params);

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { ...DEFAULT_HEADERS, ...headers },
        signal: signal || timeoutController.signal,
      });

      if (!response.ok) {
        const error = await parseErrorResponse(response);
        throw new ApiClientError(error.detail, response.status, error.code);
      }

      const text = await response.text();
      return text ? JSON.parse(text) : (undefined as T);
    } catch (error) {
      if (error instanceof ApiClientError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiClientError('Request timed out', 408, 'TIMEOUT');
      }
      throw new ApiClientError(
        'Network error occurred',
        0,
        'NETWORK_ERROR',
        error
      );
    }
  },

  async upload<T>(
    endpoint: string,
    formData: FormData,
    options: RequestOptions = {}
  ): Promise<T> {
    const { headers, timeout = API_TIMEOUT * 2, signal, params } = options;
    const timeoutController = createTimeoutController(timeout);
    const url = buildUrl(endpoint, params);
    const uploadHeaders = { ...headers };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: uploadHeaders,
        body: formData,
        signal: signal || timeoutController.signal,
      });

      if (!response.ok) {
        const error = await parseErrorResponse(response);
        throw new ApiClientError(error.detail, response.status, error.code);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      if (error instanceof ApiClientError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiClientError('Upload timed out', 408, 'TIMEOUT');
      }
      throw new ApiClientError(
        'Network error occurred',
        0,
        'NETWORK_ERROR',
        error
      );
    }
  },

  async download(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<Blob> {
    const { headers, timeout = API_TIMEOUT * 2, signal, params } = options;
    const timeoutController = createTimeoutController(timeout);
    const url = buildUrl(endpoint, params);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { ...headers },
        signal: signal || timeoutController.signal,
      });

      if (!response.ok) {
        const error = await parseErrorResponse(response);
        throw new ApiClientError(error.detail, response.status, error.code);
      }

      return response.blob();
    } catch (error) {
      if (error instanceof ApiClientError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiClientError('Download timed out', 408, 'TIMEOUT');
      }
      throw new ApiClientError(
        'Network error occurred',
        0,
        'NETWORK_ERROR',
        error
      );
    }
  },
};
