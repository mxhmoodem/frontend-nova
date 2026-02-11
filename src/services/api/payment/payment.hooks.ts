/**
 * Payment Query Hooks
 * ===================
 * React Query hooks for payment data.
 * Used by: MarketPulse page, Overview page
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_CONFIG } from '../shared';
import { paymentApi } from './payment.api';
import { paymentKeys } from './payment.keys';
import type {
  PaymentStats,
  PaymentMethodsResponse,
  TrendAlertsResponse,
} from './payment.types';

/**
 * Hook to fetch payment statistics
 */
export function usePaymentStats() {
  return useQuery<PaymentStats>({
    queryKey: paymentKeys.stats(),
    queryFn: paymentApi.getStats,
    staleTime: QUERY_CONFIG.staleTime,
  });
}

/**
 * Hook to fetch payment methods breakdown
 */
export function usePaymentMethods() {
  return useQuery<PaymentMethodsResponse>({
    queryKey: paymentKeys.methods(),
    queryFn: paymentApi.getPaymentMethods,
    staleTime: QUERY_CONFIG.staleTime,
  });
}

/**
 * Hook to fetch trend alerts
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
 */
export function useRefreshPaymentData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentApi.refreshData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
    },
  });
}

/**
 * Combined hook for all payment data
 */
export function usePaymentData() {
  const stats = usePaymentStats();
  const methods = usePaymentMethods();
  const alerts = useTrendAlerts();

  return {
    stats: stats.data,
    methods: methods.data,
    alerts: alerts.data,
    isLoading: stats.isLoading || methods.isLoading || alerts.isLoading,
    isError: stats.isError || methods.isError || alerts.isError,
    error: stats.error || methods.error || alerts.error,
    refetch: () => {
      stats.refetch();
      methods.refetch();
      alerts.refetch();
    },
  };
}
