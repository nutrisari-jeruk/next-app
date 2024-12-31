'use client';
import { TwButton, TwInput, TwTextarea } from '@/components';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import JournalKindAutoComplete from '../../component/journal-kind-auto-complete';
import { useState } from 'react';
import {
  createJournalEntry,
  journalKindAutoComplete as getOptionJournalKindAutoComplete,
} from '@/actions/transaction/journal-entry/adjustment';
import { Option } from '@/types/journal-entry/adjustment';
import { ArrowUturnLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Input } from '@headlessui/react';
import { NumericFormat } from 'react-number-format';

function SubmitButton(props: { difference: number }) {
  const { difference } = props;
  const { pending } = useFormStatus();
  return (
    <TwButton
      type="submit"
      title="Save"
      isLoading={pending}
      disabled={
        pending || Number(difference.toFixed(2)) !== Number((0).toFixed(2))
      }
      variant="success"
      icon={<CheckIcon className="h-5 w-5" aria-hidden="true" />}
    />
  );
}

export default function Create() {
  dayjs.locale('id');
  const [transactionDate, setTransactionDate] = useState<string>('');
  const [descriptions, setDescriptions] = useState<string>('');
  const [selectedJournalKind, setSelectedJournalKind] = useState<Option | null>(
    null,
  );
  const [totalDebit, setTotalDebit] = useState<number>(0);
  const [totalCredit, setTotalCredit] = useState<number>(0);
  const [difference, setDifference] = useState<number>(0);
  const [state, formAction] = useFormState(createJournalEntry, undefined);

  const handleSubmit = async () => {
    const formData = new FormData();
    if (selectedJournalKind) {
      const accounts = selectedJournalKind.accounts.map((account) => ({
        id: account.id,
        amount: account.amount,
      }));

      formData.append('journal_id', selectedJournalKind.id.toString());
      formData.append('accounts', JSON.stringify(accounts));
      formData.append('transaction_date', transactionDate);
      formData.append('descriptions', descriptions);
    }

    return formAction(formData);
  };

  const onSelectedJurnalKind = (value: Option) => {
    if (!value) {
      setSelectedJournalKind(null);
      return;
    }
    const temp = {
      ...value,
      accounts: value.accounts.map((account) => ({
        ...account,
        amount: null,
      })),
    };
    setSelectedJournalKind(temp);
  };

  const handleAmountChange = (index: number, amount: number) => {
    setTotalCredit(0);
    setTotalDebit(0);
    setDifference(0);
    let totalDebit = 0;
    let totalCredit = 0;
    let difference = 0;
    if (selectedJournalKind) {
      const updatedAccounts = selectedJournalKind.accounts.map((account, i) => {
        return i === index ? { ...account, amount } : account;
      });

      updatedAccounts.forEach((account) => {
        if (account.debit) {
          totalDebit += Number(account.amount || 0);
        }
        if (account.credit) {
          totalCredit += Number(account.amount || 0);
        }
      });

      const fixedTotalDebit = Number(totalDebit.toFixed(2));
      const fixedTotalCredit = Number(totalCredit.toFixed(2));

      difference = fixedTotalDebit - fixedTotalCredit;

      setSelectedJournalKind({
        ...selectedJournalKind,
        accounts: updatedAccounts,
      });

      setTotalDebit(fixedTotalDebit);
      setTotalCredit(fixedTotalCredit);
      setDifference(difference);
    }
  };

  return (
    <div>
      <form action={handleSubmit} className="rounded-lg">
        <div className="mb-6 space-y-2 rounded-lg bg-white p-4 shadow">
          <TwInput
            name="transaction_date"
            label="Tanggal Transaksi"
            type="date"
            required
            onChange={(e) => setTransactionDate(e.target.value)}
            value={transactionDate}
            isError={!!state?.validationErrors?.transaction_date}
            errorMessage={state?.validationErrors?.transaction_date}
          />

          <JournalKindAutoComplete
            name="journal_kind"
            placeholder="Cari Jenis Journal"
            label="Jenis Jurnal"
            setSelectedOption={(value: Option) => onSelectedJurnalKind(value)}
            selectedOption={selectedJournalKind}
            getServerOptions={(query: string) =>
              getOptionJournalKindAutoComplete(query)
            }
          />

          <TwTextarea
            required
            name="descriptions"
            label="Keterangan"
            placeholder="Masukkan Keterangan"
            onChange={(e) => setDescriptions(e.target.value)}
            value={descriptions}
            isError={!!state?.validationErrors?.descriptions}
            errorMessage={state?.validationErrors?.descriptions}
          />
        </div>
        <div className="mb-3 space-y-1">
          <div className="flex w-full rounded bg-white p-3 shadow">
            <div className="w-1/5 font-bold">Kode Rekening</div>
            <div className="w-1/2 font-bold">Uraian Rekening</div>
            <div className="w-1/5 font-bold">Nilai Debit</div>
            <div className="w-1/5 font-bold">Nilai Kredit</div>
          </div>
          {!!selectedJournalKind &&
            selectedJournalKind.accounts.map((account, index) => (
              <div
                key={index}
                className="flex w-full items-center justify-center gap-1 rounded bg-white px-3 py-2 shadow"
              >
                <div className="w-1/5">{account?.code}</div>
                <div className="w-1/2">{account?.debit ?? account?.credit}</div>
                <div className="w-1/5">
                  {account?.debit && (
                    <NumericFormat
                      name={`details-${account?.code}`}
                      className="block size-8 w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      prefix="Rp"
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      allowNegative={false}
                      fixedDecimalScale={true}
                      onValueChange={(value) =>
                        handleAmountChange(index, value.floatValue || 0)
                      }
                      required
                    />
                  )}
                </div>
                <div className="w-1/5">
                  {account?.credit && (
                    <NumericFormat
                      className="block size-8 w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      prefix="Rp"
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      allowNegative={false}
                      fixedDecimalScale={true}
                      onValueChange={(value) =>
                        handleAmountChange(index, value.floatValue || 0)
                      }
                      required
                    />
                  )}
                </div>
              </div>
            ))}
          {!selectedJournalKind?.accounts.length && (
            <div className="flex w-full rounded bg-white px-3 py-2 shadow">
              <div className="w-full text-center text-gray-500">
                Belum ada data.
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2 rounded-lg bg-white">
          <div>
            {!!state && <div className="text-red-500">{state.message}</div>}
          </div>
          <div className="grid h-fit w-full justify-items-end font-bold">
            <div className="flex w-1/2 justify-end">
              <span className="w-1/3">Total Debit</span>
              <span className="w-1/10 text-right">: Rp</span>
              <NumericFormat
                className="h-fit w-2/5 border-none p-0 pr-1 text-right"
                thousandSeparator="."
                decimalSeparator=","
                disabled
                allowNegative={false}
                decimalScale={2}
                fixedDecimalScale={true}
                value={totalDebit}
                required
              />
            </div>
            <div className="flex w-1/2 justify-end">
              <span className="w-1/3">Total Kredit</span>
              <span className="w-1/10 text-right">: Rp</span>
              <NumericFormat
                className="h-fit w-2/5 border-none p-0 pr-1 text-right"
                thousandSeparator="."
                decimalSeparator=","
                disabled
                allowNegative={false}
                decimalScale={2}
                fixedDecimalScale={true}
                value={totalCredit}
                required
              />
            </div>
            <div className="flex w-1/2 justify-end">
              <span className="w-1/3">Selisih</span>
              <span className="w-1/10 text-right">: Rp</span>
              <NumericFormat
                className="h-fit w-2/5 border-none p-0 pr-1 text-right"
                thousandSeparator="."
                decimalSeparator=","
                disabled
                allowNegative={false}
                decimalScale={2}
                fixedDecimalScale={true}
                value={difference}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-x-6">
          <Link href="/transaction/journal-entry/general">
            <TwButton
              type="button"
              title="Cancel"
              variant="secondary"
              icon={
                <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
              }
            />
          </Link>
          <SubmitButton difference={difference} />
        </div>
      </form>
    </div>
  );
}
