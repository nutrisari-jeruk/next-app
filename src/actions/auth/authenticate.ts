'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(_currentState: unknown, formData: FormData) {
  const callbackUrl = formData.get('callbackUrl') as string;
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        case 'CallbackRouteError':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong.';
      }
    }
  }

  redirect(callbackUrl);
}
