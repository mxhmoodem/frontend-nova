/**
 * Content Module Types
 * ====================
 * Type definitions for content hub data.
 * Used by: ContentHub page
 */

import type { FileType } from '../shared';

/**
 * Content document metadata
 */
export interface ContentDocument {
  id: string;
  title: string;
  description: string | null;
  source: string;
  file_type: FileType;
  file_size: number;
  author: string;
  category: string;
  created_at: string;
  updated_at: string;
}

/**
 * List of content documents
 */
export type ContentList = ContentDocument[];

/**
 * Request body for uploading content
 */
export interface ContentUploadRequest {
  file: File;
  title: string;
  description?: string;
  source: string;
  category: string;
}

/**
 * Response after successful upload
 */
export interface ContentUploadResponse {
  id: string;
  message: string;
  document: ContentDocument;
}
