'use client';

import { useEffect, useState } from 'react';
import type { Option } from '@/types/option';
import { TwInput, TwSelect } from '@/components';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { List } from '@/types/report/reports';
import { fetchList } from '@/actions/report/reports';

export default function Print() {
  const { data } = useSession();

  const [reportList, setReportList] = useState<List[]>([]);

  const fiscalYear = data?.user?.fiscal_year;

  const [filterType, setFilterType] = useState<string>('year'); // "year" atau "month"
  const [monthFilter, setMonthFilter] = useState<string>(`01`);
  const [startDate, setStartDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState<string>(startDate);
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

  const [params, setParams] = useState(`type=yearly&period=${fiscalYear}`);

  const changeFilterType = (type: string) => {
    setFilterType(type);
    switch (type) {
      case 'month':
        setParams(`type=monthly&period=${fiscalYear}-${monthFilter}`);
        setStartDate(dayjs().format('YYYY-MM-DD'));
        setEndDate(dayjs().format('YYYY-MM-DD'));
        break;

      case 'year':
        setMonthFilter('01');
        setStartDate(dayjs().format('YYYY-MM-DD'));
        setEndDate(dayjs().format('YYYY-MM-DD'));
        setParams(`type=yearly&period=${fiscalYear}`);
        break;

      case 'date_range':
        setMonthFilter('01');
        setParams(
          `type=date_range&start_date=${startDate}&end_date=${endDate}`,
        );
        break;
      default:
        break;
    }
  };

  const changeMonthFIlter = (month: string) => {
    setMonthFilter(month);
    setParams(`type=monthly&period=${fiscalYear}-${month}`);
  };

  useEffect(() => {
    async function fetchReportList(year: string) {
      const list = await fetchList(year);
      setReportList(list);
    }

    if (fiscalYear) {
      fetchReportList(fiscalYear);
    }
  }, [fiscalYear]);

  return (
    <div>
      <div className="mb-2 space-y-2 rounded-lg bg-white p-4 shadow">
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
            {
              value: 'date_range',
              label: 'Rentang Tanggal',
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

        {filterType === 'date_range' && (
          <>
            <TwInput
              label="Tanggal Mulai"
              type="date"
              name="startDate"
              min={`${fiscalYear}-01-01`}
              max={`${fiscalYear}-12-31`}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <TwInput
              label="Tanggal Selesai"
              type="date"
              name="endDate"
              min={startDate}
              max={`${fiscalYear}-12-31`}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </>
        )}
      </div>
      <div className="space-y-2 rounded-lg bg-white p-4 shadow">
        <div className="grid grid-cols-3 gap-2">
          {reportList.map((item) => (
            <Link
              target="_blank"
              key={item.report_url}
              href={`${item.report_url}?${params}`}
            >
              <div className="w-full rounded-md bg-indigo-600 p-1 text-center text-xs text-white shadow-md hover:bg-indigo-500 focus-visible:outline-indigo-600 disabled:bg-indigo-800">
                {item.report_name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
