/**
 * Query Client Configuration
 * ==========================
 * Creates and configures the QueryClient instance.
 */

import { QueryClient } from '@tanstack/react-query';
import { QUERY_CONFIG } from './config';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.staleTime,
      gcTime: QUERY_CONFIG.gcTime,
      retry: QUERY_CONFIG.retry,
      retryDelay: QUERY_CONFIG.retryDelay,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
