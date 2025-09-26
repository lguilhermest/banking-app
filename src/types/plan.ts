export interface Plan {
  id: number;
  name: string;
  is_default: boolean;
  pix_cash_in_fee: number;
  pix_cash_out_fee: number;
  dict_cash_in_enabled: boolean;
  manu_cash_in_enabled: boolean;
  qrdn_cash_in_enabled: boolean;
  qres_cash_in_enabled: boolean;
  legal_person_cash_in_enabled: boolean;
  max_charge_amount: number;
  created_at: string;
  updated_at: string;
}