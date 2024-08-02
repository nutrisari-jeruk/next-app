import Table from './components/table';
import { TwButton } from '@/components';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export default async function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold leading-7 text-gray-900">Users</h1>

        <Link href="/user/create">
          <TwButton
            type="submit"
            title="Add User"
            variant="success"
            icon={<PlusCircleIcon className="h-5 w-5" aria-hidden="true" />}
          />
        </Link>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <Table />
      </div>
    </>
  );
}
