'use server';
import { AddToCart } from '@/entities/user/_domain/types';
import { addToCartUseCase } from '@/entities/user/_use-cases/add-to-cart';
import { getAppSessionServer } from '@/entities/user/server';
import { BadRequest, NeedAuthError } from '@/shared/lib/errors';
import { Prisma } from '@prisma/client';

export const addToCartAction = async (data: AddToCart) => {
  const session = await getAppSessionServer();
  if (!session?.user.id) {
    throw new NeedAuthError('Необходимо авторизоваться');
  }
  if (!data.quantity) {
    data.quantity = 1;
  }
  try {
    return addToCartUseCase.execute({ ...data, userId: session.user.id });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        throw new BadRequest('Товар уже добавлен в корзину');
      }
    } else {
      throw e;
    }
  }
};
