'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { User } from '@/types/user';
import type { Menu } from '@/types/menu';

const userNavigation: Menu[] = [
  {
    name: 'Dashboard',
    href: '/',
    icon: HomeIcon,
    count: '1',
    current: false,
  },
];

const userJournals: Menu[] = [];

const userMaps: Menu[] = [];

const adminNavigation: Menu[] = [
  {
    name: 'Dashboard',
    href: '/',
    icon: HomeIcon,
    count: '1',
    current: false,
  },
];

const adminJournals: Menu[] = [
  {
    id: 1,
    name: 'Jurnal Umum',
    href: '/master/journal/general',
    initial: 'JU',
    current: false,
  },
  {
    id: 2,
    name: 'Jurnal Penyesuaian',
    href: '/master/journal/adjustment',
    initial: 'JP',
    current: false,
  },
  {
    id: 3,
    name: 'Jurnal Koreksi',
    href: '/master/journal/correction',
    initial: 'JK',
    current: false,
  },
  {
    id: 4,
    name: 'Jurnal Penutup',
    href: '/master/journal/closing',
    initial: 'JPP',
    current: false,
  },
];

const adminMaps: Menu[] = [
  {
    name: 'Mapping Kode Rekening Belanja 050',
    href: '#',
    children: [
      {
        name: 'Belanja SAP 13',
        href: '/mapping/expenditure-050/to-expenditure-sap-13',
        initial: 'SAP',
        current: false,
      },
      {
        name: 'Utang SAP 13',
        href: '/mapping/expenditure-050/to-debt-sap-13',
        initial: 'SAP',
        current: false,
      },
    ],
  },
  {
    name: 'Mapping Kode Rekening Belanja SAP 13',
    href: '#',
    children: [
      {
        name: 'Beban & Aset SAP 13',
        href: '/mapping/expenditure-sap-13/to-burden-assets-sap-13',
        initial: 'BA',
        current: false,
      },
    ],
  },
  {
    name: 'Mapping Kode Rekening Pendapatan RS',
    href: '#',
    children: [
      {
        name: 'Pendapatan SAP 13',
        href: '/mapping/income/to-income-sap-13',
        initial: 'BA',
        current: false,
      },
    ],
  },
  {
    name: 'Pencatatan Jurnal',
    href: '#',
    children: [
      {
        name: 'Jurnal Umum',
        href: '/transaction/journal-entry/general',
        initial: 'JU',
        current: false,
      },
      {
        name: 'Jurnal Penyesuaian',
        href: '/transaction/journal-entry/adjustment',
        initial: 'JP',
        current: false,
      },
      {
        name: 'Jurnal Koreksi',
        href: '/transaction/journal-entry/correction',
        initial: 'JK',
        current: false,
      },
      {
        name: 'Jurnal Penutup', 
        href: '/transaction/journal-entry/closing',
        initial: 'JPP',
        current: false,
      },
    ],
  },
];

export default function NavLink({ user }: { user: User }) {
  const pathname = usePathname();

  const navigation = user.role === 'admin' ? adminNavigation : userNavigation;
  const journals = user.role === 'admin' ? adminJournals : userJournals;
  const maps = user.role === 'admin' ? adminMaps : userMaps;
  return (
    <>
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={clsx(
                    item.name !== 'Dashboard' && pathname.startsWith(item.href)
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                  )}
                >
                  <item.icon
                    className={clsx(
                      item.name !== 'Dashboard' &&
                        pathname.startsWith(item.href)
                        ? 'text-indigo-600'
                        : 'text-gray-400 group-hover:text-indigo-600',
                      'h-6 w-6 shrink-0',
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                  {item.count ? (
                    <span
                      className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
                      aria-hidden="true"
                    >
                      {item.count}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        {journals.length > 0 && (
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">
              Master
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {journals.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={clsx(
                      item.name !== 'Dashboard' &&
                        pathname.startsWith(item.href)
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                    )}
                  >
                    <span
                      className={clsx(
                        item.name !== 'Dashboard' &&
                          pathname.startsWith(item.href)
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                      )}
                    >
                      {item.initial}
                    </span>
                    <span className="truncate">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        )}
        {maps.length > 0 &&
          maps.map((item, index) => (
            <li key={index}>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                {item.name}
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {item.children!.map((v) => (
                  <li key={v.name}>
                    <Link
                      href={v.href}
                      className={clsx(
                        v.name !== 'Dashboard' && pathname.startsWith(v.href)
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                      )}
                    >
                      <span
                        className={clsx(
                          v.name !== 'Dashboard' && pathname.startsWith(v.href)
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                          'vs-center flex h-6 w-6 shrink-0 justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                        )}
                      >
                        {v.initial}
                      </span>
                      <span className="truncate">{v.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
}
