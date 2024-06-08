import prisma from '@shared/lib/db';
import { AddToCart, CartEntity, UserEntity } from '../_domain/types';
import { Prisma } from '@prisma/client';
class UserRepository {
  async createUser(user: UserEntity) {
    const newUser = await prisma.user.create({ data: user });
    prisma.cart.create({
      data: {
        userId: newUser.id,
      },
    });

    return newUser;
  }
  async getUserCart(userId: string) {
    return await prisma.$queryRaw<CartEntity>(
      Prisma.sql`select 
    cart_items.*, 
    details.*, 
    sum(round(
            (case 
                when "discountPercentage" is null or "discountPercentage" = 0 
                then price * quantity 
                else "priceAfterDiscount" * quantity 
             end)::numeric, 2)::float
    ) over (partition by carts.id) as total 
from 
    carts 
join 
    cart_items on carts.id = cart_items."cartId" 
join 
    details on cart_items."detailId" = details.id 
where 
    carts."userId" = ${userId};`,
    );
  }
  async addToCart(data: Required<AddToCart>) {
    let userCartId = (
      await prisma.cart.findFirst({
        where: {
          AND: {
            userId: data.userId,
            isActive: true,
          },
        },
        select: {
          id: true,
        },
      })
    )?.id;

    if (!userCartId) {
      userCartId = (
        await prisma.cart.create({
          data: {
            userId: data.userId,
          },
          select: {
            id: true,
          },
        })
      ).id;
    }
    const { userId, ...itemData } = data;

    return prisma.cartItem.create({
      data: {
        cartId: userCartId,
        ...itemData,
      },
    });
  }

  async removeFromCart(userId: string, detailId: number) {
    const userCartId = await prisma.cart.findFirst({
      where: {
        AND: {
          userId,
          isActive: true,
        },
      },
    });

    if (!userCartId) {
      return;
    }

    return prisma.cartItem.delete({
      where: {
        cartId_detailId: {
          cartId: userCartId.id,
          detailId,
        },
      },
    });
  }
}

export const userRepository = new UserRepository();
