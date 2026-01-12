import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthProvider } from './AuthContext';
import { useAuth } from '../../hooks/useAuth';
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

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  it('initializes with unauthenticated state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('sets authenticated state on login', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login();
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual({
      id: '1',
      email: 'user@example.com',
      name: 'User',
    });
  });

  it('persists auth state to localStorage on login', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login();
    });

    const storedAuth = localStorage.getItem('auth_state');
    expect(storedAuth).toBeTruthy();

    const parsedAuth = JSON.parse(storedAuth!);
    expect(parsedAuth.isAuthenticated).toBe(true);
    expect(parsedAuth.user).toEqual({
      id: '1',
      email: 'user@example.com',
      name: 'User',
    });
  });

  it('clears auth state on logout', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    // First login
    act(() => {
      result.current.login();
    });

    // Then logout
    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('auth_state')).toBeNull();
  });

  it('restores auth state from localStorage on mount', () => {
    // Set up localStorage with authenticated state
    const mockAuthState = {
      isAuthenticated: true,
      user: {
        id: '1',
        email: 'user@example.com',
        name: 'User',
      },
    };
    localStorage.setItem('auth_state', JSON.stringify(mockAuthState));

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockAuthState.user);
  });

  it('handles corrupted localStorage data gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem('auth_state', 'invalid json');

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('auth_state')).toBeNull();

    consoleSpy.mockRestore();
  });

  it('throws error when useAuth is used outside AuthProvider', () => {
    // Suppress console error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within an AuthProvider');

    consoleSpy.mockRestore();
  });
});
