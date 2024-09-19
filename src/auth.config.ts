import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { selectRoleSchema } from './lib/zod';
import { SelectRole } from './actions/auth/getUserRole';

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedFields = selectRoleSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { user_id, role_id } = validatedFields.data!;
          const user = await SelectRole({ user_id, role_id });
          if (!user) return null;

          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
