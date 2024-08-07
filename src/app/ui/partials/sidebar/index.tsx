import Link from 'next/link';
import NavLink from '../nav-links';
import UserProfile from '../user-profile';
import { AppLogo } from '@/components';
import { Session } from 'next-auth';

export default function Sidebar({session}: {session: Session}) {
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

      <UserProfile user={session?.user}/>
    </div>
  );
}
