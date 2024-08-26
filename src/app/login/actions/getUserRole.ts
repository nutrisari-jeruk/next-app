'use server';

import $http from '@/lib/axios';
import { redirect } from 'next/navigation';
import { AxiosError } from 'axios';
import { AuthError } from 'next-auth';
import { ZodError } from 'zod';
import { signInSchema } from '@/lib/zod';

export async function getUserRole(_currentState: unknown, formData: FormData) {
  try {
    const validatedFields = signInSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (validatedFields.success === false) {
      return {
        errorMessage:
          validatedFields.error.flatten().fieldErrors.email ||
          validatedFields.error.flatten().fieldErrors.password,
      };
    }

    const { data } = await $http.post('/v1/apps/login', {
      ...validatedFields.data,
    });

    if (data?.data) {
      return { user: data.data };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        errorMessage: error?.response?.data?.message,
      };
    }
    return {
      errorMessage: 'Something went wrong. Please try again later.',
    };
  }
}
