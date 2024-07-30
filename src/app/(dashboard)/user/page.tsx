'use client';

import useUser from '@/hooks/useUser';
import { Table } from '@/components';
import type { Record } from '@/types/table';
import getPatient from './_actions/get-patient';
import { useEffect, useState } from 'react';

export default function Page() {
  const { user, isLoading, error } = useUser();
  const [patient, setPatient] = useState({});

  useEffect(() => {
    initPatient()
  }, []);

  const initPatient = async () => {
    const data = await getPatient();

    setPatient(data);
  };

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

      <pre>{JSON.stringify(patient, null, 2)}</pre>
    </>
  );
}
