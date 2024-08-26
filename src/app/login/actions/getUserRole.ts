'use server';

import $http from '@/lib/axios';
import { redirect } from 'next/navigation';
import { AxiosError } from 'axios';
import { AuthError } from 'next-auth';
import { ZodError } from 'zod';
import { revalidatePath } from 'next/cache';
import { signInSchema } from '@/lib/zod';

export async function getUserRole(_currentState: unknown, formData: FormData) {
  try {
    const validatedFields = signInSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const { data } = await $http.post('/v1/apps/login', {
      ...validatedFields.data,
    });

    console.log(data);
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      if (error.cause?.err instanceof AxiosError) {
        return error.cause?.err.response?.data.message;
      }
      if (
        error?.type === 'CallbackRouteError' &&
        error.cause?.err instanceof ZodError
      ) {
        return (
          error.cause?.err.flatten().fieldErrors.email ||
          error.cause?.err.flatten().fieldErrors.password
        );
      }
    }
    return 'An unknown error occurred';
  }
  revalidatePath('/role-select');
  redirect('/role-select');
}
