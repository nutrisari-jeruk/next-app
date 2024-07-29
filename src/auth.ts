import $http from '@/lib/axios';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { Credentials as ResponseCredentials } from '@/types/auth';
import { signInSchema } from './lib/zod';
import { authConfig } from './auth.config';

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        const { data } = await $http.post<ResponseCredentials>('/v1/login', {
          email,
          password,
        });

        if (!!data.access_token) return data;
        return null;
      },
    }),
  ],
});
