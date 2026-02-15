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
  ContentList,
  ContentUploadRequest,
  ContentUploadResponse,
} from './content.types';

/**
 * Hook to fetch all content documents
 */
export function useContent() {
  return useQuery<ContentList>({
    queryKey: contentKeys.lists(),
    queryFn: contentApi.getAll,
    staleTime: QUERY_CONFIG.staleTime,
  });
}

/**
 * Hook to fetch a specific content document by ID
 */
export function useContentDetail(id: string) {
  return useQuery<ContentDocument>({
    queryKey: contentKeys.detail(id),
    queryFn: () => contentApi.getById(id),
    enabled: !!id,
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
 * Hook to delete a document
 */
export function useDeleteContent() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: contentApi.delete,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: contentKeys.lists() });
      queryClient.removeQueries({ queryKey: contentKeys.detail(deletedId) });
    },
  });
}

/**
 * Hook to download a document
 */
export function useDownloadContent() {
  return useMutation<Blob, Error, { id: string; filename: string }>({
    mutationFn: ({ id }) => contentApi.download(id),
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
