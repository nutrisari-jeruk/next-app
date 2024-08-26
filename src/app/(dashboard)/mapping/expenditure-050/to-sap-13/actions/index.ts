'use server';

import $http from '@/lib/axios';
import { AxiosError } from 'axios';
import type { BaseResponse } from '@/types/api';
import type { List, Payload } from '@/types/mapping';
import type { Params } from '@/types/params';
import type { Pagination } from '@/types/pagination';
import { MapSchema } from '../schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
      '/v1/mappings/expenditure-050/expenditure-sap13',
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

const mapOnAccount = async (__prevState: unknown, formData: FormData) => {
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
    await $http.post('/v1/mappings/expenditure-050/expenditure-sap13', payload);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        return {
          message: error.response?.data?.message,
        };
      }

      return {
        message: 'Failed to map on account',
      };
    }
  }
  revalidatePath('/mapping/expenditure-050/to-sap-13');
  redirect('/mapping/expenditure-050/to-sap-13');
};

export { fetchList, mapOnAccount };
