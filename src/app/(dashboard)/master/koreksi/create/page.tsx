'use client';

import { TwButton, TwHeader, TwInput } from '@/components';
import { ArrowUturnLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function page() {
  return (
    <>
      <TwHeader title="Jurnal Koreksi " />

      <form className="mt-4 rounded-lg bg-white p-4 shadow">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col space-y-4">
              <TwInput
                name="kode"
                label="Kode"
                type="text"
                disabled={true}
               
                placeholder="Masukkan No Bukti"
              />
              <TwInput
                name="jenisJurnal"
                label="Jenis Jurnal Koreksi LPE"
                type="text"
                required
                placeholder="Jenis Jurnal Koreksi LPE"
              />
                 <div className="w-full">
                <label
                  htmlFor="role"
                  className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
                >
                  Jenis Koreksi Ekuitas
                </label>
                <select
                  id="role"
                  name="jenisKoreksi"
                  className="w-full rounded text-sm"
                >
                  <option value="-">Pilih</option>
                  <option value="1">Menambah</option>
                  <option value="2">Mengurangi</option>
                </select>
        
              </div>
              {/* <TwInput
                name="jenisKoreksi"
                label="Jenis Koreksi Ekuitas"
                type="text"
                required
                placeholder="Masukkan Jenis Ekuitas"
              /> */}
              <TwInput
                name="kodeRekening"
                label="Kode Rekening"
                type="text"
                placeholder="Masukkan Kode Rekening"
              />

            <TwInput
                name="kredit"
                label="Kredit"
                type="text"
                placeholder="Keterangan"
              />
             
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
        <TwButton
            type="submit"
            title="Simpan"
            variant="success"
            icon={<CheckIcon className="h-5 w-5" aria-hidden="true" />}
          />
          <TwButton
            type="submit"
            title="Batal"
            variant="danger"
            icon={<CheckIcon className="h-5 w-5" aria-hidden="true" />}
          />

            <TwButton
            type="submit"
            title="Hapus"
            variant="warning"
            icon={<CheckIcon className="h-5 w-5" aria-hidden="true" />}
          />
          {/* <Link href="/master/koreksi">
            <TwButton
              type="button"
              title="Batal"
              variant="secondary"
              icon={
                <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
              }
            />
          </Link> */}

          
        </div>
      </form>
    </>
  );
}
