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
  PaymentStats,
  PaymentMethodsResponse,
  TrendAlertsResponse,
} from './payment.types';

export const paymentApi = {
  /**
   * Get main dashboard statistics
   */
  getStats: async (): Promise<PaymentStats> => {
    return apiClient.get<PaymentStats>(PAYMENT_ENDPOINTS.stats);
  },

  /**
   * Get UK payment method market share breakdown
   */
  getPaymentMethods: async (): Promise<PaymentMethodsResponse> => {
    return apiClient.get<PaymentMethodsResponse>(PAYMENT_ENDPOINTS.methods);
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
  refreshData: async (): Promise<{ message: string }> => {
    return apiClient.post<{ message: string }>(PAYMENT_ENDPOINTS.refresh);
  },
};
