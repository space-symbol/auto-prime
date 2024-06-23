import { AuthorizatoinError } from '@/shared/lib/errors';
import { craeteCartAbility } from '../_domain/ability';
import { SessionEntity, UserId } from '../_domain/types';
import { cartRepository } from '../_repositories/cart';

type GetUserCartProps = {
  userId: UserId;
  session: SessionEntity;
};

class GetuserCartUseCase {
  async execute({ userId, session }: GetUserCartProps) {
    const userAbility = craeteCartAbility(session);

    if (!userAbility.canGetCart(userId)) {
      throw new AuthorizatoinError();
    }
    return cartRepository.getCart(userId);
  }
}

export const getUserCartUseCase = new GetuserCartUseCase();
