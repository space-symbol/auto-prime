import { DetailEntity, DetailBase } from '../_domain/types';
import { detailRepository } from '../_repository/detail.repository';

class UpdateDetailUseCase {
  async execute(id: number, detail: DetailBase): Promise<DetailEntity> {
    return detailRepository.updateDetail(id, detail);
  }
}

export const updateDetailUseCase = new UpdateDetailUseCase();
