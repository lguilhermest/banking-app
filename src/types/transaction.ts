import { PixPayment, PixRefund } from './pix';
import { PaginateFilter } from './api';
import { Account } from './account';

export type TransactionOwners = PixPayment | PixRefund;

export interface Transaction<
  Owner extends TransactionOwners = TransactionOwners,
> {
  id: number;
  account_id: number;
  amount: number;
  balance: number;
  fee: number;
  owner_type: string;
  owner_id: string;
  owner_amount: number;
  is_reversal: boolean;
  client_reference_code: string;
  datetime: string;
  owner: Owner;
  account: Account;
}

export type TransactionFilter = PaginateFilter<{
  correlation_id?: string;
  txid?: string;
  end_to_end_id?: string;
  type?: string;
  direction?: string;
  uuid?: string;
}>;
