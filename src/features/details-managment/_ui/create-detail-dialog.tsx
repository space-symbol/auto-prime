import { AppButton } from '@/shared/ui/app-button/app-button';
import { DetailDialog } from './detail-dialog';
import { DetailForm } from './detail-form';
import { useCreateDetail } from '../_vm/use-create-detail';
import { useToast } from '@/shared/ui/use-toast';
import { useId } from 'react';

interface CreateDetailModalProps {
  className?: string;
  triggerClassName?: string;
}

export const CreateDetailDialog = (props: CreateDetailModalProps) => {
  const { className, triggerClassName } = props;
  const { toast } = useToast();
  const formId = useId();
  const { createDetail, isPending, isSuccess } = useCreateDetail({
    onSuccess: async () => {
      toast({
        title: 'Успешно',
        description: 'Товар успешно создан',
        variant: 'success',
      });
    },
    onError: (error) => {
      toast({
        title: 'Произошла ошибка',
        description: error.message,
        variant: 'warning',
      });
    },
  });
  const Trigger = <AppButton className={triggerClassName}>Новый товар</AppButton>;
  return (
    <DetailDialog
      formId={formId}
      className={className}
      title="Создание нового товара"
      trigger={Trigger}
      closeButtonText={'Создать'}
      isPending={isPending}>
      <DetailForm
        formId={formId}
        onSubmitSuccess={(values) => {
          createDetail(values);
        }}
        isSuccess={isSuccess}
      />
    </DetailDialog>
  );
};
