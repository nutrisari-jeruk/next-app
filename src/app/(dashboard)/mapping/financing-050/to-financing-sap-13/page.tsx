import { TwHeader } from '@/components';
import RowProvider from '@/providers/row';
import Search from '@/components/tw-search';
import DataTable from '@/app/ui/data-table';
import { Pagination } from '@/app/ui/data-table/partials';
import { fetchList } from '@/actions/mapping/financing-050/to-financing-sap-13';
import type { Metadata } from 'next';
import type { Params } from '@/types/params';
import type { Column, Row } from '@/types/table';
import MappingFilter from './mapping-filter';

export const metadata: Metadata = {
  title: 'Mapping',
};

export default async function Page({
  searchParams: {
    page = '1',
    rowsPerPage = '10',
    searchField = 'account_050',
    searchValue = '',
    mapping = '-1',
  },
}: {
  searchParams: Params;
}) {
  const params: Params = {
    page: page,
    rowsPerPage: rowsPerPage,
    searchField: searchField,
    searchValue: searchValue,
    mapping: mapping,
  };

  const data = await fetchList(params);

  const columns: Column[] = [
    {
      label: '#',
      accessor: '#',
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
    <>
      <div className="flex items-center justify-between">
        <TwHeader title="Mapping Kode Rekening Pembiayaan SAP 13" />
      </div>

      <div className="mt-4 flex w-full flex-col space-y-2">
        <RowProvider {...{ rows, params }}>
          <div className="flex items-center justify-between space-x-2">
            <Search
              placeholder="Cari kode rekening"
              searchField={searchField}
            />
            <MappingFilter mapping={mapping} />
          </div>
          <DataTable {...{ columns, rows }} />
          <Pagination {...{ meta }} />
        </RowProvider>
      </div>
    </>
  );
}
