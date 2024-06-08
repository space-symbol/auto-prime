import { detailRepository } from '../_repository/detail.repository';

class GetDetailByIdUseCase {
  async execute(id: number) {
    return detailRepository.getDetailById(id);
  }
}

export const getDetailByIdUseCase = new GetDetailByIdUseCase();
