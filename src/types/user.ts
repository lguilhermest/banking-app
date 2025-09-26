import { Customer } from './customer';
import { Account } from './account';
import { Plan } from './plan';

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
  customers: Array<
    Customer<{
      pivot: {
        user_id: number;
        customer_document_number: number;
        role: UserRole;
      };
      accounts: Array<
        Account<{
          plan: Plan;
        }>
      >;
    }>
  >;
}>;

export type SourceType = 'web' | 'api' | 'mobile' | 'external';

export interface UserCredentials {
  email: string;
  password: string;
}
