import type { Metadata } from 'next';
import Form from './ui/form';
import { TwHeader } from '@/components';
import { getFiscalYear } from '@/actions/auth/getUserRole';

export const metadata: Metadata = {
  title: 'Laporan Buku Besar',
};

export default async function Page() {
  return (
    <>
      <TwHeader title="Laporan Buku Besar" />

      <div className="mt-4 space-y-2 rounded-lg bg-white p-4 shadow">
        <Form />
      </div>
    </>
  );
}
