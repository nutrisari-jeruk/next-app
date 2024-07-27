'use client';

import { Button, Input } from '@/components';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from './actions';

export default function Login() {
  const { pending } = useFormStatus();
  const [errorMessage, formAction] = useFormState(authenticate, undefined);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl bg-white p-8 shadow-lg">
        <form action={formAction} className="w-80 space-y-2">
          <Input
            name="email"
            isError={!!errorMessage}
            errorMessage={errorMessage}
          />
          <Input
            name="password"
            type="password"
            isError={!!errorMessage}
            errorMessage={errorMessage}
          />
          <Button title="Login" type="submit" disabled={pending} />
        </form>
      </div>
    </div>
  );
}
