/**
 * Payment Query Keys
 * ==================
 * Cache key factory for payment queries.
 */

export const paymentKeys = {
  all: ['payment'] as const,
  stats: () => [...paymentKeys.all, 'stats'] as const,
  trendAlerts: () => [...paymentKeys.all, 'trend-alerts'] as const,
  history: (months: number) => [...paymentKeys.all, 'history', months] as const,
};
