import { SearchOptions } from '../_domain/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getDetailsByParamsAction } from '../_actions/get-details-by-params';
import { Detail } from '@prisma/client';

const baseKey = 'store';
interface QueryOptions extends Omit<UseQueryOptions<Detail[]>, 'queryFn' | 'queryKey'> {
  queryKey: string[];
  queryFn: () => Promise<Detail[]>;
}
export const useGetDetailsByParamsQuery = (SearchOptions: SearchOptions, options?: QueryOptions) => {
  const { data, ...other } = useQuery<Detail[], Error>({
    queryKey: [baseKey, 'details'],
    queryFn: async () => await getDetailsByParamsAction(SearchOptions),
    ...options,
  });

  return {
    details: data,
    ...other,
  };
};
