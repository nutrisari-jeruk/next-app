import type { Metadata } from 'next';
import Form from './ui/form';
import { TwHeader } from '@/components';

export const metadata: Metadata = {
  title: 'Laporan Buku Besar',
};

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <TwHeader title="Jurnal Umum" />
      </div>
      <Form />
    </>
  );
}
