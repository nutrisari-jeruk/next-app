'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { AppLogo, TwConfirm } from '@/components';
import { NavLink, UserProfile } from './partials';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';

export default function Sidebar({ session }: { session: Session }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex h-svh w-72 grow flex-col gap-y-5 border-r border-gray-200 bg-white px-2 shadow">
        <div className="-mx-2 mt-auto flex h-16 shrink-0 items-center bg-indigo-600">
          <Link
            href="/"
            className="flex w-full items-center justify-center bg-indigo-600"
          >
            <AppLogo />
          </Link>
        </div>
        <nav className="flex flex-1 flex-col overflow-y-auto px-2">
          <NavLink user={session?.user} />
        </nav>

        <div className="-mx-2 flex items-center justify-between border-t px-4 py-2">
          <UserProfile user={session?.user} />
          <div className="flex h-10 w-10 items-center justify-center">
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              <ArrowRightEndOnRectangleIcon className="w-6" />
            </button>
          </div>
        </div>
      </div>

      <TwConfirm
        isOpen={isOpen}
        title="Signing out"
        description="Are you sure you want to sign out?"
        handleClose={() => setIsOpen(false)}
        handleSubmit={() => {
          signOut();
        }}
      />
    </>
  );
}
