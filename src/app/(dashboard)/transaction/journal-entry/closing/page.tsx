import dayjs from 'dayjs';
import 'dayjs/locale/id';
import Link from 'next/link';
import { fetchList } from '@/actions/transaction/journal-entry/closing';
import { TwButton, TwHeader } from '@/components';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import type { Metadata } from 'next';
import type { Params } from '@/types/journal-entry/closing';
import Table from './ui/table';

export const metadata: Metadata = {
  title: 'Pencatatan Jurnal Penutup',
};

export default async function page({
  searchParams: {
    page = '1',
    rowsPerPage = '10',
    searchField = 'description',
    searchValue = '',
    period = dayjs().format('YYYY'),
  },
}: {
  searchParams: Params;
}) {
  dayjs.locale('id');
  const params: Params = {
    page: page,
    rowsPerPage: rowsPerPage,
    searchField: searchField,
    searchValue: searchValue,
    period: period,
  };

  const data = await fetchList(params);

  return (
    <>
      <div className="flex items-center justify-between">
        <TwHeader title="Pencatatan Jurnal Penutup" />

        <Link href="/transaction/journal-entry/closing/create">
          <TwButton
            title="Tambah Baru"
            variant="success"
            icon={<PlusCircleIcon className="h-5 w-5" />}
          />
        </Link>
      </div>

      <div className="mt-4">
        <Table data={data} searchField={searchField} />
      </div>
    </>
  );
}
