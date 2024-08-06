'use client';

import {
  HomeIcon,
  UsersIcon,
  CodeBracketSquareIcon,
} from '@heroicons/react/24/outline';
import type { Menu } from '@/types/menu';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

const navigation: Menu[] = [
  {
    name: 'Dashboard',
    href: '/',
    icon: HomeIcon,
  },
  {
    name: 'Users',
    href: '/user',
    icon: UsersIcon,
    count: 2,
  },
  {
    name: 'Base Template',
    href: '/base-template',
    icon: CodeBracketSquareIcon,
  },
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
      </ul>
    </>
  );
}
