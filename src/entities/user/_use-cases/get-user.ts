import { SessionEntity, UserEntity, UserId } from '../_domain/types';
import { userRepository } from '../_repositories/user';
import { createUserAbility } from '../_domain/ability';
import { AuthorizatoinError } from '@/shared/lib/errors';

type GetUserProps = {
  userId: UserId;
  session: SessionEntity;
};

export class GetUserUseCase {
  async execute({ userId, session }: GetUserProps): Promise<UserEntity> {
    const userAbility = createUserAbility(session);

    if (!userAbility.canGetUser(userId)) {
      throw new AuthorizatoinError();
    }

    return userRepository.getUserById(userId);
  }
}

export const getUserUseCase = new GetUserUseCase();
