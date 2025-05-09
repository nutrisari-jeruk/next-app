'use client';

import { useEffect, useState } from 'react';
import type { Option } from '@/types/option';
import { TwInput, TwSelect, TwToggle } from '@/components';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { List } from '@/types/report/reports';
import { fetchList } from '@/actions/report/reports';

export default function Print() {
  const { data } = useSession();

  const [reportList, setReportList] = useState<List[]>([]);
  const [showDetail, setShowDetail] = useState(false);

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

  const updateParams = (baseParams: string) => {
    return showDetail ? `${baseParams}&is_detail=true` : baseParams;
  };

  const changeFilterType = (type: string) => {
    setFilterType(type);
    switch (type) {
      case 'month':
        setParams(
          updateParams(`type=monthly&period=${fiscalYear}-${monthFilter}`),
        );
        setStartDate(dayjs().format('YYYY-MM-DD'));
        setEndDate(dayjs().format('YYYY-MM-DD'));
        break;

      case 'year':
        setMonthFilter('01');
        setStartDate(dayjs().format('YYYY-MM-DD'));
        setEndDate(dayjs().format('YYYY-MM-DD'));
        setParams(updateParams(`type=yearly&period=${fiscalYear}`));
        break;

      case 'date_range':
        setMonthFilter('01');
        setParams(
          updateParams(
            `type=date_range&start_date=${startDate}&end_date=${endDate}`,
          ),
        );
        break;
      default:
        break;
    }
  };

  const changeMonthFIlter = (month: string) => {
    setMonthFilter(month);
    setParams(updateParams(`type=monthly&period=${fiscalYear}-${month}`));
  };

  const changeDateRangeFilter = (startDate: string, endDate: string) => {
    if (dayjs(startDate) > dayjs(endDate)) {
      setStartDate(startDate);
      setEndDate(startDate);
      setParams(
        updateParams(
          `type=date_range&start_date=${startDate}&end_date=${startDate}`,
        ),
      );
    } else {
      setStartDate(startDate);
      setEndDate(endDate);
      setParams(
        updateParams(
          `type=date_range&start_date=${startDate}&end_date=${endDate}`,
        ),
      );
    }
  };

  const handleToggleChange = (value: boolean) => {
    setShowDetail(value);

    // Update params based on current filter type
    if (filterType === 'year') {
      setParams(
        value
          ? `type=yearly&period=${fiscalYear}&is_detail=true`
          : `type=yearly&period=${fiscalYear}`,
      );
    } else if (filterType === 'month') {
      setParams(
        value
          ? `type=monthly&period=${fiscalYear}-${monthFilter}&is_detail=true`
          : `type=monthly&period=${fiscalYear}-${monthFilter}`,
      );
    } else if (filterType === 'date_range') {
      setParams(
        value
          ? `type=date_range&start_date=${startDate}&end_date=${endDate}&is_detail=true`
          : `type=date_range&start_date=${startDate}&end_date=${endDate}`,
      );
    }
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
              onChange={(e) => changeDateRangeFilter(e.target.value, endDate)}
            />

            <TwInput
              label="Tanggal Selesai"
              type="date"
              name="endDate"
              min={startDate}
              max={`${fiscalYear}-12-31`}
              value={endDate}
              onChange={(e) => changeDateRangeFilter(startDate, e.target.value)}
            />
          </>
        )}

        <TwToggle
          name="showDetail"
          label="Tampilan Detail"
          enabled={showDetail}
          setEnabled={handleToggleChange}
        />
      </div>
      <div className="space-y-2 rounded-lg bg-white p-4 shadow">
        <div className="grid grid-cols-3 gap-2">
          {reportList.map((item) => {
            const isDisabled = showDetail && !item.has_detail;

            return (
              <Link
                target="_blank"
                key={item.report_url}
                href={isDisabled ? '#' : `${item.report_url}?${params}`}
                onClick={isDisabled ? (e) => e.preventDefault() : undefined}
              >
                <div
                  className={`w-full rounded-md p-2 text-center text-lg text-white shadow-md ${
                    isDisabled
                      ? 'cursor-not-allowed bg-gray-400'
                      : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'
                  }`}
                >
                  {item.report_name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
