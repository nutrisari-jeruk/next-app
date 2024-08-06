import { AxiosError } from 'axios';
import { useState } from 'react';
import type { BaseResponse } from '@/types/api';
import type { User } from '@/types/user';
import $http from '@/lib/axios';

export default async function useUser() {
  let user: User[];

  try {
    const { data } = await $http.get<BaseResponse<User[]>>('/v1/user');
    user = data?.data!;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw error;
  }

  return user;
}
