import { fetchUserData, useVerifyToken, verifyAuth } from './auth.actions';
import { createContext, PropsWithChildren, useEffect } from 'react';
import { AuthContextProps, AuthState } from './auth.types';
import { useBiometric, useCreateReducer } from '@hooks';
import api from '@api';

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = (props: PropsWithChildren) => {
  const biometric = useBiometric();
  const [state, dispatch] = useCreateReducer<AuthState>({
    isAuthenticated: false,
    accessToken: undefined,
    isLoading: true,
    balance: 0,
    balanceVisible: false,
    biometric: {
      status: biometric.status,
      biometryType: biometric.biometryType,
    },
  });
  const verifyToken = useVerifyToken(state, biometric, dispatch);

  useEffect(() => {
    if (state.credentials) {
      fetchUserData(state, dispatch);
    }
  }, [state.credentials]);

  useEffect(() => {
    api.onUnauthenticated(() => {
      dispatch('isAuthenticated', false);
    });

    api.onBeforeRequest(verifyToken);
  }, [verifyToken]);

  useEffect(() => {
    if (typeof biometric.status === 'string') {
      verifyAuth(dispatch, biometric);
    }
  }, [biometric.status]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        fetchUserData: () => fetchUserData(state, dispatch),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
