import { userRepository } from '../_repository/user.repository';

class RemoveFromCartUseCase {
  async execute(userId: string, detailId: number) {
    return userRepository.removeFromCart(userId, detailId);
  }
}

export const removeFromCartUseCase = new RemoveFromCartUseCase();
