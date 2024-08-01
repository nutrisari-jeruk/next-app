'use server';

import { ZodError } from 'zod';
import { UserSchema } from '../schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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

    revalidatePath('/dashboard/user');
    redirect('/dashboard/user');
  } catch (error) {
    if (error instanceof ZodError) {
      return null;
    }
  }
}
