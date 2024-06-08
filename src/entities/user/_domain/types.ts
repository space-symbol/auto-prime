import type { CartItem, Detail, Roles } from '@prisma/client';

export interface UserEntity {
  id: string;
  email: string;
  role: Roles;
  emailVerified: Date | null;
  name?: string | null;
  image?: string | null;
}

export interface SessionEntity {
  user: UserEntity;
  expires: string;
}

export interface Profile {
  email: string;
  name?: string | null;
  image?: string | null;
}

export interface AddToCart {
  userId?: string;
  detailId: number;
  quantity: number;
}

export interface CartItemEntity extends CartItem, Detail {
  total: number;
}

export interface CartEntity extends Array<CartItemEntity> {}
