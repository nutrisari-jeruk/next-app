import Table from './components/table';
import { Button } from '@/components';
import Link from 'next/link';

export default async function Page() {
  return (
    <div className="px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold leading-6 text-gray-900">
          Users
        </h1>

        <div className="w-24">
          <Link href="/user/create">
            <Button title="Add User" variant="primary" size="sm" />
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <Table />
      </div>
    </div>
  );
}
