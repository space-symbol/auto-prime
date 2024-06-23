import { createProfileAbility } from '../_domain/ability';
import { Profile, SessionEntity, UserId } from '../_domain/types';
import { profileRepository } from '../_repositories/profile';

type UpdateProfile = {
  userId: UserId;
  data: Partial<Profile>;
  session: SessionEntity;
};

class UpdateProfileUseCase {
  async execute({ data, session, userId }: UpdateProfile): Promise<Profile> {
    const profileAbility = createProfileAbility(session);

    if (!profileAbility.canUpdateProfile(userId)) {
      throw new Error('Недостаточно прав');
    }
    return profileRepository.updateProfile(userId, data);
  }
}
export const updateProfileUseCase = new UpdateProfileUseCase();
