/**
 * Market API Service
 * ==================
 * Handles all market trends related API calls.
 * Used by: Overview page, MarketPulse page
 */

import { apiClient } from '../shared';
import { MARKET_ENDPOINTS } from './market.endpoints';
import type { MarketObjectResponse, MarketTrendListResponse } from './market.types';

export const marketApi = {
  /**
   * Get all market trends
   */
  getAll: async (): Promise<MarketTrendListResponse> => {
    return apiClient.get<MarketTrendListResponse>(MARKET_ENDPOINTS.list);
  },

  /**
   * Get a specific market trend object by ID.
   * Backend requires bucket as query param.
   */
  getById: async (id: string, bucket: string): Promise<MarketObjectResponse> => {
    return apiClient.get<MarketObjectResponse>(MARKET_ENDPOINTS.byId(id), {
      params: { bucket },
    });
  },
};
