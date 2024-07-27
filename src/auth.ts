import $http from '@/lib/axios';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { Credentials as ResponseCredentials } from '@/types/auth';
import { signInSchema } from './lib/zod';
import { ZodError } from 'zod';
import { authConfig } from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
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
        let user = null;

        const { email, password } = await signInSchema.parseAsync(credentials);

        const { data } = await $http.post<ResponseCredentials>('/v1/login', {
          email,
          password,
        });

        if (!data.access_token) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error('User not found.');
        }

        user = data;

        return user;
      },
    }),
  ],
});
