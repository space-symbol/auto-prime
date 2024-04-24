import { detailRepository } from '../_repository/detail.repository';

export const getPromitedDetailsAction = () => {
  return detailRepository.getPromitedDetails();
};
