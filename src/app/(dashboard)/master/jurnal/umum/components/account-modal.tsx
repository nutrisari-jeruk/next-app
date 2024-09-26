'use client';

import { TwButton, TwInput } from '@/components';
import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import {
  XMarkIcon,
  FolderPlusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import Sap13Modal from './sap13-modal';
import type { TreeNode } from '@/types/tree-view';
import type { AccountList } from '@/types/journal/general';

interface Props {
  treeData: TreeNode[];
  isModalOpen?: boolean;
  onClose: () => void;
  handleAppendAction: (accountList: AccountList) => void;
}

export default function AccountModal(props: Props) {
  const { treeData, isModalOpen, onClose, handleAppendAction } = props;
  const [debit, setDebit] = useState<TreeNode>();
  const [credit, setCredit] = useState<TreeNode>();
  const [activeInput, setActiveInput] = useState<'debit' | 'credit' | ''>('');
  const [isSapModalOpen, setIsSapModalOpen] = useState(false);
  const [accountList, setAccountList] = useState<AccountList>();

  const handleInputFocus = (inputName: 'debit' | 'credit') => {
    setActiveInput(inputName);
    setIsSapModalOpen(true);
  };

  const handleModalClose = () => {
    setIsSapModalOpen(false);
    setDebit(undefined);
    setCredit(undefined);
  };


  const handleKodeRekeningNodeSelect = (node: TreeNode) => {
    handleModalClose();
    switch (activeInput) {
      case 'debit':
        setDebit(node);
        setAccountList(Object.assign({}, accountList, { debit: node }));
        break;
      case 'credit':
        setCredit(node);
        setAccountList(Object.assign({}, accountList, { credit: node }));
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    if (!accountList) return;
    handleAppendAction(accountList);
  };

  return (
    <>
      <Transition show={isModalOpen}>
        <Dialog className="relative z-10" onClose={() => handleModalClose()}>
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
                    <Description className="mb-2 space-y-2">
                      <div className="flex items-end space-x-2">
                        <TwInput
                          className="w-full"
                          label="Debit"
                          name="debit"
                          readOnly
                          placeholder="Kode SAP 13 level 5"
                          value={debit?.text!}
                        />

                        <TwButton
                          icon={<FolderPlusIcon className="h-5 w-5" />}
                          title="Pilih"
                          onClick={() => handleInputFocus('debit')}
                        />
                      </div>

                      <div className="flex items-end space-x-2">
                        <TwInput
                          className="w-full"
                          label="Kredit"
                          name="credit"
                          readOnly
                          placeholder="Kode SAP 13 level 5"
                          value={credit?.text!}
                        />

                        <TwButton
                          icon={<FolderPlusIcon className="h-5 w-5" />}
                          title="Pilih"
                          onClick={() => handleInputFocus('credit')}
                        />
                      </div>

                      <TwButton
                        title="Tambah Kode Rekening"
                        icon={<PlusIcon className="h-5 w-5" />}
                        onClick={() => handleClick()}
                      />
                    </Description>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Sap13Modal
        treeData={treeData}
        isModalOpen={isSapModalOpen}
        activeInput={activeInput}
        onClose={handleModalClose}
        onNodeSelect={handleKodeRekeningNodeSelect}
      />
    </>
  );
}
