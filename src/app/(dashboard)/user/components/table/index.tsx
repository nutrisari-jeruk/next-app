'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@headlessui/react';

import type { User } from '@/types/user';

export default function Table({ users }: { users: User[] }) {
  const [search, setSearch] = useState('');

  let filteredUsers = users;

  if (search.length > 0) {
    filteredUsers = users.filter((v) => {
      return v?.name!.toLowerCase().includes(search.toLowerCase());
    });
  }

  return (
    <div className="flow-root">
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
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
                    ID
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredUsers?.map((person, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Link href={'#'}>{index + 1}.</Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Link href={'#'}>{person.name}</Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Link href={'#'}>{person.email}</Link>
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
