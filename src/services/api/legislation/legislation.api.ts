/**
 * Legislation API Service
 * =======================
 * Handles all legislation related API calls.
 * Used by: RegulatoryRadar page
 */

import { apiClient } from '../shared';
import { LEGISLATION_ENDPOINTS } from './legislation.endpoints';
import type { Legislation, LegislationList } from './legislation.types';

export const legislationApi = {
  /**
   * Get all legislation documents
   */
  getAll: async (): Promise<LegislationList> => {
    return apiClient.get<LegislationList>(LEGISLATION_ENDPOINTS.list);
  },

  /**
   * Get a specific legislation document by ID
   */
  getById: async (id: string): Promise<Legislation> => {
    return apiClient.get<Legislation>(LEGISLATION_ENDPOINTS.byId(id));
  },
};
