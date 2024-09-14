'use server';

import $http from '@/lib/axios';
import { UmumSchema} from '../schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { AxiosError } from 'axios';
import type { List, PostRequest } from '@/types/umum';
import type { Params } from '@/types/params';
import type { BaseResponse } from '@/types/api';
import { Pagination } from '@/types/pagination';


const fetchUmumList = async ({
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
      '/v1/masters/journals/general',
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

// export default async function fetchUmumList({
//   page,
//   rowsPerPage,
//   searchField,
//   searchValue,
// }: Params): Promise<Pagination<List[]>> {
//   let list: Pagination<List[]> = {
//     data: [],
//     links: [],
//     meta: {
//       current_page: 0,
//       from: 0,
//       last_page: 0,
//       path: '',
//       per_page: 0,
//       to: 0,
//       total: 0,
//     },
//   };

//   try {
//     const { data } = await $http.get<BaseResponse<Pagination<List[]>>>(
//       '/v1/masters/journals/general',
//       {
//         params: {
//           page: page,
//           rowsPerPage: rowsPerPage,
//           searchField: searchField,
//           searchValue: searchValue,
//         },
//       },
//     );

//     if (data.success) {
//       list = data?.data!;
//     }
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       return list;
//     }
//   }

//   return list;
// }

const createUmum = async (_prevState: unknown, formData: FormData) => {
  const validatedFields = UmumSchema.safeParse({
    jenis_jurnal: formData.get('jenis_jurnal'),
    debit: formData.get('debit'),
    credit: formData.get('credit'),
  });

  if (!validatedFields.success) {
    return {
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const requestUmum: PostRequest = {
    jenis_jurnal: validatedFields.data.jenis_jurnal,
    kode_rekening_id: {
      debit: Number(validatedFields.data.debit),
      credit: Number(validatedFields.data.credit),
    },
  };

  try {
    await $http.post(
      '/v1/masters/journals/general',
      requestUmum,
    );
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
      message: 'Telah Terjadi Kesalahan Silahkan Hubungi Administrator IT!',
      status: 'error',
    };
  }

  revalidatePath('/master/jurnal/umum');
  redirect(`/master/jurnal/umum`);
};

export { createUmum, fetchUmumList };
