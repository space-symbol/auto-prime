import NextAuth from 'next-auth';
import prisma from '@shared/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { AdapterUser } from '@auth/core/adapters';
import { Adapter } from 'next-auth/adapters';
import authConfig from '../auth.config';
import { createUserUseCase } from '../_use-cases/create-user';

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
  pages: { signIn: '/store/auth/sign-in' },
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
      session.user.id = token.sub;
      // @ts-ignore
      session.user.role = token.role;
      return session;
    },
  },
  ...authConfig,
});
