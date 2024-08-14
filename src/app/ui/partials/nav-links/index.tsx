'use client';

import {
  HomeIcon,
  UsersIcon,
  CodeBracketSquareIcon,
  AdjustmentsHorizontalIcon,
  CircleStackIcon,
  ArrowDownCircleIcon,
} from '@heroicons/react/24/outline';
import type { Menu } from '@/types/menu';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: HomeIcon,
    count: '1',
    current: true,
  },
  { name: 'Users', href: '/user', icon: UsersIcon, current: false },
];

const journals = [
  { name: 'Jurnal Umum', href: '/master/jurnal/umum', initial: 'JU', current: false },
  { name: 'Jurnal Penyesuaian', href: '/master/jurnal/penyesuaian', initial: 'JP', current: false },
  { name: 'Jurnal Koreksi', href: '/master/jurnal/koreksi', initial: 'JK', current: false },
  { name: 'Jurnal Penutup', href: '/master/jurnal/penutup', initial: 'JPP', current: false },
];

export default function NavLink(): JSX.Element {
  const pathname = usePathname();

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
        <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">Jurnal</div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {journals.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={clsx(
                      item.name !== 'Dashboard' && pathname.startsWith(item.href)
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <span
                      className={clsx(
                        item.name !== 'Dashboard' && pathname.startsWith(item.href)
                          ? 'text-indigo-600 border-indigo-600'
                          : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                      )}
                    >
                      {item.initial}
                    </span>
                    <span className="truncate">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
      </ul>
    </>
  );
}
