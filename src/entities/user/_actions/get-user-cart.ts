'use server';
import { NeedAuthError } from '@/shared/lib/errors';
import { getAppSessionServer } from '../_vm/get-app-session.server';
import { getUserCartUseCase } from '../_use-cases/get-user-cart';

export const getUserCartAction = async () => {
  const session = await getAppSessionServer();
  if (!session?.user.id) {
    throw new NeedAuthError('Необходима авторизация');
  }
  return getUserCartUseCase.execute(session?.user.id);
};
