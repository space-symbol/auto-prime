import { Roles } from '@prisma/client';
import { SessionEntity, UserId } from './types';

export const createUserAbility = (session: SessionEntity) => ({
  canGetUser: (userId: UserId) => {
    return session.user.id === userId || session.user.role === Roles.ADMIN;
  },
});

export const createProfileAbility = (session: SessionEntity) => ({
  canUpdateProfile: (userId: UserId) => {
    return session.user.id === userId || session.user.role === Roles.ADMIN;
  },
});

export const craeteCartAbility = (session: SessionEntity) => ({
  canGetCart: (userId: UserId) => {
    return session.user.id === userId || session.user.role === Roles.ADMIN;
  },
  canRemoveFromCart: (userId: UserId) => {
    return session.user.id === userId || session.user.role === Roles.ADMIN;
  },
});
