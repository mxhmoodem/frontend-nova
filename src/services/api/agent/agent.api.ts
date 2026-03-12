/**
 * Agent API Service
 * =================
 * Handles all AI/Agent related API calls.
 * Used by: AIConsole page
 */

import { apiClient } from '../shared';
import { AGENT_ENDPOINTS } from './agent.endpoints';
import type {
  AgentQueryRequest,
  AgentQueryResponse,
  ConversationMessage,
} from './agent.types';

export const agentApi = {
  /**
   * Send the full conversation history to the AI agent.
   * The backend is stateless; all context is supplied by the caller.
   * The last message (current query) is sent separately from history.
   */
  sendMessages: async (
    messages: ConversationMessage[]
  ): Promise<AgentQueryResponse> => {
    // Extract the last message as the query, rest as history
    const currentQuery = messages[messages.length - 1];
    const history = messages.slice(0, -1);

    const body: AgentQueryRequest = {
      query: currentQuery.content,
      history,
    };
    // Backend returns { message, tools, ... } — no dedicated sources field
    const raw = await apiClient.post<Record<string, unknown>>(
      AGENT_ENDPOINTS.query,
      body
    );

    let message = (raw.message as string) ?? '';

    // Strip leading 'Answer: ' prefix that the backend may prepend
    if (message.startsWith('Answer: ')) {
      message = message.slice('Answer: '.length);
    }

    // Extract [Source: <url>] references embedded in the message text
    const sourcePattern = /\[Source:\s*(https?:\/\/[^\]]+)\]/g;
    const sources: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = sourcePattern.exec(message)) !== null) {
      sources.push(match[1].trim());
    }

    // Remove the trailing "Sources:" section (and any inline [Source: ...] refs)
    message = message
      .replace(/\n*Sources:\s*\n[\s\S]*$/i, '') // remove "Sources:\n..." block
      .replace(/\[Source:\s*https?:\/\/[^\]]+\]/g, '') // remove stray inline refs
      .trimEnd();

    return { message, sources };
  },
};
