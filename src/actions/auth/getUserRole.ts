'use server';

import $http from '@/lib/axios';
import { AxiosError } from 'axios';
import { signInSchema, ssoSignInSchema } from '@/lib/zod';
import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';
import { User } from '@/types/user';
import { BaseResponse } from '@/types/api';

export async function getUserRole(_currentState: unknown, formData: FormData) {
  if (
    formData.get('ssoToken') &&
    !formData.get('email') &&
    !formData.get('password')
  ) {
    return getUserRoleBySSOToken(_currentState, formData);
  }

  return getUserRoleByCredential(_currentState, formData);
}
export async function getUserRoleByCredential(
  _currentState: unknown,
  formData: FormData,
) {
  const validatedFields = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    captcha_token: formData.get('captchaToken'),
  });

  if (validatedFields.success === false) {
    return {
      errorMessage:
        validatedFields.error.flatten().fieldErrors.email ||
        validatedFields.error.flatten().fieldErrors.password ||
        validatedFields.error.flatten().fieldErrors.captcha_token,
    };
  }

  try {
    const { data } = await $http.post('/v1/apps/login', {
      ...validatedFields.data,
    });

    if (data?.data) {
      return { user: data.data };
    }
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }

    if (error instanceof AxiosError) {
      return {
        errorMessage: error?.response?.data?.message,
      };
    }

    return {
      errorMessage: 'Something went wrong. Please try again later.',
    };
  }
}

export async function getUserRoleBySSOToken(
  _currentState: unknown,
  formData: FormData,
) {
  const validatedFields = ssoSignInSchema.safeParse({
    token: formData.get('ssoToken'),
  });

  if (validatedFields.success === false) {
    return {
      errorMessage: validatedFields.error.flatten().fieldErrors.token,
    };
  }

  try {
    const { data } = await $http.post('/v1/sso/login', {
      ...validatedFields.data,
    });

    if (data?.data) {
      return { user: data.data };
    }
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }

    if (error instanceof AxiosError) {
      return {
        errorMessage: error?.response?.data?.message,
      };
    }

    return {
      errorMessage: 'Something went wrong. Please try again later.',
    };
  }
}

export async function SelectRole({
  user_id,
  role_id,
  fiscal_year,
}: {
  user_id: string;
  role_id: string;
  fiscal_year: string;
}): Promise<User | null> {
  let user: User | null = null;

  try {
    const { data } = await $http.post<BaseResponse<User>>('/v1/user-role', {
      user_id,
      role_id,
      fiscal_year,
    });

    user = data?.data!;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw error;
  }

  return user;
}

export async function getFiscalYear(): Promise<number[] | null> {
  let fiscalYear: number[] | null = null;

  try {
    const { data } = await $http.get<BaseResponse<number[]>>(
      'v1/settings/fiscal/year',
    );

    fiscalYear = data?.data!;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw error;
  }

  return fiscalYear;
}
