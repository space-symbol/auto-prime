'use server';
import { auth } from '@/entities/user/auth/auth';
import { NeedAuthError } from '@/shared/lib/errors';

export const getAppSessionServer = () => auth();
export const getAppSessionStrictServer = async () => {
  const session = await getAppSessionServer();
  if (session === null) {
    throw new NeedAuthError();
  }
  return session;
};
