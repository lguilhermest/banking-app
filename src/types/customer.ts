export type CustomerType = 'NATURAL_PERSON' | 'LEGAL_PERSON';

export type Customer<T = {}> = {
  document_number: string;
  name: string;
  type: CustomerType;
  email: string;
  phone_number: string;
  city: string;
  status: string;
  global_limit_id: null;
  created_at: string;
  updated_at: string;
} & T;

export interface CustomerUserPivot {
  user_id: number;
  customer_document_number: string;
  role: string;
}