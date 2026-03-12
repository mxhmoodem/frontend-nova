/**
 * Legislation Query Hooks
 * =======================
 * React Query hooks for legislation data.
 * Used by: RegulatoryRadar page
 */

import { useQuery } from '@tanstack/react-query';
import { QUERY_CONFIG } from '../shared';
import { legislationApi } from './legislation.api';
import { legislationKeys } from './legislation.keys';
import type {
  LegislationItem,
  LegislationListResponse,
  LegislationListParams,
} from './legislation.types';

/**
 * Hook to fetch a paginated list of legislation documents.
 *
 * @param params  Optional pagination / ordering params
 */
export function useLegislation(params?: LegislationListParams) {
  return useQuery<LegislationListResponse>({
    queryKey: legislationKeys.list(params as Record<string, unknown>),
    queryFn: () => legislationApi.getAll(params),
    staleTime: QUERY_CONFIG.staleTime,
  });
}

/**
 * Hook to fetch a specific legislation document by UUID.
 */
export function useLegislationDetail(id: string) {
  return useQuery<LegislationItem>({
    queryKey: legislationKeys.detail(id),
    queryFn: () => legislationApi.getById(id),
    enabled: !!id,
    staleTime: QUERY_CONFIG.staleTime,
  });
}
