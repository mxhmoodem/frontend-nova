/**
 * Agent API Service
 * =================
 * Handles all AI/Agent related API calls.
 * Used by: AIConsole page
 */

import { apiClient } from '../shared';
import { AGENT_ENDPOINTS } from './agent.endpoints';
import type { AgentQueryRequest, AgentQueryResponse } from './agent.types';

export const agentApi = {
  /**
   * Send a query to the AI agent
   */
  sendQuery: async (query: string): Promise<AgentQueryResponse> => {
    const body: AgentQueryRequest = { query };
    return apiClient.post<AgentQueryResponse>(AGENT_ENDPOINTS.query, body);
  },
};
