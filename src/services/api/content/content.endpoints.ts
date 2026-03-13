/**
 * Content API Endpoints
 * =====================
 */

export const CONTENT_ENDPOINTS = {
  list: '/content/hub',
  hubById: (id: string) => `/content/hub/${id}`,
  byId: (id: string) => `/content/item/${id}`,
  download: (id: string) => `/content/item/${id}/download`,
  upload: '/content/',
} as const;
