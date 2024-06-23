'use client';
import { useAppSession } from '@/entities/user/client';
import { FullPageSpinner } from '@/shared/ui/full-page-spinner';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

export const AuthorizedGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useAppSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [session, status]);

  const isLoading = status === 'loading' || status === 'unauthenticated';

  return (
    <>
      <FullPageSpinner isLoading={isLoading} />
      {status === 'authenticated' && children}
    </>
  );
};
