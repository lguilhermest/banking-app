import { BiometricState, useBiometric, useCreateReducer } from '@hooks';
import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { Dispatch } from '@types';

export interface AuthState {
  isAuthenticated: boolean;
  refreshToken: string;
  isLoading: boolean;
  biometric: BiometricState;
}

export interface AuthContextProps {
  state: AuthState;
  dispatch: Dispatch<AuthState>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = (props: PropsWithChildren) => {
  const biometric = useBiometric();
  const [state, dispatch] = useCreateReducer<AuthState>({
    isAuthenticated: false,
    refreshToken: undefined,
    isLoading: true,
    biometric,
  });

  useEffect(() => {
    if (typeof biometric.status === 'string') {
      initialize();
    }
  }, [biometric.status]);

  async function initialize() {
    dispatch('biometric', biometric);

    if (biometric.status !== 'enabled') {
      return dispatch('isLoading', false);
    }

    const token = await biometric.authenticate();

    if (!token) {
      return dispatch('isLoading', false);
    }

    dispatch.update({
      isAuthenticated: true,
      refreshToken: token,
      isLoading: false,
    });
  }

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
