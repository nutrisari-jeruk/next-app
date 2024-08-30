import $http from '@/lib/axios';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { selectRoleSchema } from '@/lib/zod';
import { authConfig } from '@/auth.config';
import { BaseResponse } from './types/api';
import type { User } from './types/user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        user_id: {},
        role_id: {},
      },
      authorize: async (credentials): Promise<User | null> => {
        const { user_id, role_id } =
          await selectRoleSchema.parseAsync(credentials);

        const { data } = await $http.post<BaseResponse<User>>('v1/user-role', {
          user_id,
          role_id,
        });

        if (!data?.data?.token) return null;
        return data.data;
      },
    }),
  ],
});
