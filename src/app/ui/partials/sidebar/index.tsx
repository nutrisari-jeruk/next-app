import { auth, signOut } from '@/auth';
import {
  HomeIcon,
  UsersIcon,
  PowerIcon,
  CodeBracketSquareIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: HomeIcon,
    count: '1',
    current: true,
  },
  {
    name: 'Base Template',
    href: '/base-template',
    icon: CodeBracketSquareIcon,
    current: false,
  },
  { name: 'Users', href: '/user', icon: UsersIcon, current: false },
  { name: 'Jurnal Umum', href: '/master/umum', icon: CircleStackIcon, current: false },
];
const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default async function Sidebar() {
  return (
    <div className="flex h-svh w-72 grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 shadow">
      <div className="-mx-6 mt-auto flex h-16 shrink-0 items-center bg-indigo-600">
        <Link
          href="/"
          className="w-full bg-indigo-600 text-center text-2xl font-bold text-white"
        >
          Next-app
        </Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
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
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">
              Your teams
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {teams.map((team) => (
                <li key={team.name}>
                  <a
                    href={team.href}
                    className={classNames(
                      team.current
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                    )}
                  >
                    <span
                      className={classNames(
                        team.current
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                      )}
                    >
                      {team.initial}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mb-2 mt-auto">
            {/* TODO: Improve signout UI */}
            <form
              className="flex items-center justify-center"
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button type="submit">
                <div className="flex items-center gap-2">
                  <PowerIcon className="h-6 w-6" aria-hidden="true" />
                  <span>Sign out</span>
                </div>
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </div>
  );
}
