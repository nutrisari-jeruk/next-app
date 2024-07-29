import { signOut } from '@/auth';
import Link from 'next/link';
import { Sidebar } from '../ui/partials';

export default function Layout({ children }: { children: React.ReactNode }) {
  const logout = async () => {
    'use server';
    await signOut();
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="w-full p-4">{children}</main>
    </div>
  );
}
