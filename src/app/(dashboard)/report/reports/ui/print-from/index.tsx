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
  const [monthFilter, setMonthFilter] = useState<string>(`01`);
  const [reprotFilter, setreprotFilter] = useState<string>(`cash-flow`);

  const [period, setPeriod] = useState<string>(`${fiscalYear}`);
  const [url, setUrl] = useState<string>(`cash-flow`);

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

  const reportOptions: Option[] = [
    {
      label: 'Arus Kas',
      value: 'cash-flow',
    },
    {
      label: 'Kelebihan Perubahan Saldo',
      value: 'balance-change-excess',
    },
    {
      label: 'Neraca',
      value: 'balance-sheet',
    },
    {
      label: 'Operasional',
      value: 'operational',
    },
    {
      label: 'Performa',
      value: 'performance',
    },
    {
      label: 'Perubahan Ekuitas',
      value: 'changes-in-equity',
    },
    {
      label: 'Realisasi Anggaran',
      value: 'budget-realization',
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

  const changeReportType = (report: string) => {
    setreprotFilter(report);
    setUrl(report);
  };
  return (
    <div>
      <div className="mb-6 space-y-2 rounded-lg bg-white p-4 shadow">
        <TwSelect
          label="Jenis Laporan"
          value={reprotFilter}
          onChange={(e) => changeReportType(e.target.value)}
          options={reportOptions}
        />
        <TwSelect
          label="Jenis Periode"
          value={filterType}
          onChange={(e) => changeFilterType(e.target.value)}
          options={[
            {
              value: 'year',
              label: 'Tahunan',
            },
            {
              value: 'month',
              label: 'Bulanan',
            },
          ]}
        />

        {/* Input untuk memilih bulan */}
        {filterType === 'month' && (
          <TwSelect
            label="Bulan"
            options={monthOptions}
            value={monthFilter}
            onChange={(e) => changeMonthFIlter(e.target.value)}
          />
        )}

        <div>
          <Link
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_V1_REPORT_URL}/${url}?period=${period}`}
          >
            <TwButton title="Cetak" variant="primary" />
          </Link>
        </div>
      </div>
    </div>
  );
}
