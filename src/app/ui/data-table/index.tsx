'use client';

import Pagination from './partials/pagination';
import { useState } from 'react';
import { Search, TBody, THead } from './partials';

import type { Column, Row } from '@/types/table';
import type { Links, Meta } from '@/types/pagination';

interface Props {
  searchField: string;
  rows: Row[];
  columns: Column[];
  links: Links[];
  meta: Meta;
}

export default function DataTable({
  rows,
  columns,
  links,
  meta,
  searchField,
}: Props) {
  const [tableData, setTableData] = useState(rows);

  const handleSorting = (sortField: string, sortOrder: string) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
            numeric: true,
          }) * (sortOrder === 'asc' ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  return (
    <div className="flex w-full flex-col space-y-2">
      <Search placeholder="Cari kode rekening" searchField={searchField} />
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <THead columns={columns} handleSorting={handleSorting} />
                <TBody columns={columns} rows={tableData} />
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination {...{ links, meta }} />
    </div>
  );
}
