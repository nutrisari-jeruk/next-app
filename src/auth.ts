import $http from '@/lib/axios';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { Credentials as ResponseCredentials } from '@/types/auth';
import { signInSchema } from './lib/zod';
import { authConfig } from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<ResponseCredentials | null> => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        const { data } = await $http.post<ResponseCredentials>('/v1/login', {
          email,
          password,
        });

        if (!data.access_token) return null;
        return data;
      },
    }),
  ],
});
