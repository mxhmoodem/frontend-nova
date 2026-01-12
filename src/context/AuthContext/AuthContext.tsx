import { createContext, useState, useEffect } from 'react';
import { AuthContextType, AuthUser } from '../../types/auth.types';
import { AuthProviderProps } from '../../types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'auth_state';

// Helper to get initial auth state from localStorage
const getInitialAuthState = () => {
  const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
  if (storedAuth) {
    try {
      const { isAuthenticated, user } = JSON.parse(storedAuth);
      return { isAuthenticated, user };
    } catch (error) {
      console.error('Failed to parse stored auth state:', error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }
  return { isAuthenticated: false, user: null };
};

export function AuthProvider({ children }: AuthProviderProps) {
  const initialState = getInitialAuthState();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialState.isAuthenticated
  );
  const [user, setUser] = useState<AuthUser | null>(initialState.user);

  // Sync auth state to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ isAuthenticated, user })
      );
    } else if (!isAuthenticated) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [isAuthenticated, user]);

  const login = () => {
    const mockUser: AuthUser = {
      id: '1',
      email: 'user@example.com',
      name: 'User',
    };

    setIsAuthenticated(true);
    setUser(mockUser);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
