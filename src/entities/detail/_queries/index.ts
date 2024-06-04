import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { DetailEntity, SearchDetailsParams } from '../_domain/types';
import { getDetailsByParamsAction } from '../_actions/get-details-by-params';
import { getDetailByIdAction } from '../_actions/get-detail-by-id';

const baseKey = 'detail';
interface QueryOptions extends Omit<UseQueryOptions<DetailEntity[]>, 'queryFn' | 'queryKey'> {}
export const useGetDetailsQuery = (params?: SearchDetailsParams, options?: QueryOptions) => {
  const queryKey = [baseKey];
  if (params) {
    queryKey.push(JSON.stringify(params));
  } else {
    queryKey.push('all');
  }

  const { data, ...other } = useQuery({
    queryKey,
    queryFn: async () => await getDetailsByParamsAction(params),
    ...options,
  });

  return {
    details: data,
    ...other,
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

export const useGetDetailQuery = (id: number) => {
  const { data, ...other } = useQuery({
    queryKey: [baseKey, id],
    queryFn: async () => await getDetailByIdAction(id),
  });

  return {
    detail: data,
    ...other,
  };
};
