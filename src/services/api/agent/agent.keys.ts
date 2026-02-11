/**
 * Agent Query Keys
 * ================
 */

export const agentKeys = {
  all: ['agent'] as const,
  queries: () => [...agentKeys.all, 'queries'] as const,
};
