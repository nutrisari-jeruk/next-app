'use client';

import { TwButton, TwConfirm, TwInput } from '@/components';
import { TreeNode } from '@/types/tree-view';
import {
  ArrowUturnLeftIcon,
  CheckIcon,
  FolderPlusIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import Sap13Modal from '../../components/sap13-modal';
import { createPenyesuaian } from '../../actions';
import clsx from 'clsx';
import { readdirSync } from 'fs';

interface CreatePenyesuaianForm {
  treeData: TreeNode[];
}

export default function CreatePenyesuaianForm(props: CreatePenyesuaianForm) {
  const { treeData } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmIsOpen, setconfirmIsOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<'debit' | 'credit' | ''>('');

  const [jenisPenyesuaian, setJenisPenyesuaian] = useState('');
  const [debit, setDebit] = useState('');
  const [credit, setKredit] = useState('');

  const [creditSap13Id, setCreditSap13Id] = useState<number>();
  const [debitSap13Id, setDebitSap13Id] = useState<number>();

  const [errorMessage, setErrorMessage] = useState({
    jenis: '',
    debit: '',
    credit: '',
  });

  const handleInputFocus = (inputName: 'debit' | 'credit') => {
    setActiveInput(inputName);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleConfirmClose = () => {
    setconfirmIsOpen(false);
  };

  const handleConfirmOpen = () => {
    setconfirmIsOpen(true);
  };

  const handleKodeRekeningNodeSelect = (node: TreeNode) => {
    handleModalClose();

    switch (activeInput) {
      case 'debit':
        setDebit(node?.text);
        setDebitSap13Id(node?.id);
        break;
      case 'credit':
        setKredit(node?.text);
        setCreditSap13Id(node?.id);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    let error = '';
    handleConfirmClose();
    const result = await createPenyesuaian({
      jenis_jurnal: jenisPenyesuaian,
      kode_rekening_id: { debit: debitSap13Id!, credit: creditSap13Id! },
    });

    if (result?.errors) {
      console.log(result.errors.jenis);
    }
  };

  return (
    <div>
      <form
        action={handleConfirmOpen}
        className="mt-4 rounded-lg bg-white p-4 shadow"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col space-y-4">
              <TwInput
                name="jenis"
                label="Jenis Penyesuaian"
                type="text"
                value={jenisPenyesuaian}
                onChange={(e) => setJenisPenyesuaian(e.target.value)}
                required
                placeholder="Masukkan Jenis Penyesuaian"
                isError={errorMessage.jenis !== ''}
                errorMessage={errorMessage.jenis}
              />

              <div
                className={clsx(
                  'flex w-full justify-between space-x-2',
                  errorMessage.debit !== '' ? 'items-center' : 'items-end',
                )}
              >
                <div className="w-full">
                  <TwInput
                    value={debit}
                    name="debit"
                    label="Debit"
                    type="text"
                    readOnly
                    placeholder="Kode SAP 13 level 5"
                    isError={errorMessage.debit !== ''}
                    errorMessage={errorMessage.debit}
                  />
                </div>
                <div>
                  <TwButton
                    icon={<FolderPlusIcon className="h-5 w-5" />}
                    type="button"
                    size="md"
                    title="Pilih"
                    onClick={() => handleInputFocus('debit')}
                  />
                </div>
              </div>
              <div
                className={clsx(
                  'flex w-full justify-between space-x-2',
                  errorMessage.debit !== '' ? 'items-center' : 'items-end',
                )}
              >
                <div className="w-full">
                  <TwInput
                    name="credit"
                    value={credit}
                    label="Kredit"
                    type="text"
                    readOnly
                    placeholder="Kode SAP 13 level 5"
                    isError={errorMessage.credit !== ''}
                    errorMessage={errorMessage.credit}
                  />
                </div>
                <div>
                  <TwButton
                    icon={<FolderPlusIcon className="h-5 w-5" />}
                    type="button"
                    size="md"
                    title="Pilih"
                    onClick={() => handleInputFocus('credit')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/master/penyesuaian">
            <TwButton
              type="button"
              title="Cancel"
              variant="secondary"
              icon={
                <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
              }
            />
          </Link>
          <TwButton
            type="submit"
            title="Save"
            variant="success"
            icon={<CheckIcon className="h-5 w-5" aria-hidden="true" />}
          />
        </div>
      </form>
      <Sap13Modal
        treeData={treeData}
        isModalOpen={modalIsOpen}
        activeInput={activeInput}
        onClose={handleModalClose}
        onNodeSelect={handleKodeRekeningNodeSelect}
      />
      <TwConfirm
        title="Menyimpan Data"
        description="Apakah anda yakin ingin menyimpan data ini?"
        isOpen={confirmIsOpen}
        handleClose={handleConfirmClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
