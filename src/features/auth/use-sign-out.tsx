import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useSignOut() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => signOut(),
    onSuccess: async () => {
      router.push('/store/auth/sign-in');
    },
  });

  return {
    signOut: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
