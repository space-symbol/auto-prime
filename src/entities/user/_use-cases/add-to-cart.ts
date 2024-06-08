import { AddToCart } from '../_domain/types';
import { userRepository } from '../_repository/user.repository';

class AddToCartUseCase {
  async execute(data: Required<AddToCart>) {
    return userRepository.addToCart(data);
  }
}

export const addToCartUseCase = new AddToCartUseCase();
