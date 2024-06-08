'use server';
import { removeFromCartUseCase } from '@/entities/user/_use-cases/remove-from-cart';
import { getAppSessionServer } from '@/entities/user/server';
import { NeedAuthError } from '@/shared/lib/errors';

export const removeFromCartAction = async (detailId: number) => {
  const session = await getAppSessionServer();

  if (!session?.user.id) {
    throw new NeedAuthError('Необходимо авторизоваться');
  }
  return removeFromCartUseCase.execute(session.user.id, detailId);
};
