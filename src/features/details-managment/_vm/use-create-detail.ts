import { useMutation } from '@tanstack/react-query';
import { createDetailAction } from '../_actions/create-detail';
import { useInvalidateDetails } from '@/entities/detail/_queries';

interface CreateDetailProps {
  onSuccess?: (data: Awaited<ReturnType<typeof createDetailAction>>) => void;
  onError?: (error: Error) => void;
}
export const useCreateDetail = ({ onSuccess, onError }: CreateDetailProps) => {
  const invalidateDetails = useInvalidateDetails();
  const detailMutation = useMutation({
    mutationFn: createDetailAction,
    onSuccess: async (data) => {
      await invalidateDetails();
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  return {
    createDetail: detailMutation.mutateAsync,
    isPending: detailMutation.isPending,
    isSuccess: detailMutation.isSuccess,
    isError: detailMutation.isError,
  };
};
