'use server';

import $http from '@/lib/axios';
import { KoreksiSchema } from '../schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import type { List, Payload } from '@/types/koreksi';
import type { Params } from '@/types/params';
import type { BaseResponse } from '@/types/api';
import { Pagination } from '@/types/pagination';

const fetchKoreksiList = async ({
  page,
  rowsPerPage,
  searchField,
  searchValue,
}: Params): Promise<Pagination<List[]>> => {
  let list: Pagination<List[]> = {
    data: [],
    links: [],
    meta: {
      current_page: 0,
      from: 0,
      last_page: 0,
      path: '',
      per_page: 0,
      to: 0,
      total: 0,
    },
  };

  try {
    const { data } = await $http.get<BaseResponse<Pagination<List[]>>>(
      '/v1/masters/journals/correction',
      {
        params: {
          page: page,
          rowsPerPage: rowsPerPage,
          searchField: searchField,
          searchValue: searchValue,
        },
      },
    );

    if (data.success) {
      list = data?.data!;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return list;
    }
  }

  return list;
};

const createKoreksi = async (_prevState: unknown, formData: FormData) => {
  console.log(formData);
  const validatedFields = KoreksiSchema.safeParse({
    jenis_jurnal: formData.get('jenis_jurnal'),
    debit: formData.get('debit'),
    credit: formData.get('credit'),
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const requestKoreksi: Payload = {
    jenis_jurnal: validatedFields.data.jenis_jurnal,
    kode_rekening_id: {
      debit: Number(validatedFields.data.debit),
      credit: Number(validatedFields.data.credit),
    },
  };

  try {
    const { data: result } = await $http.post(
      '/v1/masters/journals/correction',
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
      message: 'Telah Terjadi Kesalahan Silahkan Hubungi Administrator IT!',
      status: 'error',
    };
  }

  const session = cookies();
  session.set('toastMessage', 'Data Koreksi Berhasil Dibuat');
  session.set('toastStatus', 'success');

  revalidatePath('/master/jurnal/koreksi');
  redirect(`/master/jurnal/koreksi`);
};

export { createKoreksi, fetchKoreksiList };
