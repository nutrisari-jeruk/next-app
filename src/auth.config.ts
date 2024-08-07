import type { NextAuthConfig, Session } from 'next-auth';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface User {
    access_token?: string;
    role?: string;
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
        token.role = user.role;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.accessToken = token.accessToken as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
