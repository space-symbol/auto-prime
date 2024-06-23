import { cartRepository } from '../_repositories/cart';
import { UserId } from '../client';

type GetUserCartItem = {
  userId: UserId;
  detailId: number;
};

class GetUserCartItemUseCase {
  async execute(props: GetUserCartItem) {
    const { userId, detailId } = props;
    return cartRepository.getUserCartItem(userId, detailId);
  }
}

export const getUserCartItemUseCase = new GetUserCartItemUseCase();
