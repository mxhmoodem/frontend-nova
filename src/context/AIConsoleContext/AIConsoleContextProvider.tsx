import { useState, useCallback, ReactNode } from 'react';
import { AIConsoleContext } from './AIConsoleContext.context';
import type { ChatEntry } from './AIConsoleContext.types';

export function AIConsoleProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatEntry[]>([]);
  const [isLoading, setIsLoadingState] = useState(false);

  const getTimestamp = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const addUserMessage = useCallback((content: string) => {
    setMessages((prev) => [
      ...prev,
      { role: 'user', content, timestamp: getTimestamp() },
    ]);
  }, []);

  const addAIMessage = useCallback(
    (content: string, sources: string[] = []) => {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content, timestamp: getTimestamp(), sources },
      ]);
    },
    []
  );

  const setLoading = useCallback((loading: boolean) => {
    setIsLoadingState(loading);
  }, []);

  const clearConversation = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <AIConsoleContext.Provider
      value={{
        messages,
        isLoading,
        addUserMessage,
        addAIMessage,
        setLoading,
        clearConversation,
      }}
    >
      {children}
    </AIConsoleContext.Provider>
  );
}
