'use client';

import useRowStore from '@/store/row';
import type { Row } from '@/types/table';

export default function RowProvider({
  rows,
  children,
}: {
  rows: Row[];
  children: React.ReactNode;
}) {
  useRowStore.getState().setRows(rows);

  return children;
}
