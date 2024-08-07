import { signOut } from '@/auth';
import { PowerIcon } from '@heroicons/react/24/outline';
const logout = async () => {
  'use server';
  await signOut();
};
export default function Logout() {
  return (
    <>
      <form action={logout}>
        <button>
          <PowerIcon className="w-6" />
        </button>
      </form>
    </>
  );
}
