import $fetch from '@/lib/fetch';
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

  // Mock
  const { data } = await $fetch<TreeNode[]>({
    // url: 'https://run.mocky.io/v3/d903d251-e479-4592-909c-55d16df7584b?' + urlSearchParams.toString(),
    url: '/v1/masters/accounts/sap13/tree' + urlSearchParams.toString(),
    method: 'GET',
  });

  const sap13: TreeNode[] = data || [];

  return sap13;
}

export async function fetchSap13Reverse(props?: Props): Promise<TreeNode[]> {
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

  // Mock
  const { data } = await $fetch<TreeNode[]>({
    // url: 'https://run.mocky.io/v3/d903d251-e479-4592-909c-55d16df7584b?' + urlSearchParams.toString(),
    url: '/v1/masters/accounts/sap13/tree/reverse' + urlSearchParams.toString(),
    method: 'GET',
  });

  const sap13: TreeNode[] = data || [];

  return sap13;
}
