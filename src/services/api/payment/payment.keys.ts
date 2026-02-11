/**
 * Payment Query Keys
 * ==================
 * Cache key factory for payment queries.
 */

export const paymentKeys = {
  all: ['payment'] as const,
  stats: () => [...paymentKeys.all, 'stats'] as const,
  methods: () => [...paymentKeys.all, 'methods'] as const,
  trendAlerts: () => [...paymentKeys.all, 'trend-alerts'] as const,
};
