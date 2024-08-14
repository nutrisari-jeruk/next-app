'use server';

import $http from '@/lib/axios';
import { ZodError } from 'zod';
import { UmumSchema } from '../schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import type { Request as UmumRequest } from '@/types/umum';

export async function createUmum(requestData: UmumRequest) {
  try {
    console.log(requestData);
    const validatedFields = UmumSchema.safeParse({
      jenis_jurnal: requestData.jenis_jurnal,
      kode_rekening: requestData.kode_rekening_id,
    });
    console.log(validatedFields);
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Umum.',
      };
    }

    // TODO: Add API call to create user
    // TODO: redirect to /user when succeed
    revalidatePath('/master/umum');
    redirect('/master/umum');
  } catch (error) {
    if (error instanceof ZodError) {
      return null;
    }
  }
}