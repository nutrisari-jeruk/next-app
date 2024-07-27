import { signOut } from '@/auth';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const logout = async () => {
    'use server';
    await signOut();
  };

  return (
    <div>
      {/* Include shared UI here e.g. a header or sidebar */}
      <aside className="fixed top-0 w-72">
        <ul className="mx-2">
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>
            <Link href="/user">User</Link>
          </li>
          <li>
            {/* TODO: move to logout component */}
            <form action={logout}>
              <button type="submit">
                Sign Out
              </button>
            </form>
          </li>
        </ul>
      </aside>
      <main className="relative ml-72">{children}</main>
    </div>
  );
}
