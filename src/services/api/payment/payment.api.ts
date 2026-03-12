/**
 * Payment API Service
 * ===================
 * Handles all payment statistics related API calls.
 * Data sourced from Bank of England.
 * Used by: MarketPulse page, Overview page
 */

import { apiClient } from '../shared';
import { PAYMENT_ENDPOINTS } from './payment.endpoints';
import type {
  PaymentStatsResponse,
  TrendAlertsResponse,
  RefreshResponse,
  HistoryResponse,
  HistoryDateRange,
} from './payment.types';

export const paymentApi = {
  /**
   * Get main dashboard statistics
   * Returns consumer credit, credit cards, mortgages, bank rate
   */
  getStats: async (): Promise<PaymentStatsResponse> => {
    return apiClient.get<PaymentStatsResponse>(PAYMENT_ENDPOINTS.stats);
  },

  /**
   * Get alerts for metrics with significant changes (>5%)
   */
  getTrendAlerts: async (): Promise<TrendAlertsResponse> => {
    return apiClient.get<TrendAlertsResponse>(PAYMENT_ENDPOINTS.trendAlerts);
  },

  /**
   * Manually trigger a data refresh from the Bank of England API
   */
  refreshData: async (): Promise<RefreshResponse> => {
    return apiClient.post<RefreshResponse>(PAYMENT_ENDPOINTS.refresh);
  },

  /**
   * Get historical data for payment metrics
   * @param months - Number of months to fetch (1-24, default 24)
   */
  getHistory: async (months: number = 24): Promise<HistoryResponse> => {
    return apiClient.get<HistoryResponse>(
      `${PAYMENT_ENDPOINTS.history}?months=${months}`
    );
  },

  /**
   * Get historical data for payment metrics with custom date range
   * @param dateRange - Custom date range with from/to month and year
   */
  getHistoryByDateRange: async (
    dateRange: HistoryDateRange
  ): Promise<HistoryResponse> => {
    const params = new URLSearchParams({
      from_month: dateRange.fromMonth.toString(),
      from_year: dateRange.fromYear.toString(),
      to_month: dateRange.toMonth.toString(),
      to_year: dateRange.toYear.toString(),
    });
    return apiClient.get<HistoryResponse>(
      `${PAYMENT_ENDPOINTS.history}?${params.toString()}`
    );
  },
};
