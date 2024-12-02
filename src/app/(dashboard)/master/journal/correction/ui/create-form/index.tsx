'use client';

import Link from 'next/link';
import AccountModal from '../../components/account-modal';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { TwButton, TwInput, TwSelect } from '@/components';
import {
  ArrowUturnLeftIcon,
  CheckIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { createJournal } from '@/actions/master/journal/correction';
import type { TreeNode } from '@/types/tree-view';
import type { Account } from '@/types/journal/correction';
import { Option } from '@/types/option';

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
  // const [accountList, setAccountList] = useState<Account[]>([]);
  const [accountList, setAccountList] = useState<Account[]>([
    {
      is_credit: true,
      equitas_id: '231',
      sap13_id: {
        id: 231,
        text: '3.1.01.01.01 - Ekuitas',
        parent_id: 230,
        is_selectable: true,
      },
    },
  ]);
  const [EquitasType, setEquitasType] = useState<'menambah' | 'mengurangi'>(
    'menambah',
  );
  const [state, formAction] = useFormState(createJournal, undefined);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('journal_kind', jenis);
    formData.append('accounts', JSON.stringify(accountList));

    return formAction(formData);
  };

  const appendAccount = (accounts: Account) => {
    console.log('tesss', accounts.equitas_id);
    let addArray = [];
    let CpAccount = [...accountList];
    if (accounts?.equitas_id === '739') {
      let nParams = {
        is_credit: true,
        equitas_id: '739',
        sap13_id: {
          id: 739,
          text: '3.1.02.01.01 - Ekuitas SAL',
          parent_id: 230,
          is_selectable: true,
        },
      };

      CpAccount[0] = Object.assign({}, accounts);
      addArray = [nParams, ...CpAccount];
    } else {
      addArray = [...CpAccount, accounts];
    }

    accounts && setAccountList(addArray);
  };

  const removeAccount = (index: number) => {
    setAccountList(accountList.filter((_, i) => i !== index));
  };

  const addAcount = () => {
    setIsAccountModalOpen(true);
  };

  //tambahan
  const options: Option[] = [
    { label: 'Menambah', value: 'menambah' },
    { label: 'Mengurangi', value: 'mengurangi' },
  ];

  const onChangeJenisEquitas = (value: 'menambah' | 'mengurangi') => {
    setEquitasType(value);
    switch (value) {
      case 'menambah':
        setAccountList(
          accountList.map((account) => {
            if (account.sap13_id.id === Number(account.equitas_id)) {
              return { ...account, is_credit: true };
            }
            return { ...account, is_credit: false };
          }),
        );
        break;
      case 'mengurangi':
        setAccountList(
          accountList.map((account) => {
            if (account.sap13_id.id === Number(account.equitas_id)) {
              return { ...account, is_credit: false };
            }
            return { ...account, is_credit: true };
          }),
        );
        break;
      default:
        setAccountList(
          accountList.map((account) => {
            if (account.sap13_id.id === Number(account.equitas_id)) {
              return { ...account, is_credit: true };
            }
            return { ...account, is_credit: false };
          }),
        );
        break;
    }
  };

  return (
    <>
      <form action={handleSubmit} className="rounded-lg">
        <div className="mb-6 rounded-lg bg-white p-4 shadow">
          <TwInput
            name="journal_kind"
            label="Jenis Jurnal"
            type="text"
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
            required
            isError={!!state?.validationErrors?.journal_kind}
            errorMessage={state?.validationErrors?.journal_kind}
          />
          <br></br>

          <TwSelect
            onChange={(e) =>
              onChangeJenisEquitas(e.target.value as 'menambah' | 'mengurangi')
            }
            label="Jenis Koreksi Ekuitas"
            name="jenisKoreksiEquitas"
            options={options}
            defaultValue={'menambah'}
            required
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
                className="flex w-full items-center justify-center gap-1 rounded bg-white px-3 py-2 shadow"
              >
                <div className="w-full">{account?.sap13_id.text}</div>
                <div className="w-1/3">
                  {account?.is_credit ? 'Kredit' : 'Debit'}
                </div>
                {account.sap13_id.id !== 231 ? (
                  <div className="w-1/4">
                    <button
                      className="text-red-500"
                      onClick={() => removeAccount(index)}
                    >
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <div className="w-1/4"> </div>
                )}
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
          <Link href="/master/journal/correction">
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
        equitasType={EquitasType}
      />
    </>
  );
}
