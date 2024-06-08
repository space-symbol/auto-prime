import { userRepository } from '../_repository/user.repository';

class GetUserCartUseCase {
  async execute(userId: string) {
    return userRepository.getUserCart(userId);
  }
}

export const getUserCartUseCase = new GetUserCartUseCase();
