import { auth } from '@/auth';
import { AuthProvider } from '@/components/auth-provider';
import { Sidebar } from '../ui/partials';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  return (
    <AuthProvider session={session}>
      <div className="flex">
        <Sidebar session={session} />

        <main className="h-svh w-full overflow-y-auto px-8 py-8 space-y-4">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
