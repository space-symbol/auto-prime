import { useQueryClient } from '@tanstack/react-query';
import { getUserProfileAction } from '../_actions/get-user-profile';
import { UserId } from '../client';
import { getUserCartAction } from '../_actions/get-user-cart';
import { getUserCartItemAction } from '../_actions/get-user-cart-item';

const baseKey = 'user';

export const getProfileQuery = (userId: UserId) => ({
  queryKey: [baseKey, 'getProfileById', userId],
  queryFn: () => getUserProfileAction({ userId }),
});

export const useInvalidateProfile = () => {
  const queryClient = useQueryClient();

  return (userId: UserId) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, 'getProfileById', userId],
    });
};

export const getUserCart = (userId: UserId | null) => ({
  queryKey: [baseKey, 'getUserCart', userId],
  queryFn: () => {
    if (!userId) return null;
    return getUserCartAction({ userId });
  },
});

export const getItemFromUserCart = (userId: UserId | null, detailId: number) => ({
  queryKey: [baseKey, 'getDetailFromCart'],
  queryFn: () => {
    if (!userId) return null;
    return getUserCartItemAction({ userId, detailId });
  },
});

export const useInvalidateUserCart = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: [baseKey] });
};
