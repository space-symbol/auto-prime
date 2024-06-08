import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { getUserCartAction } from '../_actions/get-user-cart';

const baseKey = 'cart';
interface QueryOptions
  extends Omit<UseQueryOptions<Awaited<ReturnType<typeof getUserCartAction>>>, 'queryFn' | 'queryKey'> {}

export const useGetUserCart = (userId?: string, options?: QueryOptions) => {
  const { data: cart, ...other } = useQuery({
    queryKey: [baseKey],
    queryFn: async () => await getUserCartAction(),
    ...options,
  });

  return {
    cart,
    ...other,
  };
};

export const useInvalidateUserCart = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: [baseKey] });
};
