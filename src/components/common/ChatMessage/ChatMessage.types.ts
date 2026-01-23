export type MessageRole = 'user' | 'ai';

export interface ChatMessageProps {
  role: MessageRole;
  content: string;
  userInitals?: string;
  timestamp?: string;
}
