'use client';

import DataTable from '@/app/ui/data-table';
import { useState } from 'react';
import { TwButton, TwConfirm } from '@/components';
import { Pagination, Search } from '@/app/ui/data-table/partials';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import type { Meta } from '@/types/pagination';
import type { Column, Row } from '@/types/table';
import type { List } from '@/types/journal/general';

function View() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TwButton size="xs" title="View" onClick={() => setIsOpen(true)} />
      <Display
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        handleSubmit={() => setIsOpen(false)}
      />
    </>
  );
}

function Display({
  isOpen = false,
  handleClose = () => {},
  handleSubmit = () => {}
}: {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
}) {
  return (
    <Transition show={isOpen}>
      <Dialog className="relative z-10" onClose={handleClose}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">

                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

interface Props {
  searchField?: string;
  data: {
    data: List[];
    meta: Meta;
  };
}
export default function Table({
  searchField = '',
  data = {
    data: [] as List[],
    meta: {} as Meta,
  },
}: Props) {
  const rows = data?.data.map((item: List) => {
    return {
      id: item.id,
      jurnal_kode: item.jurnal_kode,
      jurnal_jenis: item.jurnal_jenis,
    };
  }) as Row[];

  const columns: Column[] = [
    {
      label: 'No.',
      accessor: '#',
      sortable: false,
    },
    {
      label: 'Kode Jurnal',
      accessor: 'jurnal_kode',
      sortable: true,
    },
    {
      label: 'Jenis Jurnal',
      accessor: 'jurnal_jenis',
      sortable: true,
    },
    {
      label: 'Action',
      accessor: 'id',
      sortable: false,
      render: <View />,
    },
  ];

  const meta = data.meta;
  return (
    <div className="flex w-full flex-col space-y-2">
      <Search placeholder="Cari kode rekening" searchField={searchField} />
      <DataTable {...{ rows, columns, meta, searchField }} />
      <Pagination {...{ meta }} />
    </div>
  );
}
