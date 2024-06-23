import { useMutation } from '@tanstack/react-query';
import { removeFromCartAction } from '../_actions/remove-from-cart';
import { useInvalidateUserCart } from '@/entities/user/client';

interface RemoveFromCartProps {
  onSuccess?: (data: Awaited<ReturnType<typeof removeFromCartAction>>) => void;
  onError?: (error: Error) => void;
}
export const useRemoveFromCart = (props: RemoveFromCartProps) => {
  const invaliedateCart = useInvalidateUserCart();

  const { onSuccess, onError } = props;

  const cartMutation = useMutation({
    mutationFn: removeFromCartAction,
    onSuccess: async (data) => {
      await invaliedateCart();
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  return {
    removeFromCart: cartMutation.mutateAsync,
    isPending: cartMutation.isPending,
    isSuccess: cartMutation.isSuccess,
    isError: cartMutation.isError,
  };
};
