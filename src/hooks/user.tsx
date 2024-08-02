'use client';

import $http from '@/lib/axios';
import type { BaseResponse } from '@/types/api';
import type { User } from '@/types/user';
import { AxiosError } from 'axios';
import { useState } from 'react';

export default async function useUser() {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  try {
    const { data } = await $http.get<BaseResponse<User>>('/v1/address');
    setUser(data?.data!);
    setIsLoading(false);
  } catch (error) {
    if (error instanceof AxiosError) {
      setError(error.message);
    }
  }

  return { user, isLoading, error };
}
