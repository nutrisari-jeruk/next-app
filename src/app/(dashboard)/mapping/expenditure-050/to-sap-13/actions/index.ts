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
}: Params): Promise<List[] | []> => {
  let list: List[] = [
    {
      kr050_id: 1,
      account_050: 'asd',
      sap13_id: 1,
      account_sap13: 'zxc',
    },
    {
      kr050_id: 2,
      account_050: 'qwe',
      sap13_id: 2,
      account_sap13: 'uio',
    },
  ];

  try {
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

export { fetchList };
