import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import type { User as UserType } from '@/types/user';

declare module 'next-auth' {
  interface Session {
    user: UserType & DefaultSession['user'];
  }

  interface User extends UserType {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: UserType;
  }
}
