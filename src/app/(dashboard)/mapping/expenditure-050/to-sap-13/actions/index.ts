import $http from '@/lib/axios';
import { AxiosError } from 'axios';
import type { BaseResponse } from '@/types/api';
import type { List, Payload } from '@/types/mapping';
import type { Params } from '@/types/params';
import type { Pagination } from '@/types/pagination';
import { MapSchema } from '../schema';

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
  console.log(formData.get('kr050_id'))


  const validatedFields = MapSchema.safeParse({
    kr050_id: formData.get('kr050_id'),
    sap13_id: formData.get('sap13_id'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Map Accounts.',
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

};

export { fetchList, mapOnAccount };
