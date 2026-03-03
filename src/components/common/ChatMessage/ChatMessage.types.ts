export type MessageRole = 'user' | 'ai';

export interface ChatMessageProps {
  role: MessageRole;
  content: string;
  userInitals?: string;
  timestamp?: string;
  /** Sources used by the AI to generate this response (AI messages only) */
  sources?: string[];
}
