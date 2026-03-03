/**
 * Agent Module Types
 * ==================
 * Type definitions for AI agent data.
 * Used by: AIConsole page
 */

/**
 * A single message in the conversation history.
 * role 'user' | 'assistant' matches the backend expectation.
 */
export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Request body: current query and conversation history.
 * Backend expects: { query: string, history: list }
 */
export interface AgentQueryRequest {
  query: string;
  history: ConversationMessage[];
}

/**
 * Response from AI agent
 */
export interface AgentQueryResponse {
  message: string;
  sources: string[];
}
