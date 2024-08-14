'use server';

import $http from '@/lib/axios';
import { ZodError } from 'zod';
import { PenyesuaianSchema } from '../schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createPenyesuaian(
  _prevState: unknown,
  formData: FormData,
) {
  console.log(formData);

  const validatedFields = PenyesuaianSchema.safeParse({
    jenis_jurnal: formData.get('jenis_jurnal'),
    debit: formData.get('debit'),
    credit: formData.get('credit'),
  });

  if (!validatedFields.success) {
    return {
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // try {
  //   const result = await $http.post(
  //     'http://10.10.12.26:8000/api/v1/masters/journals/adjustments',
  //     validatedFields.data,
  //   );

  //   console.log(result);
  // } catch (error) {
  //   console.log(error);
  // }

  // revalidatePath('/master/penyesuaian');
  // redirect('/master/penyesuaian');
}
