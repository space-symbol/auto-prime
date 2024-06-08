import { useMutation } from '@tanstack/react-query';
import { deleteDetailsAction } from '../_actions/delete-details';
import { useInvalidateDetails } from '@/entities/detail/client';

interface DeleteDetailProps {
  onSuccess?: (data: Awaited<ReturnType<typeof deleteDetailsAction>>) => void;
  onError?: (error: Error) => void;
}

export const useDeleteDetails = (props: DeleteDetailProps) => {
  const { onSuccess, onError } = props;

  const invalidateDetails = useInvalidateDetails();
  const detailMutation = useMutation({
    mutationFn: deleteDetailsAction,
    onSuccess: async (data) => {
      await invalidateDetails();
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  return {
    deleteDetails: detailMutation.mutateAsync,
    isPending: detailMutation.isPending,
    isSuccess: detailMutation.isSuccess,
    isError: detailMutation.isError,
  };
};
