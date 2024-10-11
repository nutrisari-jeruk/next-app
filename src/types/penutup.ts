import type { Url } from 'next/dist/shared/lib/router/router';

export interface PaginateList {
  data: List[];
  links: Links[];
  meta: Meta;
}

export interface List {
  id: number;
  journal_kind_kode: string;
  journal_kind_jenis: string;
  accounts: KodeRekening[];
}

export interface KodeRekening {
  id: number;
  code: string;
  debit?: string | null;
  credit?: string | null;
}

export interface Links {
  url: Url;
  label: string;
  active: boolean;
}

export interface Meta {
  current_page: string;
  from: string;
  last_page: string;
  path: Url;
  per_page: string;
  to: string;
  total: string;
}

export interface PostRequest {
  jenis_journal_kind: string;
  accounts_id: {
    debit: number;
    credit: number;
  };
}
