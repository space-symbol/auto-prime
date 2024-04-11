import NextAuth from 'next-auth';
import prisma from '@shared/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { AdapterUser } from '@auth/core/adapters';
import { createUserUseCase } from '@entities/user/_use-case/create-user';
import { Adapter } from 'next-auth/adapters';

const prismaAdapter = PrismaAdapter(prisma);

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: {
    ...prismaAdapter,
    createUser: async (user: AdapterUser) => {
      return await createUserUseCase.exec(user);
    },
  } as Adapter,
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/store/auth/sign-in',
  },
  callbacks: {
    signIn: ({ profile, user }) => {
      // @ts-ignore
      profile.role = user.role;
      return true;
    },
    jwt: ({ user, token }) => {
      if (user) token.role = user.role;
      return token;
    },
    session: ({ session, token }) => {
      // @ts-ignore
      session.user.role = token.role;
      // @ts-ignore
      session.user.id = token.sub;
      return session;
    },
  },
  ...authConfig,
});
