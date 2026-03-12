import { createContext } from 'react';
import type { AIConsoleContextValue } from './AIConsoleContext.types';

export const AIConsoleContext = createContext<
  AIConsoleContextValue | undefined
>(undefined);
