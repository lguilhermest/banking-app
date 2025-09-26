export interface AccessKey {
  key: string;
  allow_cash_out: boolean;
  trusted_origins: string[];
  account_id: number;
  created_at: string;
  updated_at: string;
}

export interface AccessKeyFormData {
  allow_cash_out: boolean;
  trusted_origins: string[];
  mfa_token: string;
}
