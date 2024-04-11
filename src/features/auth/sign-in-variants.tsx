'use client';
import classNames from 'classnames';
import { EmailSignInForm } from './_ui/email-sign-in-form/email-sign-in-form';
import { Divider } from './_ui/divider/divider';
import { ProviderButtonsCard } from './_ui/provider-buttons-list/provider-buttons-card-server';

interface SignInFormProps {
  className?: string;
}

export function SignInVariants(props: SignInFormProps) {
  const { className } = props;

  return (
    <div className={classNames('flex flex-col w-full gap-8 p-4 border border-gray', className)}>
      <EmailSignInForm />
      <Divider />
      <ProviderButtonsCard />
    </div>
  );
}
