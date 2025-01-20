'use client';

import DataTable from '@/app/ui/data-table';
import { useState } from 'react';
import { TwButton } from '@/components';
import { Pagination, Search } from '@/app/ui/data-table/partials';
import type { Meta, Pagination as PaginationType } from '@/types/pagination';
import type { Column, Row } from '@/types/table';
import type { List } from '@/types/journal/adjustment';
import ShowJournal from '../show-journal';

function View(data: Row) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TwButton size="xs" title="View" onClick={() => setIsOpen(true)} />
      <ShowJournal
        data={data}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </>
  );
}

interface Props {
  searchField?: string;
  data: PaginationType<List[]>;
}
export default function Table({ searchField = '', data }: Props) {
  const rows: Row[] = data?.data.map((item: List) => {
    return {
      id: item.id,
      journal_code: item.journal_code,
      journal_kind: item.journal_kind,
      accounts: item.accounts,
    };
  });

  const columns: Column[] = [
    {
      label: 'No.',
      accessor: '#',
      sortable: false,
    },
    {
      label: 'Kode',
      accessor: 'journal_code',
      sortable: true,
    },
    {
      label: 'Jenis',
      accessor: 'journal_kind',
      sortable: true,
    },
    {
      label: 'View',
      accessor: 'id',
      sortable: false,
      render: (item: Row) => {
        return <View data={item} />;
      },
    },
  ];

  const meta: Meta = data.meta;
  return (
    <div className="flex w-full flex-col space-y-2">
      <Search placeholder="Cari Jenis Jurnal" searchField={searchField} />
      <DataTable {...{ rows, columns, meta, searchField }} />
      <Pagination {...{ meta }} />
    </div>
  );
}
