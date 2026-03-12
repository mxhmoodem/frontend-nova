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
  ContentListResponse,
  ContentType,
  ContentUploadRequest,
  ContentUploadResponse,
} from './content.types';

export const contentApi = {
  /**
   * Get all content documents from content_hub table
   * GET /content/hub
   */
  getAll: async (
    page = 1,
    pageSize = 20,
    search = ''
  ): Promise<ContentListResponse> => {
    // Backend expects 0-based paging (page=0 is the first page)
    const backendPage = Math.max(0, page - 1);
    const params: Record<string, string | number> = { page: backendPage, page_size: pageSize };
    if (search) {
      params.search = search;
    }
    return apiClient.get<ContentListResponse>(CONTENT_ENDPOINTS.list, {
      params
    });
  },

  /**
   * Get a specific content document by ID
   * GET /content/item/{content_id}?content_type=market
   */
  getById: async (
    id: string,
    contentType: ContentType
  ): Promise<ContentDocument> => {
    const raw = await apiClient.get<{ message: string; data: ContentDocument }>(
      CONTENT_ENDPOINTS.byId(id),
      { params: { content_type: contentType } }
    );
    return raw.data;
  },

  /**
   * Download a document file from content_hub
   * GET /content/item/{content_id}/download
   */
  download: async (id: string, contentType: ContentType): Promise<Blob> => {
    return apiClient.download(CONTENT_ENDPOINTS.download(id), {
      params: { content_type: contentType }
    });
  },

  /**
   * Upload a new document
   * POST /content/ (multipart/form-data)
   * Fields: content_type, title, description, file
   */
  upload: async (
    data: ContentUploadRequest
  ): Promise<ContentUploadResponse> => {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('title', data.title);
    formData.append('content_type', data.content_type);
    formData.append('description', data.description ?? '');

    return apiClient.upload<ContentUploadResponse>(
      CONTENT_ENDPOINTS.upload,
      formData
    );
  },

  /**
   * Delete a document from content_hub
   * DELETE /content/item/{content_id}
   */
  delete: async (id: string, contentType: ContentType): Promise<void> => {
    return apiClient.delete(CONTENT_ENDPOINTS.hubById(id), {
      params: { content_type: contentType }
    });
  },
};
