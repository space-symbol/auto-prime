import prisma from '@shared/lib/db';
import { AddToCart, UserId } from '../_domain/types';

class CartRepository {
  async getCart(userId: UserId) {
    return prisma.cart.findFirst({
      where: {
        userId,
        isActive: true,
      },
      include: {
        items: {
          select: {
            id: true,
            quantity: true,
            detail: {
              include: {
                discounts: true,
              },
            },
          },
        },
      },
    });
  }

  async addToActiveCart(data: Required<AddToCart>) {
    let userCartId = (
      await prisma.cart.upsert({
        where: {
          active_user_cart: {
            userId: data.userId,
            isActive: true,
          },
        },
        create: {
          userId: data.userId,
        },
        update: {},
        select: {
          id: true,
        },
      })
    ).id;

    const { userId, ...rest } = data;

    const item = await prisma.cartItem.create({
      data: {
        cartId: userCartId,
        ...rest,
      },
      include: {
        detail: true,
      },
    });

    if (item.detail.discountedPrice) {
      const newDetail = await prisma.cart.update({
        where: {
          id: userCartId,
        },
        data: {
          totalPrice: {
            increment: item.detail.discountedPrice.mul(item.quantity),
          },
        },
      });
      return newDetail;
    }

    const newDetail = await prisma.cart.update({
      where: {
        id: userCartId,
      },
      data: {
        totalPrice: {
          increment: item.detail.price.mul(item.quantity),
        },
      },
    });
    return newDetail;
  }

  async removeFromActiveCart(userId: UserId, itemId: number) {
    const existingCartItem = await prisma.cart.findUnique({
      where: {
        active_user_cart: {
          isActive: true,
          userId: userId,
        },
        AND: {
          items: {
            some: {
              id: itemId,
            },
          },
        },
      },
      select: {
        items: {
          where: {
            id: itemId,
          },
        },
      },
    });

    if (!existingCartItem) {
      return;
    }
    return prisma.cartItem.delete({
      where: {
        id: existingCartItem.items[0].id,
      },
    });
  }

  async getUserCartItem(userId: UserId, detailId: number) {
    const existingCartItem = await prisma.cart.findUnique({
      where: {
        active_user_cart: {
          isActive: true,
          userId: userId,
        },
        AND: {
          items: {
            some: {
              detailId: detailId,
            },
          },
        },
      },
      select: {
        items: {
          where: {
            detailId: detailId,
          },
        },
      },
    });

    if (!existingCartItem) return null;
    return existingCartItem.items[0];
  }
}

export const cartRepository = new CartRepository();
