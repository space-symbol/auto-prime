'use server';
import { z } from 'zod';
import { getUserCartUseCase } from '../_use-cases/get-user-cart';
import { getAppSessionStrictServer } from '../_vm/get-session.server';
import { formatDetail } from '@/shared/lib/formatDetail';
import { UserId } from '../_domain/types';
import { cartItemSchema } from '../_domain/shemas';
import { detailEntityWithDiscountsScema } from '@/entities/detail/_domain/schemas';

const propsSchema = z.object({
  userId: z.custom<UserId>(),
});

const resultSchema = z
  .object({
    totalPrice: z.number(),
    items: cartItemSchema
      .extend({
        detail: detailEntityWithDiscountsScema,
      })
      .array()
      .nullable(),
  })
  .nullable();

export const getUserCartAction = async (props: z.infer<typeof propsSchema>) => {
  const { userId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const cart = await getUserCartUseCase.execute({
    userId,
    session,
  });

  if (!cart) {
    return null;
  }

  const { items, totalPrice, ...rest } = cart;
  const formattedCart = {
    ...rest,
    totalPrice: totalPrice.toNumber(),
    items: items.map((item) => {
      const { detail, ...rest } = item;
      return {
        ...rest,
        detail: formatDetail(detail),
      };
    }),
  };

  return resultSchema.parseAsync(formattedCart);
};
