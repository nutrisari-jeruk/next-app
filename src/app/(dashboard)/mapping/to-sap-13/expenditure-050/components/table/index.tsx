import type { Params } from '@/types/params';
import { fetchList } from '../../actions';
import Link from 'next/link';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';

export default async function Table({
  searchField,
  searchValue,
  page = 1,
  rowsPerPage = 10,
}: Params) {
  const list = await fetchList({ searchField, searchValue, page, rowsPerPage });

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
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Kode Rekening Belanja</span>
                      <button>
                        <ArrowsUpDownIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Kode Rekening Belanja SAP</span>
                      <button>
                        <ArrowsUpDownIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {!!list.length &&
                  list?.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {item.account_050}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {item.account_sap13}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Link
                          className="text-indigo-600 hover:text-indigo-900"
                          href={`#`}
                        >
                          Edit
                          <span className="sr-only"></span>
                        </Link>
                      </td>
                    </tr>
                  ))}

                {!list.length && (
                  <tr>
                    <td
                      colSpan={3}
                      className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      No user found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
