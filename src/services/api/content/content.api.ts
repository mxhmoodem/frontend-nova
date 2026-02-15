/**
 * Content API Service
 * ===================
 * Handles all content hub related API calls.
 * Used by: ContentHub page
 */

import { apiClient } from '../shared';
import { CONTENT_ENDPOINTS } from './content.endpoints';
import type {
  ContentDocument,
  ContentList,
  ContentUploadRequest,
  ContentUploadResponse,
} from './content.types';

export const contentApi = {
  /**
   * Get all content documents
   */
  getAll: async (): Promise<ContentList> => {
    return apiClient.get<ContentList>(CONTENT_ENDPOINTS.list);
  },

  /**
   * Get a specific content document by ID
   */
  getById: async (id: string): Promise<ContentDocument> => {
    return apiClient.get<ContentDocument>(CONTENT_ENDPOINTS.byId(id));
  },

  /**
   * Download a document file
   */
  download: async (id: string): Promise<Blob> => {
    return apiClient.download(CONTENT_ENDPOINTS.download(id));
  },

  /**
   * Upload a new document
   */
  upload: async (
    data: ContentUploadRequest
  ): Promise<ContentUploadResponse> => {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('title', data.title);
    formData.append('source', data.source);
    formData.append('category', data.category);

    if (data.description) {
      formData.append('description', data.description);
    }

    return apiClient.upload<ContentUploadResponse>(
      CONTENT_ENDPOINTS.upload,
      formData
    );
  },

  /**
   * Delete a document
   */
  delete: async (id: string): Promise<void> => {
    return apiClient.delete(CONTENT_ENDPOINTS.byId(id));
  },
};
