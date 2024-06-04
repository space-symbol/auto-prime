'use server';
import { detailRepository } from '../detail.server';

export const getDetailByIdAction = (id: number) => {
  return detailRepository.getDetailById(id);
};
