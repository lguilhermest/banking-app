import { Account, Dispatch, User, UserCredentials, UserRole } from '@types';
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
  biometric: BiometricState;
  account: Account;
  accountId: number;
  accounts: Account[];
  role: UserRole;
}

export interface AuthContextProps {
  state: AuthState;
  dispatch: Dispatch<AuthState>;
}
