'use client';
import { ProviderButton } from '../provider-button/provider-button';
import { useProviders } from '../../use-providers';
import { Spinner } from '@shared/ui/spinner/spinner';

export const ProviderButtonsCard = () => {
  const { providers, isPending } = useProviders();

  return (
    <div className={'flex w-ful justify-center gap-4 py-2 px-8'}>
      {isPending ? (
        <Spinner className={'w-6 h-12'} aria-label={'Загрузка...'} />
      ) : (
        providers.map((provider) => <ProviderButton key={provider.id} provider={provider}></ProviderButton>)
      )}
    </div>
  );
};
