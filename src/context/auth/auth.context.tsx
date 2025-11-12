import { fetchAccount, fetchUserData, useVerifyToken, verifyAuth } from './auth.actions';
import { useAsyncAction, useBiometric, useCreateReducer } from '@hooks';
import { createContext, PropsWithChildren, useEffect } from 'react';
import { AuthContextProps, AuthState } from './auth.types';
import { Dispatch } from '@types';
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
  const fetchUserDataAction = useAsyncAction(
    async (state: AuthState, dispatch: Dispatch<AuthState>) => {
      await fetchUserData(state, dispatch);
    },
  );

  const fetchAccountAction = useAsyncAction(
    async (dispatch: Dispatch<AuthState>) => {
      await fetchAccount(dispatch);
    },
  );

  useEffect(() => {
    if (state.credentials) {
      fetchUserDataAction.execute(state, dispatch);
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

  function changeAccount(accountId: number) {
    api.setAccount(accountId);
    fetchAccountAction.execute(dispatch);
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        changeAccount,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
