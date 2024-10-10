'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { TwButton, TwListbox } from '@/components';
import { authenticate } from '@/actions/auth/authenticate';
import {
  ArrowRightEndOnRectangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useLoggedInUser } from '@/store/user';

import type { Option } from '@/types/option';
import type { Role } from '@/types/user';

export default function RoleSelect({ searchParams }: any) {
  const [errorMessage, formAction] = useFormState(authenticate, undefined);
  const { loggedInUser } = useLoggedInUser();
  const [pending, setPending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loggedInUser) {
      router.push('/login');
    }
  }, [loggedInUser, router]);

  const options = loggedInUser?.roles.map((role: Role) => ({
    label: role.role,
    value: role.role_id,
  })) as Option[];

  const [selectedRole, setSelectedRole] = useState<Option | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    if (selectedRole) {
      const formData = new FormData();
      formData.append('user_id', String(loggedInUser?.id));
      formData.append('role_id', String(selectedRole.value));
      return formAction(formData);
    }
  };

  return (
    <div>
      {(loggedInUser && (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-4 rounded-xl bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="w-80 space-y-2">
              <TwListbox
                label="Select Your Role"
                options={options}
                selectedData={selectedRole}
                setSelectedData={setSelectedRole}
                placeHolder="Select a role"
              />
              <TwButton
                type="submit"
                title="Login"
                className="w-full"
                size="lg"
                aria-disabled={pending}
                disabled={pending || !selectedRole}
                isLoading={pending}
                icon={<ArrowRightEndOnRectangleIcon className="w-5" />}
              />
            </form>
            {errorMessage && (
              <p className="flex items-center gap-1 text-sm text-red-500">
                <ExclamationCircleIcon className="w-5" />
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      )) || <div />}
    </div>
  );
}
