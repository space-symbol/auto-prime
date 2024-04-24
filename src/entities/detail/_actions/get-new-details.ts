import { detailRepository } from '../_repository/detail.repository';

export const getNewDetailsAction = () => {
  return detailRepository.getNewDetails();
};
