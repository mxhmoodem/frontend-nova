import { createContext } from 'react';
import { ThemeContextValue } from './ThemeContext.types';

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);
