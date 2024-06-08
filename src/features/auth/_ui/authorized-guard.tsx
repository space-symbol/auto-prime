'use client';

import { FullPageSpinner } from '@/shared/ui/full-page-spinner';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useAppSession } from '../../../entities/user/client';

export const AuthorizedGuard = ({ children }: { children: React.ReactNode }) => {
  const session = useAppSession();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      signIn();
    }
  }, [session]);

  const isLoading = session.status === 'loading' || session.status === 'unauthenticated';

  return (
    <>
      <FullPageSpinner isLoading={isLoading} />
      {session.status === 'authenticated' && children}
    </>
  );
};
