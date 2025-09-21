import { Dispatch } from '@types';
import { useCreateReducer } from '@utils';
import { createContext, PropsWithChildren, useContext } from 'react';

export interface AuthState {
  isAuthenticated: boolean;
}

export interface AuthContextProps {
  state: AuthState;
  dispatch: Dispatch<AuthState>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useCreateReducer<AuthState>({
    isAuthenticated: false,
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

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
