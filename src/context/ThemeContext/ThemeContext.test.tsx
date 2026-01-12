import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from './ThemeContext';
import { useTheme } from '../../hooks/useTheme';
import { ReactNode } from 'react';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  it('initializes with light theme by default', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggles theme from light to dark', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('light');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles theme from dark to light', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    // First toggle to dark
    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');

    // Toggle back to light
    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists theme to localStorage', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('sets theme directly', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
