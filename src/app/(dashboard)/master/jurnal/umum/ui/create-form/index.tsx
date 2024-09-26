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
import type { AccountList } from '@/types/journal/general';

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
  const [accountList, setAccountList] = useState<AccountList[]>([]);

  const [state, formAction] = useFormState(createUmum, undefined);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    // formData.append('jenis_jurnal', jenisUmum);
    // debitId && formData.append('debit', debitId!.toString());
    // creditId && formData.append('credit', creditId!.toString());

    return formAction(formData);
  };

  const append = (account: AccountList) => {
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

        <div className="mb-3 space-y-4 rounded-lg bg-white p-4 shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <td>Debit</td>
                <td>Kredit</td>
              </tr>
            </thead>
            <tbody>
              {!!accountList &&
                accountList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.debit?.text!}</td>
                    <td>{item.credit?.text!}</td>
                  </tr>
                ))}

              {!accountList && (
                <tr>
                  <td colSpan={2} className="text-center text-gray-400">
                    Data tidak ditemukan.
                  </td>
                </tr>
              )}
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
        handleAppendAction={append}
      />
    </>
  );
}
