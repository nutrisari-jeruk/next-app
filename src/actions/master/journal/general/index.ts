'use server';

import $http from '@/lib/axios';
import { UmumSchema } from '@/schemas/master/journal/general';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { AxiosError } from 'axios';
import type { List, Payload } from '@/types/journal/general';
import type { Params } from '@/types/params';
import type { BaseResponse } from '@/types/api';
import { Pagination } from '@/types/pagination';

const fetchList = async ({
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
      '/v1/masters/journals/general',
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

const createJournal = async (_prevState: unknown, formData: FormData) => {
  const validatedFields = UmumSchema.safeParse({
    jenis_jurnal: formData.get('jenis_jurnal'),
    kode_rekening_id: JSON.parse(formData.get('kode_rekening_id') as string),
  });



  if (!validatedFields.success) {
    return {
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const payload: Payload = {
    jenis_jurnal: validatedFields.data.jenis_jurnal,
    kode_rekening_list: validatedFields.data.kode_rekening_id.map(item => {
      return {
        is_credit: item.is_credit,
        sap13_id: item.sap13_id.id,
      };
    }),
  };

  try {
    await $http.post('/v1/masters/journals/general', payload);
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
      message: 'Internal Server Error',
      status: 'error',
    };
  }

  revalidatePath('/master/journal/general');
  redirect(`/master/journal/general`);
};

export { createJournal, fetchList };
