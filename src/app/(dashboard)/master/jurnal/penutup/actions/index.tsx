'use server';

import $http from '@/lib/axios';
import { PenutupSchema} from '../schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { AxiosError } from 'axios';
import type { List, PostRequest } from '@/types/penutup';
import type { Params } from '@/types/params';
import type { BaseResponse } from '@/types/api';
import { Pagination } from '@/types/pagination';


const fetchPenutupList = async ({
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
      '/v1/masters/journals/closing',
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

const createPenutup = async (_prevState: unknown, formData: FormData) => {
  const validatedFields = PenutupSchema.safeParse({
    jenis_journal_kind: formData.get('jenis_journal_kind'),
    debit: formData.get('debit'),
    credit: formData.get('credit'),
  });

  if (!validatedFields.success) {
    return {
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const requestPenutup: PostRequest = {
    jenis_journal_kind: validatedFields.data.jenis_journal_kind,
    accounts_id: {
      debit: Number(validatedFields.data.debit),
      credit: Number(validatedFields.data.credit),
    },
  };

  try {
    await $http.post(
      '/v1/masters/journals/closing',
      requestPenutup,
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

  revalidatePath('/master/journal_kind/penutup');
  redirect(`/master/journal_kind/penutup`);
};

export { createPenutup, fetchPenutupList };
