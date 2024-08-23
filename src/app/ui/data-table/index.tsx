'use client';

import clsx from 'clsx';
import Pagination from './partials/pagination';
import { useEffect, useState } from 'react';
import { Search } from './partials';
import type { Column, Row } from '@/types/table';
import type { Meta } from '@/types/pagination';
import Link from 'next/link';

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

  return (
    <div className="flex w-full flex-col space-y-2">
      <Search placeholder="Cari kode rekening" searchField={searchField} />

      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 table-fixed">
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
                        {columns.map(({ accessor }: Column) => {
                          const data = item[accessor] ? item[accessor] : '';
                          return (
                            <td
                              key={accessor}
                              className="px-3 py-4 text-sm text-gray-500 hover:underline"
                            >
                              <Link
                                href={`${item['id']}/edit`}
                                className={clsx('flex flex-nowrap')}
                              >
                                {(accessor === 'id' && `${index + 1}.`) || data}
                              </Link>
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
