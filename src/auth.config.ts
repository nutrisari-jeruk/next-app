import type { NextAuthConfig, Session } from 'next-auth';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      access_token: string;
    } & DefaultSession['user'];
  }

  interface User {
    access_token?: string;
  }
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ auth }) => {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) return true;
      return false; // Redirect unauthenticated users to login page
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.accessToken = user.access_token;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.access_token =
          token.accessToken as Session['user']['access_token'];
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
