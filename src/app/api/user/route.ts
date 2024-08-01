import $http from '@/lib/axios';
import { AxiosError } from 'axios';
import type { BaseResponse } from '@/types/api';
import type { User } from '@/types/user';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET() {
  try {
    const { data } = await $http.get<BaseResponse<User[]>>('/v1/address');

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data);
    }

    throw error;
  }
}
