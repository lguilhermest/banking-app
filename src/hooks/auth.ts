import { AuthContext, AuthContextProps } from '@context';
import { useContext } from 'react';

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

export function useIsAuthenticated(): boolean {
  const { state } = useAuth();
  return state.isAuthenticated;
}
