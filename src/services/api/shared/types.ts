/**
 * Shared API Types
 * ================
 * Common type definitions used across all API modules.
 */

/**
 * Standard API error response from backend
 */
export interface ApiError {
  detail: string;
  status?: number;
  code?: string;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Pagination parameters for list endpoints
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/**
 * Common file types used across the application
 */
export type FileType = 'pdf' | 'docx' | 'csv' | 'xlsx' | 'pptx' | 'json';
