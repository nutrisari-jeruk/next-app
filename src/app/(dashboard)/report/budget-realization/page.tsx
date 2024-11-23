import { TwHeader } from '@/components';

import PrintForm from './ui/print-from';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laporan Realisasi Anggaran',
};

export default function Page() {
  return (
    <div>
      <TwHeader title="Laporan Realisasi Anggaran" />
      <PrintForm />
    </div>
  );
}
