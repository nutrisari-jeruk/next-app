'use server';

import $http from '@/lib/axios';
import { ZodError } from 'zod';
import { PenyesuaianSchema } from '../schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import type { Request as PenyesuaianRequest } from '@/types/penyesuaian';

export async function createPenyesuaian(requestData: PenyesuaianRequest) {
  try {
    console.log(requestData);
    const validatedFields = PenyesuaianSchema.safeParse({
      jenis_jurnal: requestData.jenis_jurnal,
      kode_rekening: requestData.kode_rekening_id,
    });
    console.log(validatedFields);
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Penyesuaian.',
      };
    }

    // TODO: Add API call to create user
    // TODO: redirect to /user when succeed
    revalidatePath('/master/penyesuaian');
    redirect('/master/penyesuaian');
  } catch (error) {
    if (error instanceof ZodError) {
      return null;
    }
  }
}
