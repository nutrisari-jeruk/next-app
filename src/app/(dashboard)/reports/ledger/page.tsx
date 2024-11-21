// import { useState } from 'react';
import { TwButton, TwHeader, TwInput, TwSelect } from '@/components';
import type { Metadata } from 'next';
import type { Option } from '@/types/option';

export const metadata: Metadata = {
  title: 'Laporan Buku Besar',
};

export default function Page() {
//   const [isSapModalOpen, setIsSapModalOpen] = useState(false);
  const options: Option[] = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <TwHeader title="Laporan Buku Besar" />
      </div>
      <div className="mt-4 space-y-2">
        <TwSelect
          label="Pilih Periode"
          name="period"
          options={options}
          className="max-w-xs"
        />
        <TwInput
          id="sap13_id"
          name="sap13_id"
          className="w-full cursor-pointer"
          label="Kode Rekening SAP 13"
          placeholder="Kode SAP 13 level 5"
          value={''}
          readOnly
        />
        <TwButton title="Cetak" />
      </div>
    </div>
  );
}
