'use server';

import { signIn } from '@/auth';
import { selectRoleSchema } from '@/lib/zod';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(_currentState: unknown, formData: FormData) {
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

  redirect('/');
}
