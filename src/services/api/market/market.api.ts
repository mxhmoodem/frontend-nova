/**
 * Market API Service
 * ==================
 * Handles all market trends related API calls.
 * Used by: Overview page, MarketPulse page
 */

import { apiClient } from '../shared';
import { MARKET_ENDPOINTS } from './market.endpoints';
import type { MarketTrend, MarketTrendList } from './market.types';

export const marketApi = {
  /**
   * Get all market trends
   */
  getAll: async (): Promise<MarketTrendList> => {
    return apiClient.get<MarketTrendList>(MARKET_ENDPOINTS.list);
  },

  /**
   * Get a specific market trend by ID
   */
  getById: async (id: string): Promise<MarketTrend> => {
    return apiClient.get<MarketTrend>(MARKET_ENDPOINTS.byId(id));
  },
};
