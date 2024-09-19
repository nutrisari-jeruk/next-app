import NextAuth, { User } from 'next-auth';
import authConfig from './auth.config';
import { JWT } from 'next-auth/jwt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt: ({ token, user }: { token: JWT; user: User }) => {
      if (user) {
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
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
