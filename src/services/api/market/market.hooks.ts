/**
 * Market Query Hooks
 * ==================
 * React Query hooks for market trends data.
 * Used by: Overview page, MarketPulse page
 */

import { useQuery } from '@tanstack/react-query';
import { QUERY_CONFIG } from '../shared';
import { marketApi } from './market.api';
import { marketKeys } from './market.keys';
import type {
  MarketObjectResponse,
  MarketTrendListResponse,
} from './market.types';

/**
 * Hook to fetch all market trends
 */
export function useMarketTrends() {
  return useQuery<MarketTrendListResponse>({
    queryKey: marketKeys.lists(),
    queryFn: marketApi.getAll,
    staleTime: QUERY_CONFIG.staleTime,
  });
}

/**
 * Hook to fetch a specific market trend by ID
 */
export function useMarketTrend(id: string, bucket: string) {
  return useQuery<MarketObjectResponse>({
    queryKey: marketKeys.detail(id, bucket),
    queryFn: () => marketApi.getById(id, bucket),
    enabled: Boolean(id && bucket),
    staleTime: QUERY_CONFIG.staleTime,
  });
}
