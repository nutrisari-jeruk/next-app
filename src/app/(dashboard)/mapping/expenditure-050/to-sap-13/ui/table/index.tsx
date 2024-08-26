import DataTable from '@/app/ui/data-table';
import fetchList from '../../actions';
import type { Params } from '@/types/params';
import type { Column, Row } from '@/types/table';

export default async function Table({
  page,
  rowsPerPage = '10',
  searchField = '',
  searchValue = '',
}: Params) {

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
    }
  ];

  const rows = data.data.map((row) => {
    return {
      id: row.id,
      account_050: row.account_050,
      account_sap13: row.account_sap13 || '-'
    };
  }) as Row[];

  const meta = data.meta;

  return <DataTable {...{ rows, columns, meta, searchField }} />;
}
