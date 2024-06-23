import { Profile, UserId } from '@/entities/user/client';
import { AppButton } from '@/shared/ui/app-button/app-button';
import { AppForm } from '@/shared/ui/app-form/app-form';
import { AppInputFile, AppInput } from '@/shared/ui/app-input/app-input';
import { toast } from '@/shared/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateProfile } from '../_vm/use-update-profile';
import { cn } from '@/shared/lib/utils';

const updateProfileSchemaForm = z.object({
  // email: z.string().min(1, 'Email не может быть пустым'),
  name: z.string().min(1, 'Имя не может быть пустым'),
  image: z.array(z.custom<File | string>()),
});

type UpdateProfileForm = z.infer<typeof updateProfileSchemaForm>;

const getDefaultValues = (profile: Profile) => {
  return {
    name: profile?.name || '',
    image: profile?.image ? [profile.image] : [],
  };
};
interface ProfileFormProps {
  userId: UserId;
  profile: Profile;
  className?: string;
}
export const ProfileForm = (props: ProfileFormProps) => {
  const { profile, userId, className } = props;

  const { updateProfile } = useUpdateProfile({
    onSuccess: () => {
      toast({
        title: 'Профиль обновлен',
        description: 'Ваши данные были успешно обновлены',
        variant: 'success',
      });
    },
  });

  const {
    control,
    formState: { errors, isDirty, dirtyFields },
    handleSubmit,
    reset,
    register,
  } = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchemaForm),
    defaultValues: getDefaultValues(profile),
  });
  const handleCancel = () => {
    reset();
  };
  return (
    <AppForm
      onSubmit={handleSubmit(async (data) => {
        const dirtyKeys = Object.keys(dirtyFields);
        for (const key in data) {
          if (!dirtyKeys.includes(key)) {
            delete data[key as keyof typeof data];
          }
        }

        const { image, ...rest } = data;
        let updateSession = {
          userId: userId,
          data: {
            ...rest,
          },
        };

        if (image) {
          const formData = new FormData();
          formData.append('image', image ? image[0] : '');

          updateSession;
        }
        const newProfile = await updateProfile(updateSession);
        if (newProfile) {
          reset(getDefaultValues(newProfile.profile));
        }
      })}
      className={cn('flex flex-col sm:grid sm:grid-cols-3 items-center content-center gap-10', className)}>
      <Controller
        control={control}
        render={({ field }) => (
          <AppInputFile
            accept="image/*"
            maxSize={20}
            label={'Выберите или перетащите изображение'}
            required
            className="!rounded-full w-56 h-56 place-self-center"
            error={errors.image?.message}
            {...field}
          />
        )}
        name={'image'}
      />
      <div className="flex justify-between col-span-2 flex-col">
        <AppInput
          label="Электронная почта"
          readOnly
          value={profile?.email}
          // error={errors.email?.message}
          // {...register('email')}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <AppInput
              label="Имя"
              error={errors.name?.message}
              {...field}
            />
          )}
          name={'name'}
        />
      </div>
      {isDirty && (
        <div className="col-start-1 w-full xs:w-auto animate-show col-span-2 grid sm:grid-cols-2 flex-wrap sm:flex-nowrap gap-6 sm:col-start-2">
          <AppButton
            fullWidth
            type="button"
            onClick={handleCancel}
            variant="destructive">
            Сбросить изменения
          </AppButton>
          <AppButton
            type="submit"
            fullWidth>
            Сохранить
          </AppButton>
        </div>
      )}
    </AppForm>
  );
};
