'use client';

import clsx from 'clsx';
import Link from 'next/link';
import useAccountStore from '../../../_store';
import AccountsTree from '../../accounts-tree';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { TwButton, TwSelect } from '@/components';
import {
  ArrowUturnLeftIcon,
  CheckIcon,
  FolderPlusIcon,
} from '@heroicons/react/24/outline';

import { mapOnAccount } from '../../../actions';
import { notFound } from 'next/navigation';

import type { TreeNode } from '@/types/tree-view';
import type { Option } from '@/types/option';

interface Props {
  treeData: TreeNode[];
  params: {
    id: string;
  };
}

export default function Form({ treeData, params }: Props) {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(mapOnAccount, undefined);
  const [accountSap13, setAccountSap13] = useState<TreeNode>();
  const [isOpen, setIsOpen] = useState(false);
  const [sap13Options, setSap13Options] = useState<Option[]>([]);
  const { rows } = useAccountStore.getState();

  if (!rows.length) {
    notFound();
  }

  const id = params.id;
  const account = rows.find((row) => row.kr050_id === Number(id));

  const expenditureOptions: Option[] = [
    {
      label: account?.account_050! as string,
      value: account?.kr050_id!,
    },
  ];

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleKodeRekeningNodeSelect = (node: TreeNode) => {
    handleClose();
    setAccountSap13(node);

    setSap13Options([
      {
        label: node.text,
        value: node.id,
      },
    ]);
  };

  return (
    <>
      <form action={formAction} className="mt-4 rounded-lg bg-white p-4 shadow">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col space-y-4">
              <TwSelect
                name="kr050_id"
                label="Kode Rekening Belanja 050"
                required
                options={expenditureOptions}
                defaultValue={account?.kr050_id}
                isError={!!state?.errors?.kr050_id}
                errorMessage={state?.errors?.kr050_id}
              />
              <div
                className={clsx(
                  'flex w-full items-end justify-between space-x-2',
                )}
              >
                <div className="w-full">
                  <TwSelect
                    name="sap13_id"
                    label="Kode Rekening SAP 13"
                    required
                    options={sap13Options}
                    defaultValue={accountSap13?.id}
                    isError={!!state?.errors?.sap13_id}
                    errorMessage={state?.errors?.sap13_id}
                  />
                </div>
                <div>
                  <TwButton
                    icon={<FolderPlusIcon className="h-5 w-5" />}
                    type="button"
                    size="md"
                    title="Pilih"
                    onClick={() => setIsOpen(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/mapping/expenditure-050/to-sap-13">
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
            disabled={pending}
            isLoading={pending}
            icon={<CheckIcon className="h-5 w-5" aria-hidden="true" />}
          />
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
