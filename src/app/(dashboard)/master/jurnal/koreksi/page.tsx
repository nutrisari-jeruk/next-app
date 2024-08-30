import Link from 'next/link';
import Search from '@/app/ui/search';
import { TwButton, TwHeader, TwTable, TwToast } from '@/components';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import { fetchKoreksiList } from './actions';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import type { Params } from '@/types/params';
import type { Column, Row } from '@/types/table';
import type { List } from '@/types/koreksi';
import Skeletons from '@/app/ui/skeletons';
import Table from './ui/table';


export const metadata: Metadata = {
  title: 'Jurnal Koreksi',
};
export default async function Page({ searchParams }: { searchParams: Params }) {
  const searchValue = searchParams?.searchValue || '';
  const searchField = searchParams?.searchField || 'jurnal_kode';
  const page = searchParams?.page || '1';
  const rowsPerPage = searchParams?.rowsPerPage || '10';

  const session = cookies();

  // const columns: Column[] = [
  //   {
  //     label: 'Kode Jurnal',
  //     accessor: 'jurnal_kode',
  //     sortable: true,
  //   },
  //   {
  //     label: 'Jenis Jurnal',
  //     accessor: 'jurnal_jenis',
  //     sortable: true,
  //   },
  //   {
  //     label: 'Debit',
  //     accessor: 'debit',
  //     sortable: false,
  //   },
  //   {
  //     label: 'Kredit',
  //     accessor: 'credit',
  //     sortable: false,
  //   },
  // ];

  // const data = await fetchKoreksiList({
  //   page: currentPage,
  //   rowsPerPage: perPage,
  //   searchField: searchField,
  //   searchValue: searchValue,
  // });
  // console.log(data)

  // const rows = data?.data.map((item: List) => {
  //   const deb = item.kode_rekening.find(
  //     (rekening) => rekening.debit !== null && rekening.credit === null,
  //   )?.debit;
  //   const cred = item.kode_rekening.find(
  //     (rekening) => rekening.credit !== null && rekening.debit === null,
  //   )?.credit;

  //   return {
  //     id: item.id,
  //     jurnal_kode: item.jurnal_kode,
  //     jurnal_jenis: item.jurnal_jenis,
  //     debit: deb,
  //     credit: cred,
  //   };
  // }) as Row[];

  return (
    <div>
      {session.get('toastMessage')?.value &&
        session.get('toastStatus')?.value && (
          <TwToast
            message={session.get('toastMessage')?.value!}
            status={session.get('toastStatus')?.value!}
          />
        )}
      <div className="flex items-center justify-between">
        <TwHeader title="Jurnal Koreksi" />

        <Link href="/master/jurnal/koreksi/create">
          <TwButton
            title="Tambah Baru"
            variant="success"
            icon={<PlusCircleIcon className="h-5 w-5" />}
          />
        </Link>
      </div>

      <div className="mt-4 flex flex-col space-y-2">
      

        <Suspense fallback={<Skeletons />}>
          <Table
            page={page}
            rowsPerPage={rowsPerPage}
            searchField={searchField}
            searchValue={searchValue}
          />
        </Suspense>
      </div>
    </div>
  );
}
