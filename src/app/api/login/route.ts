import $http from '@/lib/axios';
import { AxiosError } from 'axios';
import type { Credentials as ResponseCredentials } from '@/types/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log(await request.json());

    const { data } = await $http.post<ResponseCredentials>('/v1/login', {
      ...await request.json(),
    });

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json(error.response?.data);
    }
  }
}
