import { useEffect, useState } from 'react';
import type { BaseResponse } from '@/types/api';
import type { User } from '@/types/user';
import { AxiosError } from 'axios';
import $http from '@/lib/axios';

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();

  const fetchUser = async () => {
    try {
      const { data } = await $http.get<BaseResponse<User>>('/users');
      setUser(data?.data!);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        setError(error);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, isLoading, error };
}
