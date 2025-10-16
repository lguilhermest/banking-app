import { AccessKey } from './access-key';
import { Customer } from './customer';
import { UserRole } from './user';
import { PixKey } from './pix';
import { Plan } from './plan';

export enum AccountType {
  CACC = 'CACC',
  SLRY = 'SLRY',
  SVGS = 'SVGS',
  TRAN = 'TRAN',
}

export type Account<T = {}> = {
  id: number;
  branch: number;
  name: string;
  type: string;
  status: string;
  document_number: string;
  plan_id: number;
  created_at: string;
  updated_at: string;
  pivot: {
    user_id: number;
    customer_document_number: number;
    role: UserRole;
  };
  customer: Customer;
  plan: Plan;
} & T;

export interface AccountStats {
  balance: number;
  all_time_conversion_rate: number;
  history: AccountStatsHistory[];
}

export interface AccountStatsHistory {
  date: string;
  cash_in: {
    quantity: number;
    amount: number;
  };
  cash_out: {
    quantity: number;
    amount: number;
  };
  charges: {
    issued: number;
    settled: number;
    rate: number;
  };
}

export interface AccountResponse {
  id: number;
  branch: string;
  name: string;
  type: string;
  status: string;
  document_number: string;
  plan_id: number;
  created_at: string;
  updated_at: string;
  cash_out_usage: CashOutUsage;
  balance: number;
  customer: Customer;
  plan: Plan;
  pix_keys: PixKey[];
  access_keys: AccessKey[];
  account_webhooks: any[];
  limits: null;
}

export interface CashOutUsage {
  api_daily_usage: number;
  mobile_daily_usage: number;
  web_daily_usage: number;
}
