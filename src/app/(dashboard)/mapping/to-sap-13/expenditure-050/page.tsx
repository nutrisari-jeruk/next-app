import Table from './components/table';
import Link from 'next/link';
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import { TwButton } from '@/components';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import type { Params } from '@/types/params';

export const metadata: Metadata = {
  title: 'User',
};

export default async function Page({ params }: { params: Params }) {
  const searchValue = params?.searchValue || '';
  const searchField = params?.searchField || 'koderekening_050';
  const currentPage = Number(params?.page) || 1;
  const perPage = Number(params?.rowsPerPage) || 10;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold leading-7 text-gray-900">Users</h1>
        <Link href="/user/create">
          <TwButton
            type="submit"
            title="Add User"
            variant="success"
            icon={<PlusCircleIcon className="h-5 w-5" aria-hidden="true" />}
          />
        </Link>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Search placeholder="Search users..." />

        <Suspense
          key={searchValue + currentPage + perPage}
          fallback={<div>Loading...</div>}
        >
          <Table
            searchField={searchField}
            searchValue={searchValue}
            page={currentPage}
            rowsPerPage={perPage}
          />
        </Suspense>
      </div>
    </>
  );
}
