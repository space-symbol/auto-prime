import { detailRepository } from '../_repository/detail.repository';

class DeletaDetailsUseCase {
  async execute(detailIds: number[]) {
    return detailRepository.deleteDetails(detailIds);
  }
}
export const deleteDetailsUseCase = new DeletaDetailsUseCase();
