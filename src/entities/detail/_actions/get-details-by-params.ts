'use server';
import { formatDetail } from '@/shared/lib/formatDetail';
import { SearchDetailsParams } from '../_domain/types';
import { getDetailsList } from '../_use-cases/get-details-list';

export const getDetailsByParamsAction = async (params?: SearchDetailsParams) => {
  const details = await getDetailsList.execute(params);
  const formattedDetails = details.map((detail) => {
    const { discounts, ...rest } = detail;
    return {
      ...formatDetail(rest),
      discounts,
    };
  });
  return formattedDetails;
};
