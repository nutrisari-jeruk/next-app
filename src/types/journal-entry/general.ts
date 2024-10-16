import type { Params as GlobalParams } from '@/types/params';
import type { Option as globalOption } from '@/types/option';
export interface PaginateList {
  data: List[];
  links: Links[];
  meta: Meta;
}

export interface List {
  fiscal_year: number;
  fiscal_month: number;
  proof_number: string;
  transaction_date: string;
  description: string;
  details: Detail[];
}

export interface Detail {
  journal_entry_id: number;
  journal_detail_id: number;
  sap13_id: number;
  account_code: string;
  account_description: string;
  debit: number | null;
  credit: number | null;
}

export interface Links {
  url: string;
  label: string;
  active: boolean;
}

export interface Meta {
  current_page: string;
  from: string;
  last_page: string;
  path: string;
  per_page: string;
  to: string;
  total: string;
}

export interface Payload {
  transaction_date: string;
  journal_id: number;
  descriptions: string;
  accounts: Account[];
}

export interface Account {
  is_credit: boolean;
  sap13_id: number;
  amount: number;
}

export interface Params extends GlobalParams {
  period: string;
}

export interface JournalKindAutoComplete {
  id: number;
  journal_code: string;
  journal_kind: string;
  accounts: {
    id: number;
    code: string;
    debit: string | null;
    credit: string | null;
  }[];
}

export interface Option extends globalOption {
  accounts: {
    id: number;
    code: string;
    debit: string | null;
    credit: string | null;
    amount?: number | null;
  }[];
}
