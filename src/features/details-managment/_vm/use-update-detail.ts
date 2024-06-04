import { updateDetailAction } from '../_actions/update-detail';
import { useMutation } from '@tanstack/react-query';
import { useInvalidateDetails } from '@/entities/detail/_queries';

interface UpdateDetailProps {
  onSuccess?: () => void;
  onError?: () => void;
}
interface UpdateDetailMutationProps {
  id: number;
  fields: FormData;
}
export const useUpdateDetail = ({ onSuccess, onError }: UpdateDetailProps) => {
  const invalidateDetails = useInvalidateDetails();
  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: ({ id, fields }: UpdateDetailMutationProps) => updateDetailAction(id, fields),
    onSuccess: async () => {
      await invalidateDetails();
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });
  return {
    updateDetail: mutateAsync,
    isPending: isPending,
    isSuccess: isSuccess,
    isError: isError,
  };
};
