import Link from 'next/link';
import Search from '@/app/ui/search';
import fetchList from './actions';
import { Metadata } from 'next';
import { PlusIcon } from '@heroicons/react/24/outline';
import { TwButton, TwHeader, TwTable } from '@/components';
import { Pagination } from '@/app/ui/table';
import type { Params } from '@/types/params';
import type { Column, Row } from '@/types/table';
import type { Links, Meta } from '@/types/pagination';

export const metadata: Metadata = {
  title: 'Mapping',
};

export default async function Page({ searchParams }: { searchParams: Params }) {
  const searchValue = searchParams?.searchValue || '';
  const searchField = searchParams?.searchField || 'account_050';
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.rowsPerPage) || 200;

  const data = await fetchList({
    page: currentPage,
    rowsPerPage: perPage,
    searchField: searchField,
    searchValue: searchValue,
  });

  const rows = data.data.map((item) => {
    return {
      account_050: item.account_050,
      account_sap13: item.account_sap13,
    };
  }) as Row[];

  const columns: Column[] = [
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

  const links: Links[] = data.links;
  const meta: Meta = data.meta;

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

      <div className="mt-4 flex flex-col space-y-2">
        <Search placeholder="Cari kode rekening" searchField={searchField} />
        <TwTable {...{ columns, rows }} />
        <Pagination {...{ links, meta }} />
      </div>
    </div>
  );
}
