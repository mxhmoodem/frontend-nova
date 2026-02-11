/**
 * Market API Endpoints
 * ====================
 */

export const MARKET_ENDPOINTS = {
  list: '/market',
  byId: (id: string) => `/market/${id}`,
} as const;
