/**
 * Payment Module
 * ==============
 * API integration for payment data (Bank of England).
 * Used by: MarketPulse page, Overview page
 */

// Types
export type {
  TrendDirection,
  StatItem,
  PaymentStatsResponse,
  TrendAlertApi,
  TrendAlertsResponse,
  RefreshResponse,
  TimeRange,
  MetricKey,
  HistoryDataPoint,
  MetricHistory,
  HistoryResponse,
  HistoryDateRange,
} from './payment.types';

// API
export { paymentApi } from './payment.api';

// Keys
export { paymentKeys } from './payment.keys';

// Hooks
export {
  usePaymentStats,
  useTrendAlerts,
  useRefreshPaymentData,
  usePaymentData,
  usePaymentHistory,
  usePaymentHistoryByDateRange,
} from './payment.hooks';
