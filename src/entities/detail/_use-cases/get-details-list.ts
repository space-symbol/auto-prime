import { SearchDetailsParams } from '../_domain/types';
import { detailRepository } from '../_repositories/detail';

class GetDetailsListUseCase {
  async execute(params?: SearchDetailsParams) {
    return detailRepository.getDetailsList(params);
  }
}

export const getDetailsList = new GetDetailsListUseCase();
