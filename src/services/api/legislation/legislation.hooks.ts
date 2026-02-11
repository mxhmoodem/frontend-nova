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
import type { Legislation, LegislationList } from './legislation.types';

/**
 * Hook to fetch all legislation documents
 */
export function useLegislation() {
  return useQuery<LegislationList>({
    queryKey: legislationKeys.lists(),
    queryFn: legislationApi.getAll,
    staleTime: QUERY_CONFIG.staleTime,
  });
}

/**
 * Hook to fetch a specific legislation document by ID
 */
export function useLegislationDetail(id: string) {
  return useQuery<Legislation>({
    queryKey: legislationKeys.detail(id),
    queryFn: () => legislationApi.getById(id),
    enabled: !!id,
    staleTime: QUERY_CONFIG.staleTime,
  });
}
