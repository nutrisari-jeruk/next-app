'use server';

import $http from '@/lib/axios';
import { redirect } from 'next/navigation';
import { AxiosError } from 'axios';
import { AuthError } from 'next-auth';
import { ZodError } from 'zod';
import { signInSchema } from '@/lib/zod';
import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';
import { User } from '@/types/user';
import { BaseResponse } from '@/types/api';

export async function getUserRole(_currentState: unknown, formData: FormData) {
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

  try {
    const { data } = await $http.post('/v1/apps/login', {
      ...validatedFields.data,
    });

    if (data?.data) {
      return { user: data.data };
    }
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }

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

export async function SelectRole({
  user_id,
  role_id,
}: {
  user_id: string;
  role_id: string;
}): Promise<User | null> {
  let user: User | null = null;

  try {
    const { data } = await $http.post<BaseResponse<User>>('/v1/user-role', {
      user_id,
      role_id,
    });

    user = data?.data!;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw error;
  }

  return user;
}
