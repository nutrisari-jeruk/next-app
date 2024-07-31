import { Sidebar } from '../ui/partials';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="w-full px-4 py-8">{children}</main>
    </div>
  );
}
