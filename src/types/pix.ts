import { Participant } from "./participant";
import { AccountType } from "./account";
import { OrderStatus } from "./order";
import { SourceType } from "./user";

export interface PixPayment {
  end_to_end_id: string;
  source: SourceType;
  reference_code: string;
  amount: number;
  notes: null;
  performed_at: string;
  status: OrderStatus;
  reason: null;
  payer_participant_ispb: string;
  payer_account_branch: string;
  payer_account_number: string;
  payer_account_type: string;
  payer_document_number: string;
  payer_name: string;
  recipient_participant_ispb: string;
  recipient_account_branch: string;
  recipient_account_number: string;
  recipient_account_type: string;
  recipient_document_number: string;
  recipient_name: string;
  initialization_type: string;
  txid?: string;
  addressing_key: string;
  addressing_key_type: string;
  payer_account_id?: number;
  recipient_account_id: number;
  created_at: string;
  updated_at: string;
  transaction_type: "cash_in" | "cash_out";
  payer_participant: Participant;
  recipient_participant: Participant;
}

export type PixKeyType =
  | "EVP"
  | "PHONE"
  | "EMAIL"
  | "DOCUMENT"
  | "CPF"
  | "CNPJ";

export interface PixKey {
  id: number;
  type: PixKeyType;
  value: string;
  status: string;
  account_id: number;
  created_at: string;
  updated_at: string;
}

export interface PixPaymentFormData {
  amount: number;
  end_to_end_id: string;
}

export interface PixKeySearchResponse {
  key: {
    value: string;
    type: string;
  };
  name: string;
  participant: Participant;
  end_to_end_id: string;
  cached: boolean;
}

export enum PixInitializationType {
  DICT = "DICT",
  MANU = "MANU",
  QRDN = "QRDN",
  QRES = "QRES",
}

export interface PixManualPaymentFormData {
  amount: number;
  name: string;
  document_number: string;
  participant: string;
  account_branch: string;
  account_number: string;
  account_type: AccountType;
}

export interface PixRefund {
  end_to_end_id: string;
  reference_code: string;
  amount: number;
  performed_at: string;
  status: OrderStatus;
  reason?: string;
  debtor_participant_ispb: string;
  creditor_participant_ispb: string;
  devolution_code: string;
  original_end_to_end_id: string;
  debtor_account_id: number;
  creditor_account_id?: number;
  created_at: string;
  updated_at: string;
  original_reference_code?: string;
  transaction_type: string;
}
