import Link from 'next/link';
import { TwButton, TwHeader } from '@/components';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import { Suspense } from 'react';
import type { Params } from '@/types/params';
import Skeletons from '@/app/ui/skeletons';
import Table from './ui/table';
import { fetchList } from '@/actions/master/journal/correction';

export const metadata: Metadata = {
  title: 'Jurnal Koreksi',
};
export default async function Page({ searchParams }: { searchParams: Params }) {
  const searchValue = searchParams?.searchValue || '';
  const searchField = searchParams?.searchField || 'journal_code';
  const page = searchParams?.page || '1';
  const rowsPerPage = searchParams?.rowsPerPage || '10';

  const data = await fetchList({
    page: page,
    rowsPerPage: rowsPerPage,
    searchField: searchField,
    searchValue: searchValue,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <TwHeader title="Jurnal Koreksi" />

        <Link href="/master/journal/correction/create">
          <TwButton
            title="Tambah Baru"
            variant="success"
            icon={<PlusCircleIcon className="h-5 w-5" />}
          />
        </Link>
      </div>

      <div className="mt-4">
        <Table data={data} searchField={searchField} />
      </div>
    </>
  );
}
