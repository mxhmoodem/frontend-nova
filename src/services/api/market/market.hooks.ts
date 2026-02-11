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
import type { MarketTrend, MarketTrendList } from './market.types';

/**
 * Hook to fetch all market trends
 */
export function useMarketTrends() {
  return useQuery<MarketTrendList>({
    queryKey: marketKeys.lists(),
    queryFn: marketApi.getAll,
    staleTime: QUERY_CONFIG.staleTime,
  });
}

/**
 * Hook to fetch a specific market trend by ID
 */
export function useMarketTrend(id: string) {
  return useQuery<MarketTrend>({
    queryKey: marketKeys.detail(id),
    queryFn: () => marketApi.getById(id),
    enabled: !!id,
    staleTime: QUERY_CONFIG.staleTime,
  });
}
