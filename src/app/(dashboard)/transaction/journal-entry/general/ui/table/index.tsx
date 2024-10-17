'use client';
import { TwButton } from '@/components';
import React, { useState } from 'react';
import ShowJournal from '../show-journal';
import type { Meta, Pagination as PaginationType } from '@/types/pagination';
import type { Column, Row } from '@/types/table';
import { List } from '@/types/journal-entry/general';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import Search from '@/components/tw-search';
import DataTable from '@/app/ui/data-table';
import { Pagination } from '@/app/ui/data-table/partials';

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
  dayjs.locale('id');
  const columns: Column[] = [
    {
      label: '#',
      accessor: '#',
    },
    {
      label: 'Tanggal Transaksi',
      accessor: 'transaction_date',
      width: '150px',
      sortable: true,
      render: (item: Row) => {
        return <p className="text-nowrap">{`${item.transaction_date}`}</p>;
      },
    },
    {
      label: 'No Bukti',
      accessor: 'proof_number',
      width: '50px',
      sortable: true,
    },
    {
      label: 'Keterangan',
      accessor: 'description',
      width: '50px',
      sortable: true,
      render: (item: Row) => {
        return <p className="text-justify">{`${item.description}`}</p>;
      },
    },
    {
      label: 'View',
      accessor: 'details',
      sortable: false,
      render: (item: Row) => {
        return <View data={item} />;
      },
    },
  ];

  const rows = data.data.map((row) => {
    return {
      transaction_date: dayjs(row.transaction_date).format('DD MMMM YYYY'),
      proof_number: row.proof_number,
      description: row.description,
      details: row.details,
    };
  }) as Row[];

  const meta = data.meta;
  return (
    <>
      <div className="flex w-full flex-col space-y-2">
        <Search placeholder="Cari No Bukti" searchField={searchField} />
        <DataTable {...{ rows, columns, meta, searchField }} />
        <Pagination {...{ meta }} />
      </div>
    </>
  );
}
