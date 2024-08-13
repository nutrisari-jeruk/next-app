import { TwButton } from '@/components';
import type { List } from '@/types/umum';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const umumList: List[] = [
  {
    id: 1,
    kode: 'JU/001',
    jenis: 'Bunga Deposito',
    rekening: '1.1.1.1.1.1 - Penyusutan Laba/Rugi',
    debit: 'SAP 13 level 4',
    kredit: 'SAP 13 level 4',
  },
  {
    id: 2,
    kode: 'JU/002',
    jenis: 'Bunga Deposito',
    rekening: '2.2.2.2.2.2 - Penambahan Laba/Rugi',
    debit: 'SAP 13 level 2',
    kredit: 'SAP 13 level 2',
  },
];

export default function Table() {
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Kode
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Jenis Jurnal
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Rekening
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Debit
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Kredit
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {umumList.map((umum) => (
                  <tr key={umum.id} className="hover:bg-gray-100">
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Link href={'#'}>{umum.kode}</Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Link href={'#'}>{umum.jenis}</Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Link href={'#'}>{umum.rekening}</Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Link href={'#'}>{umum.debit}</Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Link href={'#'}>{umum.kredit}</Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Link
                        className="text-indigo-600 hover:text-indigo-900"
                        href={`master/umum/edit/${umum.id}`}
                      >
                        Edit
                        <span className="sr-only">, {umum.kode}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
