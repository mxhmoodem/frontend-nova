import { useContext } from 'react';
import { AIConsoleContext } from './AIConsoleContext.context';
import type { AIConsoleContextValue } from './AIConsoleContext.types';

export function useAIConsole(): AIConsoleContextValue {
  const ctx = useContext(AIConsoleContext);
  if (!ctx) {
    throw new Error('useAIConsole must be used inside <AIConsoleProvider>');
  }
  return ctx;
}
