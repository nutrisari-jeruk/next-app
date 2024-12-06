'use server';

import $fetch from '@/lib/fetch';
import { BaseResponse } from '@/types/api';
import { List } from '@/types/report/reports';

const fetchList = async (fiscalyear: string): Promise<List[]> => {
  let list: List[] = [];

  const data = await $fetch<List[]>({
    method: 'GET',
    url: `/v1/masters/reports?fiscal_year=${fiscalyear}`,
  });

  if (data.success) {
    list = data.data!;
  }

  return list;
};

export { fetchList };
