'use client';

import type { Column, Row } from '@/types/table';

interface Props {
  rows: Row[];
  columns: Column[];
}

export default function TBody({ rows, columns }: Props) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {!!rows.length &&
        rows?.map((item, index) => (
          <tr key={index} className="hover:bg-gray-100">
            {columns.map(({ accessor }: Column) => {
              const tData = item[accessor] ? item[accessor] : '';
              return (
                <td
                  key={accessor}
                  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                >
                  {tData}
                </td>
              );
            })}
          </tr>
        ))}

      {!rows.length && (
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
  );
}
