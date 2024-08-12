'use client';

import { TwButton, Input } from '@/components';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/login/actions/authenticate';
import {
  ArrowRightEndOnRectangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Login() {
  const { pending } = useFormStatus();
  const [errorMessage, formAction] = useFormState(authenticate, undefined);

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
        {errorMessage && (
          <p className="flex items-center gap-1 text-sm text-red-500">
            <ExclamationCircleIcon className="w-5" />
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
