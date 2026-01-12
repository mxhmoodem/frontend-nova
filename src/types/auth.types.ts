import { ReactNode } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: () => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
