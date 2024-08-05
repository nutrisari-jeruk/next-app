import { TwButton, TwHeader } from '@/components';
import { PlusCircleIcon, PrinterIcon } from '@heroicons/react/24/outline';
import Table from './components/table';
import type { Action } from '@/types/header';

export default function page() {
  const actions: Action[] = [
    {
      title: 'Add',
      icon: <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />,
      href: '/master/koreksi/create',
      variant: 'success',
    },
    {
      title: 'Print',
      icon: <PrinterIcon className="h-5 w-5" aria-hidden="true" />,
      href: '/master/koreksi/print',
      variant: 'secondary',
    },
  ];
  return (
    <>
      <TwHeader title="Jurnal koreksi" button={actions} />
      <div className="mt-4 flex flex-col gap-4">
        <Table />
      </div>
    </>
  );
}
