import { UserEntity } from '../_domain/types';
import { userRepository } from '@/entities/user/_repositories/user';
import { Roles } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';
import { privateConfig } from '@/shared/config/private';

interface CreateUser {
  email: string;
  name?: string | null;
  image?: string | null;
  emailVerified?: Date | null;
}

class CreateUserUseCase {
  async execute(data: CreateUser) {
    const adminEmails = privateConfig.ADMIN_EMAILS?.split(',') ?? [];
    const role = adminEmails.includes(data.email) ? Roles.ADMIN : Roles.USER;
    const user: UserEntity = {
      id: createId(),
      role,
      ...data,
    };

    return userRepository.createUser(user);
  }
}

export const createUserUseCase = new CreateUserUseCase();
