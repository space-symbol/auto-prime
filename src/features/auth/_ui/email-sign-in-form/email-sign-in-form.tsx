'use client';
import { Controller, useForm } from 'react-hook-form';
import { AppInput } from '@shared/ui/app-input/app-input';
import { AppForm } from '@shared/ui/app-form/app-form';
import classNames from 'classnames';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEmailSignIn } from '../../_vm/use-email-sign-in';

interface LoginFormProps {
  className?: string;
}

export const SignInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Электронная почта обязательна' })
    .email({ message: 'Такой электронной почты не существует' }),
});
type LoginFormType = z.infer<typeof SignInFormSchema>;

export const EmailSignInForm = (props: LoginFormProps) => {
  const { className } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: { email: '' },
    resolver: zodResolver(SignInFormSchema),
    mode: 'onTouched',
  });

  const { signIn, isPending } = useEmailSignIn();
  return (
    <AppForm
      onSubmit={handleSubmit((data) => {
        signIn(data.email.trim());
      })}
      isPending={isPending}
      title={'Войти в аккаунт'}
      sendButtonText={'Войти через Email'}
      className={classNames('min-w-96 px-8 pb-0 border-none', className)}>
      <Controller
        control={control}
        render={({ field }) => (
          <AppInput
            className={'py-2'}
            label={'Электронная почта'}
            type={'email'}
            autoComplete={'email'}
            autoFocus
            error={errors.email?.message}
            {...field}
          />
        )}
        name={'email'}
      />
    </AppForm>
  );
};
