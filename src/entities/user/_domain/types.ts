import type { Roles } from '@prisma/client';

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
