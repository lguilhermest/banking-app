import { Account } from './account';

export type User<T = {}> = {
  id: number;
  name: string;
  email: string;
  status: string;
  should_update_password: boolean;
  created_at: string;
  updated_at: string;
  has_mfa_secret: boolean;
} & T;

export enum UserRole {
  admin = 'admin',
  basic = 'basic',
}

export type UserReponse = User<{
  accounts: Account[];
}>;

export type SourceType = 'web' | 'api' | 'mobile' | 'external';

export interface UserCredentials {
  email: string;
  password: string;
}
