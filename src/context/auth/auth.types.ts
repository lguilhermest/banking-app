import {
  Account,
  Customer,
  Dispatch,
  User,
  UserCredentials,
  UserReponse,
  UserRole,
} from '@types';
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
  customers: UserReponse['customers'];
  customer: Customer;
  role: UserRole;
}

export interface AuthContextProps {
  state: AuthState;
  dispatch: Dispatch<AuthState>;
  fetchUserData: () => Promise<void>;
}
