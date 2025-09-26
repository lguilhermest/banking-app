export type PaginateFilter<T = {}> = {
  from?: string;
  until?: string;
  page?: number;
  count?: number;
} & T;

export interface Paginate<T = {}> {
  current_page: number;
  data: T[];
  from: number;
  per_page: number;
  last_page: number;
  first_page_url: string;
  next_page_url?: string;
  prev_page_url?: string;
}

export type WithMfaToken<T extends any> = {
  mfa_token: string;
} & T;
