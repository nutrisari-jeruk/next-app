import $http from '@/lib/axios';
import { AxiosError } from 'axios';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET() {
  try {
    const { data } = await $http.get('/v1/user');

    return Response.json(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return Response.json({
        message: error.message,
      });
    }
  }
}
