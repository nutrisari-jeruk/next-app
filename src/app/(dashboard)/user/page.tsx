'use client';

import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import type { BaseResponse } from '@/types/api';
import type { User } from '@/types/user';
import { Suspense } from 'react';

export default function Page() {
  const { data, error, isLoading } = useSWR<BaseResponse<User[]>>(
    '/api/user',
    fetcher,
  );

  const user = data?.data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Suspense>
    </div>
  );
}
