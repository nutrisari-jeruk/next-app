'use client';

import { useState } from 'react';
import type { Column } from '@/types/table';
import clsx from 'clsx';

interface Props {
  columns: Column[];
  handleSorting: (accessor: string, sortOrder: string) => void;
}

export default function THead({ columns, handleSorting }: Props) {
  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSortingChange = (accessor: string) => {
    const sortOrder =
      accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        {!!columns &&
          columns.map(({ label, accessor, sortable }) => {
            const icon = sortable ? (
              sortField === accessor && order === 'asc' ? (
                <div>
                  <span className="text-gray-200">↑</span>
                  <span className="text-gray-600">↓</span>
                </div>
              ) : sortField === accessor && order === 'desc' ? (
                <div>
                  <span className="text-gray-600">↑</span>
                  <span className="text-gray-200">↓</span>
                </div>
              ) : (
                <div>
                  <span className="text-gray-600">↑</span>
                  <span className="text-gray-600">↓</span>
                </div>
              )
            ) : (
              ''
            );
            return (
              <th
                key={accessor}
                scope="col"
                className={clsx(
                  'px-3 py-3.5 text-left text-sm font-semibold text-gray-900',
                )}
                onClick={
                  sortable ? () => handleSortingChange(accessor) : undefined
                }
              >
                <div className="flex items-center space-x-2">
                  <span className="select-none">{label}</span>
                  {sortable && (
                    <button
                      type="button"
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
  );
}
