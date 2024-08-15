'use server';

import $http from '@/lib/axios';
import { PenyesuaianSchema } from '../schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { PostRequest } from '@/types/penyesuaian';
import { AxiosError } from 'axios';

export async function createPenyesuaian(
  _prevState: unknown,
  formData: FormData,
) {
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

  const requestPenyesuaian: PostRequest = {
    jenis_jurnal: validatedFields.data.jenis_jurnal,
    kode_rekening_id: {
      debit: Number(validatedFields.data.debit),
      credit: Number(validatedFields.data.credit),
    },
  };

  try {
    const { data: result } = await $http.post(
      'http://10.10.12.26:8000/api/v1/masters/journals/adjustment',
      requestPenyesuaian,
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        return {
          message: error.response?.data?.message,
          status: 'error',
        };
      }

      return {
        message: error.message,
        status: 'error',
      };
    }

    return {
      message: 'Something Went Wrong!',
      status: 'error',
    };
  }

  revalidatePath('/master/penyesuaian');
  redirect(
    `/master/penyesuaian?message=${encodeURIComponent('Penyesuaian Created Successfully')}&status=success`,
  );
}
