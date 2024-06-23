import { AuthorizatoinError } from '@/shared/lib/errors';
import { craeteCartAbility } from '../_domain/ability';
import { cartRepository } from '../_repositories/cart';
import { SessionEntity } from '../client';

type RemoveItemFromCartProps = {
  session: SessionEntity;
  itemId: number;
};

class RemoveFromCartUseCase {
  async execute({ session, itemId }: RemoveItemFromCartProps) {
    const cartAbility = craeteCartAbility(session);
    if (!cartAbility.canRemoveFromCart(session.user.id)) {
      throw new AuthorizatoinError();
    }

    return cartRepository.removeFromActiveCart(session.user.id, itemId);
  }
}

export const removeFromCartUseCase = new RemoveFromCartUseCase();
