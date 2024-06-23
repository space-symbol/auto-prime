'use client';
import { Controller, useForm } from 'react-hook-form';
import { AppInput } from '@shared/ui/app-input/app-input';
import { AppForm } from '@shared/ui/app-form/app-form';
import { cn } from '@/shared/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEmailSignIn } from '../../_vm/use-email-sign-in';
import { z } from 'zod';

interface EmailSignInFormProps {
  className?: string;
}

export const EmailSignInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Электронная почта обязательна' })
    .email({ message: 'Такой электронной почты не существует' }),
});
type EmailSignInFormType = z.infer<typeof EmailSignInFormSchema>;

export const EmailSignInForm = (props: EmailSignInFormProps) => {
  const { className } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSignInFormType>({
    defaultValues: { email: '' },
    resolver: zodResolver(EmailSignInFormSchema),
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
      className={cn('w-full px-8 pb-0 border-none', className)}>
      <Controller
        control={control}
        render={({ field }) => (
          <AppInput
            className={'h-12'}
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
