import prisma from '@shared/lib/db';
import { UserEntity, UserId } from '../_domain/types';

class UserRepository {
  async createUser(user: UserEntity) {
    const newUser = await prisma.user.create({ data: user });
    await prisma.cart.create({ data: { userId: newUser.id } });

    return newUser;
  }

  async getUserById(userId: UserId) {
    return prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
    });
  }
}

export const userRepository = new UserRepository();
