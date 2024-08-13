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
import { createUmum } from '../../actions';

interface CreateUmumForm {
  treeData: TreeNode[];
}

export default function CreateUmumForm(props: CreateUmumForm) {
  const { treeData } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<'debit' | 'kredit' | ''>('');

  const [jenisUmum, setJenisUmum] = useState('');
  const [debit, setDebit] = useState('');
  const [kredit, setKredit] = useState('');

  const [kreditSap13Id, setKreditSap13Id] = useState(0);
  const [debitSap13Id, setDebitSap13Id] = useState(0);
  const handleInputFocus = (inputName: 'debit' | 'kredit') => {
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
        setDebitSap13Id(node?.id);
        break;
      case 'kredit':
        setKredit(node?.text);
        setKreditSap13Id(node?.id);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    createUmum({
      jenis_jurnal: jenisUmum,
      kode_rekening_id: { debit: 12, kredit: 21 },
    });
  };

  return (
    <div>
      <form
        action={handleSubmit}
        className="mt-4 rounded-lg bg-white p-4 shadow"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col space-y-4">
              <TwInput
                name="jenis"
                label="Jenis Umum"
                type="text"
                value={jenisUmum}
                onChange={(e) => setJenisUmum(e.target.value)}
                required
                placeholder="Masukkan Jenis Umum"
              />

              <div className="flex w-full items-end justify-between space-x-2">
                <div className="w-full">
                  <TwInput
                    value={debit}
                    name="debit"
                    label="Debit"
                    type="text"
                    readOnly
                    placeholder="Kode SAP 13 level 5"
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
              <div className="flex w-full items-end justify-between space-x-2">
                <div className="w-full">
                  <TwInput
                    name="kredit"
                    value={kredit}
                    label="Kredit"
                    type="text"
                    readOnly
                    placeholder="Kode SAP 13 level 5"
                  />
                </div>
                <div>
                  <TwButton
                    icon={<FolderPlusIcon className="h-5 w-5" />}
                    type="button"
                    size="md"
                    title="Pilih"
                    onClick={() => handleInputFocus('kredit')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/master/umum">
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
