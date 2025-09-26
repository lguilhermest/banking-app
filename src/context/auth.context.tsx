import {
  Account,
  Customer,
  Dispatch,
  User,
  UserCredentials,
  UserReponse,
  UserRole,
} from '@types';
import { BiometricState, useBiometric, useCreateReducer } from '@hooks';
import { createContext, PropsWithChildren, useEffect } from 'react';
import api from '@api';

export interface AuthState {
  credentials: UserCredentials;
  isAuthenticated: boolean;
  accessToken: string;
  user: User;
  balance: number;
  balanceVisible: boolean;
  isLoading: boolean;
  biometric: BiometricState;
  account: Account;
  accountId: number;
  accounts: Account[];
  customers: UserReponse['customers'];
  customer: Customer;
  role: UserRole;
}

export interface AuthContextProps {
  state: AuthState;
  dispatch: Dispatch<AuthState>;
  fetchUserData: () => Promise<void>;
}

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

  useEffect(() => {
    if (typeof biometric.status === 'string') {
      verifyAuth();
    }
  }, [biometric.status]);

  async function verifyAuth() {
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

  useEffect(() => {
    if (state.credentials) {
      fetchUserData();
    }
  }, [state.credentials]);

  async function fetchUserData() {
    dispatch('isLoading', true);
    try {
      if (!state?.accessToken) {
        const response = await api.post<{ token: string }>(
          '/auth',
          state.credentials,
        );
        api.setToken(response.token);
        dispatch('accessToken', response.token);
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

  return (
    <AuthContext.Provider value={{ state, dispatch, fetchUserData }}>
      {props.children}
    </AuthContext.Provider>
  );
};
