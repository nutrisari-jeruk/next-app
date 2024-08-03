'use client';

import { TwButton, TwHeader, TwInput } from '@/components';
import { ArrowUturnLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function page() {
  return (
    <>
      <TwHeader title="Tambah Penyesuaian" />

      <form className="mt-4 rounded-lg bg-white p-4 shadow">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col space-y-4">
              <TwInput
                name="jenis"
                label="Jenis Penyesuaian"
                type="text"
                required
                placeholder="Masukkan Jenis Penyesuaian"
              />
              <TwInput
                name="rekeningDebit"
                label="Rekening Debit"
                type="text"
                disabled={true}
                placeholder="Kode Rekening Debit"
              />
              <TwInput
                name="debit"
                label="Debit"
                type="text"
                required
                placeholder="Masukkan Debit"
              />
              <TwInput
                name="rekeningKredit"
                label="Rekening Kredit"
                type="text"
                disabled={true}
                placeholder="Kode Rekening Kredit"
              />
              <TwInput
                name="kredit"
                label="Kredit"
                type="text"
                required
                placeholder="Masukkan Kredit"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/master/penyesuaian">
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
            icon={<CheckIcon className="h-5 w-5" aria-hidden="true" />}
          />
        </div>
      </form>
    </>
  );
}
