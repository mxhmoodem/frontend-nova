/**
 * Content API Endpoints
 * =====================
 */

export const CONTENT_ENDPOINTS = {
  list: '/content',
  byId: (id: string) => `/content/${id}`,
  download: (id: string) => `/content/${id}/download`,
  upload: '/content',
} as const;
