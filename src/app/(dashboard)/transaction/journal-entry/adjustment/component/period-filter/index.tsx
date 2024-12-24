'use client';
import { TwInput, TwSelect } from '@/components';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function PeriodFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [filterType, setFilterType] = useState('year'); // "year" atau "month"
  const [selectedYear, setSelectedYear] = useState(dayjs().format('YYYY'));
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'));

  const getYears = (range = 5) => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - range;
    const endYear = currentYear + range;

    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ value: String(year), label: String(year) });
    }
    return years;
  };
  const years = getYears();

  const changeFilterType = (type: string) => {
    setFilterType(type);
    switch (type) {
      case 'month':
        setSelectedMonth(dayjs().format('YYYY'));
        handleFilter(selectedMonth);
        break;

      case 'year':
        setSelectedYear(dayjs().format('YYYY'));
        handleFilter(selectedYear);
        break;
      default:
        break;
    }
  };

  const changeYear = (year: string) => {
    setSelectedYear(year);
    handleFilter(year);
  };

  const handleFilter = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('period', term);
    } else {
      params.delete('period');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="flex space-x-1">
      <TwSelect
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
      {filterType === 'year' && (
        <TwSelect
          value={selectedYear}
          placeholder="Pilih Tahun"
          options={years}
          onChange={(e) => changeYear(e.target.value)}
        />
      )}

      {/* Input untuk memilih bulan */}
      {filterType === 'month' && (
        <div>
          <TwInput
            type="month"
            defaultValue={dayjs().format('YYYY-MM')}
            onChange={(e) => handleFilter(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
