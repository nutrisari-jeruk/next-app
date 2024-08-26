import { UserCircleIcon } from '@heroicons/react/24/outline';
import type { User } from 'next-auth';

export default function UserProfile({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-2">
      <UserCircleIcon className="h-8 w-8" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{user.name}</span>
        <span className="text-sm">{user.role}</span>
      </div>
    </div>
  );
}
