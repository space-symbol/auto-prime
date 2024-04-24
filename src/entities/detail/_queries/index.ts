import { SearchOptions } from '../_domain/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getDetailsByParamsAction } from '../_actions/get-details-by-params';
import { Detail } from '@prisma/client';
import { getNewDetailsAction } from '../_actions/get-new-details';
import { getPopularDetailsAction } from '../_actions/get-popular-details';
import { getPromitedDetailsAction } from '../_actions/get-promited-details';

const baseKey = 'store';
interface QueryOptions extends Omit<UseQueryOptions<Detail[]>, 'queryFn' | 'queryKey'> {
  queryKey: string[];
  queryFn: () => Promise<Detail[]>;
}
export const useGetDetailsByParamsQuery = (
  SearchOptions: SearchOptions,
  options?: QueryOptions,
) => {
  const { data, ...other } = useQuery<Detail[], Error>({
    queryKey: [baseKey, 'catalog'],
    queryFn: async () => await getDetailsByParamsAction(SearchOptions),
    ...options,
  });

  return {
    details: data,
    ...other,
  };
};

export const useGetNewDetailsQuery = (options?: QueryOptions) => {
  const { data, ...other } = useQuery<Detail[], Error>({
    queryKey: [baseKey, 'new'],
    queryFn: async () => await getNewDetailsAction(),
    ...options,
  });

  return {
    newDetails: data,
    ...other,
  };
};

export const useGetPopularDetailsQuery = (options?: QueryOptions) => {
  const { data, ...other } = useQuery<Detail[], Error>({
    queryKey: [baseKey, 'popular'],
    queryFn: async () => await getPopularDetailsAction(),

    ...options,
  });
  return {
    popularDetails: data,
    ...other,
  };
};

export const useGetPromitedDetailsQuery = (options?: QueryOptions) => {
  const { data, ...other } = useQuery<Detail[], Error>({
    queryKey: [baseKey, 'promited'],
    queryFn: async () => await getPromitedDetailsAction(),

    ...options,
  });
  return {
    promitedDetails: data,
    ...other,
  };
};
