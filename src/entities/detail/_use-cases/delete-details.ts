import { detailRepository } from '../_repositories/detail';

class DeletaDetailsUseCase {
  async execute(detailIds: number[]) {
    return detailRepository.deleteDetails(detailIds);
  }
}
export const deleteDetailsUseCase = new DeletaDetailsUseCase();
