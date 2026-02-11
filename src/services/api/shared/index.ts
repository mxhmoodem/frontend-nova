/**
 * Shared Module
 * =============
 * Re-exports all shared utilities for API modules.
 */

// Configuration
export {
  API_CONFIG,
  CURRENT_ENV,
  API_BASE_URL,
  API_TIMEOUT,
  DEFAULT_HEADERS,
  QUERY_CONFIG,
} from './config';

// HTTP Client
export { apiClient, ApiClientError } from './client';
export type { RequestOptions } from './client';

// React Query
export { queryClient } from './queryClient';
export { QueryProvider } from './queryProvider';

// Types
export type {
  ApiError,
  ApiResponse,
  PaginationParams,
  PaginatedResponse,
  FileType,
} from './types';
