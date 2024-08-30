import { AxiosError } from 'axios';
import type { BaseResponse } from '@/types/api';
import $http from '@/lib/axios';

export default async function UsePageAccessRights(): Promise<[]> {
  let accessRights: [];

  try {
    const { data } = await $http.get<BaseResponse<[]>>(
      'https://dummyjson.com/c/e0ee-7de9-4d17-9108',
    );

    accessRights = data?.data!;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw error;
  }

  return accessRights;
}
