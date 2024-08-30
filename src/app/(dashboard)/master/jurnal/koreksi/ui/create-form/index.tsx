'use client';

import { TwButton, TwInput, TwSelect, TwToast } from '@/components';
import { TreeNode } from '@/types/tree-view';
import {
  ArrowUturnLeftIcon,
  CheckIcon,
  FolderPlusIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Sap13Modal from '../../components/sap13-modal';
import { createKoreksi } from '../../actions';
import clsx from 'clsx';
import { useFormState, useFormStatus } from 'react-dom';
import { Option } from '@/types/option';

interface CreateKoreksiForm {
  treeData: TreeNode[];
}

export default function CreateKoreksiForm(props: CreateKoreksiForm) {
  const { treeData } = props;
  const [activeInput, setActiveInput] = useState<'debit' | 'credit' | ''>('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //const [jenis, setJenis] = useState<number>();
  const [jenisKoreksi, setJenisKoreksi] = useState('');
  const [debit, setDebit] = useState('');
  const [debitId, setDebitId] = useState<number | null>();
  const [credit, setKredit] = useState('');
  const [creditId, setCreditId] = useState<number | null>();

  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(createKoreksi, undefined);
  const [creditDisabled, setCreditDisabled] = useState<boolean>(false);
  const [debitDisabled, setDebitDisabled] = useState<boolean>(false);

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
    formData.append('jenis_jurnal', jenisKoreksi);
    debitId && formData.append('debit', debitId!.toString());
    creditId && formData.append('credit', creditId!.toString());

    return formAction(formData);
  };

  const clearMessage = () => {
    state!.message = undefined;
    state!.status = undefined;
  };

  const options: Option[] = [
    { label: 'Menambah', value: 'menambah' },
    { label: 'Mengurangi', value: 'mengurangi' },
  ];

  const onChangeJenisEquitas = (value: string) => {
    switch (value) {
      case 'menambah':
        setCreditId(231);
        setKredit('Ekuitas');
        setDebitId(null);
        setDebit('');
        setCreditDisabled(true);
        setDebitDisabled(false);
        break;
      case 'mengurangi':
        setDebitId(231);
        setDebit('Ekuitas');
        setCreditId(null);
        setKredit('');
        setCreditDisabled(false);
        setDebitDisabled(true);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {state?.status && state?.message && (
        <TwToast
          message={state.message}
          status={state.status}
          onClose={clearMessage}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="mt-4 rounded-lg bg-white p-4 shadow"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col space-y-4">
              <TwInput
                name="jenis_jurnal"
                label="Jenis Jurnal Koreksi LPE"
                type="text"
                value={jenisKoreksi}
                onChange={(e) => setJenisKoreksi(e.target.value)}
                required
                placeholder="Masukkan Jenis Koreksi"
                isError={!!state?.validationErrors?.jenis_jurnal}
                errorMessage={state?.validationErrors?.jenis_jurnal}
              />

              <TwSelect
                onChange={(e) => onChangeJenisEquitas(e.target.value)}
                placeholder="Silahkan Pilih!"
                label="Jenis Koreksi Ekuitas"
                name="jenisKoreksiEquitas"
                options={options}
                required
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
                    disabled={debitDisabled}
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
                    disabled={creditDisabled}
                    onClick={() => handleInputFocus('credit')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/master/koreksi">
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
