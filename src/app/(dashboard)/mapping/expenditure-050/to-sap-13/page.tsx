import Link from 'next/link';
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import { TwButton, TwHeader, TwTable } from '@/components';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import { fetchList } from './actions';
import type { Params } from '@/types/params';
import type { Column, Row } from '@/types/table';

export const metadata: Metadata = {
  title: 'Mapping',
};

export default async function Page({ params }: { params: Params }) {
  const searchValue = params?.searchValue || '';
  const searchField = params?.searchField || ['koderekening_050'];
  const currentPage = Number(params?.page) || 1;
  const perPage = Number(params?.rowsPerPage) || 10;

  const columns: Column[] = [
    {
      label: 'Kode Rekening',
      accessor: 'kr050_id',
      sortable: true,
    },
    {
      label: 'Uraian',
      accessor: 'account_050',
      sortable: true,
    },
    {
      label: 'Kode Rekening',
      accessor: 'sap13_id',
      sortable: true,
    },
    {
      label: 'Uraian',
      accessor: 'account_sap13',
      sortable: true,
    },
  ];

  const data = await fetchList({
    page: currentPage,
    rowsPerPage: perPage,
    searchField: searchField,
    searchValue: searchValue,
  });

  const rows = data as Row[];

  return (
    <>
      <div className="flex items-center justify-between">
        <TwHeader title="Jurnal Penyesuaian" />

        <Link href="to-sap-13/create">
          <TwButton
            type="submit"
            title="Tambah baru"
            variant="success"
            icon={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
          />
        </Link>
      </div>

      <div className="mt-4 flex flex-col space-y-2">
        <Search placeholder="Cari kode rekening" />

        <Suspense
          key={searchValue + currentPage + perPage}
          fallback={<div>Loading...</div>}
        >
          <TwTable {...{ columns, rows }} />
        </Suspense>
      </div>
    </>
  );
}
