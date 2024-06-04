import { cn } from '@/shared/lib/utils';
import { AppButton } from '@/shared/ui/app-button/app-button';
import {
  DialogContent,
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog';
import classNames from 'classnames';

interface DetailDialogProps {
  className?: string;
  title: string;
  trigger: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  closeButtonText: string;
  formId?: string;
  isPending?: boolean;
}

export const DetailDialog = (props: DetailDialogProps) => {
  const { className, title, trigger, description, closeButtonText, children, formId, isPending } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          classNames(
            'text-black h-[calc(100vh-2rem)] w-[calc(100vw-1rem)] lg:w-[calc(100vw-10rem)] min-w-80 flex flex-col max-w-full p-1 pt-2 lg:p-4',
            className,
          ),
        )}>
        <DialogHeader className={'flex-shrink'}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className={'flex-grow overflow-hidden'}>{children}</div>
        <DialogFooter className={'items-end flex-shrink'}>
          <AppButton
            form={formId}
            type="submit"
            disabled={isPending}>
            {closeButtonText}
          </AppButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
