/**
 * Agent Module Types
 * ==================
 * Type definitions for AI agent data.
 * Used by: AIConsole page
 */

/**
 * Request body for AI agent queries
 */
export interface AgentQueryRequest {
  query: string;
}

/**
 * Response from AI agent
 */
export interface AgentQueryResponse {
  response: string;
  sources?: string[];
  confidence?: number;
  timestamp?: string;
}
