import {
  Account,
  AuthRequest,
  AuthResponse,
  Dispatch,
  UserReponse,
  UserRole,
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

  try {
    if (!state?.accessToken) {
      await authenticateUser(state.credentials, dispatch);
    }

    const { customers, ...user } = await api.get<UserReponse>('/user');
    const { account, role } = getAccount(customers, state.accountId);

    api.setAccount(account.id);

    dispatch.update({
      isAuthenticated: true,
      isLoading: false,
      user,
      account,
      customers,
      role,
    });
  } catch (error) {
    dispatch('isLoading', false);
  }
}

function getAccount(
  customers: UserReponse['customers'],
  accountId?: number,
): { account: Account; role: UserRole } {
  if (!accountId) {
    return {
      account: customers[0]?.accounts[0],
      role: customers[0]?.pivot.role,
    };
  }

  let selectedAccount: any = {};

  for (const customer of customers) {
    const account = customer.accounts.find(({ id }) => id === accountId);

    if (account) {
      selectedAccount = {
        account,
        role: customer.pivot.role,
      };
      break;
    }
  }

  return selectedAccount;
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
      if (!credentials) return dispatch('isAuthenticated', false);

      await authenticateUser(credentials, dispatch);
    },
    [state, biometric],
  );
}
