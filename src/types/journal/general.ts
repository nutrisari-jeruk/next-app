import type { TreeNode } from '@/types/tree-view';

export interface PaginateList {
  data: List[];
  links: Links[];
  meta: Meta;
}

export interface List {
  id: number;
  jurnal_kode: string;
  jurnal_jenis: string;
  kode_rekening: KodeRekening[];
}

export interface KodeRekening {
  id: number;
  code: string;
  debit?: string | null;
  credit?: string | null;
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

export interface PostRequest {
  jenis_jurnal: string;
  kode_rekening_id: {
    debit: number;
    credit: number;
  }[];
}

export interface Account {
  is_credit: boolean;
  sap13_id: TreeNode;
}
