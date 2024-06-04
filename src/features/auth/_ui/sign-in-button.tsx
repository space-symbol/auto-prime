import { AppLink } from '@/shared/ui/app-link/app-link';

interface SignInButtonProps {
  className?: string;
}

export const SignInButton = (props: SignInButtonProps) => {
  const { className } = props;

  return (
    <AppLink
      className={className}
      href={'/auth/sign-in'}>
      Вход
    </AppLink>
  );
};
