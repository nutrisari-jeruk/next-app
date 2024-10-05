import DataTable from '@/app/ui/data-table';
import type { Params } from '@/types/params';
import type { Column, Row } from '@/types/table';
import { fetchList } from '@/actions/master/journal/closing';
import { List } from '@/types/journal/closing';


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

  const rows = data?.data.map((item: List) => {
    return {
      id: item.id,
      jurnal_kode: item.jurnal_kode,
      jurnal_jenis: item.jurnal_jenis
    };
  }) as Row[];

  const columns: Column[] = [
    {
      label: 'No.',
      accessor: '#',
      sortable: false,
    },
    {
      label: 'Kode Jurnal',
      accessor: 'jurnal_kode',
      sortable: true,
    },
    {
      label: 'Jenis Jurnal',
      accessor: 'jurnal_jenis',
      sortable: true,
    },
  ];

  const meta = data.meta;

  return <DataTable {...{ rows, columns, meta, searchField }} />;
}
