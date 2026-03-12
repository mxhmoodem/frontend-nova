/**
 * Content Query Hooks
 * ===================
 * React Query hooks for content hub data.
 * Used by: ContentHub page
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_CONFIG } from '../shared';
import { contentApi } from './content.api';
import { contentKeys } from './content.keys';
import type {
  ContentDocument,
  ContentListResponse,
  ContentType,
  ContentUploadRequest,
  ContentUploadResponse,
} from './content.types';

/**
 * Hook to fetch all content documents
 * GET /content/
 */
export function useContent(page = 1, pageSize = 20, search = '') {
  return useQuery<ContentListResponse>({
    queryKey: [...contentKeys.lists(), page, pageSize, search],
    queryFn: () => contentApi.getAll(page, pageSize, search),
    staleTime: QUERY_CONFIG.staleTime,
  });
}

/**
 * Hook to fetch a specific content document by ID
 * GET /content/item/{id}?content_type=...
 */
export function useContentDetail(id: string, contentType: ContentType) {
  return useQuery<ContentDocument>({
    queryKey: [...contentKeys.detail(id), contentType],
    queryFn: () => contentApi.getById(id, contentType),
    enabled: !!id && !!contentType,
    staleTime: QUERY_CONFIG.staleTime,
  });
}

/**
 * Hook to upload a new document
 */
export function useUploadContent() {
  const queryClient = useQueryClient();

  return useMutation<ContentUploadResponse, Error, ContentUploadRequest>({
    mutationFn: contentApi.upload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.lists() });
    },
  });
}

/**
 * Hook to delete a document from content_hub
 * DELETE /content/item/{id}
 */
export function useDeleteContent() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string; contentType: ContentType }>({
    mutationFn: ({ id, contentType }) => contentApi.delete(id, contentType),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: contentKeys.lists() });
      queryClient.removeQueries({ queryKey: contentKeys.detail(id) });
    },
  });
}

/**
 * Hook to download a document from content_hub
 * GET /content/item/{id}/download
 */
export function useDownloadContent() {
  return useMutation<Blob, Error, { id: string; filename: string; contentType: ContentType }>({
    mutationFn: ({ id, contentType }) => contentApi.download(id, contentType),
    onSuccess: (blob, { filename }) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
  });
}
