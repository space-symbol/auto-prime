'use server';
import { SearchDetailsParams } from '../_domain/types';
import { getDetailsList } from '../_use-cases/get-details-list';

export const getDetailsByParamsAction = async (params?: SearchDetailsParams) => {
  return getDetailsList.execute(params);
};
