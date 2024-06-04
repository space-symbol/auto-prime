'use server';
import { deleteDetailsUseCase } from '@/entities/detail/_use-cases/delete-details';

export const deleteDetailsAction = (ids: number[]) => {
  return deleteDetailsUseCase.execute(ids);
};
