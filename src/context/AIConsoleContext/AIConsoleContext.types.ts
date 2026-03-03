export interface ChatEntry {
  /** Display role – 'user' or 'ai' (used by ChatMessage component) */
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
  sources?: string[];
}

export interface AIConsoleContextValue {
  messages: ChatEntry[];
  isLoading: boolean;
  addUserMessage: (content: string) => void;
  addAIMessage: (content: string, sources?: string[]) => void;
  setLoading: (loading: boolean) => void;
  clearConversation: () => void;
}
