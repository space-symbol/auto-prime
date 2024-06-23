import { DetailEntity } from '../_domain/types';
import { detailRepository } from '../_repositories/detail';

class CreateDetailUseCase {
  async execute(detail: Omit<DetailEntity, 'id'>) {
    return detailRepository.createDetail(detail);
  }
}

export const createDetailUseCase = new CreateDetailUseCase();
