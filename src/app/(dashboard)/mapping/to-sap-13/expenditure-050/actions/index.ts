import $http from '@/lib/axios';
import { AxiosError } from 'axios';

import type { BaseResponse } from '@/types/api';
import type { List } from '@/types/mapping';
import type { Params } from '@/types/params';

const fetchList = async ({
  page,
  rowsPerPage,
  searchField,
  searchValue,
}: Params): Promise<List[]> => {
  const { data } = await $http.get<BaseResponse<List[]>>(
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

  if (!data.success) {
    return [];
  }

  return data?.data!;
};

export { fetchList };
