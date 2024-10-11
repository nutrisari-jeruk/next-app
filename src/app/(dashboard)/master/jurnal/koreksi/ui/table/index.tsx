import DataTable from '@/app/ui/data-table';

import type { Params } from '@/types/params';
import { List } from '@/types/koreksi';
import type { Column, Row } from '@/types/table';
import { fetchKoreksiList } from '../../actions';

export default async function Table({
  page,
  rowsPerPage = '10',
  searchField = '',
  searchValue = '',
}: Params) {
  const data = await fetchKoreksiList({
    page: page,
    rowsPerPage: rowsPerPage,
    searchField: searchField,
    searchValue: searchValue,
  });

  const rows = data?.data.map((item: List) => {
    const deb = item.accounts.find(
      (rekening) => rekening.debit !== null && rekening.credit === null,
    )?.debit;
    const cred = item.accounts.find(
      (rekening) => rekening.credit !== null && rekening.debit === null,
    )?.credit;

    return {
      id: item.id,
      journal_kind_kode: item.journal_kind_kode,
      journal_kind_jenis: item.journal_kind_jenis,
      debit: deb,
      credit: cred,
    };
  }) as Row[];

  const columns: Column[] = [
    {
      label: 'Kode journal_kind',
      accessor: 'journal_kind_kode',
      sortable: true,
    },
    {
      label: 'Jenis journal_kind',
      accessor: 'journal_kind_jenis',
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
      accessor: 'edit',
      sortable: false,
    },
  ];

  const meta = data.meta;

  return <DataTable {...{ rows, columns, meta, searchField }} />;
}
