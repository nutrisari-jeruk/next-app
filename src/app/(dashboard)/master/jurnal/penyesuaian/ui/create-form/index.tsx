'use client';

import { TwButton, TwInput } from '@/components';
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
import { useFormState, useFormStatus } from 'react-dom';

interface Props {
  treeData: TreeNode[];
}

export default function CreatePenyesuaianForm(props: Props) {
  const { treeData } = props;
  const [activeInput, setActiveInput] = useState<'debit' | 'credit' | ''>('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [jenisPenyesuaian, setJenisPenyesuaian] = useState('');
  const [debit, setDebit] = useState('');
  const [debitId, setDebitId] = useState<number>();
  const [credit, setKredit] = useState('');
  const [creditId, setCreditId] = useState<number>();

  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(createPenyesuaian, undefined);

  const handleInputFocus = (inputName: 'debit' | 'credit') => {
    setActiveInput(inputName);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleKodeRekeningNodeSelect = (node: TreeNode) => {
    handleModalClose();

    switch (activeInput) {
      case 'debit':
        setDebit(node?.text);
        setDebitId(node?.id);
        break;
      case 'credit':
        setKredit(node?.text);
        setCreditId(node?.id);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('jenis_journal_kind', jenisPenyesuaian);
    debitId && formData.append('debit', debitId!.toString());
    creditId && formData.append('credit', creditId!.toString());

    return formAction(formData);
  };

  const clearMessage = () => {
    state!.message = undefined;
    state!.status = undefined;
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-4 rounded-lg bg-white p-4 shadow"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col space-y-4">
              <TwInput
                name="jenis_journal_kind"
                label="Jenis Penyesuaian"
                type="text"
                value={jenisPenyesuaian}
                onChange={(e) => setJenisPenyesuaian(e.target.value)}
                required
                placeholder="Masukkan Jenis Penyesuaian"
                isError={!!state?.validationErrors?.jenis_journal_kind}
                errorMessage={state?.validationErrors?.jenis_journal_kind}
              />

              <div
                className={clsx(
                  'flex w-full justify-between space-x-2',
                  !!state?.validationErrors?.debit
                    ? 'items-center'
                    : 'items-end',
                )}
              >
                <div className="w-full">
                  <TwInput
                    label="Debit"
                    name="debit"
                    readOnly
                    placeholder="Kode SAP 13 level 5"
                    value={debit}
                    isError={!!state?.validationErrors?.debit}
                    errorMessage={state?.validationErrors?.debit}
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
                  !!state?.validationErrors?.credit
                    ? 'items-center'
                    : 'items-end',
                )}
              >
                <div className="w-full">
                  <TwInput
                    label="Kredit"
                    name="credit"
                    readOnly
                    placeholder="Kode SAP 13 level 5"
                    value={credit}
                    isError={!!state?.validationErrors?.credit}
                    errorMessage={state?.validationErrors?.credit}
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
          <Link href="/master/journal_kind/penyesuaian">
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
            isLoading={pending}
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
