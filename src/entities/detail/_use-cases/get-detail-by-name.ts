import { detailRepository } from '../_repositories/detail';

class GetDetailByNameUseCase {
  async execute(name: string) {
    return await detailRepository.getDetailByName(name);
  }
}

export const getDetailByNameUseCase = new GetDetailByNameUseCase();
