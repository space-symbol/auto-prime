import { AppButton } from '@/shared/ui/app-button/app-button';
import { DetailDialog } from './detail-dialog';
import { useToast } from '@/shared/ui/use-toast';
import { useId } from 'react';
import { DetailForm } from './detail-form';
import { DetailEntity } from '@/entities/detail/_domain/types';
import { useUpdateDetail } from '../_vm/use-update-detail';

interface UpdateDetailModalProps {
  className?: string;
  triggerClassName?: string;
  detailId: number;
  detail: DetailEntity;
}

export const UpdateDetailModal = (props: UpdateDetailModalProps) => {
  const { className, detail, triggerClassName } = props;
  const { toast } = useToast();
  const formId = useId();

  const { updateDetail, isPending, isSuccess } = useUpdateDetail({
    onSuccess: async () => {
      toast({
        title: 'Успешно',
        description: 'Товар успешно создан',
      });
    },
    onError: () => {
      toast({
        title: 'Произошла ошибка',
        description: 'Не удалось создать новый товар',
      });
    },
  });
  const Trigger = <AppButton className={triggerClassName}>Редактировать</AppButton>;
  return (
    <DetailDialog
      formId={formId}
      className={className}
      title="Редактирование товара"
      trigger={Trigger}
      closeButtonText={'Создать'}
      isPending={isPending}>
      <DetailForm
        formId={formId}
        defaultValues={detail}
        onSubmitSuccess={(values) => {
          updateDetail({
            id: detail.id,
            fields: values,
          });
        }}
        isSuccess={isSuccess}
      />
    </DetailDialog>
  );
};
