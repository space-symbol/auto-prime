'use client';
import { AuthorizedGuard, useAppSession } from '@/entities/user/client';
import { AppButton } from '@/shared/ui/app-button/app-button';
import { AppForm } from '@/shared/ui/app-form/app-form';
import { AppInput, AppInputFile } from '@/shared/ui/app-input/app-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const ProfileSchema = z.object({
  image: z.custom<{ value: FileList | null; defaultImages: string[] }>().refine(
    (files) => {
      const value = [...(files.value || [])];
      return value.length > 0;
    },
    {
      message: 'Изображение обязательно',
    },
  ),
});
type ProfileSchemaType = z.infer<typeof ProfileSchema>;

const ProfilePage = () => {
  const { data: session } = useAppSession();

  const { control } = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
  });

  return (
    <AuthorizedGuard>
      <h1>Профиль</h1>
      <AppForm className="grid sm:grid-cols-3 items-center justify-center gap-10">
        <Controller
          control={control}
          render={({ field }) => (
            <AppInputFile
              accept="image/*"
              label={'Выберите или перетащите изображение'}
              required
              className="!rounded-full w-48 h-48"
              {...field}
            />
          )}
          name={'image'}
        />
        <div className="flex justify-between col-span-2 flex-col">
          <AppInput
            readOnly
            value={session?.user?.email}
          />
          <AppInput value={session?.user?.email} />
          <AppInput value={session?.user?.email} />
        </div>
        <AppButton className="col-start-2 sm:col-start-3">Сохранить</AppButton>
      </AppForm>
    </AuthorizedGuard>
  );
};

export default ProfilePage;
