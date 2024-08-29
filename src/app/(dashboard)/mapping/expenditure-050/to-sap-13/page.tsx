import Skeletons from '@/app/ui/skeletons';
import DataTable from '@/app/ui/data-table';
import RowProvider from '@/providers/row';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { TwHeader } from '@/components';
import { fetchList } from './actions';
import type { Params } from '@/types/params';
import type { Column, Row } from '@/types/table';

export const metadata: Metadata = {
  title: 'Mapping',
};

export default async function Page({ searchParams }: { searchParams: Params }) {
  const page = searchParams.page || '1';
  const rowsPerPage = searchParams.rowsPerPage || '10';
  const searchField = searchParams.searchField || 'account_050';
  const searchValue = searchParams.searchValue || '';

  const data = await fetchList({
    page: page,
    rowsPerPage: rowsPerPage,
    searchField: searchField,
    searchValue: searchValue,
  });

  const columns: Column[] = [
    {
      label: '#',
      accessor: 'id',
    },
    {
      label: 'Uraian',
      accessor: 'account_050',
      width: '50px',
      sortable: true,
    },
    {
      label: 'Uraian',
      accessor: 'account_sap13',
      width: '50px',
      sortable: true,
    },
    {
      label: 'Edit',
      accessor: 'kr050_id',
    },
  ];

  const rows = data.data.map((row) => {
    return {
      id: row.id,
      kr050_id: row.kr050_id,
      sap13_id: row.sap13_id,
      account_050: row.account_050,
      account_sap13: row.account_sap13,
    };
  }) as Row[];

  const meta = data.meta;

  return (
    <div>
      <div className="flex items-center justify-between">
        <TwHeader title="Mapping Kode Rekening" />
      </div>

      <div className="mt-4">
        <Suspense fallback={<Skeletons />}>
          <RowProvider rows={rows}>
            <DataTable {...{ rows, columns, meta, searchField }} />
          </RowProvider>
        </Suspense>
      </div>
    </div>
  );
}
