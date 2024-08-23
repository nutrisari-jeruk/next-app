import Table from './ui/table';
import Skeletons from '@/app/ui/skeletons';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { TwHeader } from '@/components';
import type { Params } from '@/types/params';

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
