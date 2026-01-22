export type MessageRole = 'user' | 'ai';

export interface ChatMessageProps {
  role: MessageRole;
  content: string;
  userName?: string;
  timestamp?: string;
}
