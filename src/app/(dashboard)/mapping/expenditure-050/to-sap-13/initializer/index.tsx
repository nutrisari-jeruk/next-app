'use client';

import useAccount from '../_store';
import type { Row } from '@/types/table';

export default function Initializer({
  rows,
  children,
}: {
  rows: Row[];
  children: React.ReactNode;
}) {
  useAccount.setState({ rows });

  return children;
}
