import { redirect } from 'next/navigation';
import type { NextAuthConfig, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/role-select',
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized: ({ auth }) => {
      return !!auth;
    },
    jwt: ({ token, user }: { token: JWT; user: User }) => {
      if (user) {
        console.log(user);
        token.id = user.id as string;
        token.name = user.name as string;
        token.role = user.role as string;
        token.role_id = user.role_id as string;
        token.token = user.token as string;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        session.user.role_id = token.role_id as string;
        session.user.token = token.token as string;
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
