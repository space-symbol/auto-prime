'use client';
import { AppForm } from '@/shared/ui/app-form/app-form';
import { AppInput, AppTextarea, AppInputFile } from '@/shared/ui/app-input/app-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/shared/lib/utils';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

interface DetailFormProps {
  className?: string;
  formId?: string;
  defaultValues?: DetailFormType;
  onSubmitSuccess?: (values: FormData) => void;
  isSuccess?: boolean;
  mode?: 'create' | 'update';
}

const DetailFormSchema = z.object({
  name: z.string().min(1, { message: 'Название обязательно' }),
  description: z.string().min(1, { message: 'Описание обязательно' }),
  price: z.coerce
    .number({
      invalid_type_error: 'Цена должна быть числом',
      required_error: 'Цена обязательна',
    })
    .min(1, { message: 'Цена должна быть больше нуля' }),
  quantityAvailable: z.coerce
    .number({
      invalid_type_error: 'Скидка должна быть числом',
      required_error: 'Количество обязательно',
    })
    .min(1, { message: 'Количество должно быть больше нуля' }),
  images: z.custom<(File | string)[]>().refine(
    (value) => {
      return value.length > 0;
    },
    {
      message: 'Изображение обязательно',
    },
  ),
});

type DetailFormType = z.infer<typeof DetailFormSchema>;

export const DetailForm = (props: DetailFormProps) => {
  const { className, formId, defaultValues, onSubmitSuccess, isSuccess } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<DetailFormType>({
    defaultValues: defaultValues || {
      name: '',
      description: '',
      price: 0,
      quantityAvailable: 0,
      images: [],
    },
    resolver: zodResolver(DetailFormSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <AppForm
      id={formId}
      className={cn(
        'fle flex-wrap items-stretch justify-stretch overflow-auto lg:overflow-hidden lg:grid grid-cols-2 h-full flex-row w-full',
        className,
      )}
      externalSubmit
      onSubmit={handleSubmit((values) => {
        const detailFormData = new FormData();
        detailFormData.append('name', values.name.trim());
        detailFormData.append('price', values.price.toString().trim());
        detailFormData.append('description', values.description.trim());
        detailFormData.append('quantityAvailable', values.quantityAvailable.toString().trim());
        [...values.images].forEach((image) => {
          detailFormData.append('images', image);
        });
        onSubmitSuccess?.(detailFormData);
      })}>
      <div className={'flex flex-col gap-4 flex-grow w-full lg:overflow-auto lg:h-full pr-1'}>
        <Controller
          control={control}
          render={({ field }) => (
            <AppInput
              autoComplete="off"
              type={'text'}
              label={'Название товара'}
              required
              error={errors.name?.message}
              {...field}
            />
          )}
          name={'name'}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <AppTextarea
              cols={30}
              rows={10}
              label={'Описание'}
              required
              error={errors.description?.message}
              {...field}
            />
          )}
          name={'description'}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <AppInput
              autoComplete="off"
              type={'number'}
              label={'Цена р/шт'}
              required
              error={errors.price?.message}
              {...field}
            />
          )}
          name={'price'}
        />
        <Controller
          render={({ field }) => (
            <AppInput
              autoComplete="off"
              type="number"
              label="Количество шт."
              required
              error={errors.quantityAvailable?.message}
              {...field}
            />
          )}
          control={control}
          name="quantityAvailable"
        />
      </div>
      <div className={'h-full flex flex-grow w-full overflow-hidden min-h-96'}>
        <Controller
          control={control}
          render={({ field }) => (
            <AppInputFile
              multiple
              className={'w-full'}
              accept={'image/*'}
              label={'Выберите или перетащите изображение'}
              error={errors.images?.message}
              maxSize={20}
              maxFiles={10}
              required
              {...field}
            />
          )}
          name={'images'}
        />
      </div>
    </AppForm>
  );
};
