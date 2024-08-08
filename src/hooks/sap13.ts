import { AxiosError } from 'axios';
import type { BaseResponse } from '@/types/api';
import type { TreeNode } from '@/types/tree-view';
import $http from '@/lib/axios';

export default async function useSap13(): Promise<TreeNode[]> {
  let sap13: TreeNode[];

  try {
    const { data } = await $http.get<BaseResponse<TreeNode[]>>(
      'http://10.10.12.26/api_accountancy/public/api/v1/masters/accounts/sap13/tree',
    );

    sap13 = data?.data!;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw error;
  }

  return sap13;
}
