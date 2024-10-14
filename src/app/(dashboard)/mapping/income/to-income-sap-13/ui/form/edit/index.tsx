'use client';

import Link from 'next/link';
import useRowStore from '@/store/row';
import AccountsTree from '../../accounts-tree';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { TwButton, TwInput } from '@/components';
import { ArrowUturnLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import { mapOnAccount } from '@/actions/mapping/income/to-income-sap-13';
import { notFound } from 'next/navigation';
import type { TreeNode } from '@/types/tree-view';
import type { List } from '@/types/mapping';

interface Props {
  treeData: TreeNode[];
  params: {
    id: string;
  };
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <TwButton
      type="submit"
      title="Simpan"
      variant="success"
      disabled={pending}
      isLoading={pending}
      icon={<CheckIcon className="h-5 w-5" aria-hidden="true" />}
    />
  );
}

export default function Form({ treeData, params }: Props) {
  const {
    rows,
    params: p = {
      page: '1',
      rowsPerPage: '10',
      searchField: '',
      searchValue: '',
    },
  } = useRowStore.getState();

  if (!rows.length) {
    notFound();
  }

  const id = Number(params.id);
  const selectedRow = rows.find((row) => row.kr050_id === id) || null;
  const account: List = {
    id: selectedRow?.id! as number,
    kr050_id: selectedRow?.kr050_id! as number,
    account_050: selectedRow?.account_050! as string,
    sap13_id: selectedRow?.sap13_id! as number,
    account_sap13: selectedRow?.account_sap13! as string,
  };

  const defaultAccountSap13: TreeNode = {
    id: account?.sap13_id!,
    text: account?.account_sap13!,
    parent_id: null,
    is_selectable: true,
  };

  const [state, formAction] = useFormState(mapOnAccount, undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [accountSap13, setAccountSap13] =
    useState<TreeNode>(defaultAccountSap13);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleKodeRekeningNodeSelect = (node: TreeNode) => {
    handleClose();
    setAccountSap13(node);
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append('page', String(p.page));
    formData.append('id', String(selectedRow?.id ?? ''));
    formData.append('kr050_id', String(account?.kr050_id!));
    formData.append('sap13_id', String(accountSap13?.id!));

    formAction(formData);
  };

  return (
    <>
      <form
        action={handleSubmit}
        className="mt-4 rounded-lg bg-white p-4 shadow"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col space-y-4">
              <TwInput
                id="kr050_id"
                name="kr050_id"
                className="w-full cursor-pointer"
                label="Kode Rekening Pendapatan Rumah Sakit"
                placeholder="Kode Rekening Pendaptan Rumah Sakit"
                required
                readOnly
                defaultValue={account?.account_050!}
                isError={!!state?.errors?.kr050_id}
                errorMessage={state?.errors?.kr050_id}
              />

              <TwInput
                id="sap13_id"
                name="sap13_id"
                className="w-full cursor-pointer"
                label="Kode Rekening Pendapaan SAP 13"
                placeholder="Kode Rekening Pendapaan SAP 13 level 2"
                required
                readOnly
                value={accountSap13?.text!}
                isError={!!state?.errors?.sap13_id}
                errorMessage={state?.errors?.sap13_id}
                onClick={() => setIsOpen(true)}
              />
            </div>

            {!!state?.message && (
              <div className="mt-4 text-red-500">
                <p>{state.message}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href={`/mapping/expenditure-050/to-debt-sap-13?page=${p.page}`}>
            <TwButton
              type="button"
              title="Kembali"
              variant="secondary"
              icon={
                <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
              }
            />
          </Link>
          <SubmitButton />
        </div>
      </form>

      <AccountsTree
        treeData={treeData}
        isModalOpen={isOpen}
        onClose={handleClose}
        onNodeSelect={handleKodeRekeningNodeSelect}
      />
    </>
  );
}
