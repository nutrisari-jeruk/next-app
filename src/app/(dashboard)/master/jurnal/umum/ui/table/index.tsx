import DataTable from '@/app/ui/data-table';
import type { Params } from '@/types/params';
import type { Column, Row } from '@/types/table';
import { fetchUmumList } from '@/actions/master/jurnal/umum';
import { List } from '@/types/umum';


export default async function Table({
  page,
  rowsPerPage = '10',
  searchField = '',
  searchValue = '',
}: Params) {
  const data = await fetchUmumList({
    page: page,
    rowsPerPage: rowsPerPage,
    searchField: searchField,
    searchValue: searchValue,
  });

  const rows = data?.data.map((item: List) => {
    const deb = item.kode_rekening.find(
      (rekening) => rekening.debit !== null && rekening.credit === null,
    )?.debit;
    const cred = item.kode_rekening.find(
      (rekening) => rekening.credit !== null && rekening.debit === null,
    )?.credit;

    return {
      id: item.id,
      jurnal_kode: item.jurnal_kode,
      jurnal_jenis: item.jurnal_jenis,
      debit: deb,
      credit: cred,
    };
  }) as Row[];

  const columns: Column[] = [
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
    {
      label: 'Debit',
      accessor: 'debit',
      sortable: false,
    },
    {
      label: 'Kredit',
      accessor: 'credit',
      sortable: false,
    },
    {
      label: 'Edit',
      accessor: 'credit',
      sortable: false,
    },
  ];


  const meta = data.meta;

  return <DataTable {...{ rows, columns, meta, searchField }} />;
}
