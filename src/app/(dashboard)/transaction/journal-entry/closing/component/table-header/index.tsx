'use client';
import { TwInput, TwSelect } from '@/components';
import Search from '@/components/tw-search';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import PeriodFilter from '../period-filter';

interface Props {
  searchField: string;
}

export default function TableHeader(props: Props) {
  const { searchField } = props;

  return (
    <div>
      <div className="flex items-center justify-between space-x-2">
        <PeriodFilter />
        <Search placeholder="Cari No Bukti" searchField={searchField} />
      </div>
    </div>
  );
}
