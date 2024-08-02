import { AxiosError } from 'axios';
import { useState } from 'react';
import type { BaseResponse } from '@/types/api';
import type { User } from '@/types/user';
import $http from '@/lib/axios';

export default async function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  try {
    const { data } = await $http.get<BaseResponse<User>>('/v1/user');
    setUser(data?.data!);
  } catch (error) {
    if (error instanceof AxiosError) {
      setError(error.message);
    }
    throw error;
  } finally {
    setIsLoading(false);
  }

  return { user, isLoading, error };
}
