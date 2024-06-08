'use client';
import { useEffect } from 'react';
import { useAppSession } from '../../../entities/user/client';
import { signIn } from 'next-auth/react';
import { FullPageSpinner } from '@/shared/ui/full-page-spinner';

export const SessionRefresh = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useAppSession();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn();
    }
  }, [session]);

  const isLoading = status === 'loading';

  return (
    <>
      <FullPageSpinner isLoading={isLoading} />
      {!isLoading && children}
    </>
  );
};
