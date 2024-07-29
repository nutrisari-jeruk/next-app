'use client';

import useUser from '@/hooks/useUser';
import { Table } from '@/components';
import type { Record } from '@/types/table';
import { auth } from '@/auth';

export default function Page() {
  const { user, isLoading, error } = useUser();

  const headers = Object.keys(user?.[0] || {});

  const items = user?.map((row) => {
    return [row.id, row.name, row.email];
  });

  const rows: Record = {
    columns: headers,
    data: items,
  };

  return (
    <>
      <Table rows={rows || []} />
    </>
  );
}
