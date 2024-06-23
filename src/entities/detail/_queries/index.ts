import { useQueryClient } from '@tanstack/react-query';
import { SearchDetailsParams } from '../_domain/types';
import { getDetailsByParamsAction } from '../_actions/get-details-by-params';
import { getDetailByIdAction } from '../_actions/get-detail-by-id';

const baseKey = 'detail';

export const getDetailsByParams = (params: SearchDetailsParams) => {
  const queryKey = [baseKey];
  if (params && Object.values(params).length) {
    queryKey.push(JSON.stringify(params));
  } else {
    queryKey.push('all');
  }
  return {
    queryKey,
    queryFn: async () => await getDetailsByParamsAction(params),
  };
};

export const useInvalidateDetails = (params?: SearchDetailsParams) => {
  const queryClient = useQueryClient();
  const queryKey = [baseKey];
  if (params) {
    queryKey.push(JSON.stringify(params));
  } else {
    queryKey.push('all');
  }
  return () => queryClient.invalidateQueries({ queryKey: [baseKey] });
};

export const getDetailById = (id: number) => ({
  queryKey: [baseKey, id],
  queryFn: async () => await getDetailByIdAction(id),
});
