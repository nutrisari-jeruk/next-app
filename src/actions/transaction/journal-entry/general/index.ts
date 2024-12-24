'use server';

import $http from '@/lib/axios';
import $fetch from '@/lib/fetch';
import { setFlash } from '@/lib/flash-toaster';
import { GeneralEntrySchema } from '@/schemas/transaction/journal-entry/general';
import {
  JournalKindAutoComplete,
  List,
  Params,
  Payload,
} from '@/types/journal-entry/general';
import { Pagination } from '@/types/pagination';
import { AxiosError, formToJSON } from 'axios';
import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const fetchList = async ({
  page = '1',
  rowsPerPage = '10',
  searchField = 'description',
  searchValue = '',
  period = dayjs().format('YYYY-MM'),
}: Params): Promise<Pagination<List[]>> => {
  const params = {
    page: page,
    rowsPerPage: rowsPerPage,
    searchField: searchField,
    searchValue: searchValue,
    period: period,
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

  const urlParams = new URLSearchParams(params).toString();
  const data = await $fetch<Pagination<List[]>>({
    method: 'GET',
    url: `/v1/transactions/journal-entries/general?${urlParams}`,
  });

  if (data.success) {
    list = data?.data!;
  }

  return list;
};

const journalKindAutoComplete = async (
  journal_kind: string = '',
): Promise<JournalKindAutoComplete[]> => {
  const params = {
    journal_kind,
  };

  const urlParams = new URLSearchParams(params).toString();
  const data = await $fetch<JournalKindAutoComplete[]>({
    method: 'GET',
    url: `/v1/masters/journals/general/autocomplete?${urlParams}`,
  });

  let options: JournalKindAutoComplete[] = [];

  if (data.success) {
    options = data.data!;
  }

  return options;
};

const createJournalEntry = async (_prevState: unknown, formData: FormData) => {
  const validatedFields = GeneralEntrySchema.safeParse({
    transaction_date: formData.get('transaction_date'),
    journal_id: Number(formData.get('journal_id')),
    descriptions: formData.get('descriptions'),
    accounts: JSON.parse(formData.get('accounts') as string),
  });

  if (!validatedFields.success) {
    return {
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const payload: Payload = validatedFields.data;

  try {
    await $http.post('/v1/transactions/journal-entries/general', payload);
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
  revalidatePath('/transaction/journal-entry/general');
  redirect(`/transaction/journal-entry/general`);
};

export { fetchList, journalKindAutoComplete, createJournalEntry };
