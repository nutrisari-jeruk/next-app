'use server';

import $fetch from '@/lib/fetch';
import { List, Params } from '@/types/journal-entry/general';
import { Pagination } from '@/types/pagination';
import dayjs from 'dayjs';

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
export { fetchList };
