'use client';
import { AppForm } from '@/shared/ui/app-form/app-form';
import { AppInput, AppTextarea, AppInputFile } from '@/shared/ui/app-input/app-input';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
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

const DetailFormSchema = z
  .object({
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
    discountPercentage: z.coerce
      .number({
        invalid_type_error: 'Скидка должна быть числом',
      })
      .min(0, { message: 'Скидка не может быть меньше нуля' })
      .max(99, { message: 'Скидка не может быть больше 99%' }),
    discountEndDate: z.string().optional(),
    images: z.custom<FileList | string[]>().refine(
      (value) => {
        if (!(value instanceof FileList) || value.length === 0) {
          return false;
        }
        return value.length > 0;
      },
      {
        message: 'Изображение обязательно',
      },
    ),
  })
  .superRefine((values, ctx) => {
    if (!values.discountEndDate && values.discountPercentage) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Eсли есть скидка, то должна быть дата её окочания',
        path: ['discountDuration'],
      });
    } else if (values.discountEndDate && !values.discountPercentage) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Если есть дата окончания скидки, то должна быть и скидка',
        path: ['discountPercentage'],
      });
    }
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
      discountPercentage: 0,
      quantityAvailable: 0,
      discountEndDate: '',
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
      className={classNames(
        'fle flex-wrap items-stretch justify-stretch overflow-auto xl:overflow-hidden h-full flex-row w-full sm:max-w-full',
        className,
      )}
      externalSubmit
      onSubmit={handleSubmit((values) => {
        const detailFormData = new FormData();
        detailFormData.append('name', values.name);
        detailFormData.append('price', values.price.toString());
        detailFormData.append('description', values.description);
        detailFormData.append('discountPercentage', values.discountPercentage.toString());
        detailFormData.append('discountEndDate', values.discountEndDate || '');
        detailFormData.append('quantityAvailable', values.quantityAvailable.toString());
        Array.from(values.images).forEach((image) => {
          detailFormData.append('images', image);
        });
        onSubmitSuccess?.(detailFormData);
      })}>
      <div className={'flex flex-col gap-4 xl:max-w-[49%] flex-grow w-full xl:overflow-auto xl:h-full pr-1'}>
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
        <Controller
          control={control}
          render={({ field }) => (
            <AppInput
              autoComplete="off"
              type={'number'}
              label={'Скидка %'}
              error={errors.discountPercentage?.message}
              {...field}
            />
          )}
          name={'discountPercentage'}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <AppInput
              autoComplete="off"
              type="datetime-local"
              label={'Дата окончания скидки'}
              error={errors.discountEndDate?.message}
              min={new Date().toISOString().slice(0, 16)}
              {...field}
            />
          )}
          name={'discountEndDate'}
        />
      </div>
      <div className={'h-full flex flex-grow w-full xl:max-w-[49%] overflow-hidden min-h-96'}>
        <Controller
          control={control}
          render={({ field }) => (
            <AppInputFile
              multiple
              className={'w-full h-full'}
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
