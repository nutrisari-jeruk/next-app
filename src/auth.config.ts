import { redirect } from 'next/navigation';
import type { NextAuthConfig, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized:  ({ auth }) => {
      return !!auth
    },
    jwt: ({ token, user }: { token: JWT; user: User }) => {
      if (user) {
        token.access_token = user.access_token!;
        token.user_role = user.user_role!;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.access_token = token.access_token as string;
        session.user.user_role = token.user_role as string;
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
