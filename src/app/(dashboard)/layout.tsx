import { Sidebar } from '../ui/partials';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

export default function Layout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <SessionProvider session={session}>
      <div className="flex">
        <Sidebar />

        <main className="h-svh w-full overflow-y-auto px-4 py-8">
          <div className="rounded bg-white p-4">{children}</div>
        </main>
      </div>
    </SessionProvider>
  );
}
