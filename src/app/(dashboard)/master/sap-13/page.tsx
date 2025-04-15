import Link from 'next/link';
import Table from './table';
import { Metadata } from 'next';
import { TwButton, TwHeader } from '@/components';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { fetchList } from '@/actions/master/sap13';
import type { Params } from '@/types/params';

export const metadata: Metadata = {
  title: 'Master SAP 13',
};

export default async function Page({ searchParams }: { searchParams: Params }) {
  const searchField = searchParams?.searchField || 'account_description';

  const data = await fetchList();

  return (
    <>
      <div className="flex items-center justify-between">
        <TwHeader title="Master SAP 13" />

        <Link href="/master/sap-13/create">
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
