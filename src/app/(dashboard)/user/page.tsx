import Table from './components/table';
import { Button } from '@/components';
import useUser from '@/hooks/user';
import Link from 'next/link';

export default async function Page() {
  const { user } = await useUser();

  !!user && '<p>Loading...</p>';

  return (
    <div className="px-8">
      <div className="flex flex-col">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          Users
        </h1>
        <p>
          A list of all the users in your account including their name, title,
          email and role.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="w-24">
          <Link href="/user/create">
            <Button title="Add User" variant="primary" size="sm" />
          </Link>
        </div>
        <Table />
      </div>
    </div>
  );
}
