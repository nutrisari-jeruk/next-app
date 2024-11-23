import { TwHeader } from '@/components';

import { Metadata } from 'next';
import PrintForm from './ui/print-from';

export const metadata: Metadata = {
  title: 'Laporan Realisasi Anggaran',
};

export default function Page() {
  return (
    <>
      <TwHeader title="Laporan" />
      <PrintForm />
    </>
  );
}
