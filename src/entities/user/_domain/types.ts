import type { Roles, User } from '@prisma/client';
import { z } from 'zod';
import { cartItemSchema } from './shemas';

export type UserId = User['id'];

export interface UserEntity {
  id: string;
  email: string;
  role: Roles;
  emailVerified?: Date | null;
  name?: string | null;
  image?: string | null;
}

export interface SessionEntity {
  user: UserEntity;
  expires: string;
}

export interface AddToCart {
  userId?: string;
  detailId: number;
  quantity: number;
}

export type Profile = {
  email: string;
  name?: string | null;
  image?: string | null;
};

export type CartItemEntity = z.infer<typeof cartItemSchema>;
export type CartEntity = CartItemEntity[];
