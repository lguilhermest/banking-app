import { Account, AccountResponse, Dispatch, User, UserCredentials, UserRole } from '@types';
import { BiometricState } from '@hooks';

export interface AuthState {
  expiresAt: string;
  credentials: UserCredentials;
  isAuthenticated: boolean;
  accessToken: string;
  user: User;
  balance: number;
  balanceVisible: boolean;
  isLoading: boolean;
  isFetchingAccount: boolean;
  biometric: BiometricState;
  account: AccountResponse;
  accountId: number;
  accounts: Account[];
  role: UserRole;
}

export interface AuthContextProps {
  state: AuthState;
  dispatch: Dispatch<AuthState>;
  changeAccount: (accountId: number) => void;
}
