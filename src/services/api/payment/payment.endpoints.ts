/**
 * Payment API Endpoints
 * =====================
 * API endpoint paths for payment module.
 */

export const PAYMENT_ENDPOINTS = {
  stats: '/payment/stats',
  trendAlerts: '/payment/trend-alerts',
  refresh: '/payment/refresh',
  history: '/payment/history',
} as const;
