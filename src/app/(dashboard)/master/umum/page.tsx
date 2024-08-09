import { TwButton, TwHeader } from '@/components';
import { PlusCircleIcon, PrinterIcon } from '@heroicons/react/24/outline';
import Table from './components/table';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <TwHeader title="Jurnal Umum" />
        <div className="flex gap-2">
          <Link href="/master/umum/create">
            <TwButton
              title="Add"
              variant="success"
              icon={<PlusCircleIcon className="h-5 w-5" />}
            />
          </Link>
          <Link href="/master/umum/print">
            <TwButton
              title="Print"
              variant="secondary"
              icon={<PrinterIcon className="h-5 w-5" />}
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
