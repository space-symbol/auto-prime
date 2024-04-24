'use client';
import { signIn } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { AppProvider } from 'next-auth/providers';

export function useOAuthSignIn(provider: AppProvider) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl');

  const oAuthSignInMutation = useMutation({
    mutationFn: () => signIn(provider.id, { callbackUrl: callbackUrl ?? undefined }),
  });

  return {
    isPending: oAuthSignInMutation.isPending,
    signIn: oAuthSignInMutation.mutate,
  };
}
