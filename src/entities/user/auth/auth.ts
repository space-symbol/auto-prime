import NextAuth from 'next-auth';
import prisma from '@shared/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { AdapterUser } from '@auth/core/adapters';
import { Adapter } from 'next-auth/adapters';
import { authConfig } from './auth.config';
import { createUserUseCase } from '../_use-cases/create-user';
import { Roles } from '@prisma/client';
import { routes } from '@/shared/config/routes';

const prismaAdapter = PrismaAdapter(prisma);

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth({
  adapter: {
    ...prismaAdapter,
    createUser: async (user: AdapterUser) => {
      return await createUserUseCase.execute(user);
    },
  } as Adapter,
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: { signIn: routes.authRoutes.signIn },
  callbacks: {
    signIn: ({ profile, user }) => {
      if (profile) {
        profile.role = user.role;
      }
      return true;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.sub!;
      session.user.role = token.role as Roles;
      return session;
    },
  },
  ...authConfig,
});
