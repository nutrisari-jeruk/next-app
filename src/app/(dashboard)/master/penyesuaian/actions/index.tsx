'use server';

import $http from '@/lib/axios';
import { ZodError } from 'zod';
import { PenyesuaianSchema } from '../schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import type {
  Request as PenyesuaianRequest,
  List as PenyesuaianList,
} from '@/types/penyesuaian';
import { BaseResponse } from '@/types/api';
import { Params } from '@/types/params';

export async function fetchUser({
  query = '',
  page = 1,
  perPage = 10,
}: Params): Promise<PenyesuaianList[]> {
  const params = { query, page, perPage };

  const { data } = await $http.get<BaseResponse<PenyesuaianList[]>>(
    '/v1/user',
    {
      params,
    },
  );
  return data?.data!;
}

export async function createPenyesuaian(requestData: PenyesuaianRequest) {
  try {
    const validatedFields = PenyesuaianSchema.safeParse({
      jenis_jurnal: requestData.jenis_jurnal,
      kode_rekening_id: requestData.kode_rekening_id,
    });

    if (!validatedFields.success) {
      // Menyiapkan objek errorMessage dengan default empty string
      const errorMessage = { jenis: '', debit: '', credit: '' };

      // Mengambil dan memproses semua errors dari Zod
      validatedFields.error.errors.forEach((error) => {
        const field = error.path.join('.'); // Mengubah path error menjadi string, contohnya 'kode_rekening_id.debit'
        switch (field) {
          case 'jenis_jurnal':
            errorMessage.jenis = error.message;
            break;
          case 'kode_rekening_id.debit':
            errorMessage.debit = error.message;
            break;
          case 'kode_rekening_id.credit':
            errorMessage.credit = error.message;
            break;
          default:
            // Tangani kasus lain jika ada
            break;
        }
      });

      // Mengembalikan errorMessage dan pesan tambahan jika diperlukan
      return {
        errors: errorMessage,
        message: 'Missing Fields. Failed to Create Penyesuaian.',
      };
    }
    // await $http.post(
    //   'http://10.10.12.26/api_accountancy/public/api/v1/masters/journals/adjustment',
    //   validatedFields.data,
    // );

    // Redirect ke halaman /master/penyesuaian setelah berhasil
    // redirect('/master/penyesuaian');
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        errors: error.flatten().fieldErrors,
        message: 'Validation Error. Failed to Create Penyesuaian.',
      };
    }

    return {
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
