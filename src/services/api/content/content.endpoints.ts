/**
 * Content API Endpoints
 * =====================
 */

export const CONTENT_ENDPOINTS = {
  list: '/content/',
  hubById: (id: string) => `/content/item/${id}`,
  byId: (id: string) => `/content/item/${id}`,
  download: (id: string) => `/content/item/${id}/download`,
  upload: '/content/',
} as const;
