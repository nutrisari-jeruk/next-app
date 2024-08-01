'use client';

import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import type { BaseResponse } from '@/types/api';
import type { User } from '@/types/user';
import Table from './components/table';
import { Button } from '@/components';
import Link from 'next/link';

export default function Page() {
  const { data, error, isLoading } = useSWR<BaseResponse<User[]>>(
    '/api/user',
    fetcher,
  );

  const user = data?.data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-8">
      <div className="flex flex-col">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          Users
        </h1>
        <p>
          A list of all the users in your account including their name, title,
          email and role.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="w-24">
          <Link href="/user/create">
            <Button title="Add User" variant="primary" size="sm" />
          </Link>
        </div>
        <Table />
      </div>
    </div>
  );
}
