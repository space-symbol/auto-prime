import { useMutation } from '@tanstack/react-query';
import { updateProfileAction } from '../_actions/update-profile';
import { useAppSession, useInvalidateProfile } from '@/entities/user/client';
import { fromError } from 'zod-validation-error';

interface UpdateProfileProps {
  onSuccess?: (data: Awaited<ReturnType<typeof updateProfileAction>>['profile']) => void;
  onError?: (error: Error) => void;
}

export const useUpdateProfile = (props: UpdateProfileProps) => {
  const { onSuccess, onError } = props;
  const { data: session, update } = useAppSession();
  const invalidateProfile = useInvalidateProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfileAction,
    onSuccess: async ({ profile }, { userId }) => {
      await update({
        ...session,
        user: {
          ...session?.user,
          ...profile,
        },
      });
      await invalidateProfile(userId);
      onSuccess?.(profile);
    },
    onError: (error: Error) => {
      onError?.(fromError(error));
    },
  });

  return {
    updateProfile: mutateAsync,
    isPending,
  };
};
