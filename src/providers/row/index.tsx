'use client';

import useRowStore from '@/store/row';
import type { Params } from '@/types/params';
import type { Row } from '@/types/table';

export default function RowProvider({
  rows,
  params,
  children,
}: {
  rows: Row[];
  params: Params
  children: React.ReactNode;
}) {
  useRowStore.getState().setRows(rows);
  useRowStore.getState().setParams(params);

  return children;
}
