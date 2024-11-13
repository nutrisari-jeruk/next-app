import $fetch from '@/lib/fetch';
import { AxiosError } from 'axios';
import type { TreeNode } from '@/types/tree-view';

interface Props {
  accounts?: string[];
  categories?: string[];
  kinds?: string[];
  objects?: string[];
  object_details?: string[];
  sub_object_details?: string[];
}

export async function fetchSap13(props?: Props): Promise<TreeNode[]> {
  let sap13: TreeNode[] = [];
  const params: {
    [key: string]: string | string[];
  } = {
    accounts: props?.accounts || [],
    categories: props?.categories || [],
    kinds: props?.kinds || [],
    objects: props?.objects || [],
    object_details: props?.object_details || [],
    sub_object_details: props?.sub_object_details || [],
  };

  const urlSearchParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (Array.isArray(value)) {
      value.forEach((val) => {
        urlSearchParams.append(`${key}[]`, val);
      });
    } else {
      urlSearchParams.append(key, value);
    }
  });

  try {
    const data = await $fetch<TreeNode[]>({
      url: '/v1/masters/accounts/sap13/tree?' + urlSearchParams.toString(),
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
