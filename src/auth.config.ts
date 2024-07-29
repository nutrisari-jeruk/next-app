import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth }) {
      const isLoggedIn = !!auth?.user;
console.log(auth);

      if (isLoggedIn) return true;
      return false; // Redirect unauthenticated users to login page
    },
    session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
