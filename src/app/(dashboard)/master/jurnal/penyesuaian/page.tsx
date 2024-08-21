import { TwButton, TwHeader, TwToast } from '@/components';
import { PlusCircleIcon, PrinterIcon } from '@heroicons/react/24/outline';
import Table from './components/table';
import Link from 'next/link';

export default function Page({ searchParams }: any) {
  return (
    <>
      {searchParams.message && searchParams.status && (
        <TwToast message={searchParams.message} status="success" />
      )}
      <div className="flex items-center justify-between">
        <TwHeader title="Jurnal Penyesuaian" />
        <div className="flex gap-2">
          <Link href="/master/jurnal/penyesuaian/create">
            <TwButton
              title="Add"
              variant="success"
              icon={<PlusCircleIcon className="h-5 w-5" />}
            />
          </Link>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <Table />
      </div>
    </>
  );
}
