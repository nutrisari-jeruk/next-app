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
  TrashIcon,
} from '@heroicons/react/24/outline';
import { createJournal } from '@/actions/master/journal/general';
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
  const [jenis, setJenis] = useState('');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountList, setAccountList] = useState<Account[]>([]);

  const [state, formAction] = useFormState(createJournal, undefined);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('jenis_jurnal', jenis);
    formData.append('kode_rekening_id', JSON.stringify(accountList));

    return formAction(formData);
  };

  const appendAccount = (account: Account) => {
    account && setAccountList([...accountList, account]);
  };

  const removeAccount = (index: number) => {
    setAccountList(accountList.filter((_, i) => i !== index));
  };

  const addAcount = () => {
    setIsAccountModalOpen(true);
  };

  return (
    <>
      <form action={handleSubmit} className="rounded-lg">
        <div className="mb-6 rounded-lg bg-white p-4 shadow">
          <TwInput
            name="jenis_jurnal"
            label="Jenis Jurnal"
            type="text"
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
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
            onClick={addAcount}
          />
        </div>

        <div className="mb-3 space-y-1">
          <div className="flex w-full rounded bg-white p-3 shadow">
            <div className="w-full font-bold">Kode Rekening</div>
            <div className="w-1/3 font-bold">Debit/Kredit</div>
            <div className="w-1/4"></div>
          </div>

          {!!accountList &&
            accountList.map((account, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-full rounded bg-white px-3 py-2 shadow gap-1"
              >
                <div className="w-full">{account?.sap13_id.text}</div>
                <div className="w-1/3">
                  {account?.is_credit ? 'Kredit' : 'Debit'}
                </div>
                <div className="w-1/4">
                  <button className="text-red-500" onClick={() => removeAccount(index)}>
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}

          {!accountList.length && (
            <div className="flex w-full rounded bg-white px-3 py-2 shadow">
              <div className="w-full text-center text-gray-500">
                Belum ada data.
              </div>
            </div>
          )}

          {!!state && <div className="text-red-500">{state.message}</div>}
        </div>

        <div className="flex items-center justify-end gap-x-6">
          <Link href="/master/journal/general">
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
        handleAppendAction={appendAccount}
      />
    </>
  );
}
