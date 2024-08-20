'use server';

import $http from '@/lib/axios';
import { UmumSchema} from '../schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { List, PostRequest } from '@/types/umum';
import { AxiosError } from 'axios';
import { Params } from '@/types/params';
import { BaseResponse } from '@/types/api';

const fetchUmumList = async ({
  page,
  rowsPerPage,
  searchField,
  searchValue,
}: Params): Promise<List[] | []> => {
  let list: List[] = [
    {
      id: 23,
      jurnal_kode: 'JP/001',
      jurnal_jenis: 'Jurnal yang Lain',
      kode_rekening: [
        {
          id: 29,
          code: '5.2',
          debit: 'BELANJA MODAL',
          credit: null,
        },
        {
          id: 30,
          code: '7.1.02.01.01',
          debit: null,
          credit:
            'Pendapatan Jasa Layanan dari Entitas Akuntansi/Entitas Pelaporan',
        },
      ],
    },
  ];

  try {
    const { data } = await $http.get<BaseResponse<List[]>>(
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
  redirect(
    `/master/jurnal/umum?toastMessage=${encodeURIComponent('Data Umum Berhasil Dibuat')}&toastStatus=success`,
  );
};

export { createUmum, fetchUmumList };
