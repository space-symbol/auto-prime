import { useMutation } from '@tanstack/react-query';
import { addToCartAction } from '../_actions/add-to-cart';
import { useInvalidateUserCart } from '@/entities/user/_queries';

interface AddToCartProps {
  onSuccess?: (data: Awaited<ReturnType<typeof addToCartAction>>) => void;
  onError?: (error: Error) => void;
}
export const useAddToCart = ({ onSuccess, onError }: AddToCartProps) => {
  const invaliedateCart = useInvalidateUserCart();
  const cartMutation = useMutation({
    mutationFn: addToCartAction,
    onSuccess: async (data) => {
      await invaliedateCart();
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  return {
    addToCart: cartMutation.mutateAsync,
    isPending: cartMutation.isPending,
    isSuccess: cartMutation.isSuccess,
    isError: cartMutation.isError,
  };
};
