/**
 * Content Module Types
 * ====================
 * Type definitions for content hub data.
 * Used by: ContentHub page
 */

import type { FileType } from '../shared';

/**
 * Backend content type categories
 */
export type ContentType = 'market' | 'legislation' | 'insight';

/**
 * Content document metadata - matches backend model fields
 */
export interface ContentDocument {
  id: string;
  title: string;
  description: string | null;
  source: string;
  file_type: FileType;
  content_type: ContentType;
  created_at: string;
  updated_at: string;
  file_size?: number; // File size in bytes (available after upload)
  uploaded_by?: string;
}

/**
 * Paginated list response from GET /content/
 */
export interface ContentListResponse {
  message: string;
  content_type: string;
  page: number;
  page_size: number;
  total: number;
  data: ContentDocument[];
}

/**
 * @deprecated Use ContentListResponse instead
 */
export type ContentList = ContentDocument[];

/**
 * Request body for uploading content - multipart form fields
 * Maps to: POST /content/
 */
export interface ContentUploadRequest {
  file: File;
  title: string;
  description?: string;
  content_type: ContentType;
}

/**
 * Response after successful upload
 * Backend returns: { message, id, file_size }
 */
export interface ContentUploadResponse {
  message: string;
  id: string;
  file_size: number;
}
