import { SignInForm } from '@features/auth/server';

const SingInPage = () => {
  return (
    <main className={'w-full h-full my-auto flex flex-col'}>
      <SignInForm className={'m-auto'} />
    </main>
  );
};

export default SingInPage;
