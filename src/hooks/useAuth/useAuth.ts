import { useContext } from 'react';
import { AuthContextType } from '../../types/auth.types';
import AuthContext from '../../context/AuthContext/AuthContext';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
