import classNames from 'classnames';
import { AppButton } from '@shared/ui/app-button/app-button';
import { Spinner } from '@shared/ui/spinner/spinner';
import { cn } from '@/shared/lib/utils';

interface AppFormProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string;
  title?: string;
  sendButtonText?: string;
  children?: React.ReactNode;
  isPending?: boolean;
  externalSubmit?: boolean;
}

export const AppForm = (props: AppFormProps) => {
  const {
    className,
    title,
    children,
    isPending = false,
    externalSubmit = false,
    sendButtonText,
    onSubmit,
    ...otherProps
  } = props;
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  return (
    <form
      className={cn(
        classNames('flex flex-col gap-3 w-full p-2 lg:p-4 border border-opacity-40 border-black rounded', className),
      )}
      onSubmit={onSubmitHandler}
      {...otherProps}>
      {title && <label className="text-2xl font-medium m-auto px-1">{title}</label>}
      {children}
      {!externalSubmit && sendButtonText && (
        <AppButton
          type="submit"
          className={'text-base py-2 rounded'}
          fullWidth
          disabled={isPending}>
          {isPending ? <Spinner className={'w-auto h-100%'} /> : sendButtonText}
        </AppButton>
      )}
    </form>
  );
};
