import Link from 'next/link';
import fetchList from './actions';
import DataTable from '@/app/ui/data-table';
import { Metadata } from 'next';
import { PlusIcon } from '@heroicons/react/24/outline';
import { TwButton, TwHeader } from '@/components';
import type { Column, Row } from '@/types/table';
import type { Params } from '@/types/params';

export const metadata: Metadata = {
  title: 'Mapping',
};

interface Props {
  searchParams: Params;
}

export default async function Page({ searchParams }: Props) {
  const searchValue = searchParams?.searchValue || '';
  const searchField = searchParams?.searchField || 'account_050';
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.rowsPerPage) || 200;

  const columns: Column[] = [
    {
      label: '#',
      accessor: 'id',
    },
    {
      label: 'Uraian',
      accessor: 'account_050',
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

  const rows = data.data.map((row) => {
    return {
      id: row.id,
      account_050: row.account_050,
      account_sap13: row.account_sap13,
    };
  }) as Row[];

  const links = data.links;
  const meta = data.meta;

  return (
    <div>
      <div className="flex items-center justify-between">
        <TwHeader title="Mapping Kode Rekening" />

        <Link href="to-sap-13/create">
          <TwButton
            type="submit"
            title="Tambah baru"
            variant="success"
            icon={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
          />
        </Link>
      </div>

      <div className="mt-4">
        <DataTable {...{ rows, columns, searchField, links, meta }} />
      </div>
    </div>
  );
}
