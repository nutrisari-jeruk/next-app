import $fetch from '@/lib/fetch';
import { AxiosError } from 'axios';
import type { TreeNode } from '@/types/tree-view';

interface Props {
  account?: string;
  category?: string;
  kind?: string;
  object?: string;
  object_details?: string;
  sub_object_details?: string;
}

export default async function useSap13(props?: Props): Promise<TreeNode[]> {
  let sap13: TreeNode[];
  const params = {
    accounts: props?.account || '',
    categories: props?.category || '',
    kinds: props?.kind || '',
    objects: props?.object || '',
    object_details: props?.object_details || '',
    sub_object_details: props?.sub_object_details || '',
  };

  const urlParams = new URLSearchParams(params).toString();

  try {
    const data = await $fetch<TreeNode[]>({
      url: '/v1/masters/accounts/sap13/tree?' + urlParams,
      method: 'GET',
    });

    sap13 = data?.data!;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw error;
  }

  return sap13;
}
