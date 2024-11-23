'use client';

import { useState } from 'react';
import type { Option } from '@/types/option';
import { TwButton, TwSelect } from '@/components';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { set } from 'zod';

export default function Print() {
  const { data } = useSession();
  const fiscalYear = data?.user?.fiscal_year;
  const [filterType, setFilterType] = useState<string>('year'); // "year" atau "month"
  const [period, setPeriod] = useState<string>(`${fiscalYear}`);
  const [monthFilter, setMonthFilter] = useState<string>(`01`);
  const monthOptions: Option[] = [
    {
      label: 'Januari',
      value: '01',
    },
    {
      label: 'Februari',
      value: '02',
    },
    {
      label: 'Maret',
      value: '03',
    },
    {
      label: 'April',
      value: '04',
    },
    {
      label: 'Mei',
      value: '05',
    },
    {
      label: 'Juni',
      value: '06',
    },
    {
      label: 'Juli',
      value: '07',
    },
    {
      label: 'Agustus',
      value: '08',
    },
    {
      label: 'September',
      value: '09',
    },
    {
      label: 'Oktober',
      value: '10',
    },
    {
      label: 'November',
      value: '11',
    },
    {
      label: 'Desember',
      value: '12',
    },
  ];

  const changeFilterType = (type: string) => {
    setFilterType(type);
    switch (type) {
      case 'month':
        setPeriod(`${fiscalYear}-${monthFilter}`);
        break;

      case 'year':
        setMonthFilter('01');
        setPeriod(`${fiscalYear}`);
        break;
      default:
        break;
    }
  };

  const changeMonthFIlter = (month: string) => {
    setMonthFilter(month);
    setPeriod(`${fiscalYear}-${month}`);
  };
  return (
    <div className="mt-4 flex w-1/2 items-end space-x-1">
      <div className="w-1/2">
        <TwSelect
          label="Periode"
          value={filterType}
          onChange={(e) => changeFilterType(e.target.value)}
          options={[
            {
              value: 'year',
              label: 'Tahun',
            },
            {
              value: 'month',
              label: 'Bulan',
            },
          ]}
        />
      </div>

      {/* Input untuk memilih bulan */}
      {filterType === 'month' && (
        <div className="w-1/2">
          <TwSelect
            options={monthOptions}
            value={monthFilter}
            onChange={(e) => changeMonthFIlter(e.target.value)}
          />
        </div>
      )}
      <Link
        target="_blank"
        href={`${process.env.NEXT_PUBLIC_V1_REPORT_URL}/budget-realization?period=${period}`}
      >
        <TwButton title="Cetak" variant="primary" />
      </Link>
    </div>
  );
}
