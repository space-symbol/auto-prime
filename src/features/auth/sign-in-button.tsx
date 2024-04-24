import classNames from 'classnames';
import { AppButton, AppButtonTheme } from '@shared/ui/app-button/app-button';
// import { signIn } from 'next-auth/react';
import Link from 'next/link';
import SignInIcon from '@assets/icons/enter.svg';

interface SignInButtonProps {
  className?: string;
}

export const SignInButton = (props: SignInButtonProps) => {
  const { className } = props;

  return (
    <Link href={'/store/auth/sign-in'}>
      <AppButton
        theme={AppButtonTheme.FILLED}
        Icon={SignInIcon}
        className={classNames('group', className)}>
        <div className={'flex gap-2 items-center'}>
          <span>Вход</span>
        </div>
      </AppButton>
    </Link>
  );
};
