import { TwButton, TwHeader } from '@/components';
import { PlusCircleIcon, PrinterIcon } from '@heroicons/react/24/outline';
import type { Action } from '@/types/header';

export default function page() {
  const actions: Action[] = [
    {
      title: 'Add',
      icon: <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />,
      href: '/master/penyesuaian/create',
      variant: 'primary',
    },
    {
      title: 'Print',
      icon: <PrinterIcon className="h-5 w-5" aria-hidden="true" />,
      href: '/master/penyesuaian/print',
      variant: 'secondary',
    },
  ];
  return (
    <>
      <TwHeader title="Jurnal Penyesuaian" button={actions} />
    </>
  );
}
