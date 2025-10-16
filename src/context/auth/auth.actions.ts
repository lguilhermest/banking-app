import {
  Account,
  AuthRequest,
  AuthResponse,
  Dispatch,
  UserReponse,
} from '@types';
import { AxiosRequestConfig } from 'axios';
import { AuthState } from './auth.types';
import { useBiometric } from '@hooks';
import { useCallback } from 'react';
import api from '@api';

let authPromise: Promise<void> | null = null;

export async function authenticateUser(
  credentials: AuthRequest,
  dispatch: Dispatch<AuthState>,
) {
  if (authPromise) return await authPromise;

  async function authenticate() {
    const response = await api.post<AuthResponse, AuthRequest>(
      '/auth',
      credentials,
    );

    api.setToken(response.token);
    dispatch('accessToken', response.token);

    const expiresAt = new Date(Date.now() + response.expires_in * 1000);

    dispatch('expiresAt', expiresAt.toISOString());
  }

  authPromise = authenticate();
  await authPromise;
  authPromise = null;
}

export async function fetchUserData(
  state: AuthState,
  dispatch: Dispatch<AuthState>,
) {
  dispatch('isLoading', true);

  if (!state?.accessToken) {
    await authenticateUser(state.credentials, dispatch);
  }

  const { accounts, ...user } = await api.get<UserReponse>('/user');

  if (!accounts || accounts.length === 0) {
    dispatch('isLoading', false);
    throw new Error('ACNT001');
  }

  const account = getAccount(accounts, state.accountId);

  api.setAccount(account.id);

  dispatch.update({
    isAuthenticated: true,
    isLoading: false,
    user,
    account,
    role: account.pivot.role,
  });
}

function getAccount(
  accounts: UserReponse['accounts'],
  accountId?: number,
): Account {
  if (!accountId) {
    return accounts[0];
  }

  return accounts.find(({ id }) => id === accountId)!;
}

export async function verifyAuth(
  dispatch: Dispatch<AuthState>,
  biometric: ReturnType<typeof useBiometric>,
) {
  dispatch('biometric', biometric);

  if (biometric.status !== 'enabled') {
    return dispatch('isLoading', false);
  }

  const credentials = await biometric.authenticate();

  if (credentials) {
    return dispatch('credentials', credentials);
  }

  dispatch('isLoading', false);
}

export function useVerifyToken(
  state: AuthState,
  biometric: ReturnType<typeof useBiometric>,
  dispatch: Dispatch<AuthState>,
) {
  return useCallback(
    async (config: AxiosRequestConfig) => {
      if (config?.url?.includes('/auth')) return;

      if (!state.isAuthenticated || !state.expiresAt) return;

      if (authPromise) {
        await authPromise;
      }

      const isExpired = Date.now() > new Date(state.expiresAt).getTime();
      if (!isExpired || state.biometric.status !== 'enabled') return;

      const credentials = await biometric.authenticate();
      if (!credentials) return;

      await authenticateUser(credentials, dispatch);
    },
    [state, biometric],
  );
}
