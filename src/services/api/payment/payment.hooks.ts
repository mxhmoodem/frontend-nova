/**
 * Payment Query Hooks
 * ===================
 * React Query hooks for payment data from Bank of England.
 * Used by: MarketPulse page, Overview page
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_CONFIG } from '../shared';
import { paymentApi } from './payment.api';
import { paymentKeys } from './payment.keys';
import type {
  PaymentStatsResponse,
  TrendAlertsResponse,
  RefreshResponse,
  HistoryResponse,
  HistoryDateRange,
} from './payment.types';

/**
 * Hook to fetch payment statistics
 * Returns consumer credit, credit cards, mortgages, bank rate
 */
export function usePaymentStats() {
  return useQuery<PaymentStatsResponse>({
    queryKey: paymentKeys.stats(),
    queryFn: paymentApi.getStats,
    staleTime: QUERY_CONFIG.staleTime,
  });
}

/**
 * Hook to fetch trend alerts
 * Returns alerts for metrics with >5% change
 */
export function useTrendAlerts() {
  return useQuery<TrendAlertsResponse>({
    queryKey: paymentKeys.trendAlerts(),
    queryFn: paymentApi.getTrendAlerts,
    staleTime: QUERY_CONFIG.staleTime,
  });
}

/**
 * Hook to refresh payment data manually
 * Triggers a fresh fetch from Bank of England API
 */
export function useRefreshPaymentData() {
  const queryClient = useQueryClient();

  return useMutation<RefreshResponse, Error>({
    mutationFn: paymentApi.refreshData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
    },
  });
}

/**
 * Combined hook for all payment data
 * Useful for components that need stats and alerts together
 */
export function usePaymentData() {
  const stats = usePaymentStats();
  const alerts = useTrendAlerts();

  return {
    stats: stats.data,
    alerts: alerts.data,
    isLoading: stats.isLoading || alerts.isLoading,
    isError: stats.isError || alerts.isError,
    error: stats.error || alerts.error,
    refetch: () => {
      stats.refetch();
      alerts.refetch();
    },
  };
}

/**
 * Hook to fetch historical payment data
 * @param months - Number of months to fetch (1-24, default 12)
 */
export function usePaymentHistory(months: number = 12) {
  return useQuery<HistoryResponse>({
    queryKey: paymentKeys.history(months),
    queryFn: () => paymentApi.getHistory(months),
    staleTime: QUERY_CONFIG.staleTime,
  });
}

/**
 * Hook to fetch historical payment data with custom date range
 * @param dateRange - Custom date range with from/to month and year
 */
export function usePaymentHistoryByDateRange(dateRange: HistoryDateRange) {
  const queryKey = [
    'payment',
    'history',
    'range',
    dateRange.fromYear,
    dateRange.fromMonth,
    dateRange.toYear,
    dateRange.toMonth,
  ];

  return useQuery<HistoryResponse>({
    queryKey,
    queryFn: () => paymentApi.getHistoryByDateRange(dateRange),
    staleTime: QUERY_CONFIG.staleTime,
  });
}
