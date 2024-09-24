import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import Sidebar from '../ui/sidebar';
import { FlashToaster } from '@/lib/flash-toaster';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="flex">
        <Sidebar session={session!} />

        <main className="h-svh w-full space-y-4 overflow-y-auto px-8 py-8">
          {children}
        </main>

        <FlashToaster />
      </div>
    </SessionProvider>
  );
}
