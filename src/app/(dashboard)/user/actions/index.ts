'use server';

import { ZodError } from 'zod';
import { UserSchema } from '../schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import $http from '@/lib/axios';
import type { User } from '@/types/user';
import { BaseResponse } from '@/types/api';

export async function fetchUser() {
  const { data } = await $http.get<BaseResponse<User[]>>('/v1/user');
  return data?.data!;
}

export async function createUser(_prevState: unknown, formData: FormData) {
  try {
    const validatedFields = UserSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
      is_active: formData.get('is_active') === 'true',
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create User.',
      };
    }

    // TODO: Add API call to create user
    // TODO: redirect to /user when succeed
    revalidatePath('/user');
    redirect('/user');
  } catch (error) {
    if (error instanceof ZodError) {
      return null;
    }
  }
}
