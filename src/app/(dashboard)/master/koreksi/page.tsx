import { TwButton, TwHeader } from '@/components';
import { PlusCircleIcon, PrinterIcon } from '@heroicons/react/24/outline';
import Table from './components/table';
import Link from 'next/link';

export default function page() {

  return (
    <>
      <div className="flex items-center justify-between">
        <TwHeader title="Jurnal Koreksi" />
        <div className="flex gap-2">
          <Link href="/master/koreksi/create">
            <TwButton
              title="Add"
              variant="success"
              icon={<PlusCircleIcon className="h-5 w-5" />}
            />
          </Link>
          <Link href="/master/koreksi/print">
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
