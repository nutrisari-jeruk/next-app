'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { TwButton, TwInput, TwTreeView } from '@/components';
import {
  ArrowUturnLeftIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { createSAP13 } from '@/actions/master/sap13';
import type { TreeNode } from '@/types/tree-view';
import Sap13Modal from '../components/sap13-modal';

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

export default function CreateAccountForm({ treeData }: Props) {
  const [accountDescription, setAccountDescription] = useState('');
  const [sap13Account, setSap13Account] = useState<TreeNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, formAction] = useFormState(createSAP13, undefined);

  const handleAccountSelect = (node: TreeNode) => {

    setSap13Account(node);
    
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!sap13Account) return;
    const formData = new FormData();
    formData.append('account_description', accountDescription);
    formData.append('parent_id', sap13Account.id.toString());
    return formAction(formData);
  };

  return (
    <>
      <form action={handleSubmit} className="rounded-lg">
        <div className="mb-6 rounded-lg bg-white p-4 shadow">
          <TwInput
            id="sap13_id"
            name="sap13_id"
            label="Account Code"
            placeholder="Pilih Account Code"
            value={sap13Account?.text || ''}
            readOnly
            onClick={() => setIsModalOpen(true)}
          />

          <TwInput
            name="account_description"
            label="Account Description"
            type="text"
            className="mt-5"
            value={accountDescription}
            onChange={(e) => setAccountDescription(e.target.value)}
            required
            placeholder="Masukkan Account Description"
            isError={!!state?.validationErrors?.account_description}
            errorMessage={state?.validationErrors?.account_description}
          />
        </div>

        <div className="flex items-center justify-end gap-x-6">
          <Link href="/master/sap-13">
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

      <Sap13Modal
       treeData={treeData}
       isModalOpen={isModalOpen}
       onClose={() => setIsModalOpen(false)}
       onNodeSelect={(node: TreeNode) => handleAccountSelect(node)}
      />

    </>
  );
}
