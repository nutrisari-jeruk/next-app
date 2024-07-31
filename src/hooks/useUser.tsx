import type { BaseResponse } from '@/types/api';
import type { User } from '@/types/user';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export default function useUser() {
  const { data, error, isLoading } = useSWR<BaseResponse<User[]>>(
    '/api/user',
    fetcher,
  );

  const user = data?.data;

  return { user, isLoading, error };
}
