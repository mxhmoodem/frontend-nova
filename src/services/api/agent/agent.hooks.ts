/**
 * Agent Query Hooks
 * =================
 * React Query hooks for AI agent queries.
 * Used by: AIConsole page
 */

import { useMutation } from '@tanstack/react-query';
import { agentApi } from './agent.api';
import type { AgentQueryResponse, ConversationMessage } from './agent.types';

/**
 * Hook to send the full conversation to the AI agent.
 */
export function useAgentQuery() {
  return useMutation<AgentQueryResponse, Error, ConversationMessage[]>({
    mutationFn: (messages: ConversationMessage[]) =>
      agentApi.sendMessages(messages),
  });
}

/**
 * Hook with callbacks for common patterns
 */
export function useAgentQueryWithCallbacks(options?: {
  onSuccess?: (response: AgentQueryResponse) => void;
  onError?: (error: Error) => void;
}) {
  return useMutation<AgentQueryResponse, Error, ConversationMessage[]>({
    mutationFn: (messages: ConversationMessage[]) =>
      agentApi.sendMessages(messages),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
