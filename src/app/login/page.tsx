'use client';

import { Button, Input } from '@/components';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/login/_actions/authenticate';
import { ExclamationCircle } from '@/components/icon';

export default function Login() {
  const { pending } = useFormStatus();
  const [errorMessage, formAction] = useFormState(authenticate, undefined);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl bg-white p-8 shadow-lg">
        <form action={formAction} className="w-80 space-y-2">
          <Input name="email" />
          <Input name="password" type="password" />

          <Button
            title="Login"
            type="submit"
            aria-disabled={pending}
            disabled={pending}
          />
        </form>
        {errorMessage && (
          <p className="flex text-sm text-red-500 items-center gap-1">
            <ExclamationCircle />
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
