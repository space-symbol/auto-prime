import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter, AdapterUser } from 'next-auth/adapters';
import { authConfig } from './auth.config';
import { Roles } from '@prisma/client';
import { routes } from '@/shared/config/routes';
import prisma from '@/shared/lib/db';
import { createUserUseCase } from '../server';

const prismaAdapter = PrismaAdapter(prisma);

export const {
  auth,
  handlers: { GET, POST },
  unstable_update: updateSession,
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
    jwt: ({ token, user, session, trigger }) => {
      if (trigger === 'update' && session) {
        token = {
          ...token,
          picture: session.user.image,
          ...session.user,
        };
      }

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
