'use server';

import { GeneralSchema } from '@/schemas/master/sap13';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { AxiosError } from 'axios';
import type { List, Payload } from '@/types/sap13/sap13';
import type { Params } from '@/types/params';
import { Pagination } from '@/types/pagination';
import { setFlash } from '@/lib/flash-toaster';
import $fetch from '@/lib/fetch';

const fetchList = async (): Promise<List[]> => {
  let list: List[] = [];

  try {
    //Mock
    const data = await $fetch<List[]>({
      method: 'GET',
      // url: `https://run.mocky.io/v3/adbb2ffa-6ca0-49cb-a214-b1cf386a665c?${urlParams}`,
      url: `/v1/masters/accounts/sap13`,
    });

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

const createSAP13 = async (_prevState: unknown, formData: FormData) => {
  const validatedFields = GeneralSchema.safeParse({
    account_description: formData.get('account_description'),
    parent_id: Number(formData.get('parent_id')),
  });

  if (!validatedFields.success) {
    return {
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const payload: Payload = validatedFields.data;
  try {
    //Mock
    const data = await $fetch({
      method: 'POST',
      // url: `https://run.mocky.io/v3/adbb2ffa-6ca0-49cb-a214-b1cf386a665c`,
      url: `/v1/masters/accounts/sap13`,
      payload: payload,
    });

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

  revalidatePath('/master/sap-13');
  redirect(`/master/sap-13`);
};

export { createSAP13, fetchList };
