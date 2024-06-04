import { SearchDetailsParams } from '../_domain/types';
import { detailRepository } from '../_repository/detail.repository';

class GetDetailsListUseCase {
  async execute(params?: SearchDetailsParams) {
    return detailRepository.getDetailsList(params);
  }
}

export const getDetailsList = new GetDetailsListUseCase();
