import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      user_role: string;
      access_token: string;
    } & DefaultSession['user'];
  }

  interface User {
    access_token?: string;
    user_role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token?: string;
  }
}
