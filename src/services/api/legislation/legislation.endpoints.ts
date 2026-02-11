/**
 * Legislation API Endpoints
 * =========================
 */

export const LEGISLATION_ENDPOINTS = {
  list: '/legislation',
  byId: (id: string) => `/legislation/${id}`,
} as const;
