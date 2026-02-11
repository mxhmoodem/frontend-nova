/**
 * Legislation Query Keys
 * ======================
 */

export const legislationKeys = {
  all: ['legislation'] as const,
  lists: () => [...legislationKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    [...legislationKeys.lists(), filters] as const,
  details: () => [...legislationKeys.all, 'detail'] as const,
  detail: (id: string) => [...legislationKeys.details(), id] as const,
};
