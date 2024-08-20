'use client';
import { TwButton, TwInput, TwKbd, TwTreeView } from '@/components';
import { TreeNode } from '@/types/tree-view';
import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

interface Sap13Modal {
  treeData: TreeNode[];
  isModalOpen?: boolean;
  searchValue?: string;
  className?: string;
  activeInput: 'debit' | 'credit' | '';
  onNodeSelect: (node: TreeNode) => void;
  onClose: () => void;
}

export default function Sap13Modal(props: Sap13Modal) {
  const { treeData, isModalOpen, onNodeSelect, onClose } = props;

  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    setSearchValue(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      setSearchValue('');
      setSearchQuery('');
    }
  }, [isModalOpen]);

  return (
    <Transition show={isModalOpen}>
      <Dialog className="relative z-10" onClose={() => {}}>
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
            <TransitionChild
              enter="ease-out duration-100"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative w-1/2 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <Button
                    onClick={onClose}
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </div>
                <div className="mt-3">
                  <DialogTitle
                    as="h3"
                    className="flex justify-center text-base font-semibold leading-6 text-gray-900"
                  >
                    Pilih SAP 13
                  </DialogTitle>
                  <Description className="mb-2">
                    <div className="mb-2 flex items-end justify-between space-x-2">
                      <div className="w-full">
                        <TwInput
                          name="searchModal"
                          type="text"
                          placeholder="Cari Kode SAP 13 level 5"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={handleKeyDown}
                          autoFocus={true}
                        />
                      </div>

                      <TwButton
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        type="button"
                        size="md"
                        title="Cari"
                        onClick={handleSearch}
                      />
                    </div>
                    <p className="mb-2 text-xs text-gray-500">
                      Tekan <TwKbd>Enter</TwKbd> untuk mencari
                    </p>
                  </Description>

                  <TwTreeView
                    treeData={treeData}
                    searchValue={searchValue}
                    onNodeSelect={onNodeSelect}
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
