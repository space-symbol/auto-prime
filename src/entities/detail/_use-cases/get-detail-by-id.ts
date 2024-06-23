import { detailRepository } from '../_repositories/detail';

class GetDetailByIdUseCase {
  async execute(id: number) {
    return detailRepository.getDetailById(id);
  }
}

export const getDetailByIdUseCase = new GetDetailByIdUseCase();
