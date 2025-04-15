import type { TreeNode } from '@/types/tree-view';

export interface List {
  id: number;
  text: string;
  account_code: string;
  account_description: string;
  level: number;
  parent_id: number;
}

export interface Payload {
  account_description: string;
  parent_id: number;
}

export interface Account {
  nodes: TreeNode;
}