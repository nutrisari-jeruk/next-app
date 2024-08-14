'use client';

import { TwButton, TwComboBox, TwConfirm, TwInput } from '@/components';
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
import { useFormState } from 'react-dom';
import type { Option } from '@/types/option';

interface CreatePenyesuaianForm {
  treeData: TreeNode[];
}

export default function CreatePenyesuaianForm(props: CreatePenyesuaianForm) {
  const { treeData } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<'debit' | 'credit' | ''>('');

  const [jenisPenyesuaian, setJenisPenyesuaian] = useState('');
  const [debit, setDebit] = useState('');
  const [credit, setKredit] = useState('');

  const [creditSap13Id, setCreditSap13Id] = useState<number>();
  const [debitSap13Id, setDebitSap13Id] = useState<number>();

  const [state, formAction] = useFormState(createPenyesuaian, undefined);

  const [debitAccount, setDebitAccount] = useState<Option[]>([]);
  const [creditAccount, setCreditAccount] = useState<Option[]>([]);

  const handleInputFocus = (inputName: 'debit' | 'credit') => {
    setActiveInput(inputName);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleKodeRekeningNodeSelect = (node: TreeNode) => {
    handleModalClose();

    const option: Option = {
      label: node.text,
      value: node.id,
      selected: true,
    };

    switch (activeInput) {
      case 'debit':
        setDebit(node?.text);
        setDebitSap13Id(node?.id);
        setDebitAccount([option]);
        break;
      case 'credit':
        setKredit(node?.text);
        setCreditSap13Id(node?.id);
        setCreditAccount([option]);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <form action={formAction} className="mt-4 rounded-lg bg-white p-4 shadow">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col space-y-4">
              <TwInput
                name="jenis_jurnal"
                label="Jenis Penyesuaian"
                type="text"
                value={jenisPenyesuaian}
                onChange={(e) => setJenisPenyesuaian(e.target.value)}
                required
                placeholder="Masukkan Jenis Penyesuaian"
                isError={!!state?.validationErrors.jenis_jurnal}
                errorMessage={state?.validationErrors.jenis_jurnal}
              />

              <div
                className={clsx(
                  'flex w-full justify-between space-x-2',
                  !!state?.validationErrors.debit
                    ? 'items-center'
                    : 'items-end',
                )}
              >
                <div className="w-full">
                  <TwComboBox
                    options={debitAccount}
                    label="Debit"
                    name="debit"
                    placeHolder="Kode SAP 13 level 5"
                    selectedData={debitAccount[0]}
                    disabled
                    isError={!!state?.validationErrors.debit}
                    errorMessage={state?.validationErrors.debit}
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
                  !!state?.validationErrors.credit
                    ? 'items-center'
                    : 'items-end',
                )}
              >
                <div className="w-full">
                  <TwComboBox
                    options={creditAccount}
                    label="Kredit"
                    name="credit"
                    placeHolder="Kode SAP 13 level 5"
                    selectedData={creditAccount[0]}
                    disabled
                    isError={!!state?.validationErrors.credit}
                    errorMessage={state?.validationErrors.credit}
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
    </div>
  );
}
