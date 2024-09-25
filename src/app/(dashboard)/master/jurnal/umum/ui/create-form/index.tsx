'use client';

import { TwButton, TwInput } from '@/components';
import { TreeNode } from '@/types/tree-view';
import {
  ArrowUturnLeftIcon,
  CheckIcon,
  PlusCircleIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { createUmum } from '@/actions/master/jurnal/umum';
import { useFormState, useFormStatus } from 'react-dom';
import AccountModal from '../../components/account-modal';

interface Props {
  treeData: TreeNode[];
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <TwButton
      type="submit"
      title="Save"
      isLoading={pending}
      disabled={pending}
      variant="success"
      icon={<CheckIcon className="h-5 w-5" aria-hidden="true" />}
    />
  );
}

export default function CreateUmumForm(props: Props) {
  const { treeData } = props;
  const [jenisUmum, setJenisUmum] = useState('');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [state, formAction] = useFormState(createUmum, undefined);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    // formData.append('jenis_jurnal', jenisUmum);
    // debitId && formData.append('debit', debitId!.toString());
    // creditId && formData.append('credit', creditId!.toString());

    return formAction(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="rounded-lg">
        <div className="mb-6 rounded-lg bg-white p-4 shadow">
          <TwInput
            name="jenis_jurnal"
            label="Jenis Umum"
            type="text"
            value={jenisUmum}
            onChange={(e) => setJenisUmum(e.target.value)}
            required
            placeholder="Masukkan Jenis Umum"
            isError={!!state?.validationErrors?.jenis_jurnal}
            errorMessage={state?.validationErrors?.jenis_jurnal}
          />
        </div>

        <div className="mb-2">
          <TwButton
            icon={<PlusIcon className="h-5 w-5" />}
            type="button"
            title="Akun"
            onClick={() => setIsAccountModalOpen(true)}
          />
        </div>

        <div className="mb-3 space-y-4 rounded-lg bg-white p-4 shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <td>Kode Rekening</td>
                <td>Debit/Kredit</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Belanja Pegawai</td>
                <td>Debit</td>
              </tr>
              <tr>
                <td>Belanja Pegawai</td>
                <td>Kredit</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-x-6">
          <Link href="/master/jurnal/umum">
            <TwButton
              type="button"
              title="Cancel"
              variant="secondary"
              icon={
                <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
              }
            />
          </Link>
          <SubmitButton />
        </div>
      </form>

      <AccountModal
        treeData={treeData}
        isModalOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />
    </div>
  );
}
