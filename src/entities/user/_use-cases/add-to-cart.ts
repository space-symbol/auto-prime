import { Prisma } from '@prisma/client';
import { AddToCart } from '../_domain/types';
import { cartRepository } from '../_repositories/cart';
import { BadRequest } from '@/shared/lib/errors';

class AddToCartUseCase {
  async execute(data: Required<AddToCart>) {
    try {
      const cart = await cartRepository.addToActiveCart(data);
      return cart;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequest('Товар уже в корзине');
        }
      } else {
        throw e;
      }
    }
  }
}

export const addToActiveCartUseCase = new AddToCartUseCase();
