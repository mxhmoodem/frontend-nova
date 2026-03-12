/**
 * Legislation API Service
 * =======================
 * Handles all legislation related API calls.
 * Used by: RegulatoryRadar page
 *
 * Backend:
 * - GET /legislation/        → paginated list
 * - GET /legislation/{id}    → single item (flat)
 */

import { apiClient } from '../shared';
import { LEGISLATION_ENDPOINTS } from './legislation.endpoints';
import type {
  LegislationItem,
  LegislationListResponse,
  LegislationListParams,
} from './legislation.types';

export const legislationApi = {
  /**
   * Get paginated list of legislation documents
   */
  getAll: async (
    params?: LegislationListParams
  ): Promise<LegislationListResponse> => {
    const queryParams: Record<string, string | number | boolean | undefined> =
      {};
    if (params?.skip !== undefined) queryParams.skip = params.skip;
    if (params?.limit !== undefined) queryParams.limit = params.limit;
    if (params?.order_by) queryParams.order_by = params.order_by;

    return apiClient.get<LegislationListResponse>(LEGISLATION_ENDPOINTS.list, {
      params: queryParams,
    });
  },

  /**
   * Get a specific legislation document by ID (UUID)
   */
  getById: async (id: string): Promise<LegislationItem> => {
    return apiClient.get<LegislationItem>(LEGISLATION_ENDPOINTS.byId(id));
  },
};
