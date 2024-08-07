import Logout from '../logout';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { User } from 'next-auth';

export default function UserProfile({ user }: { user: User }) {
  return (
    <div className="flex items-center justify-between bg-indigo-600 px-4 py-2 -mx-2 text-white">
      <div className="flex items-center gap-2">
        <UserCircleIcon className="h-12 w-12" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{user.name}</span>
          <span className="text-sm">{user.user_role}</span>
        </div>
      </div>
      <Logout />
    </div>
  );
}
