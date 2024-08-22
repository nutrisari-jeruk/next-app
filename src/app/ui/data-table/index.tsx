'use client';

import clsx from 'clsx';
import Pagination from './partials/pagination';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search } from './partials';
import type { Column, Row } from '@/types/table';
import type { Meta } from '@/types/pagination';

interface Props {
  searchField: string;
  rows: Row[];
  columns: Column[];
  meta: Meta;
}

export default function DataTable({ searchField, rows, columns, meta }: Props) {
  const [tableData, setTableData] = useState<Row[]>(rows);
  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');

  const pathname = usePathname();

  useEffect(() => {
    setTableData(rows);
  }, [rows]);

  const sort = (sortField: string, sortOrder: string) => {
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

  const handleSortingChange = (accessor: string) => {
    const sortOrder =
      accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    sort(accessor, sortOrder);
  };

  const render = (index: number, column: Column, item: Row) => {
    const data = item[column.accessor] ? item[column.accessor] : '-';

    if (column.accessor === 'id') {
      return `${index + 1}.`;
    }

    if (column.label.toLowerCase().includes('edit')) {
      const id = item[column.accessor];

      return (
        <Link
          className="font-semibold text-blue-500 underline"
          href={`${pathname}/${id}/edit`}
        >
          Edit
        </Link>
      );
    }

    return data;
  };

  return (
    <div className="flex w-full flex-col space-y-2">
      <Search placeholder="Cari kode rekening" searchField={searchField} />

      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {!!columns &&
                      columns.map(({ label, accessor, sortable, width }) => {
                        let iconElement = (
                          <div>
                            <span className="text-gray-600">↑</span>
                            <span className="text-gray-600">↓</span>
                          </div>
                        );

                        if (sortable) {
                          if (sortField === accessor && order === 'asc') {
                            iconElement = (
                              <div>
                                <span className="text-gray-200">↑</span>
                                <span className="text-gray-600">↓</span>
                              </div>
                            );
                          } else if (
                            sortField === accessor &&
                            order === 'desc'
                          ) {
                            iconElement = (
                              <div>
                                <span className="text-gray-600">↑</span>
                                <span className="text-gray-200">↓</span>
                              </div>
                            );
                          }
                        }

                        const icon = iconElement;

                        return (
                          <th
                            key={accessor}
                            scope="col"
                            className={clsx(
                              'px-3 py-3.5 text-left text-sm font-semibold text-gray-900',
                              !!width ? `w-[${width}]` : 'w-fit',
                            )}
                            onClick={
                              sortable
                                ? () => handleSortingChange(accessor)
                                : undefined
                            }
                          >
                            <div className="flex w-full flex-wrap items-center space-x-2">
                              <span className="select-none">{label}</span>
                              {sortable && (
                                <button
                                  type="button"
                                  className="select-none"
                                  onClick={
                                    sortable
                                      ? () => handleSortingChange(accessor)
                                      : undefined
                                  }
                                >
                                  {icon}
                                </button>
                              )}
                            </div>
                          </th>
                        );
                      })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {!!tableData.length &&
                    tableData?.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        {columns.map((column: Column) => {
                          return (
                            <td
                              key={column.accessor}
                              className="px-3 py-4 text-sm text-gray-500"
                            >
                              {render(index, column, item)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                  {!tableData.length && (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      >
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Pagination {...{ meta }} />
    </div>
  );
}
