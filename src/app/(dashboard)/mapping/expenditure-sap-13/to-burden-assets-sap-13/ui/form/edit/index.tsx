'use client';

import Link from 'next/link';
import useRowStore from '@/store/row';
import AccountsTree from '../../accounts-tree';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { TwButton, TwInput } from '@/components';
import { ArrowUturnLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import { mapOnAccount } from '@/actions/mapping/expenditure-sap-13/to-burden-assets-sap-13';
import { notFound } from 'next/navigation';
import type { TreeNode } from '@/types/tree-view';
import type { BurdenAssetList as List } from '@/types/mapping';

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
  const selectedRow = rows.find((row) => row.sap13_id_expend === id) || null;
  const account: List = {
    id: selectedRow?.id! as number,
    sap13_id_expend: selectedRow?.sap13_id_expend! as number,
    account_sap13_expend: selectedRow?.account_sap13_expend! as string,
    sap13_id_burden_asset: selectedRow?.sap13_id_burden_asset! as number,
    account_sap13_burden_asset: selectedRow?.account_sap13_burden_asset! as string,
  };

  const defaultAccountSap13: TreeNode = {
    id: account?.sap13_id_burden_asset!,
    text: account?.account_sap13_burden_asset!,
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
    formData.append('sap13_id_expend', String(account?.sap13_id_expend!));
    formData.append('sap13_id_burden_asset', String(accountSap13?.id!));

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
                id="sap13_id_expend"
                name="sap13_id_expend"
                className="w-full cursor-pointer"
                label="Kode Rekening Belanja SAP 13"
                placeholder="Kode Rekening Belanja SAP 13"
                required
                readOnly
                defaultValue={account?.account_sap13_expend!}
                isError={!!state?.errors?.sap13_id_expend}
                errorMessage={state?.errors?.sap13_id_expend}
              />

              <TwInput
                id="sap13_id_burden_asset"
                name="sap13_id_burden_asset"
                className="w-full cursor-pointer"
                label="Kode Rekening Beban dan Aset SAP 13"
                placeholder="Kode Rekening Beban dan Aset SAP 13"
                required
                readOnly
                value={accountSap13?.text!}
                isError={!!state?.errors?.sap13_id_burden_asset}
                errorMessage={state?.errors?.sap13_id_burden_asset}
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
          <Link href={`/mapping/expenditure-sap-13/to-burden-assets-sap-13?page=${p.page}`}>
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
