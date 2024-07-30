import type { NextAuthConfig, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
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
    authorized({ auth }) {
      const isLoggedIn = !!auth?.user;

      if (isLoggedIn) return true;
      return false; // Redirect unauthenticated users to login page
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
      };
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
