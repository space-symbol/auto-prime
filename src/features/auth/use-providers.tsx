'use client';
import { useQuery } from '@tanstack/react-query';
import { getProviders } from 'next-auth/react';

export function useProviders() {
  const { isPending, data } = useQuery({
    queryKey: ['providers'],
    queryFn: async () => {
      const providers = await getProviders();
      return Object.values(providers ?? {}).filter((provider) => provider.type === 'oidc');
    },
  });

  return {
    isPending,
    providers: data || [],
  };
}
