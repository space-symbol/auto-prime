import { Detail } from '@prisma/client';
import { DetailBase } from '../_domain/types';
import { detailRepository } from '../_repository/detail.repository';

class CreateDetailUseCase {
  async execute(detail: DetailBase): Promise<Detail> {
    return detailRepository.createDetail(detail);
  }
}

export const createDetailUseCase = new CreateDetailUseCase();
