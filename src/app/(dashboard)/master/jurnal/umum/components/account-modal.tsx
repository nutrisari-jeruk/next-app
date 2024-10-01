'use client';

import { useEffect, useState } from 'react';
import { TwButton, TwInput, TwRadio } from '@/components';
import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import Sap13Modal from './sap13-modal';
import type { TreeNode } from '@/types/tree-view';
import type { Account } from '@/types/journal/general';

interface Props {
  treeData: TreeNode[];
  isModalOpen?: boolean;
  onClose: () => void;
  handleAppendAction: (account: Account) => void;
}

export default function AccountModal(props: Props) {
  const { treeData, isModalOpen, onClose, handleAppendAction } = props;

  const [isSapModalOpen, setIsSapModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShown, setIsShown] = useState(isModalOpen);
  const [account, setAccount] = useState<Account>({
    is_credit: false,
    sap13_id: {} as TreeNode,
  });

  const handleAccountSelect = (node: TreeNode) => {
    setIsSapModalOpen(false);
    setAccount({ is_credit: false, sap13_id: node });
  };

  const addAccount = () => {
    if (!account.sap13_id.id) {
      setIsError(true);
      setErrorMessage('Pilih akun terlebih dahulu');

      return;
    }

    setIsShown(false);
    !!account.sap13_id.id && handleAppendAction(account);
  };

  useEffect(() => {
    setIsShown(isModalOpen);
  }, [isModalOpen]);

  return (
    <>
      <Transition show={isShown}>
        <Dialog
          className="relative z-10"
          onClose={() => setIsSapModalOpen(false)}
        >
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
                  <div>
                    <DialogTitle
                      as="h3"
                      className="flex justify-center text-base font-semibold leading-6 text-gray-900"
                    >
                      Atur Kode Rekening
                    </DialogTitle>
                    <Description className="mb-2 space-y-4">
                      <div className="flex space-x-2">
                        <TwInput
                          id="sap13_id"
                          name="sap13_id"
                          className="w-full cursor-pointer"
                          label="Kode Rekening SAP 13"
                          placeholder="Kode SAP 13 level 5"
                          value={account?.sap13_id.text!}
                          isError={isError}
                          errorMessage={errorMessage}
                          readOnly
                          onClick={() => setIsSapModalOpen(true)}
                        />
                      </div>

                      <TwRadio
                        options={[
                          { label: 'Debit', value: 'debit' },
                          { label: 'Credit', value: 'credit' },
                        ]}
                        value={account?.is_credit ? 'credit' : 'debit'}
                        onChange={(value) => setAccount({ ...account, is_credit: true })}
                      />

                      <TwButton
                        title="Tambah Kode Rekening"
                        icon={<PlusIcon className="h-5 w-5" />}
                        onClick={addAccount}
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
        onClose={() => setIsSapModalOpen(false)}
        onNodeSelect={handleAccountSelect}
      />
    </>
  );
}
