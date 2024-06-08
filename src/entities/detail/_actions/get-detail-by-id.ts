'use server';
import { getDetailByIdUseCase } from '../_use-cases/get-detail-by-id';

export const getDetailByIdAction = (id: number) => {
  return getDetailByIdUseCase.execute(id);
};
