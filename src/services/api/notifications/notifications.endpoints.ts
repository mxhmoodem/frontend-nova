/**
 * Notifications API Endpoints
 * ===========================
 */

export const NOTIFICATIONS_ENDPOINTS = {
  list: '/notification',
  byId: (id: string) => `/notification/${id}`,
} as const;
