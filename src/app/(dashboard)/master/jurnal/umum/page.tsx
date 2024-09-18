import Link from 'next/link';
import { TwButton, TwHeader } from '@/components';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import { Suspense } from 'react';
import type { Params } from '@/types/params';
import Skeletons from '@/app/ui/skeletons';
import Table from './ui/table';

export const metadata: Metadata = {
  title: 'Jurnal Umum',
};
export default async function Page({ searchParams }: { searchParams: Params }) {
  const searchValue = searchParams?.searchValue || '';
  const searchField = searchParams?.searchField || 'jurnal_kode';
  const page = searchParams?.page || '1';
  const rowsPerPage = searchParams?.rowsPerPage || '10';
  
  return (
    <div>
      <div className="flex items-center justify-between">
        <TwHeader title="Jurnal Umum" />

        <Link href="/master/jurnal/umum/create">
          <TwButton
            title="Tambah Baru"
            variant="success"
            icon={<PlusCircleIcon className="h-5 w-5" />}
          />
        </Link>
      </div>

      <div className="mt-4">
        <Suspense fallback={<Skeletons />}>
          <Table
            page={page}
            rowsPerPage={rowsPerPage}
            searchField={searchField}
            searchValue={searchValue}
          />
        </Suspense>
      </div>
    </div>
  );
}
