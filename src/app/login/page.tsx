'use client';

import { TwButton, Input } from '@/components';
import { useFormState, useFormStatus } from 'react-dom';
import {
  ArrowRightEndOnRectangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { getUserRole } from './actions/getUserRole';
import { useEffect } from 'react';
import { useLoggedInUser } from '@/store/user';
import { useRouter } from 'next/navigation';

export default function Login({ searchParams }: any) {
  console.log(searchParams);
  const callBackUrl = searchParams?.callBackUrl || '/';
  const router = useRouter();
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(getUserRole, undefined);
  const { setLoggedInUser } = useLoggedInUser();

  useEffect(() => {
    if (state?.user) {
      setLoggedInUser?.(state.user);
      router.push(`/role-select?callBackUrl=${callBackUrl}`);
    }
  }, [state]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl bg-white p-8 shadow-lg">
        <form action={formAction} className="w-80 space-y-2">
          <Input name="email" />
          <Input name="password" type="password" />
          <TwButton
            type="submit"
            title="Login"
            className="w-full"
            size="lg"
            aria-disabled={pending}
            disabled={pending}
            isLoading={false}
            icon={<ArrowRightEndOnRectangleIcon className="w-5" />}
          />
        </form>
        {state?.errorMessage && (
          <p className="flex items-center gap-1 text-sm text-red-500">
            <ExclamationCircleIcon className="w-5" />
            {state.errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
