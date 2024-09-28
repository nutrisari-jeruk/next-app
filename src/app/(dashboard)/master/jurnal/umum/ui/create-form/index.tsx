'use client';

import Link from 'next/link';
import AccountModal from '../../components/account-modal';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { TwButton, TwInput } from '@/components';
import {
  ArrowUturnLeftIcon,
  CheckIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

import { createUmum } from '@/actions/master/jurnal/umum';
import type { TreeNode } from '@/types/tree-view';
import type { Account } from '@/types/journal/general';

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

export default function CreateForm(props: Props) {
  const { treeData } = props;
  const [jenisUmum, setJenisUmum] = useState('');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountList, setAccountList] = useState<Account[]>([]);

  const [state, formAction] = useFormState(createUmum, undefined);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('jenis_jurnal', jenisUmum);
    formData.append('kode_rekening_id', JSON.stringify(accountList));

    return formAction(formData);
  };

  const append = (account: Account) => {
    setIsAccountModalOpen(false);
    account && setAccountList([...accountList, account]);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="rounded-lg">
        <div className="mb-6 rounded-lg bg-white p-4 shadow">
          <TwInput
            name="jenis_jurnal"
            label="Jenis Jurnal"
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
            title="Tambah Kode Rekening"
            onClick={() => setIsAccountModalOpen(true)}
          />
        </div>

        <div className="mb-3 space-y-1">
          <div className="flex w-full rounded bg-white p-3 shadow">
            <div className="w-1/2 font-bold">Kode Rekening Debit</div>
            <div className="w-1/2 font-bold">Kode Rekening Credit Kredit</div>
          </div>

          {!!accountList &&
            accountList.map((account, index) => (
              <div
                key={index}
                className="flex w-full rounded bg-white px-3 py-2 shadow"
              >
                <div className="w-1/2">{account?.debit?.text}</div>
                <div className="w-1/2">{account?.credit?.text}</div>
              </div>
            ))}

          {!accountList.length && (
            <div className="flex w-full rounded bg-white px-3 py-2 shadow">
              <div className="w-1/2 text-gray-500">
                Belum ada akun yang ditambahkan.
              </div>
              <div className="w-1/2 text-gray-500">
                Belum ada akun yang ditambahkan.
              </div>
            </div>
          )}

          {!!state && <div className="text-red-500">{state.message}</div>}
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
        handleAppendAction={append}
      />
    </>
  );
}
