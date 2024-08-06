import Link from 'next/link';
import { fetchUser } from '../../actions';
import type { Params } from '@/types/params';

export default async function Table({ query, page, perPage }: Params) {
  const users = await fetchUser({ query, page, perPage });
  let filteredUsers = users;

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
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {!!filteredUsers.length &&
                  filteredUsers?.map((person, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Link href={`/user/${person.id}/edit`}>
                          {index + 1}.
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Link href={`/user/${person.id}/edit`}>
                          {person.name}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Link href={`/user/${person.id}/edit`}>
                          {person.email}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Link href={`/user/${person.id}/edit`}>
                          {person.role}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Link href={`/user/${person.id}/edit`}>
                          {person.is_active ? 'Active' : 'Inactive'}
                        </Link>
                      </td>
                    </tr>
                  ))}

                {!filteredUsers.length && (
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
