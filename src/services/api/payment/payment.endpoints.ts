/**
 * Payment API Endpoints
 * =====================
 * API endpoint paths for payment module.
 */

export const PAYMENT_ENDPOINTS = {
  stats: '/payment/stats',
  methods: '/payment/payment-methods',
  trendAlerts: '/payment/trend-alerts',
  refresh: '/payment/refresh',
} as const;
