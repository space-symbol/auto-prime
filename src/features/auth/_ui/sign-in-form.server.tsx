'use server';
import { cn } from '@/shared/lib/utils';
import { EmailSignInForm } from './email-sign-in-form/email-sign-in-form';
import { Divider } from './divider/divider';
import { ProviderButton } from './provider-button/provider-button';
import { AppProvider } from 'next-auth/providers';
import { authConfig } from '@/entities/user/auth/auth.config';

interface SignInFormProps {
  className?: string;
}

export async function SignInForm(props: SignInFormProps) {
  const { className } = props;
  const providers = await getProviders();
  const oauthProviders = Object.values(providers ?? {}).filter((provider) => provider.type === 'oidc');
  return (
    <div className={cn('flex flex-col gap-8 max-w-96 w-full', className)}>
      <EmailSignInForm />
      <Divider />
      <div className="flex flex-col px-8 justify-center items-center lg:px-4">
        {oauthProviders?.map((provider) => (
          <ProviderButton
            key={provider.id}
            provider={provider}
          />
        ))}
      </div>
    </div>
  );
}

function getProviders(): AppProvider[] {
  const providerKeys: (keyof AppProvider)[] = ['id', 'name', 'type'];
  return authConfig.providers.map((provider) => getKeyValuesFromObject<AppProvider>(provider, providerKeys));
}
function getKeyValuesFromObject<T>(obj: any, keys: (keyof T)[]): T {
  return keys.reduce((acc, key) => {
    if (obj[key]) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as T);
}
