import { UserEntity } from '../_domain/types';
import { userRepository } from '@entities/user/_repository/user.repository';
import { Roles } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';
import { privateConfig } from '@shared/config/env/private';

interface CreateUser {
  email: string;
  name?: string | null;
  image?: string | null;
  emailVerified: Date | null;
}

class CreateUserUseCase {
  async exec(data: CreateUser) {
    const adminEmails = privateConfig.ADMIN_EMAILS?.split(',') ?? [];
    const role = adminEmails.includes(data.email) ? Roles.ADMIN : Roles.USER;
    const user: UserEntity = {
      id: createId(),
      role,
      ...data,
    };

    await userRepository.createUser(user);
    return user;
  }
}

export const createUserUseCase = new CreateUserUseCase();
