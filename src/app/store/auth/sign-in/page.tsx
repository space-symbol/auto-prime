import { SignInVariants } from '@features/auth/sign-in-variants';
import { Suspense } from 'react';

const SingInPage = () => {
  return (
    <main>
      <Suspense>
        <SignInVariants />
      </Suspense>
    </main>
  );
};

export default SingInPage;
