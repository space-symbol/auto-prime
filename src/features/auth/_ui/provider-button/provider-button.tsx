'use client';
import { AppProvider } from 'next-auth/providers';
import GoogleIcon from '@assets/icons/google.svg';
import { AppButton, AppButtonTheme } from '@shared/ui/app-button/app-button';
import { useOAuthSignIn } from '@features/auth/_vm/use-oauth-sign-in';
import { Spinner } from '@shared/ui/spinner/spinner';
import cls from './provider.module.css';

export const ProviderButton = ({ provider }: { provider: AppProvider }) => {
  const oauthSignIn = useOAuthSignIn(provider);
  const getIcon = (provider: AppProvider) => {
    switch (provider.id) {
      case 'google':
        return <GoogleIcon className={'w-auto h-8'} />;
      default:
        return null;
    }
  };

  return (
    <AppButton onClick={() => oauthSignIn.signIn()} theme={AppButtonTheme.OUTLINE} className={cls.providerButton}>
      {oauthSignIn.isPending ? <Spinner aria-label={'Вход...'} className={'w-auto h-100%'} /> : getIcon(provider)}
    </AppButton>
  );
};
