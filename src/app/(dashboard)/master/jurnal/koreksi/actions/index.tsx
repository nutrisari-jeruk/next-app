'use server';

import $http from '@/lib/axios';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { AxiosError } from 'axios';
import { KoreksiSchema } from '../schema';
import { PostRequest } from '@/types/penyesuaian';

export async function createKoreksi(
  _prevState: unknown,
  formData: FormData,
) {
  const validatedFields = KoreksiSchema.safeParse({
    jenis_jurnal: formData.get('jenis_jurnal'),
    debit: formData.get('debit'),
    credit: formData.get('credit'),
  });

  if (!validatedFields.success) {
    return {
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const requestKoreksi: PostRequest = {
    jenis_jurnal: validatedFields.data.jenis_jurnal,
    kode_rekening_id: {
      debit: Number(validatedFields.data.debit),
      credit: Number(validatedFields.data.credit),
    },
  };

  console.log(requestKoreksi);

  try {
    const { data: result } = await $http.post(
     // 'http://10.10.12.26:8000/api/v1/masters/journals/adjustment',
      'http://10.10.12.26:8000/api/v1/masters/journals/correction',
      requestKoreksi,
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

  revalidatePath('/master/jurnal/koreksi');
  redirect(
    `/master/jurnal/koreksi?message=${encodeURIComponent('Koreksi Created Successfully')}&status=success`,
  );
}
