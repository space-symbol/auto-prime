import classNames from 'classnames';
import { AppButton, AppButtonTheme } from '@shared/ui/app-button/app-button';
import { Spinner } from '@shared/ui/spinner/spinner';

interface AppFormProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string;
  title?: string;
  sendButtonText: string;
  children?: React.ReactNode;
  isPending?: boolean;
}

export const AppForm = (props: AppFormProps) => {
  const { className, title, children, isPending = false, sendButtonText, onSubmit, ...otherProps } = props;
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  return (
    <form
      className={classNames('flex flex-col w-full gap-8 p-4 border border-opacity-40 border-black rounded', className)}
      onSubmit={onSubmitHandler}
      {...otherProps}
    >
      {title && <label className="text-2xl font-medium m-auto px-1">{title}</label>}
      <div className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-4'}>{children}</div>
        <div className={'flex flex-col gap-4'}>
          <AppButton theme={AppButtonTheme.FILLED} className={'text-base py-3 rounded'} disabled={isPending}>
            {isPending ? <Spinner className={'w-auto h-100%'} /> : sendButtonText}
          </AppButton>
        </div>
      </div>
    </form>
  );
};
