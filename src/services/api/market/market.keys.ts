/**
 * Market Query Keys
 * =================
 */

export const marketKeys = {
  all: ['market'] as const,
  lists: () => [...marketKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    [...marketKeys.lists(), filters] as const,
  details: () => [...marketKeys.all, 'detail'] as const,
  detail: (id: string) => [...marketKeys.details(), id] as const,
};
