import { useMutation } from '@tanstack/react-query';
import { deleteDetailsAction } from '../_actions/delete-details';
import { useInvalidateDetails } from '@/entities/detail/detail';

export const useDeleteDetails = () => {
  const invalidateDetails = useInvalidateDetails();
  const detailMutation = useMutation({
    mutationFn: deleteDetailsAction,
    onSuccess: async () => {
      await invalidateDetails();
    },
  });

  return {
    deleteDetails: detailMutation.mutateAsync,
    isPending: detailMutation.isPending,
    isSuccess: detailMutation.isSuccess,
    isError: detailMutation.isError,
  };
};
