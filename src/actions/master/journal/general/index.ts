'use server';

import { GeneralSchema } from '@/schemas/master/journal/general';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { AxiosError } from 'axios';
import type { List, Payload } from '@/types/journal/general';
import type { Params } from '@/types/params';
import { Pagination } from '@/types/pagination';
import { setFlash } from '@/lib/flash-toaster';
import $fetch from '@/lib/fetch';

const fetchList = async ({
  page = '1',
  rowsPerPage = '10',
  searchField = 'journal_kind',
  searchValue = '',
}: Params): Promise<Pagination<List[]>> => {
  const params = {
    page: page,
    rowsPerPage: rowsPerPage,
    searchField: searchField,
    searchValue: searchValue,
  };
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
    const urlParams = new URLSearchParams(params).toString();
    const data = await $fetch<Pagination<List[]>>({
      method: 'GET',
      url: `/v1/masters/journals/general?${urlParams}`,
    });

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
  const validatedFields = GeneralSchema.safeParse({
    journal_kind: formData.get('journal_kind'),
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
    const data = await $fetch({
      method: 'POST',
      url: `/v1/masters/journals/general`,
      payload: payload,
    });
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

  revalidatePath('/master/journal/general');
  redirect(`/master/journal/general`);
};

export { createJournal, fetchList };
