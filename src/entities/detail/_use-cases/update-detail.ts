import { DetailEntity } from '../_domain/types';
import { detailRepository } from '../_repositories/detail';

class UpdateDetailUseCase {
  async execute(id: number, detail: Partial<DetailEntity>) {
    return detailRepository.updateDetail(id, detail);
  }
}

export const updateDetailUseCase = new UpdateDetailUseCase();
