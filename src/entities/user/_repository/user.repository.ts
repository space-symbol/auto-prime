import prisma from '@shared/lib/db';
import { UserEntity } from '../_domain/types';
class UserRepository {
  async createUser(user: UserEntity) {
    await prisma.user.create({ data: user });
  }
}

export const userRepository = new UserRepository();
