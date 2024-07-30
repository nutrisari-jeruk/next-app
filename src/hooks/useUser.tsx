import { useEffect, useState } from 'react';
import type { BaseResponse } from '@/types/api';
import type { User } from '@/types/user';
import $http from '@/lib/axios';
import { AxiosError } from 'axios';
import { auth } from '@/auth';

export default function useUser() {
  const [user, setUser] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    try {
      const session = await auth();
      const headers = {
        Authorization: `Bearer ${session?.user.access_token}`,
      }
      const response = await fetch('/api/user', { headers });
      const data = await response.json();
      setUser(data);
    } catch (error: any) {
      console.log(error)
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, isLoading, error };
}
