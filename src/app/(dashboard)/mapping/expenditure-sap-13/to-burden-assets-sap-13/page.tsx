import { TwHeader } from '@/components';
import RowProvider from '@/providers/row';
import Search from '@/components/tw-search';
import DataTable from '@/app/ui/data-table';
import { Pagination } from '@/app/ui/data-table/partials';
import { fetchList } from '@/actions/mapping/expenditure-sap-13/to-burden-assets-sap-13';
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
    searchField = 'account_sap13',
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
      accessor: 'account_sap13_expend',
      width: '50px',
      sortable: true,
    },
    {
      label: 'Uraian',
      accessor: 'account_sap13_burden_asset',
      width: '50px',
      sortable: true,
    },
    {
      label: 'Edit',
      accessor: 'sap13_id_expend',
    },
  ];

  const rows = data.data.map((row) => {
    return {
      id: row.id,
      sap13_id_expend: row.sap13_id_expend,
      sap13_id_burden_asset: row.sap13_id_burden_asset,
      account_sap13_expend: row.account_sap13_expend,
      account_sap13_burden_asset: row.account_sap13_burden_asset,
    };
  }) as Row[];

  const meta = data.meta;

  return (
    <>
      <div className="flex items-center justify-between">
        <TwHeader title="Mapping Kode Rekening Beban dan Aset" />
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
