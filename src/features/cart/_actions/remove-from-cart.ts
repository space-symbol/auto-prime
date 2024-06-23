'use server';
import { getAppSessionStrictServer } from '@/entities/user/_vm/get-session.server';
import { removeFromCartUseCase } from '@/entities/user/server';
import { revalidatePath } from 'next/cache';

export const removeFromCartAction = async (itemId: number) => {
  const session = await getAppSessionStrictServer();
  const result = await removeFromCartUseCase.execute({ session, itemId });
  if (result) {
    revalidatePath('/store');
  }
  return result;
};
