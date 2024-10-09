import Link from 'next/link';
import Table from './ui/table';
import { Metadata } from 'next';
import { TwButton, TwHeader } from '@/components';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { fetchList } from '@/actions/master/journal/closing';
import type { Params } from '@/types/params';

export const metadata: Metadata = {
  title: 'Jurnal Penutup',
};

export default async function Page({ searchParams }: { searchParams: Params }) {
  const searchValue = searchParams?.searchValue || '';
  const searchField = searchParams?.searchField || 'jurnal_kode';
  const page = searchParams?.page || '1';
  const rowsPerPage = searchParams?.rowsPerPage || '10';

  const data = await fetchList({
    page: page,
    rowsPerPage: rowsPerPage,
    searchField: searchField,
    searchValue: searchValue,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <TwHeader title="Jurnal Penutup" />

        <Link href="/master/journal/closing/create">
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
