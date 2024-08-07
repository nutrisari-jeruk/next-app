import { signOut } from '@/auth';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
const logout = async () => {
  'use server';
  await signOut();
};
export default function Logout() {
  return (
    <form
      action={logout}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-900"
    >
      <button type="submit">
        <ArrowRightEndOnRectangleIcon className="w-6" />
      </button>
    </form>
  );
}
