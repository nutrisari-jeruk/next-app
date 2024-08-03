import Link from 'next/link';
import NavLink from '../nav-links';
import { signOut } from '@/auth';
import { PowerIcon } from '@heroicons/react/24/outline';
import { AppLogo } from '@/components';

const logout = async () => {
  'use server';
  await signOut();
};

export default function Sidebar() {
  return (
    <div className="flex h-svh w-80 grow flex-col gap-y-5 border-r border-gray-200 bg-white px-2 shadow">
      <div className="-mx-2 mt-auto flex h-16 shrink-0 items-center bg-indigo-600">
        <Link
          href="/"
          className="flex w-full items-center justify-center bg-indigo-600"
        >
          <AppLogo />
        </Link>
      </div>
      <nav className="flex flex-1 flex-col overflow-y-auto px-2">
        <NavLink />
      </nav>
      <form action={logout}>
        <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    </div>
  );
}
