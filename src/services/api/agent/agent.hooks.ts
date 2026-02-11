/**
 * Agent Query Hooks
 * =================
 * React Query hooks for AI agent queries.
 * Used by: AIConsole page
 */

import { useMutation } from '@tanstack/react-query';
import { agentApi } from './agent.api';
import type { AgentQueryResponse } from './agent.types';

/**
 * Hook to send queries to the AI agent
 */
export function useAgentQuery() {
  return useMutation<AgentQueryResponse, Error, string>({
    mutationFn: (query: string) => agentApi.sendQuery(query),
  });
}

/**
 * Hook with callbacks for common patterns
 */
export function useAgentQueryWithCallbacks(options?: {
  onSuccess?: (response: AgentQueryResponse) => void;
  onError?: (error: Error) => void;
}) {
  return useMutation<AgentQueryResponse, Error, string>({
    mutationFn: (query: string) => agentApi.sendQuery(query),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
