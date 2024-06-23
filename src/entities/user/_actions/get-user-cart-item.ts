'use server';

import { z } from 'zod';
import { UserId } from '../client';
import { getUserCartItemUseCase } from '../_use-cases/get-item-from-user-cart';
import { cartItemSchema } from '../_domain/shemas';

const propsSchema = z.object({
  userId: z.custom<UserId>().optional(),
  detailId: z.number(),
});

const resultSchema = cartItemSchema.nullable();

export const getUserCartItemAction = async (props: z.infer<typeof propsSchema>) => {
  const { userId, detailId } = propsSchema.parse(props);

  if (!userId) return null;

  const item = await getUserCartItemUseCase.execute({
    userId,
    detailId,
  });
  return resultSchema.parseAsync(item);
};
