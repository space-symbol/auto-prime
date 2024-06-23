import prisma from '@shared/lib/db';

import { Profile, UserId } from '../_domain/types';

class ProfileRepository {
  async updateProfile(userId: UserId, data: Partial<Profile>) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }
}

export const profileRepository = new ProfileRepository();
