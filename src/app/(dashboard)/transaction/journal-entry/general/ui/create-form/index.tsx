'use client';
import { TwButton, TwInput } from '@/components';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import JournalKindAutoComplete from '../../component/journal-kind-auto-complete';
import { useState } from 'react';
import { journalKindAutoComplete as getOptionJournalKindAutoComplete } from '@/actions/transaction/journal-entry/general';
import { Option } from '@/types/journal-entry/general';
import { ArrowUturnLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { set } from 'zod';

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

export default function Create() {
  dayjs.locale('id');
  const [transactionDate, setTransactionDate] = useState<string>('');
  const [selectedJournalKind, setSelectedJournalKind] = useState<Option | null>(
    null,
  );
  const [totalDebit, setTotalDebit] = useState<number>(0);
  const [totalCredit, setTotalCredit] = useState<number>(0);
  const [difference, setDifference] = useState<number>(0);

  const onSubmit = () => {
    alert('submit');
  };

  const onSelectedJurnalKind = (value: Option) => {
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

      difference = totalDebit - totalCredit;

      setSelectedJournalKind({
        ...selectedJournalKind,
        accounts: updatedAccounts,
      });

      setTotalDebit(totalDebit);
      setTotalCredit(totalCredit);
      setDifference(difference);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="rounded-lg">
        <div className="mb-6 space-y-2 rounded-lg bg-white p-4 shadow">
          <TwInput
            name="transaction_date"
            label="Tanggal Transaksi"
            type="date"
            onChange={(e) => setTransactionDate(e.target.value)}
            value={transactionDate}
          />
          <JournalKindAutoComplete
            name="journal_kind"
            placeholder="cari Jenis Journal"
            label="Jenis Jurnal"
            setSelectedOption={(value: Option) => onSelectedJurnalKind(value)}
            selectedOption={selectedJournalKind}
            getServerOptions={(query: string) =>
              getOptionJournalKindAutoComplete(query)
            }
          />
          <TwInput
            name="descriptions"
            label="Keterangan"
            placeholder="Masukkan Keterangan"
            required
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
                    <TwInput
                      type="number"
                      name={`details-${account?.code}`}
                      onChange={(e) =>
                        handleAmountChange(index, parseFloat(e.target.value))
                      }
                    />
                  )}
                </div>
                <div className="w-1/5">
                  {account?.credit && (
                    <TwInput
                      type="number"
                      name={`details-${account?.code}`}
                      onChange={(e) =>
                        handleAmountChange(index, parseFloat(e.target.value))
                      }
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

        <div className="grid h-fit w-full justify-items-end font-bold">
          <div className="flex w-1/2">
            <span className="w-1/3">Total Debit</span>
            <span className="w-1/5 text-right">: Rp {totalDebit}</span>
          </div>
          <div className="flex w-1/2">
            <span className="w-1/3">Total Kredit</span>
            <span className="w-1/5 text-right">: Rp {totalCredit}</span>
          </div>
          <div className="flex w-1/2">
            <span className="w-1/3">Selisih</span>
            <span className="w-1/5 text-right">: Rp {difference}</span>
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
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
