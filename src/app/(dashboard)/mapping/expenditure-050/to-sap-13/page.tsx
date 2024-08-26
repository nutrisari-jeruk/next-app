import Link from 'next/link';
import Table from './ui/table';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { TwButton, TwHeader } from '@/components';
import { PlusIcon } from '@heroicons/react/24/outline';
import type { Params } from '@/types/params';
import Skeletons from '@/app/ui/skeletons';

export const metadata: Metadata = {
  title: 'Mapping',
};

export const dynamic = 'force-dynamic';

export default function Page({ searchParams }: { searchParams: Params }) {
  const page = searchParams.page || '1';
  const rowsPerPage = searchParams.rowsPerPage || '10';
  const searchField = searchParams.searchField || 'account_050';
  const searchValue = searchParams.searchValue || '';

  return (
    <div>
      <div className="flex items-center justify-between">
        <TwHeader title="Mapping Kode Rekening" />

        <Link href="to-sap-13/create">
          <TwButton
            type="submit"
            title="Tambah baru"
            variant="success"
            icon={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
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
