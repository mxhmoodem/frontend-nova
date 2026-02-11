/**
 * Payment Module
 * ==============
 * API integration for payment data (Bank of England).
 * Used by: MarketPulse page, Overview page
 */

// Types
export type {
  PaymentStats,
  PaymentMethod,
  PaymentMethodsResponse,
  TrendAlert,
  TrendAlertsResponse,
} from './payment.types';

// API
export { paymentApi } from './payment.api';

// Keys
export { paymentKeys } from './payment.keys';

// Hooks
export {
  usePaymentStats,
  usePaymentMethods,
  useTrendAlerts,
  useRefreshPaymentData,
  usePaymentData,
} from './payment.hooks';
