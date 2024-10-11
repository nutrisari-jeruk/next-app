'use server';

import $http from '@/lib/axios';
import { CorrectionSchema } from '@/schemas/master/journal/correction';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { AxiosError } from 'axios';
import type { List, Payload } from '@/types/journal/correction';
import type { Params } from '@/types/params';
import type { BaseResponse } from '@/types/api';
import { Pagination } from '@/types/pagination';
import { setFlash } from '@/lib/flash-toaster';

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

const createJournal = async (_prevState: unknown, formData: FormData) => {
  const validatedFields = CorrectionSchema.safeParse({
    journal_kind: formData.get('journal_kind'),
    //accounts: formData.get('accounts'),
    //accounts : formData.getAll('accounts').map((account) => JSON.parse(account)),
    accounts: JSON.parse(formData.get('accounts') as string),
  });

  if (!validatedFields.success) {
    return {
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const payload: Payload = {
    journal_kind: validatedFields.data.journal_kind,
    accounts: validatedFields.data.accounts.map((item) => {
      return {
        is_credit: item.is_credit,
        sap13_id: item.sap13_id.id,
      };
    }),
  };

  try {
    await $http.post('/v1/masters/journals/correction', payload);
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

  setFlash({
    message: 'Data berhasil disimpan',
    type: 'success',
    tag: new Date().toLocaleString(),
  });

  revalidatePath('/master/journal/correction');
  redirect(`/master/journal/correction`);
};

export { createJournal, fetchList };
