import { auth } from '@/auth';
import { BaseResponse } from '@/types/api';
const $fetch = async <T>({
  url = '',
  method,
  payload = undefined,
  init = {},
}: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: Record<string, any>;
  init?: RequestInit;
}): Promise<BaseResponse<T>> => {
  const session = await auth();
  const token = session?.user?.token;
  init = { ...init };

  if (token) {
    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...(!!init.headers && init.headers),
    },
    ...(!!payload && { body: JSON.stringify(payload) }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  if (response.status === 403) {
    throw new Error('Forbidden');
  }

  return await response.json();
};

export { $fetch };
export default $fetch;
