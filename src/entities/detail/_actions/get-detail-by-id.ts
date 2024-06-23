'use server';
import { formatDetail } from '@/shared/lib/formatDetail';
import { getDetailByIdUseCase } from '../_use-cases/get-detail-by-id';

export const getDetailByIdAction = async (id: number) => {
  const detail = await getDetailByIdUseCase.execute(id);
  if (!detail) return null;

  return formatDetail(detail);
};
