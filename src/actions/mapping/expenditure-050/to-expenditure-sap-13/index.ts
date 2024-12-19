'use server';

import $fetch from '@/lib/fetch';
import { MapSchema } from '@/schemas/expenditure-050/to-expenditure-sap-13';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { setFlash } from '@/lib/flash-toaster';
import type { List, Payload } from '@/types/mapping';
import type { Params } from '@/types/params';
import type { Pagination } from '@/types/pagination';

const fetchList = async ({
  page = '1',
  rowsPerPage = '10',
  searchField = 'account_050',
  searchValue = '',
  mapping = '-1',
}: Params): Promise<Pagination<List[]>> => {
  const params = {
    page: page,
    rowsPerPage: rowsPerPage,
    searchField: searchField,
    searchValue: searchValue,
    mapping: mapping,
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
    url: `/v1/mappings/expenditure-050/expenditure-sap13?${urlParams}`,
  });

  if (data.success) {
    list = data?.data!;
  }

  return list;
};

const mapOnAccount = async (_prevState: unknown, formData: FormData) => {
  const id = formData.get('id');
  const page = formData.get('page') || '1';
  const mapping = formData.get('mapping') || '-1';

  const validatedFields = MapSchema.safeParse({
    kr050_id: Number(formData.get('kr050_id')),
    sap13_id: Number(formData.get('sap13_id')),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to map on account',
    };
  }

  const payload: Payload = {
    data: [
      {
        label: 'kr050_id',
        value: validatedFields.data.kr050_id,
      },
      {
        label: 'sap13_id',
        value: validatedFields.data.sap13_id,
      },
    ],
  };

  try {
    if (!!id) {
      await $fetch({
        url: `/v1/mappings/expenditure-050/expenditure-sap13/${id}`,
        method: 'PUT',
        payload: payload,
      });
    } else {
      await $fetch({
        url: '/v1/mappings/expenditure-050/expenditure-sap13',
        method: 'POST',
        payload: payload,
      });
    }
  } catch (error) {
    return {
      message: 'Failed to map on account',
    };
  }

  setFlash({
    type: 'success',
    message: 'Data berhasil disimpan',
    tag: new Date().toLocaleString(),
  });
  revalidatePath(
    `/mapping/expenditure-050/to-expenditure-sap-13?mapping=${mapping}&page=${page}`,
  );
  redirect(
    `/mapping/expenditure-050/to-expenditure-sap-13?mapping=${mapping}&page=${page}`,
  );
};

export { fetchList, mapOnAccount };
