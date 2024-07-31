import $http from '@/lib/axios';
import { AxiosError } from 'axios';
import type { BaseResponse } from '@/types/api';
import type { User } from '@/types/user';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET() {
  try {
    const { data } = await $http.get<BaseResponse<User[]>>('/v1/contact_point');

    return Response.json(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data);
    }

    throw error;
  }
}
