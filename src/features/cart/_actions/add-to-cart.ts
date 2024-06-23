'use server';
import { AddToCart } from '@/entities/user/_domain/types';
import { getAppSessionStrictServer } from '@/entities/user/_vm/get-session.server';
import { addToActiveCartUseCase } from '@/entities/user/server';
import { revalidatePath } from 'next/cache';

export const addToActiveCartAction = async (data: AddToCart) => {
  const session = await getAppSessionStrictServer();

  if (!data.quantity) {
    data.quantity = 1;
  }
  const result = await addToActiveCartUseCase.execute({ ...data, userId: session.user.id });
  if (result) {
    revalidatePath('/store');
  }
  return result;
};
