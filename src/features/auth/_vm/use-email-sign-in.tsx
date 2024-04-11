import { useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

export function useEmailSignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl');

  const emailSingInMutation = useMutation({
    mutationFn: (email: string) =>
      signIn('email', {
        email,
        callbackUrl: callbackUrl ?? undefined,
      }),
  });
  return {
    isPending: emailSingInMutation.isPending,
    signIn: emailSingInMutation.mutate,
  };
}
